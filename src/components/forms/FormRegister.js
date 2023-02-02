import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { bannerportairt1 } from "../../assets";
import { motion } from "framer-motion";

import './Form.css';

const UPLOAD_ENDPOINT = "http://localhost:8080/api/auth/signup";

const FormRegister = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState('MALE');
    const [role, setRole] = useState('ROLE_MEMBER');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");

    const handleSubmit = async (event) => {
        setStatus(""); // Reset status
        event.preventDefault();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("address", address);
        formData.append("gender", gender);
        formData.append("role", role);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("file", file);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        const resp = await axios.post(UPLOAD_ENDPOINT, formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        setStatus(resp.status === 200 ? "Thank you!" : "Error.");
    };

    return (

        <div className="container d-flex justify-content-center">
            <div className="col-xxl-8 px-4 py-5">
                <div className="card row flex-lg-row-reverse  py-5" bis_skin_checked="1">
                    <h3 className="contact-title mx-3 text-white text-center">REGISTER</h3>
                    <hr className="text-white" />
                    <div className="col-10 col-sm-8 col-lg-6 img-center" bis_skin_checked="1">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            src={bannerportairt1} className="rounded img-register mb-3 pe-3" alt="Bootstrap Themes" loading="lazy" />
                    </div>
                    <div className="col-lg-6 text-center" bis_skin_checked="1">
                        <Form className="p-3 text-white text-center" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 mx-3" controlId="name">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name} />
                            </Form.Group>
                            <Form.Group className="mb-3 mx-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" onChange={(e) => setAddress(e.target.value)} value={address} required />
                            </Form.Group>
                            <Form.Group className="mb-3 mx-3 text" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => setGender(e.target.value)} value={gender} required>
                                    <option disabled>Choose a gender</option>
                                    <option defaultValue={true} value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 mx-3" controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => { setRole(e.target.value); console.log(role + e.target.value) }} value={role} required>
                                    <option disabled>Choose a role</option>
                                    <option defaultValue={true} value="ROLE_MEMBER">Member</option>
                                    <option value="ROLE_RIDER">Rider</option>
                                    <option value="ROLE_CAREGIVER">Caregiver</option>
                                    <option value="ROLE_VOLUNTEER">Volunteer</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 mx-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="" onChange={(e) => setEmail(e.target.value)} value={email} required />
                            </Form.Group>
                            <Form.Group className="mb-3 mx-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="" onChange={(e) => setPassword(e.target.value)} value={password} required />
                            </Form.Group>
                            <Form.Group className="mb-3 mx-3" controlId="file">
                                <Form.Label>File Upload</Form.Label>
                                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </Form.Group>

                            <div className="text-center mb-2 d-grid mx-3 pt-3">
                                <Button type="submit" className="button fw-bold" size="lg">Register</Button>
                            </div>

                            <div className="text-center mt-3 p-3">
                                <span>Already have an account?</span>
                                <Link
                                    to="/login"
                                    className="ms-2 text-white"
                                >
                                    Login
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default FormRegister;