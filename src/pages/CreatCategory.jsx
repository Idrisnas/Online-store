import React, { useState } from 'react';
import axios from 'axios';

const Base_url = "http://ecommerce.reworkstaging.name.ng/v2";

const CreateCategory = ({ merchantId }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const createCategory = async () => {
    if (!categoryName ) {
      alert('Please fill in all fields.');
      return;
    }

    const categoryData = {
      merchant_id: merchantId,  // Use merchantId passed from AdminDashboard
      name: categoryName,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${Base_url}/categories`, categoryData);
      console.log('Category created:', response.data);
      setResponseMessage('Category created successfully!');
      // Optionally reset the form after success
      setCategoryName('');
    } catch (error) {
      console.error('Error creating category:', error);
      setResponseMessage('Failed to create category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Category</h2>
      {responseMessage && <p>{responseMessage}</p>}
      <div>
        <label>
          Category Name:
          <input 
            type="text" 
            value={categoryName} 
            onChange={(e) => setCategoryName(e.target.value)} 
            placeholder="Enter category name"
          />
        </label>
      </div>
    
      <button onClick={createCategory} disabled={loading}>
        {loading ? 'Creating Category...' : 'Create Category'}
      </button>
    </div>
  );
};

export default CreateCategory;
