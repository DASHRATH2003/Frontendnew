# Environment Variables Documentation

This document describes all the environment variables used in the frontend application.

## Important Notes

- All React environment variables must start with `REACT_APP_`
- Environment variables are loaded from the `.env` file in the frontend directory
- Changes to environment variables require a restart of the development server

## Available Environment Variables

### API Configuration

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `REACT_APP_API_URL` | `http://localhost:5000/api` | Backend API base URL |

### Application Information

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `REACT_APP_NAME` | `PITCS - Champions HR Services` | Application name |
| `REACT_APP_VERSION` | `1.0.0` | Application version |
| `REACT_APP_ENV` | `development` | Environment mode (development/production) |

### Company Information

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `REACT_APP_COMPANY_NAME` | `Champions HR Services` | Company name |
| `REACT_APP_COMPANY_ADDRESS` | `Bangalore, India` | Company address |
| `REACT_APP_COMPANY_WEBSITE` | `https://championshservices.com` | Company website |

### Contact Information

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `REACT_APP_CONTACT_EMAIL` | `jobs@championshservices.com` | Contact email address |
| `REACT_APP_CONTACT_PHONE` | `+91-9632492563` | Contact phone number |

### External URLs

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `REACT_APP_GOOGLE_FORM_URL` | `https://docs.google.com/forms/...` | Google Form URL for job applications |

### Social Media Links

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `REACT_APP_FACEBOOK_URL` | `https://facebook.com/championshservices` | Facebook page URL |
| `REACT_APP_LINKEDIN_URL` | `https://linkedin.com/company/championshservices` | LinkedIn page URL |
| `REACT_APP_TWITTER_URL` | `https://twitter.com/championshservices` | Twitter page URL |

### Feature Flags

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `REACT_APP_ENABLE_RESUME_UPLOAD` | `true` | Enable/disable resume upload feature |
| `REACT_APP_ENABLE_JOB_ALERTS` | `true` | Enable/disable job alerts feature |
| `REACT_APP_ENABLE_ANALYTICS` | `false` | Enable/disable analytics tracking |

### File Upload Configuration

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `REACT_APP_MAX_FILE_SIZE` | `5242880` | Maximum file size in bytes (5MB) |
| `REACT_APP_ALLOWED_FILE_TYPES` | `.pdf,.doc,.docx` | Allowed file types for upload |

## Usage Examples

### Using Environment Variables Directly
```javascript
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Using the Config File
```javascript
import config from '../config/config';

const apiUrl = config.apiUrl;
const companyName = config.company.name;
const isResumeUploadEnabled = config.features.resumeUpload;
```

## Environment-Specific Configuration

### Development (.env.development)
```env
REACT_APP_ENV=development
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENABLE_ANALYTICS=false
```

### Production (.env.production)
```env
REACT_APP_ENV=production
REACT_APP_API_URL=https://api.championshservices.com/api
REACT_APP_ENABLE_ANALYTICS=true
```

## Best Practices

1. **Never commit sensitive data** like API keys or passwords to environment variables
2. **Use meaningful default values** for all environment variables
3. **Document all environment variables** in this file
4. **Use the config file** instead of accessing `process.env` directly in components
5. **Validate environment variables** before using them in production

## Troubleshooting

### Environment Variables Not Working
1. Ensure the variable name starts with `REACT_APP_`
2. Restart the development server after adding new variables
3. Check that the `.env` file is in the correct location (frontend directory)
4. Verify there are no spaces around the `=` sign in the `.env` file

### Default Values Not Showing
1. Check the config file for correct default values
2. Ensure the config file is imported correctly
3. Verify the component is using the config object properly
