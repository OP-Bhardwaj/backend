import React, { useState } from "react";
import "../style/register.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>

        <form>
          <FormGroup
            label="Name"
            placeholder="Enter your name"
            type="text"
          />

          <FormGroup
            label="Email"
            placeholder="Enter your email"
            type="email"
          />

          <FormGroup
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <FormGroup
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
          />

          <button className="button" type="submit">
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;