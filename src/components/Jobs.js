import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaMapMarkerAlt, FaGraduationCap, FaLocationArrow, FaUpload, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [error, setError] = useState(null);
  const [recentError, setRecentError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backendnew-6vdo.onrender.com/api';
      console.log('🔍 Fetching jobs from:', `${API_BASE_URL}/jobs`);
      console.log('🌍 Environment:', process.env.REACT_APP_ENV);
      console.log('🔗 API URL from env:', process.env.REACT_APP_API_URL);

      const response = await fetch(`${API_BASE_URL}/jobs`);
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('📦 Raw response:', result);

      // Handle backend response format: { success: true, data: [...] }
      const data = result.success ? result.data : result;
      console.log('📋 Processed data:', data);
      console.log('📊 Data is array:', Array.isArray(data));
      console.log('📈 Data length:', data?.length);

      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('❌ Error fetching jobs:', err);
      setError("Failed to load jobs");
      setJobs([]); // Ensure jobs is always an array
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentJobs = async () => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backendnew-6vdo.onrender.com/api';
      const response = await fetch(`${API_BASE_URL}/jobs/recent`);
      const result = await response.json();
      // Handle backend response format: { success: true, data: [...] }
      const data = result.success ? result.data : result;
      setRecentJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setRecentError("Failed to load recent jobs");
      setRecentJobs([]); // Ensure recentJobs is always an array
    } finally {
      setLoadingRecent(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchRecentJobs();
  }, []);

  const handleViewJob = (jobId) => {
    navigate(`/view-job/${jobId}`);
  };

  const handleApply = () => {
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScRvVyo6og6ntYbH9Y12OaxBD1lCZcq_iv7TFRNpW3BbTralg/viewform?usp=sf_link";
    window.open(googleFormUrl, '_blank');
  };

  const handleResumeUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.includes('pdf') && !file.type.includes('doc') && !file.type.includes('docx')) {
        alert('Please upload a PDF or Word document');
        return;
      }
      const maxFileSize = 5 * 1024 * 1024;
      if (file.size > maxFileSize) {
        alert(`File size should be less than ${Math.round(maxFileSize / (1024 * 1024))}MB`);
        return;
      }
      console.log('Resume selected:', file.name);
    }
  };

  return (
    <div className="jobs-layout">
      <div className="jobs-container">
        <div className="jobs-list-section">
          <div className="results-header">
            <h2>Available Positions <span>({Array.isArray(jobs) ? jobs.length : 0})</span></h2>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading jobs...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <h3>Error Loading Jobs</h3>
              <p>{error}</p>
              <button onClick={fetchJobs}>Try Again</button>
            </div>
          ) : !Array.isArray(jobs) || jobs.length === 0 ? (
            <div className="no-jobs">
              <h3>No Jobs Found</h3>
              <p>There are currently no job openings available.</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <div key={job._id} className="job-card">
                  <div className="job-title-section">
                    <h3>{job.title}</h3>
                  </div>
                  <div className="job-primary-details">
                    <span className="category-tag">{job.category}</span>
                    <div className="detail-item">
                      <FaMapMarkerAlt />
                      <span>{job.location}</span>
                    </div>
                    <div className="detail-item">
                      <FaBriefcase />
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  <div className="job-education">
                    <div className="detail-item">
                      <FaGraduationCap />
                      <span>{job.education}</span>
                    </div>
                  </div>
                  {job.driveLocation && (
                    <div className="job-drive-location">
                      <div className="detail-item">
                        <FaLocationArrow />
                        <span>Drive: {job.driveLocation}</span>
                      </div>
                    </div>
                  )}
                  <div className="job-description-section">
                    <h4>Description:</h4>
                    <p className="job-description">
                      {job.description.length > 150
                        ? `${job.description.substring(0, 150)}...`
                        : job.description}
                    </p>
                  </div>
                  <div className="button-group">
                    <button className="view-button" onClick={() => handleViewJob(job._id)}>View More</button>
                    <button className="apply-button" onClick={handleApply}>Apply</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-container">
        <div className="recent-jobs-card">
          <h3>Recent Job Openings</h3>
          <div className="recent-jobs-content">
            <div className="recent-jobs-list">
              {loadingRecent ? (
                <div className="recent-jobs-loading">
                  <div className="spinner-small"></div>
                  <p>Loading recent jobs...</p>
                </div>
              ) : recentError ? (
                <div className="recent-jobs-error">
                  <p>{recentError}</p>
                  <button onClick={fetchRecentJobs} className="retry-button">Retry</button>
                </div>
              ) : !Array.isArray(recentJobs) || recentJobs.length === 0 ? (
                <div className="no-recent-jobs">
                  <p>No recent job openings</p>
                </div>
              ) : (
                recentJobs.map((job) => (
                  <div key={job._id} className="recent-job-item">
                    <div className="recent-job-info">
                      <h4 className="recent-job-title">{job.title}</h4>
                      <div className="recent-job-location">
                        <FaMapMarkerAlt size={12} />
                        {job.location}
                      </div>
                    </div>
                    <div className="recent-job-experience">{job.experience}</div>
                  </div>
                ))
              )}
            </div>
            <div className="resume-upload-section">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
              />
              <button className="submit-resume-btn" onClick={handleResumeUpload}>
                <FaUpload style={{ marginRight: '8px' }} />
                Submit Your Resume
              </button>
            </div>
          </div>
        </div>

        <div className="need-help-section">
          <h3>Need Help?</h3>
          <p>Can't find what you're looking for? Contact our recruitment team for assistance.</p>
          <div className="contact-options">
            <a href="mailto:recruitment@champions.com" className="contact-link">
              <FaEnvelope /> Email Us
            </a>
            <a href="tel:+919632492563" className="contact-link">
              <FaPhone /> Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
