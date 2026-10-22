import {createBrowserRouter} from "react-router-dom";
import Register from "./Features/auth/pages/register";
import login from "./Features/auth/pages/login";

 export const router = createBrowserRouter([
  {
    path: "/",    
    element: <div>Home</div>,
  },
  { 
    path: "/login",
    element: <div>Login</div>,
  },
  {
    path: "/register",
    element: <div>Register</div>,
  },
]);