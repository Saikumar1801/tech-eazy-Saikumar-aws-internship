import React, { useState, useEffect } from 'react';
import { getParcels, createParcel, updateParcel, deleteParcel } from '../services/api';

const initialFormState = { customerName: '', deliveryAddress: '', contactNumber: '' };

const ParcelsPage = () => {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(initialFormState);
    const [editingId, setEditingId] = useState(null); // Will hold the ID of the parcel being edited

    const fetchParcels = async () => {
        setLoading(true);
        try {
            const response = await getParcels();
            setParcels(response.data);
        } catch (error) { console.error("Failed to fetch parcels:", error); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchParcels(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleEditClick = (parcel) => {
        setEditingId(parcel.id);
        setFormData({
            customerName: parcel.customerName,
            deliveryAddress: parcel.deliveryAddress,
            contactNumber: parcel.contactNumber,
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData(initialFormState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // We are in edit mode
                await updateParcel(editingId, formData);
                alert("Parcel updated successfully!");
            } else {
                // We are in create mode
                await createParcel(formData);
                alert("Parcel created successfully!");
            }
            handleCancelEdit(); // Reset form and editing state
            fetchParcels();     // Refresh the list
        } catch (error) {
            console.error("Failed to save parcel:", error);
            alert("Failed to save parcel.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this parcel?")) {
            try {
                await deleteParcel(id);
                alert("Parcel deleted!");
                fetchParcels();
            } catch (error) {
                console.error("Failed to delete parcel:", error);
                alert("Failed to delete parcel.");
            }
        }
    };

    return (
        <div>
            <h1>Parcel Management</h1>
            <div className="card">
                <h3>{editingId ? 'Edit Parcel' : 'Create New Parcel'}</h3>
                <form onSubmit={handleSubmit}>
                    <input name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Customer Name" required />
                    <input name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} placeholder="Delivery Address" required />
                    <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
                    <button type="submit">{editingId ? 'Update Parcel' : 'Create Parcel'}</button>
                    {editingId && <button type="button" onClick={handleCancelEdit} style={{marginLeft: '10px', background: '#6c757d'}}>Cancel</button>}
                </form>
            </div>
            <div className="card">
                <h3>Existing Parcels</h3>
                {loading ? <p>Loading...</p> : (
                    <table>
                        <thead>
                            <tr>
                                <th>Tracking #</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map(p => (
                                <tr key={p.id}>
                                    <td>{p.trackingNumber}</td>
                                    <td>{p.customerName}</td>
                                    <td>{p.deliveryAddress}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(p)} style={{marginRight: '5px'}}>Edit</button>
                                        <button onClick={() => handleDelete(p.id)} className="btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ParcelsPage;