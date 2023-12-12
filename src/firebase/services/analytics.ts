import { logEvent, setUserProperties } from 'firebase/analytics';
import { analytics } from '../config';

// Create Log Event for Google Analytics
export const fireLogEvent = (eventLabel:any, dataObj = {}) =>
  logEvent(analytics, eventLabel, dataObj);

// It Sets User data for Analytics
export const fireUserProperty = (dataObj = { eventLabel: '' }) => {
  setUserProperties(analytics, dataObj);
};
