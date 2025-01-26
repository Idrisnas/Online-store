import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Base_url = "http://ecommerce.reworkstaging.name.ng/v2";

const AdminSignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form data
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`${Base_url}/merchants/login`, {
        email: formData.email,
        password: formData.password,
      });

      setFormData({ email: '', password: '' });

      localStorage.setItem('merchantResponse', JSON.stringify(response.data));
      console.log(response.data);
      
      navigate('/dashboard'); 
    } catch (error) {
      setErrors({
        general: 'Invalid email or password, please try again.',
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-50 py-16'>
      <form
        className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'
        onSubmit={handleSubmit}
      >
        <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>
          Admin Sign-In
        </h2>

        {/* Email Input */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* General error message */}
        {errors.general && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
            <p>{errors.general}</p>
          </div>
        )}

        {/* Redirect to Register page */}
        <div className='text-center mb-4'>
          <p className='text-sm text-gray-600'>
            Don't have an account?{' '}
            <Link to="/admin" className='text-green-500 font-semibold hover:underline'>
              Register
            </Link>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className='w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default AdminSignIn;
