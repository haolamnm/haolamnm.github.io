/**
 * Link checker script.
 * Crawls the built site and reports broken links.
 * Uses linkinator to validate all internal and external links.
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const DIST_DIR = "./dist";
const PORT = 4173;

async function checkLinks(): Promise<void> {
    if (!existsSync(DIST_DIR)) {
        console.error("Error: dist folder not found. Run 'bun run build' first.");
        process.exit(1);
    }

    console.log("Starting link checker...\n");

    // Use absolute paths to binaries to satisfy SonarQube S4036
    const binPath = join(process.cwd(), "node_modules", ".bin");
    const vitePath = join(binPath, process.platform === "win32" ? "vite.cmd" : "vite");
    const linkinatorPath = join(binPath, process.platform === "win32" ? "linkinator.cmd" : "linkinator");

    const preview = spawn(vitePath, ["preview", "--port", PORT.toString()], {
        stdio: "pipe",
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
        const linkinator = spawn(
            linkinatorPath,
            [
                `http://localhost:${PORT}`,
                "--recurse",
                "--timeout",
                "10000",
                "--skip",
                "^mailto:",
                "--skip",
                "^tel:",
            ],
            {
                stdio: "inherit",
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

try {
    await checkLinks();
} catch (error) {
    console.error("Link check failed:", error);
    process.exit(1);
}
