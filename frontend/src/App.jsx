import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// import compenents and pages
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import Sessions from "./pages/Sessions";
import Navbar from "./components//Shared/Navbar";
import Footer from "./components/Shared/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Workouts from "./pages/Workouts";
import RecordSession from "./pages/RecordSession";
import Statistics from "./pages/Statistics";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/exercises",
        element: <Exercises />,
      },
      {
        path: "/workouts",
        element: <Workouts />,
      },
      {
        path: "/sessions",
        element: <Sessions />,
      },
      {
        path: "/record-session",
        element: <RecordSession />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}
