// Configuration file for environment variables
// This centralizes all environment variable access

const config = {
  // API Configuration
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // Application Information
  appName: process.env.REACT_APP_NAME || 'PITCS - Champions HR Services',
  appVersion: process.env.REACT_APP_VERSION || '1.0.0',
  environment: process.env.REACT_APP_ENV || 'development',
  
  // Company Information
  company: {
    name: process.env.REACT_APP_COMPANY_NAME || 'Champions HR Services',
    address: process.env.REACT_APP_COMPANY_ADDRESS || 'Bangalore, India',
    website: process.env.REACT_APP_COMPANY_WEBSITE || 'https://championshservices.com',
  },
  
  // Contact Information
  contact: {
    email: process.env.REACT_APP_CONTACT_EMAIL || 'jobs@championshservices.com',
    phone: process.env.REACT_APP_CONTACT_PHONE || '+91-9632492563',
  },
  
  // External URLs
  urls: {
    googleForm: process.env.REACT_APP_GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLScRvVyo6og6ntYbH9Y12OaxBD1lCZcq_iv7TFRNpW3BbTralg/viewform?usp=sf_link',
  },
  
  // Social Media Links
  social: {
    facebook: process.env.REACT_APP_FACEBOOK_URL || 'https://facebook.com/championshservices',
    linkedin: process.env.REACT_APP_LINKEDIN_URL || 'https://linkedin.com/company/championshservices',
    twitter: process.env.REACT_APP_TWITTER_URL || 'https://twitter.com/championshservices',
  },
  
  // Feature Flags
  features: {
    resumeUpload: process.env.REACT_APP_ENABLE_RESUME_UPLOAD === 'true',
    jobAlerts: process.env.REACT_APP_ENABLE_JOB_ALERTS === 'true',
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  },
  
  // File Upload Configuration
  fileUpload: {
    maxSize: parseInt(process.env.REACT_APP_MAX_FILE_SIZE) || (5 * 1024 * 1024), // 5MB default
    allowedTypes: process.env.REACT_APP_ALLOWED_FILE_TYPES || '.pdf,.doc,.docx',
    maxSizeMB: function() {
      return Math.round(this.maxSize / (1024 * 1024));
    }
  },
  
  // Development helpers
  isDevelopment: () => config.environment === 'development',
  isProduction: () => config.environment === 'production',
  
  // Validation helpers
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  isValidPhone: (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }
};

export default config;
