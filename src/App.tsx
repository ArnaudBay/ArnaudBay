import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const StudioPage = lazy(() => import("./pages/Studio"));

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/studio/*"
        element={
          <Suspense fallback={<div style={{ padding: 24 }}>Loading Studio…</div>}>
            <StudioPage />
          </Suspense>
        }
      />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Route>
    </Routes>
    <Analytics />
  </BrowserRouter>
);

export default App;
