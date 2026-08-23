export function trackEvent(name, data) {
  try {
    window.umami?.track(name, data);
  } catch {
    // analytics must never break the app
  }
}
