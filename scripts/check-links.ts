/**
 * Link checker script.
 * Crawls the built site and reports broken links.
 * Uses linkinator to validate all internal and external links.
 */

import { spawn } from "child_process";
import { existsSync } from "fs";

const DIST_DIR = "./dist";
const PORT = 4173;

async function checkLinks(): Promise<void> {
    if (!existsSync(DIST_DIR)) {
        console.error("Error: dist folder not found. Run 'bun run build' first.");
        process.exit(1);
    }

    console.log("Starting link checker...\n");

    const preview = spawn("bunx", ["vite", "preview", "--port", PORT.toString()], {
        stdio: "pipe",
        shell: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
        const linkinator = spawn(
            "bunx",
            [
                "linkinator",
                `http://localhost:${PORT}`,
                "--recurse",
                "--timeout", "10000",
                "--skip", "^mailto:",
                "--skip", "^tel:",
            ],
            {
                stdio: "inherit",
                shell: true,
            }
        );

        const exitCode = await new Promise<number>((resolve) => {
            linkinator.on("close", (code) => resolve(code ?? 1));
        });

        if (exitCode !== 0) {
            console.error("\nBroken links detected!");
            preview.kill("SIGKILL");
            process.exit(1);
        }

        console.log("\nAll links are valid!");
    } finally {
        preview.kill("SIGKILL");
    }

    process.exit(0);
}

checkLinks().catch((error) => {
    console.error("Link check failed:", error);
    process.exit(1);
});
