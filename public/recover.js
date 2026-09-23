/* eslint-disable no-unused-vars -- written for the oldest browsers, which need the catch parameter */
// Served in place of any script file that no longer exists (see vercel.json).
// Browsers that kept an offline copy of an older FinSight build ask for those
// old files, get this instead, drop the old copy, and load the current site.
(function () {
  var KEY = "finsight_recover_at";
  var last = 0;
  try {
    last = Number(sessionStorage.getItem(KEY)) || 0;
  } catch (e) {
    // storage unavailable
  }
  var retry = Date.now() - last > 20000;
  try {
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch (e) {
    // storage unavailable
  }

  function showMessage() {
    var root = document.getElementById("root");
    if (!root || root.hasChildNodes()) return;
    root.innerHTML =
      '<div style="max-width:36rem;margin:0 auto;padding:96px 20px;text-align:center;font-family:system-ui,sans-serif;color:#0f172a">' +
      '<h1 style="font-size:24px;font-weight:800;margin:0">This page did not load</h1>' +
      '<p style="margin:12px 0 0;color:#475569">The site has just been updated. Reloading will bring up the current version.</p>' +
      '<a href="' + location.pathname + '" style="display:inline-block;margin-top:24px;padding:12px 20px;border-radius:8px;background:#1d4ed8;color:#fff;font-weight:600;text-decoration:none">Reload the page</a>' +
      "</div>";
  }

  var jobs = [];
  if ("serviceWorker" in navigator) {
    jobs.push(
      navigator.serviceWorker.getRegistrations().then(function (list) {
        return Promise.all(list.map(function (r) { return r.unregister(); }));
      })
    );
  }
  if (window.caches) {
    jobs.push(
      caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (k) { return caches.delete(k); }));
      })
    );
  }

  Promise.all(jobs)
    .catch(function () {})
    .then(function () {
      if (retry) location.reload();
      else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showMessage);
      else showMessage();
    });
})();
