import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "./Form.css";

const LOGIN_ENDPOINT = "http://localhost:8080/api/auth/signin";

const FormLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setStatus(""); // Reset status
    event.preventDefault();
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    let resp = null;
    let user_role = null;
    try {
        resp = await axios.post(LOGIN_ENDPOINT, formData, {
            headers: {
            "content-type": "application/json",
            },
        });

        user_role = resp.data.roles;

    }catch( e ){
        // todo: fail login
        console.error(e); //can be removed
    };
    setStatus(resp.status === 200 ? "Thank you!" : "Error.");
    if (resp.status === 200) {
        // todo: success login
        // todo: update context to logged in

        if (user_role === "[ROLE_MEMBER]"){
          navigate("#member_home");
        }
        else if (user_role === "[ROLE_VOLUNTEER]"){
          navigate("#volunteer_home");
        }
        else if (user_role === "[ROLE_CAREGIVER]"){
          navigate("#caregiver_home");
        }
        else if (user_role === "[ROLE_RIDER]"){
          navigate("#rider_home");
        }
        else if (user_role === "[ROLE_ADMIN]"){
          navigate("#admin_home");
        }
        else if (user_role === "[ROLE_PARTNER]"){
          navigate("#partner_home");
        }
        
    }
  };

  return (
    <div className="container col-12 col-sm-8 col-lg-6 d-flex justify-content-center">
      <div className="card m-5 card-donate ">
        <Form onSubmit={handleSubmit} className="p-3 text-white text-center">
          <div className="text-center py-3">
            <h3 className="contact-title mx-3 text-white">LOGIN</h3>
            <hr className="text-white" />
          </div>
          <Form.Group className="mb-3 mx-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3 mx-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="" />
          </Form.Group>
          <div className="text-center mb-2 d-grid mx-3 pt-3">
            <Button type="submit" className="button fw-bold" size="lg">
              Login
            </Button>
          </div>
          <div className="text-center mt-3 p-3">
            <span>Don't have an account?</span>
            <Link to="/register" className="ms-2 text-white">
              Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormLogin;
