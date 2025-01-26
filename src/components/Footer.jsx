import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-6 mt-40 ">
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400 text-sm">
            We are a leading company providing top-notch services and products. Our mission is to deliver value to our customers.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="text-gray-400">
            <li>Email: support@company.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Main Street, City, Country</li>
          </ul>
        </div>

       

      </div>

      <div className="mt-8 border-t border-gray-600 pt-4 text-center text-gray-400">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  </div>
);
  
}

export default Footer
