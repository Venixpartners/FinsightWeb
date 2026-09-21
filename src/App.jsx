import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import Business from "./pages/Business";
import Markets from "./pages/Markets";
import Economy from "./pages/Economy";
import Companies from "./pages/Companies";
import Search from "./pages/Search";
import Subscribe from "./pages/Subscribe";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";

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
