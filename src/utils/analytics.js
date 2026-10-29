/**
 * Portfolio Event Tracker Utility
 * Logs user interaction events to the console and safely dispatches to
 * external analytics providers (e.g. gtag, plausible, custom observers) if present.
 */

export function trackEvent(eventName, params = {}) {
  const eventPayload = {
    event: eventName,
    ...params,
    timestamp: new Date().toISOString(),
    path: typeof window !== 'undefined' ? window.location.pathname : '',
    referrer: typeof document !== 'undefined' ? (document.referrer || 'direct') : 'direct',
  };

  // 1. Structured console logging with styling for easy observability in developer tools
  if (typeof console !== 'undefined') {
    console.info(
      `%c[Portfolio Analytics] %c${eventName}`,
      'color: #F4600A; font-weight: bold; background: #FFF3EB; padding: 2px 6px; border-radius: 4px;',
      'color: #242424; font-weight: 600;',
      eventPayload
    );
  }

  // 2. Forward to Google Analytics (gtag) if installed
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
    } catch {
      // Ignore external analytics errors to not disrupt user experience
    }
  }

  // 3. Forward to Plausible analytics if configured
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    try {
      window.plausible(eventName, { props: params });
    } catch {
      // Ignore
    }
  }

  // 4. Dispatch custom window event so custom integrations can listen
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('portfolio:analytics', { detail: eventPayload }));
    } catch {
      // Ignore
    }
  }

  return eventPayload;
}

/**
 * Helper to log resume download and view clicks
 */
export function trackResumeDownload(details = {}) {
  return trackEvent('resume_download_click', {
    file_name: 'Nilesh_Suthar_Resume.pdf',
    file_type: 'pdf',
    action: details.action || 'download',
    source: details.source || 'unknown',
    ...details,
  });
}
