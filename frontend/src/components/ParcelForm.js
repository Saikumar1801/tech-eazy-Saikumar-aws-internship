import React, { useState } from 'react';
import { createParcel } from '../services/api';

const ParcelForm = ({ onParcelCreated }) => {
    const [customerName, setCustomerName] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!customerName || !deliveryAddress || !contactNumber) {
            setMessage('All fields are required.');
            return;
        }

        try {
            const newParcelData = { customerName, deliveryAddress, contactNumber };
            await createParcel(newParcelData);
            
            // Clear the form fields
            setCustomerName('');
            setDeliveryAddress('');
            setContactNumber('');
            setMessage('Parcel created successfully!');

            // Notify the parent component that a new parcel was created
            onParcelCreated();
        } catch (error) {
            console.error("Failed to create parcel:", error);
            setMessage('Error creating parcel. Please try again.');
        }
    };

    return (
        <div className="parcel-form">
            <h2>Create a New Parcel</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Customer Name: </label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Delivery Address: </label>
                    <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Contact Number: </label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                </div>
                <button type="submit">Create Parcel</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ParcelForm;