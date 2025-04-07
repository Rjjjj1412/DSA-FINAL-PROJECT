import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/RegisterForm.css";
import { auth, db } from "../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Patientreg = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    age: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate age on change
    if (name === "age") {
      validateAge(value);
    }
  };

  const validateAge = (value) => {
    let error = "";
    const ageNum = Number(value);
    
    if (isNaN(ageNum)) {
      error = "Age must be a number";
    } else if (ageNum <= 0) {
      error = "Age must be greater than 0";
    } else if (ageNum > 120) {
      error = "Please enter a valid age";
    }
    
    setErrors(prev => ({ ...prev, age: error }));
    return !error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAge(formData.age)) {
      return;
    }

    try {
      // Register user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Store patient data in Firestore (using UID as document ID)
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        role: "patient",  // Save user role for role-based redirection
      });

      alert("Patient registered successfully!");
      navigate("/login"); // Redirect to login page

    } catch (error) {
      console.error("Error registering user:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
      <div className="registration-container">
        <h2 className="registration-title">Patient Registration</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className={errors.age ? "is-invalid" : ""} required />
            {errors.age && (
              <div className="invalid-feedback">{errors.age}</div>
            )}
          </div>

          <button type="submit" className="btn btn-register" disabled={errors.age}>Register</button>
        </form>

        <div className="back-link">
          <Link to="/register">Back to Registration</Link>
        </div>
      </div>
    </div>
  );
};

export default Patientreg;
