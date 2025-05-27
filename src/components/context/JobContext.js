import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context
const JobContext = createContext();

// Custom hook to use the JobContext
export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};

// JobProvider component
export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRecent, setIsLoadingRecent] = useState(false);
  const [error, setError] = useState(null);
  const [recentJobsError, setRecentJobsError] = useState(null);

  // API base URL - configured via environment variables
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';



  // Fetch all jobs
  const refreshJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('🔄 JobContext: Refreshing jobs from:', `${API_BASE_URL}/jobs`);
      const response = await fetch(`${API_BASE_URL}/jobs`);
      console.log('🔄 JobContext: Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('🔄 JobContext: Raw result:', result);

      // Handle backend response format: { success: true, data: [...] }
      const data = result.success ? result.data : result;
      console.log('🔄 JobContext: Processed data:', data);
      console.log('🔄 JobContext: Is array:', Array.isArray(data));

      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('🔄 JobContext: Error fetching jobs:', err);
      setError(err.message || 'Failed to fetch jobs');
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  // Fetch recent jobs
  const refreshRecentJobs = useCallback(async () => {
    setIsLoadingRecent(true);
    setRecentJobsError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/recent`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // Handle backend response format: { success: true, data: [...] }
      const data = result.success ? result.data : result;
      setRecentJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching recent jobs:', err);
      setRecentJobsError(err.message || 'Failed to fetch recent jobs');
      setRecentJobs([]);
    } finally {
      setIsLoadingRecent(false);
    }
  }, [API_BASE_URL]);

  // Add a new job
  const addJob = useCallback(async (jobData) => {
    try {
      console.log('Adding job with data:', jobData);
      console.log('API URL:', `${API_BASE_URL}/jobs`);

      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Success response:', result);

      // Handle backend response format: { success: true, data: {...} }
      const newJob = result.success ? result.data : result;
      setJobs(prevJobs => Array.isArray(prevJobs) ? [...prevJobs, newJob] : [newJob]);
      return newJob;
    } catch (err) {
      console.error('Error adding job:', err);
      throw err;
    }
  }, [API_BASE_URL]);

  // Update a job
  const updateJob = useCallback(async (jobId, jobData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // Handle backend response format: { success: true, data: {...} }
      const updatedJob = result.success ? result.data : result;
      setJobs(prevJobs =>
        prevJobs.map(job => job._id === jobId ? updatedJob : job)
      );
      return updatedJob;
    } catch (err) {
      console.error('Error updating job:', err);
      throw err;
    }
  }, [API_BASE_URL]);

  // Delete a job
  const deleteJob = useCallback(async (jobId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
      return true;
    } catch (err) {
      console.error('Error deleting job:', err);
      throw err;
    }
  }, [API_BASE_URL]);

  // Get a single job by ID
  const getJobById = useCallback((jobId) => {
    return Array.isArray(jobs) ? jobs.find(job => job._id === jobId) : null;
  }, [jobs]);

  // Context value
  const value = {
    jobs,
    recentJobs,
    isLoading,
    isLoadingRecent,
    error,
    recentJobsError,
    refreshJobs,
    refreshRecentJobs,
    addJob,
    updateJob,
    deleteJob,
    getJobById,
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
