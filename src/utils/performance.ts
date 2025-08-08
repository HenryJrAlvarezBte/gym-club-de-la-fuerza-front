import { InteractionManager } from 'react-native';

// Debounce function for performance optimization
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for performance optimization
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function executedFunction(...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Run after interactions for better performance
export const runAfterInteractions = (task: () => void) => {
  InteractionManager.runAfterInteractions(() => {
    task();
  });
};

// Optimize image loading
export const preloadImages = (imageUrls: string[]) => {
  // This would be implemented with actual image preloading
  // For now, just a placeholder for future optimization
  console.log('Preloading images:', imageUrls);
};

// Memory management utilities
export const clearMemory = () => {
  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
}; 