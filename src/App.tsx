import ErrorBoundary from "@components/ErrorBoundary";
import MainLayout from "@layout/MainLayout";
import HomePage from "@pages/HomePage";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/** Lazy-loaded secondary pages for code splitting */
const ProjectsPage = lazy(() => import("@pages/ProjectsPage"));
const ThoughtsPage = lazy(() => import("@pages/ThoughtsPage"));
const PostPage = lazy(() => import("@pages/PostPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

/** Loading spinner for Suspense fallback */
function PageLoader() {
  return (
    <output className="flex min-h-[50vh] items-center justify-center" aria-label="Loading content">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
    </output>
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
