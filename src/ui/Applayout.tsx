import Navbar from "./nav/Navbar";
import { Outlet } from "react-router-dom";

export default function () {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
