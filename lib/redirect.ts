// Carries the landing page's query string (UTMs, discount_code…) onto the destination.
export function withCurrentParams(url: string) {
  const current = new URLSearchParams(window.location.search);
  const target = new URL(url, window.location.origin);
  current.forEach((value, key) => {
    if (!target.searchParams.has(key)) target.searchParams.set(key, value);
  });
  return target.toString();
}

// Locally there's no sign-up flow, so relative paths go to the live site.
export function resolveForEnvironment(path: string) {
  const host = window.location.hostname;
  const isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host.endsWith(".localhost");
  return isLocal ? `https://www.katkin.com${path}` : path;
}

export function redirectTo(path: string) {
  window.location.href = withCurrentParams(resolveForEnvironment(path));
}
