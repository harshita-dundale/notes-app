import React, { useEffect, useState } from "react";
import "./notes.css";
import NoteCards from "./NoteCards";
import { ToastContainer, toast } from "react-toastify";
import { Update } from "./Update";
import axios from "axios";

function Notes() {
  let id = sessionStorage.getItem("id");
  //console.log("User ID from sessionStorage:", id);
  const [updateData, setUpdateData] = useState(null);
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [notes, setNotes] = useState([]);

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
    } else {
      if (id) {
        try {
          const res = await axios.post("http://localhost:5000/api/v2/addTask", {
            title: inputs.title,
            body: inputs.body,
            id: id,
          });
          setNotes((prevNotes) => [...prevNotes, res.data.list]);

          setInputs({ title: "", body: "" });
          toast.success("Your Task is Added");
        } catch (err) {
          console.error("Add task error:", err);
          toast.error("Failed to add task");
        }
      } else {
        toast.error("Please log in or sign up to add tasks.");
        alert("Please log in or sign up to add tasks.")
      }
    }
  };

  const del = async (cardId) => {
    if (id) {
      try {
        await axios.delete(`http://localhost:5000/api/v2/deletTask/${cardId}`, {
          data: { userId: id },
        });

        // ✅ Update local notes state after deletion
        const updatedNotes = notes.filter((note) => note._id !== cardId);
        setNotes(updatedNotes);

        toast.success("Your Task is Deleted");
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete task");
      }
    } else {
      toast.error("Please Sign up first!");
    }
  };

  const dis = (value) => {
    console.log(value);
    document.getElementById("notes-update").style.display = value;
  };

  // const update = (value) => {
  //   setUpdateData(notes[value]);
  //   dis("block");
  // };  

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
    if (id) {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v2/getTask/${id}`
        );
        setNotes(res.data.list || []); // use correct field
      } catch (err) {
        console.log("Fetch error", err);
        setNotes([]);
      }
    }
    else{
    toast.error("Please Sign up first!");
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
        <div className="container update">
          <Update display={dis} update={updateData} refresh={fetchTasks} />
        </div>
      </div>
    </>
  );
}

export default Notes;
