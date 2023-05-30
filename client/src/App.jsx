/* eslint-disable no-unused-vars */
import "./style/loading.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Surveys from "./Surveys/Surveys";
import Navbar from "./Navbar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { selectCurrentToken } from "./features/authSlice";
import { useSelector } from "react-redux";
import Logout from "./auth/Logout";
import Profile from "./pages/Profile";
import Mysurveys from "./pages/Mysurveys";
import Newsurvey from "./pages/Newsurvey";
import Answers from "./pages/Answers";
import Answer from "./pages/Answer";
import FillSurvey from "./pages/FillSurvey";

function App() {
  const token = useSelector(selectCurrentToken);

  if (token)
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Surveys />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/mysurveys" element={<Mysurveys />}></Route>
          <Route path="/newsurvey" element={<Newsurvey />}></Route>
          <Route path="/answers" element={<Answers />}></Route>
          <Route path="/answer" element={<Answer />}></Route>
          <Route path="/fillsurvey/:hash" element={<FillSurvey />}></Route>
        </Routes>
      </Router>
    );

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Surveys />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/survey/:hash" element={<Login toHash={true} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
