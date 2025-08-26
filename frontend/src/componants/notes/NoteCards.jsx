import React from "react";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

function NoteCards({ title, body, id , delid, display, toBeUpdate, updateId}) {
  return (
    <div className="p-3 note-cards">
      <div className="card-p">
        <h5>{title}</h5>
        <p>{body}</p>
      </div>
      <div className="d-flex justify-content-around ">
      <div className="d-flex justify-content-center align-items-center card-icon-head p-1" onClick={() => {display("block") 
       toBeUpdate(updateId); 
      }}>
        <GrDocumentUpdate className="card-icon"/> Update
      </div>
        <div className="d-flex justify-content-center align-items-center card-icon-head p-1 text-danger" onClick={() => {delid(id)}}>
          <MdDelete className="card-icon del" /> Delete
        </div>
      </div>
    </div>
  );
}

export default NoteCards;
