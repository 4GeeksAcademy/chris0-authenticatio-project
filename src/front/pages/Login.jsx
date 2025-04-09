import React, { useState } from "react";
//import { Context } from "../store/appContext";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useNavigate } from "react-router-dom";


export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("password:", password);


    const res = await fetch(`${backendUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      sessionStorage.setItem("token", data.access_token);
      navigate("/");
    } else {
      alert("Invalid credentials.");
    }
  //   actions.login(email, password)
  //     .then((data) => {
  //       if (data?.token) {
  //         alert("Login successful");
  //         sessionStorage.setItem("token", data.token);
  //         navigate("/private");  // Corrected from Navigate to navigate function
  //       } else {
  //         alert("Invalid login credentials. Please try again.");
  //       }
  //     })
  //     .catch((error) => console.error("Login failed:", error));
   };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
