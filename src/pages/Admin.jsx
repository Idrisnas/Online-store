import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Base_url = "http://ecommerce.reworkstaging.name.ng/v2"; // Your base URL

const Admin = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    storeName: '',
    password: '',
    additionalInfo: '', 
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    storeName: '',
    password: '',
    additionalInfo: '',
  });

  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.firstName) {
      formErrors.firstName = 'First Name is required';
      isValid = false;
    }

    if (!formData.lastName) {
      formErrors.lastName = 'Last Name is required';
      isValid = false;
    }

    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.phone) {
      formErrors.phone = 'Phone Number is required';
      isValid = false;
    }

    if (!formData.storeName) {
      formErrors.storeName = 'Store Name is required';
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    }

    if (!formData.additionalInfo) {
      formErrors.additionalInfo = 'Additional Info is required';
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
  
    try {
      setLoading(true); 
      const response = await axios.post(`${Base_url}/merchants`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone, 
        store_name: formData.storeName,
        descp: formData.additionalInfo, 
        password: formData.password, 
      });
  
      console.log('Merchant created successfully:', response.data);
  
      // localStorage.setItem('merchantResponse', JSON.stringify(response.data));
  
      // localStorage.setItem('merchantData', JSON.stringify(formData));
  
      navigate('/signin'); 
    } catch (error) {
      console.error('Error creating merchant:', error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'An error occurred during registration');
      } else {
        alert('An unexpected error occurred');
      }
    } 
  };
  

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-50 py-16'>
      <form
        className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'
        onSubmit={handleSubmit}
      >
        <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>
          Admin Registration
        </h2>

        {/* First Name Input */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        {/* Last Name Input */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

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

        {/* Phone Input */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Store Name Input */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Store Name
          </label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.storeName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.storeName && <p className="text-red-500 text-sm mt-1">{errors.storeName}</p>}
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

        {/* Additional Info */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Additional Info
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.additionalInfo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[100px]`}
          ></textarea>
          {errors.additionalInfo && <p className="text-red-500 text-sm mt-1">{errors.additionalInfo}</p>}
        </div>

        {/* Sign-In Link */}
        <div className='text-center mb-4'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link to="/signin" className='text-green-500 font-semibold hover:underline'>
              Sign In
            </Link>
          </p>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className='w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Admin;
