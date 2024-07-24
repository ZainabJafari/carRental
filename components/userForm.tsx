'use client';

import React, { useState } from 'react';
import { useUserContext } from '@/context/userContext';
import Modal from '@/components/Modal';

const UserForm: React.FC = () => {
  const { name, email, phone, payment_method, setName, setEmail, setPhone, setPaymentMethod, submitUser } = useUserContext();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitUser();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Payment Method</label>
          <select
            value={payment_method}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select payment method</option>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="swish">Swish</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Terms and Conditions</label>
          <p className="text-blue-600 cursor-pointer" onClick={() => setShowTermsModal(true)}>Read More</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Insurance Offer</label>
          <p className="text-blue-600 cursor-pointer" onClick={() => setShowInsuranceModal(true)}>Read More</p>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Submit
        </button>
      </form>

      <Modal show={showTermsModal} onClose={() => setShowTermsModal(false)} title="Terms and Conditions">
        <p>Here are the terms and conditions of the car rental service...</p>
        <p>...</p>
      </Modal>

      <Modal show={showInsuranceModal} onClose={() => setShowInsuranceModal(false)} title="Insurance Offer">
        <p>Here are the details of the insurance offer...</p>
        <p>...</p>
      </Modal>
    </>
  );
};

export default UserForm;
