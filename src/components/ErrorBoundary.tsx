import { pageContent } from "@lib/content";
import { ArrowLeftIcon } from "@lib/icons";
import { Component, type ErrorInfo, type ReactNode } from "react";

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

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, errorInfo);

    // Detect chunk load failure (version skew after deployment)
    const isChunkError =
      error.name === "ChunkLoadError" ||
      error.message.includes("Failed to fetch dynamically imported module") ||
      error.message.includes("Loading chunk");

    if (isChunkError) {
      // Auto-reload to get fresh chunks
      globalThis.location.reload();
    }
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
          <h1 className="mb-4 font-mono text-4xl font-bold text-white/50">Something went wrong</h1>
          <p className="mb-8 max-w-md text-zinc-400">{pageContent.notFound.description}</p>
          <button
            onClick={() => globalThis.location.reload()}
            className="glass-card inline-flex items-center gap-2 px-4 py-2 text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
