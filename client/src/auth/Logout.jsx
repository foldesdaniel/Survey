/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import { logOut } from "../features/authSlice";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();

  dispatch(logOut());

  return <Navigate to="/" replace={true} />;
}

export default Logout;
