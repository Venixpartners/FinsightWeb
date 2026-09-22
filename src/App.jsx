import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";

// Other pages load on demand so phones download only what they view.
const Business = lazy(() => import("./pages/Business"));
const Markets = lazy(() => import("./pages/Markets"));
const Economy = lazy(() => import("./pages/Economy"));
const Companies = lazy(() => import("./pages/Companies"));
const Search = lazy(() => import("./pages/Search"));
const Subscribe = lazy(() => import("./pages/Subscribe"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoading() {
  return <div className="min-h-screen" aria-busy="true" />;
}

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="business" element={<Business />} />
          <Route path="markets" element={<Markets />} />
          <Route path="economy" element={<Economy />} />
          <Route path="companies" element={<Companies />} />
          <Route path="search" element={<Search />} />
          <Route path="subscribe" element={<Subscribe />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
