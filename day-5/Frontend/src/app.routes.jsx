import {createBrowserRouter} from "react-router-dom";
import Register from "./Features/auth/pages/register";
import Login from "./Features/auth/pages/login";

 export const router = createBrowserRouter([
  {
    path: "/",    
    element: <div>Home</div>,
  },
  { 
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);