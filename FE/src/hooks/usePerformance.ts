import { useEffect, useCallback } from 'react';

export function usePerformance() {
  const measurePerformance = useCallback(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const metrics = {
          // Time to First Byte
          ttfb: navigation.responseStart - navigation.requestStart,
          // DOM Content Loaded
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          // Load Complete
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          // Total Load Time
          totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
        };

        console.log('Performance Metrics:', metrics);
        
        // Send to analytics service (if needed)
        // analytics.track('performance_metrics', metrics);
      }
    }
  }, []);

  const measureInteraction = useCallback((name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`${name} interaction:`, entry);
        }
      });
      
      observer.observe({ entryTypes: ['interaction'] });
    }
  }, []);

  useEffect(() => {
    measurePerformance();
  }, [measurePerformance]);

  return { measurePerformance, measureInteraction };
} 