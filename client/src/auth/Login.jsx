/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ".././style/form.css";
import ".././style/button.css";
import ".././style/loading.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useLoginUserMutation } from "../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";

function Login(props) {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser({
        email: email,
        password: password,
        strategy: "local",
      }).unwrap();
      dispatch(setCredentials({ ...userData }));
      if (!props.toHash) navigate("/");
      else {
        const hash = window.location.href.substring(
          window.location.href.lastIndexOf("/") + 1
        );
        navigate("/fillsurvey/" + hash);
      }
    } catch (err) {
      setError("Invalid email or password!");
    }
  };

  if (isLoading) return <div className="loading">LOADING...</div>;

  return (
    <div>
      <Form className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div style={{ textAlign: "center" }}>
          <Button
            className="register-button"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      </Form>
      <div style={{ textAlign: "center", marginTop: "40px", color: "#FFA500" }}>
        {props.toHash && <p>Login to fill out survey!</p>}
      </div>
      <div style={{ textAlign: "center", marginTop: "40px", color: "red" }}>
        {error}
      </div>
    </div>
  );
}

Login.defaultProps = {
  toHash: false,
};

export default Login;
