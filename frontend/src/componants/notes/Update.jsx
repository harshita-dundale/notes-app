import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const Update = ({ display, update, refresh }) => {
  
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  // useEffect(() => {
  //   if (update?.title && update?.body) {
   
  //     setInputs({
  //       title: update.title,
  //       body: update.body,
  //     });
  //   }
  // }, [update]);

  useEffect(() => {
    console.log("🔁 update data:", update);
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
    //setInputs({ ...inputs, [name]: value });
  };

  const submit = async () =>{

    if (!update || !update.id) {
      toast.error("Update data is missing");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/v2/updateTask/${update.id}`, inputs)
      .then((res) => {console.log(res);
        if (refresh) refresh();
      })
      console.log(inputs);
      display("none");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed");
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
