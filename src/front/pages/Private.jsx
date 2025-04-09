// Import necessary components from react-router-dom and other parts of the application.
import { useNavigate } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect } from "react";

export const Private = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer()
    useEffect(()=>{
        if(!sessionStorage.getItem("token")){
            navigate("/login")
        }
    })
  return (
    <div>
        <h1>private</h1>
    </div>
  );
};
