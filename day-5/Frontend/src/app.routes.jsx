import { createBrowserRouter } from "react-router-dom";
import Register from "./Features/auth/pages/register";
import Login from "./Features/auth/pages/login";
import Protected from "./Features/auth/components/Protected";
import Home from "./Features/home/pages/Home.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <Protected>
      <Home/>
      </Protected>
  )
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);