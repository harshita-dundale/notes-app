import React, { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";
import { ToastContainer, toast } from "react-toastify";

export const Update = ({ display, update, refresh }) => {
  
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title || "",
        body: update.body || "",
      });
    }
  }, [update]);  

  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    if (!update || !update.id) {
      toast.error("Update data is missing");
      return;
    }

    if (!inputs.title.trim() || !inputs.body.trim()) {
      toast.error("Title and body are required");
      return;
    }

    const userId = localStorage.getItem("id");
    if (!userId) {
      toast.error("Please login first");
      return;
    }

    try {
      const userId = localStorage.getItem("id");
      await api.put(`/updateTask/${update.id}`, { ...inputs, userId });
      
      if (refresh) refresh();
      display("none");
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;
        
        if (status === 400) {
          toast.error(message || "Invalid task data");
        } else if (status === 401) {
          toast.error("Please login again");
          localStorage.removeItem("token");
          localStorage.removeItem("id");
        } else if (status === 404) {
          toast.error("Task not found");
        } else {
          toast.error(message || "Update failed");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  }

  return (
    <div className="update ">
      <ToastContainer />
      
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="update-title">Update Your Task</h1>
      </div>

      {/* Form */}
      <div className="update-form">
        <div className="mb-3">
          <label className="form-label fw-semibold">Title</label>
          <input
            name="title"
            type="text"
            className="form-control notes-input"
            placeholder="Enter task title"
            value={inputs.title || ""}
            onChange={change}
          />
        </div>
        
        <div className="mb-4">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            name="body"
            className="form-control notes-input"
            rows="4"
            placeholder="Enter task description"
            value={inputs.body || ""}
            onChange={change}
          />
        </div>
        
        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <button 
            className="btn btn-dark px-4 py-2 fw-semibold" 
            onClick={submit}
          >
            UPDATE
          </button>
          <button
            className="btn btn-danger px-4 py-2 fw-semibold"
            onClick={() => display("none")}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
