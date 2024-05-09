import React, { useState } from "react";
import registerImage from "../images/file.png";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'guest',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
  return (
    <div>
      <div>
        <div className="registeration-section">
          <div className="container grid grid-cols-2 bg-slate-600">
            <div className="registration-image">
              <img src={registerImage} alt="" width="500" height="500" />
            </div>
            <div className="registration-form p-5">
              <h1 className="font-bold mb-3">Registration Form</h1>
              <form
              >
                <div>
                  <label htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    
                  />
                </div>
                <div>
                  <label htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
