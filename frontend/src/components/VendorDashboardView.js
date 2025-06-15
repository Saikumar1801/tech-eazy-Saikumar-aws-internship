import React, { useState, useEffect } from 'react';
import { getDeliveryOrders, uploadDeliveryOrderFile } from '../services/api';

const VendorDashboardView = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    // Function to fetch orders (we can re-use this to refresh the list)
    const fetchOrders = async () => {
        setLoading(true);
        try {
            // A vendor sees only their own orders, so no filters are needed.
            // The backend can figure out the vendor from the JWT.
            const response = await getDeliveryOrders({ page: 0, size: 10 });
            setOrders(response.data.content);
        } catch (error) {
            console.error("Failed to fetch your orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            await uploadDeliveryOrderFile(formData);
            alert("File uploaded successfully!");
            fetchOrders(); // Refresh the list after upload
            setSelectedFile(null);
            event.target.reset(); // Clear the file input
        } catch (error) {
            console.error("File upload failed:", error);
            alert("File upload failed!");
        }
    };

    return (
        <>
            <div className="card">
                <h3>Upload New Order File</h3>
                <form onSubmit={handleFileUpload}>
                    <input type="file" onChange={handleFileChange} required />
                    <button type="submit" disabled={!selectedFile}>Upload</button>
                </form>
            </div>
            <div className="card">
                <h3>My Recent Delivery Orders</h3>
                {loading ? <p>Loading...</p> : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Delivery Date</th>
                                <th>Total Orders in File</th>
                                <th>File Path on Server</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o => (
                                <tr key={o.id}>
                                    <td>{o.id}</td>
                                    <td>{o.orderDeliveryDate}</td>
                                    <td>{o.totalOrders}</td>
                                    <td>{o.fileLink}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default VendorDashboardView;