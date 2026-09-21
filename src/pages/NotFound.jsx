import { Link } from "react-router-dom";
import useTitle from "../lib/useTitle";

function NotFound() {
  useTitle("Page not found");
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="text-3xl font-extrabold text-slate-950">This page does not exist</h1>
      <p className="mt-3 text-slate-600">The link may be old or mistyped. Try the home page or search for a topic.</p>
      <Link to="/" className="mt-6 inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">
        Go to the home page
      </Link>
    </div>
  );
}

export default NotFound;
