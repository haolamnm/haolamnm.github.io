import { Component, type ReactNode, type ErrorInfo } from "react";
import { pageContent } from "@lib/content";
import { ArrowLeftIcon } from "@lib/icons";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

/**
 * Error boundary for lazy-loaded pages.
 * Catches render errors and displays fallback UI.
 * Auto-reloads on ChunkLoadError (version skew after deployment).
 */
export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error("ErrorBoundary caught:", error, errorInfo);

        // Detect chunk load failure (version skew after deployment)
        const isChunkError =
            error.name === "ChunkLoadError" ||
            error.message.includes("Failed to fetch dynamically imported module") ||
            error.message.includes("Loading chunk");

        if (isChunkError) {
            // Auto-reload to get fresh chunks
            window.location.reload();
        }
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
                    <h1 className="text-4xl font-bold font-mono text-white/50 mb-4">
                        Something went wrong
                    </h1>
                    <p className="text-zinc-400 mb-8 max-w-md">
                        {pageContent.notFound.description}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 px-4 py-2 glass-card text-white hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
