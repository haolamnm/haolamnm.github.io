import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@layout/MainLayout";
import ErrorBoundary from "@components/ErrorBoundary";
import HomePage from "@pages/HomePage";

/** Lazy-loaded secondary pages for code splitting */
const ProjectsPage = lazy(() => import("@pages/ProjectsPage"));
const ThoughtsPage = lazy(() => import("@pages/ThoughtsPage"));
const PostPage = lazy(() => import("@pages/PostPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

/** Loading spinner for Suspense fallback */
function PageLoader() {
  return (
    <div
      className="flex items-center justify-center min-h-[50vh]"
      role="status"
      aria-label="Loading content"
    >
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}

/** Root application component */
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/thoughts" element={<ThoughtsPage />} />
              <Route path="/thoughts/:slug" element={<PostPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
