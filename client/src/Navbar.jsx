/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.css";
import "./style/container.css";
import "./style/font.css";
import "./style/nav.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import { selectCurrentToken } from "./features/authSlice";
import { useSelector } from "react-redux";

function Navbar() {
  const token = useSelector(selectCurrentToken);

  //logged in
  if (token)
    return (
      <Container fluid className="container">
        <Row className="nav-row">
          <Col className="nav-col" md={{ offset: 7, span: 1 }}>
            <NavLink to="/" className="navlink">
              {({ isActive }) => (
                <p className={isActive ? "nav-link active" : "nav-link"}>
                  Surveys
                </p>
              )}
            </NavLink>
          </Col>
          <Col className="nav-col" md={{ span: 1 }}>
            <NavLink to="/mysurveys" className="navlink">
              {({ isActive }) => (
                <p className={isActive ? "nav-link active" : "nav-link"}>
                  My surveys
                </p>
              )}
            </NavLink>
          </Col>
          <Col className="nav-col" md={{ span: 1 }}>
            <NavLink to="/answers" className="navlink">
              {({ isActive }) => (
                <p className={isActive ? "nav-link active" : "nav-link"}>
                  Answers
                </p>
              )}
            </NavLink>
          </Col>
          <Col className="nav-col" md={{ span: 1 }}>
            <NavLink to="/profile" className="navlink">
              {({ isActive }) => (
                <p className={isActive ? "nav-link active" : "nav-link"}>
                  Profile
                </p>
              )}
            </NavLink>
          </Col>
          <Col className="nav-col" md={{ span: 1 }}>
            <NavLink to="/logout" className="navlink">
              {({ isActive }) => (
                <p className={isActive ? "nav-link active" : "nav-link"}>
                  Logout
                </p>
              )}
            </NavLink>
          </Col>
        </Row>
      </Container>
    );

  //not logged in
  return (
    <Container fluid className="container">
      <Row className="nav-row">
        <Col className="nav-col" md={{ offset: 9, span: 1 }}>
          <NavLink to="/" className="navlink">
            {({ isActive }) => (
              <p className={isActive ? "nav-link active" : "nav-link"}>
                Surveys
              </p>
            )}
          </NavLink>
        </Col>
        <Col className="nav-col" md={{ span: 1 }}>
          <NavLink to="/register" className="navlink">
            {({ isActive }) => (
              <p className={isActive ? "nav-link active" : "nav-link"}>
                Register
              </p>
            )}
          </NavLink>
        </Col>
        <Col className="nav-col" md={{ span: 1 }}>
          <NavLink to="/login" className="navlink">
            {({ isActive }) => (
              <p className={isActive ? "nav-link active" : "nav-link"}>Login</p>
            )}
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
}

export default Navbar;
