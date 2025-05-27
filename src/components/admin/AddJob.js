import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useJobContext } from "../context/JobContext";

const AddJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { addJob, updateJob } = useJobContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const isEdit = Boolean(id);
  const existingJob = location.state;

  const defaultJob = {
    title: "",
    category: "IT",
    location: "Bangalore",
    experience: "2-4 years",
    education: "B.Tech/M.Tech in Computer Science",
    driveLocation: "Bangalore Tech Park",
    description: "We are looking for a skilled software developer with experience in React and Node.js."
  };

  const [formData, setFormData] = useState(defaultJob);

  useEffect(() => {
    if (isEdit && existingJob) {
      setFormData(existingJob);
    }
  }, [existingJob, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setSubmitError(null);

  //   // Basic validation
  //   if (!formData.title || !formData.description) {
  //     setSubmitError("Title and description are required");
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   try {
  //     if (isEdit) {
  //       await updateJob({ ...formData, id: Number(id) });
  //       navigate("/admin/manage-jobs", { 
  //         state: { 
  //           message: "Job updated successfully!", 
  //           type: "success" 
  //         } 
  //       });
  //     } else {
  //       await addJob(formData);
  //       navigate("/jobs", { 
  //         state: { 
  //           message: "Job added successfully!", 
  //           type: "success" 
  //         },
  //         replace: true
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error submitting job:", error);
  //     const errorMsg = error.response?.data?.message || 
  //                     error.message || 
  //                     "Error submitting job. Please try again.";
  //     setSubmitError(errorMsg);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);
//   setSubmitError(null);

//   try {
//     if (isEdit) {
//       await updateJob({ ...formData, id: Number(id) });
//       navigate("/admin/manage-jobs", { 
//         state: { message: "Job updated successfully!" } 
//       });
//     } else {
//       await addJob(formData);
//       navigate("/jobs", { 
//         state: { message: "Job added successfully!" } 
//       });
//     }
//   } catch (error) {
//     console.error("Error submitting job:", error);
    
//     let errorMessage = "Error submitting job. Please try again.";
//     if (error.message.includes('timed out')) {
//       errorMessage = "The server is taking too long to respond. Please try again later.";
//     } else if (error.message.includes('504')) {
//       errorMessage = "Database timeout. Your job might still be processing. Please check later.";
//     }
    
//     setSubmitError(errorMessage);
//   } finally {
//     setIsSubmitting(false);
//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);

  try {
    if (isEdit) {
      await updateJob({ ...formData, id: Number(id) });
      navigate("/admin/manage-jobs", { 
        state: { 
          message: "Job updated successfully!",
          type: "success"
        } 
      });
    } else {
      await addJob(formData);
      navigate("/jobs", { 
        state: { 
          message: "Job added successfully!",
          type: "success"
        },
        replace: true
      });
    }
  } catch (error) {
    console.error("Submission error:", error);
    
    let userMessage = "Error submitting job. Please try again.";
    if (error.message.includes('504') || error.message.includes('timed out')) {
      userMessage = "The system is busy. Your job might still be processing. " + 
                   "Please check your jobs list in a few moments.";
    }
    
    setSubmitError(userMessage);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="container mt-4">
      <h3 className="text-danger">{isEdit ? "Edit Job" : "Add Job"}</h3>
      
      {submitError && (
        <div className="alert alert-danger" role="alert">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="job-form">
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input 
            className="form-control" 
            name="title" 
            placeholder="" 
            value={formData.title} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select 
            className="form-control" 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            required
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Job Location</label>
          <input 
            className="form-control" 
            name="location" 
            placeholder="" 
            value={formData.location} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Experience Required</label>
          <input 
            className="form-control" 
            name="experience" 
            placeholder="" 
            value={formData.experience} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Education Required</label>
          <input 
            className="form-control" 
            name="education" 
            placeholder="" 
            value={formData.education} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Drive Location</label>
          <input 
            className="form-control" 
            name="driveLocation" 
            placeholder="" 
            value={formData.driveLocation} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Description</label>
          <textarea 
            className="form-control" 
            name="description" 
            placeholder="" 
            value={formData.description} 
            onChange={handleChange}
            required 
            rows="4"
          />
        </div>

        <button 
          className="btn btn-primary" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {isEdit ? "Updating..." : "Adding..."}
            </>
          ) : (
            isEdit ? "Update Job" : "Add Job"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddJob;