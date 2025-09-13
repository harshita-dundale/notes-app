import React, { useEffect, useState } from "react";
import "./notes.css";
import NoteCards from "./NoteCards";
import { ToastContainer, toast } from "react-toastify";
import { Update } from "./Update";
import api from "../../utils/axiosConfig";

function Notes() {
  let id = localStorage.getItem("id");
  const [updateData, setUpdateData] = useState(null);
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [notes, setNotes] = useState([]);

  // Load temporary notes from sessionStorage on mount
  useEffect(() => {
    if (!id) {
      const tempNotes = JSON.parse(sessionStorage.getItem('tempNotes') || '[]');
      setNotes(tempNotes);
    }
  }, []);

  // Save temporary notes to sessionStorage
  const saveTempNotes = (newNotes) => {
    if (!id) {
      sessionStorage.setItem('tempNotes', JSON.stringify(newNotes));
    }
  };

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    if (inputs.title.trim() === "" || inputs.body.trim() === "") {
      toast.error("Title & Body should not be empty");
      return;
    }
    
    if (!id) {
      // Allow adding to local state but show toast to sign up
      const tempNote = {
        _id: Date.now().toString(),
        title: inputs.title,
        body: inputs.body,
        isTemp: true
      };
      const newNotes = [...notes, tempNote];
      setNotes(newNotes);
      saveTempNotes(newNotes);
      setInputs({ title: "", body: "" });
      toast.warning("Please sign up first to save your notes permanently!");
      return;
    }

    try {
      const res = await api.post("/addTask", {
        title: inputs.title,
        body: inputs.body,
        id: id,
      });
      
      setNotes((prevNotes) => [...prevNotes, res.data.list]);
      setInputs({ title: "", body: "" });
      toast.success("Your Task is Added");
    } catch (err) {
      console.error("Add task error:", err);
      
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message;
        
        if (status === 400) {
          toast.error(message || "Invalid task data");
        } else if (status === 401) {
          toast.error("Please login again");
          localStorage.removeItem("token");
          localStorage.removeItem("id");
        } else if (status === 404) {
          toast.error("User not found");
        } else {
          toast.error(message || "Failed to add task");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  const del = async (cardId) => {
    // Check if it's a temporary note
    const noteToDelete = notes.find(note => note._id === cardId);
    if (noteToDelete?.isTemp) {
      const updatedNotes = notes.filter((note) => note._id !== cardId);
      setNotes(updatedNotes);
      saveTempNotes(updatedNotes);
      toast.success("Temporary task removed");
      return;
    }

    if (!id) {
      toast.error("Please login first!");
      return;
    }

    try {
      await api.delete(`/deleteTask/${cardId}`, {
        data: { userId: id },
      });

      const updatedNotes = notes.filter((note) => note._id !== cardId);
      setNotes(updatedNotes);
      toast.success("Your Task is Deleted");
    } catch (error) {
      console.error("Delete error:", error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;
        
        if (status === 400) {
          toast.error(message || "Invalid request");
        } else if (status === 401) {
          toast.error("Please login again");
          localStorage.removeItem("token");
          localStorage.removeItem("id");
        } else if (status === 404) {
          toast.error("Task not found");
        } else {
          toast.error(message || "Failed to delete task");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  const dis = (value) => {
    document.getElementById("notes-update").style.display = value;
  };

  const update = (index) => {
    const note = notes[index];
    setUpdateData({
      id: note._id,      // ✅ convert MongoDB _id to expected id
      title: note.title,
      body: note.body,
    });
    dis("block");
  };
  
  const fetchTasks = async () => {
    if (!id) {
      // Don't show error, just set empty notes for non-logged users
      setNotes([]);
      return;
    }

    try {
      const res = await api.get(`/getTask/${id}`);
      setNotes(res.data.list || []);
    } catch (err) {
      console.error("Fetch error:", err);
      
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message;
        
        if (status === 401) {
          toast.error("Please login again");
          localStorage.removeItem("token");
          localStorage.removeItem("id");
        } else if (status === 404) {
          toast.error("User not found");
        } else {
          toast.error(message || "Failed to fetch tasks");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
      setNotes([]);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [id]); //[submit]

  return (
    <>
      <div className="notes">
        <ToastContainer />
        <div className="notes-main container d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex flex-column notes-input-div w-100 p-1 mt-3 mx-lg-5">
            <input
              onClick={show}
              onChange={change}
              value={inputs.title}
              type="text"
              placeholder="Title"
              className="my-2 notes-input p-2"
              name="title"
            />
            <textarea
              onChange={change}
              value={inputs.body}
              id="textarea"
              placeholder="Body"
              className="notes-input p-2"
              name="body"
            />
          </div>
          <div className="d-flex justify-content-end w-lg-50 w-100 my-3 mx-lg-5">
            <button className="home-btn px-3 py-2" onClick={submit}>
              Add
            </button>
          </div>
        </div>

        <div className="notes-body">
          <div className="container-fluid">
            <div className="row">
              {notes.map((item, index) => (
                <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={index}>
                  <NoteCards
                     title={item.title}
                     body={item.body}
                     id={item._id}
                     delid={del}
                     display={dis}
                     updateId={index}        
                     toBeUpdate={update}                   
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="notes-update" id="notes-update">
        <div className="container d-flex justify-content-center mt-5">
          <Update display={dis} update={updateData} refresh={fetchTasks} />
        </div>
      </div>
    </>
  );
}

export default Notes;
