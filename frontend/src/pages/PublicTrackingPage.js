import React, { useState } from 'react';
import { getPublicParcelByTrackingId } from '../services/api';

const PublicTrackingPage = () => {
    const [trackingId, setTrackingId] = useState('');
    const [parcel, setParcel] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!trackingId) {
            setError('Please enter a tracking number.');
            return;
        }
        setLoading(true);
        setError('');
        setParcel(null);
        try {
            const response = await getPublicParcelByTrackingId(trackingId.trim());
            setParcel(response.data);
        } catch (err) {
            setError('Parcel not found. Please check the tracking number and try again.');
            console.error("Tracking search failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Track Your Parcel</h2>
            <p>Enter your tracking number below to see the status of your parcel.</p>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={trackingId}
                    onChange={e => setTrackingId(e.target.value)}
                    placeholder="Enter Tracking Number"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Track'}
                </button>
            </form>

            {error && <p className="error" style={{ marginTop: '1rem' }}>{error}</p>}

            {parcel && (
                <div className="card" style={{ marginTop: '2rem' }}>
                    <h3>Parcel Details</h3>
                    <p><strong>Tracking Number:</strong> {parcel.trackingNumber}</p>
                    <p><strong>Customer Name:</strong> {parcel.customerName}</p>
                    <p><strong>Delivery Address:</strong> {parcel.deliveryAddress}</p>
                    <p><strong>Status:</strong> In Transit (Example Status)</p>
                </div>
            )}
        </div>
    );
};

export default PublicTrackingPage;