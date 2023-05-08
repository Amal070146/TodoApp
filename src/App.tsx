import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomePage from "./Todo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
