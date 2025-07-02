import React, { useEffect } from 'react';
import "./about.css";
import AOS from "aos";
import "aos/dist/aos.css";
//import teamIcon from "../../assets/images/team.png";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='about d-flex justify-content-center align-items-center py-5'>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 text-center">
            <h1 className="mb-4 about-title" data-aos="fade-up">About NotesApp</h1>
            <p className="text-justify" data-aos="fade-right">
              Welcome to <strong>NotesApp</strong> — your go-to digital notebook that helps you stay organized, focused, and productive. Whether you're managing daily tasks, writing ideas, or planning projects, our app gives you the tools to simplify your workflow.
            </p>
            <p className="text-justify mt-3" data-aos="fade-left">
              Our goal is to make note-taking simple, elegant, and accessible. With seamless syncing, intuitive design, and a distraction-free interface, you can focus on what matters most — your thoughts and productivity.
            </p>
            <div className="mt-4" data-aos="zoom-in">
              <h5 className="fw-bold">✨ Key Highlights:</h5>
              <ul className="list-unstyled mt-2 text-start">
                <li>✔️ Minimal and responsive design</li>
                <li>✔️ Secure and private notes</li>
                <li>✔️ Light/Dark mode support</li>
                <li>✔️ Easy to use — no setup needed</li>
              </ul>
            </div>

            {/* Team Section */}
            {/* <div className="team-section mt-5" data-aos="fade-up">
              <h5 className="fw-bold">👨‍💻 Meet Our Team</h5>
              <p className="text-justify mt-2">
                We are a passionate team of developers and designers focused on building intuitive, secure, and modern digital tools. Our mission is to empower individuals and teams to stay organized, motivated, and efficient.
              </p>
              {/* <img
                src={teamIcon}
                alt="Team Illustration"
                className="img-fluid my-3"
                style={{ maxHeight: "220px" }}
              /> 
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
