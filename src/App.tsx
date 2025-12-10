import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@layout/MainLayout";

/**
 * WHY lazy loading: Code splitting for smaller initial bundle
 */
const HomePage = lazy(() => import("@pages/HomePage"));
const ProjectsPage = lazy(() => import("@pages/ProjectsPage"));
const ThoughtsPage = lazy(() => import("@pages/ThoughtsPage"));
const PostPage = lazy(() => import("@pages/PostPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/thoughts" element={<ThoughtsPage />} />
            <Route path="/thoughts/:slug" element={<PostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;

