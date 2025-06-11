import React, { useState, useEffect } from 'react';
import { getDeliveryOrders, uploadDeliveryOrderFile } from '../services/api';
const DashboardPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await getDeliveryOrders({ page: 0, size: 10 });
            setOrders(response.data.content);
        } catch (error) { console.error("Failed to fetch orders:", error); }
        finally { setLoading(false); }
    };
    useEffect(() => { fetchOrders(); }, []);
    const handleFileChange = (event) => { setSelectedFile(event.target.files[0]); };
    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (!selectedFile) { alert("Please select a file first!"); return; }
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            await uploadDeliveryOrderFile(formData);
            alert("File uploaded successfully!");
            fetchOrders(); // Refresh the list
            setSelectedFile(null);
            event.target.reset();
        } catch (error) { console.error("File upload failed:", error); alert("File upload failed!"); }
    };
    return (
        <div>
            <h1>Delivery Orders</h1>
            <div className="card">
                <h3>Upload New Order File</h3>
                <form onSubmit={handleFileUpload}>
                    <input type="file" onChange={handleFileChange} required />
                    <button type="submit" disabled={!selectedFile}>Upload</button>
                </form>
            </div>
            <div className="card">
                <h3>Recent Orders</h3>
                {loading ? <p>Loading...</p> : (
                    <table>
                        <thead><tr><th>ID</th><th>Vendor</th><th>Date</th><th>Total Orders</th></tr></thead>
                        <tbody>
                            {orders.map(o => (<tr key={o.id}><td>{o.id}</td><td>{o.vendor.vendorName}</td><td>{o.orderDeliveryDate}</td><td>{o.totalOrders}</td></tr>))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
export default DashboardPage;