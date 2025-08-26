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
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
       <ToastContainer />
      <h1>Update Your task</h1>
      <input
        name="title"
        type="text"
        className="notes-input my-4 p-3 w-100"
        value={inputs.title || ""}
        onChange={change}
      />
      <textarea
        name="body"
        id=""
        className="notes-input w-100 p-3"
        value={inputs.body || ""}
        onChange={change}
      />
      <div className="">
        <button className="btn btn-dark my-4" onClick={submit }>UPDATE</button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={() => {display("none")}}
        >
          Close
        </button>
      </div>
    </div>
  );
};
