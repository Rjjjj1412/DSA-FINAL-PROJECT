import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserMd, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-container">
  <div className="register-card">
    <h2 className="register-title">Sign Up</h2>
    <p className="register-subtitle">Choose your role to continue</p>

        <div className="d-grid gap-3">
          <button 
            className="role-btn btn-patient"
            onClick={() => navigate('/register/patient')}
          >
            <FaUser className="me-2" size={20} /> Register as Patient
          </button>

          <button 
            className="role-btn btn-doctor"
            onClick={() => navigate('/register/doctor')}
          >
            <FaUserMd className="me-2" size={20} /> Register as Doctor
          </button>
        </div>
        <div className="back-link">
          <Link to="/login">Back to Log-In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
