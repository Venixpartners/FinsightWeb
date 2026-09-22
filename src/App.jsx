import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import { lazyPage } from "./lib/lazyPage";

// Other pages load on demand, then all are fetched quietly in the background
// so later taps open instantly (see preloadPages in main.jsx).
const Business = lazyPage(() => import("./pages/Business"));
const Markets = lazyPage(() => import("./pages/Markets"));
const Economy = lazyPage(() => import("./pages/Economy"));
const Companies = lazyPage(() => import("./pages/Companies"));
const Search = lazyPage(() => import("./pages/Search"));
const Subscribe = lazyPage(() => import("./pages/Subscribe"));
const About = lazyPage(() => import("./pages/About"));
const Contact = lazyPage(() => import("./pages/Contact"));
const Privacy = lazyPage(() => import("./pages/Privacy"));
const Terms = lazyPage(() => import("./pages/Terms"));
const Disclaimer = lazyPage(() => import("./pages/Disclaimer"));
const Cookies = lazyPage(() => import("./pages/Cookies"));
const NotFound = lazyPage(() => import("./pages/NotFound"));

// eslint-disable-next-line react-refresh/only-export-components
export const LAZY_PAGES = [Business, Markets, Economy, Companies, Subscribe, Search, About, Contact, Privacy, Terms, Disclaimer, Cookies, NotFound];

function App() {
  return (
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
  );
}

export default App;
