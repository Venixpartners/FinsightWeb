import { useEffect, useState } from "react";

// Runs an async loader whenever deps change. The key ties each result to the
// deps it was loaded for, so stale results show as loading without an extra render.
export default function useAsync(loader, deps) {
  const key = JSON.stringify(deps);
  const [state, setState] = useState({ key: null, data: null, error: null });

  useEffect(() => {
    let active = true;
    loader()
      .then((data) => active && setState({ key, data, error: null }))
      .catch((error) => active && setState({ key, data: null, error }));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const current = state.key === key;
  return {
    loading: !current,
    data: current ? state.data : null,
    error: current ? state.error : null,
  };
}
