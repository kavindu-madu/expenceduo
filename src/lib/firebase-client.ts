// Client-side Firebase configuration (for browser only)
import { getAnalytics, isSupported } from "firebase/analytics";
import { app } from "./firebase";

// Initialize Analytics only on client side
export const initializeAnalytics = async () => {
  if (typeof window !== 'undefined') {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};

// Get analytics instance (call this in client components)
export const getAnalyticsInstance = () => {
  if (typeof window !== 'undefined') {
    try {
      return getAnalytics(app);
    } catch (error) {
      console.warn('Analytics not available:', error);
      return null;
    }
  }
  return null;
};
