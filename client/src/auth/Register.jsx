/* eslint-disable no-unused-vars */
import ".././style/form.css";
import ".././style/button.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useRegisterUserMutation } from "../features/api/apiSlice";
import { useState } from "react";

function Register() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    setSuccess(false);

    if (name === "" || email === "" || password === "") return;

    e.preventDefault();
    try {
      await registerUser({
        email: email,
        password: password,
        fullname: name,
      });
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <div className="loading">LOADING...</div>;

  return (
    <div>
      <Form className="form">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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
            Register
          </Button>
        </div>
      </Form>
      <div style={{ textAlign: "center", marginTop: "40px", color: "green" }}>
        {success && "Successfully registered!"}
      </div>
    </div>
  );
}

export default Register;
