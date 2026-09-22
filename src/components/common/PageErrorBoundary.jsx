import { Component } from "react";

// Last line of defence if a page cannot load even after an automatic reload.
export default class PageErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-2xl font-extrabold text-slate-950">This page did not load</h1>
        <p className="mt-3 text-slate-600">Your connection may have dropped, or the site has just been updated.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Reload the page
        </button>
      </div>
    );
  }
}
