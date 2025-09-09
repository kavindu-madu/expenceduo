// Test Firebase connection
import { database } from './firebase';
import { ref, set, get } from 'firebase/database';

export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    const testRef = ref(database, 'test');
    await set(testRef, { message: 'Firebase connection test', timestamp: Date.now() });
    
    const snapshot = await get(testRef);
    const data = snapshot.val();
    
    console.log('Firebase test successful:', data);
    return true;
  } catch (error) {
    console.error('Firebase test failed:', error);
    return false;
  }
};
