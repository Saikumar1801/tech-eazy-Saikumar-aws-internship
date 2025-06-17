import React, { useState, useEffect } from 'react';
import { getAllParcels, deleteParcel, updateParcel } from '../services/api';

const ParcelList = ({ refreshKey, onListUpdated }) => {
    const [parcels, setParcels] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchParcels = async () => {
            try {
                const response = await getAllParcels();
                setParcels(response.data);
                setError('');
            } catch (err) {
                console.error("Error fetching parcels:", err);
                setError('Failed to load parcels. Is the backend server running?');
            }
        };

        fetchParcels();
    }, [refreshKey]);

    const handleDelete = async (trackingId) => {
        if (window.confirm('Are you sure you want to delete this parcel?')) {
            try {
                await deleteParcel(trackingId);
                onListUpdated();
            } catch (err) {
                console.error("Error deleting parcel:", err);
                alert("Failed to delete parcel.");
            }
        }
    };

    const handleEdit = async (parcel) => {
        const newAddress = window.prompt("Enter new delivery address:", parcel.deliveryAddress);
        if (newAddress && newAddress.trim() !== '') {
            const updatedData = {
                customerName: parcel.customerName,
                deliveryAddress: newAddress,
                contactNumber: parcel.contactNumber,
            };
            try {
                await updateParcel(parcel.trackingNumber, updatedData);
                onListUpdated();
            } catch (err) {
                console.error("Error updating parcel:", err);
                alert("Failed to update parcel.");
            }
        }
    };

    return (
        <div className="parcel-list">
            <h2>Existing Parcels</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {parcels.length === 0 && !error ? <p>No parcels found. Create one above!</p> : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Tracking Number</th>
                            <th style={tableHeaderStyle}>Customer Name</th>
                            <th style={tableHeaderStyle}>Delivery Address</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel) => (
                            <tr key={parcel.trackingNumber}>
                                <td style={tableCellStyle}>{parcel.trackingNumber}</td>
                                <td style={tableCellStyle}>{parcel.customerName}</td>
                                <td style={tableCellStyle}>{parcel.deliveryAddress}</td>
                                <td style={tableCellStyle}>
                                    <button onClick={() => handleEdit(parcel)} style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                                    <button onClick={() => handleDelete(parcel.trackingNumber)} style={{ cursor: 'pointer' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2'
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px'
};

export default ParcelList;