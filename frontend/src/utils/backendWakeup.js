// Utility to wake up the backend on Render free tier
import { apiService } from '../services/api';

class BackendWakeupService {
  constructor() {
    this.isWakingUp = false;
    this.wakeupPromise = null;
    this.lastWakeupTime = null;
    this.wakeupInterval = 5 * 60 * 1000; // 5 minutes
  }

  async wakeUpBackend() {
    // If already waking up, return the existing promise
    if (this.isWakingUp && this.wakeupPromise) {
      return this.wakeupPromise;
    }

    // If recently woken up, don't wake up again
    if (this.lastWakeupTime && Date.now() - this.lastWakeupTime < this.wakeupInterval) {
      return { success: true, message: 'Backend recently woken up' };
    }

    this.isWakingUp = true;
    console.log('🔄 Waking up backend server...');

    this.wakeupPromise = this.performWakeup();
    const result = await this.wakeupPromise;

    this.isWakingUp = false;
    this.wakeupPromise = null;

    if (result.success) {
      this.lastWakeupTime = Date.now();
    }

    return result;
  }

  async performWakeup() {
    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Wake-up attempt ${attempt}/${maxRetries}...`);
        
        // Try to hit the health endpoint
        const response = await fetch('https://seswa-backend.onrender.com/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Backend is awake!', data);
          return { 
            success: true, 
            message: 'Backend successfully woken up',
            data,
            attempt 
          };
        } else {
          console.warn(`⚠️ Wake-up attempt ${attempt} failed with status:`, response.status);
        }
      } catch (error) {
        console.warn(`⚠️ Wake-up attempt ${attempt} failed:`, error.message);
      }

      // Wait before next attempt (except for the last attempt)
      if (attempt < maxRetries) {
        console.log(`⏳ Waiting ${retryDelay/1000}s before next attempt...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }

    return { 
      success: false, 
      message: 'Failed to wake up backend after multiple attempts',
      attempts: maxRetries 
    };
  }

  async checkBackendStatus() {
    try {
      const response = await fetch('https://seswa-backend.onrender.com/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return { 
          success: true, 
          status: 'awake',
          data 
        };
      } else {
        return { 
          success: false, 
          status: 'error',
          statusCode: response.status 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        status: 'sleeping',
        error: error.message 
      };
    }
  }

  // Auto wake-up when the app starts
  async autoWakeup() {
    console.log('🚀 Checking backend status on app start...');
    
    const status = await this.checkBackendStatus();
    
    if (!status.success) {
      console.log('😴 Backend appears to be sleeping, attempting wake-up...');
      return await this.wakeUpBackend();
    } else {
      console.log('✅ Backend is already awake');
      this.lastWakeupTime = Date.now();
      return status;
    }
  }

  // Keep backend alive by pinging periodically
  startKeepAlive() {
    // Ping every 14 minutes (Render free tier sleeps after 15 minutes of inactivity)
    const keepAliveInterval = 14 * 60 * 1000;
    
    setInterval(async () => {
      try {
        console.log('🏓 Keep-alive ping...');
        await fetch('https://seswa-backend.onrender.com/health');
        console.log('✅ Keep-alive ping successful');
      } catch (error) {
        console.warn('⚠️ Keep-alive ping failed:', error.message);
      }
    }, keepAliveInterval);
  }
}

// Create singleton instance
const backendWakeupService = new BackendWakeupService();

// Auto-start keep-alive in production
if (import.meta.env.PROD) {
  backendWakeupService.startKeepAlive();
}

export default backendWakeupService;

// Convenience functions
export const wakeUpBackend = () => backendWakeupService.wakeUpBackend();
export const checkBackendStatus = () => backendWakeupService.checkBackendStatus();
export const autoWakeup = () => backendWakeupService.autoWakeup();
