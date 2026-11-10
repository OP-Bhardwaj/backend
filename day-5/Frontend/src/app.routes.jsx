import { createBrowserRouter } from "react-router-dom";
import Register from "./Features/auth/pages/register";
import Login from "./Features/auth/pages/login";
import Protected from "./Features/auth/components/Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <Protected>
      <h1>Home</h1>
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
])