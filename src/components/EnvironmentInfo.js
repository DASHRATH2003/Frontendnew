import React from 'react';
import config from '../config/config';

const EnvironmentInfo = () => {
  // Only show this component in development mode
  if (!config.isDevelopment()) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '5px',
      padding: '10px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h6 style={{ margin: '0 0 8px 0', color: '#495057' }}>Environment Info</h6>
      <div><strong>App:</strong> {config.appName}</div>
      <div><strong>Version:</strong> {config.appVersion}</div>
      <div><strong>Environment:</strong> {config.environment}</div>
      <div><strong>API URL:</strong> {config.apiUrl}</div>
      <div><strong>Company:</strong> {config.company.name}</div>
      <div><strong>Contact:</strong> {config.contact.email}</div>
      <div><strong>Phone:</strong> {config.contact.phone}</div>
      <div><strong>Features:</strong></div>
      <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
        <li>Resume Upload: {config.features.resumeUpload ? '✅' : '❌'}</li>
        <li>Job Alerts: {config.features.jobAlerts ? '✅' : '❌'}</li>
        <li>Analytics: {config.features.analytics ? '✅' : '❌'}</li>
      </ul>
      <div><strong>Max File Size:</strong> {config.fileUpload.maxSizeMB()}MB</div>
    </div>
  );
};

export default EnvironmentInfo;
