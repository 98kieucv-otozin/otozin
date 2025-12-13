import { useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      } as Record<string, unknown>);
    }

    // Custom analytics
    console.log('Analytics Event:', event);
    
    // Send to your analytics service
    // analytics.track(event.action, event);
  }, []);

  const trackPageView = useCallback((url: string) => {
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: url,
      } as Record<string, unknown>);
    }
  }, []);

  const trackMegaMenuInteraction = useCallback((action: 'open' | 'close' | 'navigate', category?: string) => {
    trackEvent({
      action,
      category: 'mega_menu',
      label: category,
    });
  }, [trackEvent]);

  const trackSearch = useCallback((query: string, results: number) => {
    trackEvent({
      action: 'search',
      category: 'user_interaction',
      label: query,
      value: results,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackMegaMenuInteraction,
    trackSearch,
  };
} 