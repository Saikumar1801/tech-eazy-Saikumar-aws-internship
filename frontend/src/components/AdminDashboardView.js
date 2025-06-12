import React, { useState, useEffect } from 'react';
import { getDeliveryOrders } from '../services/api';

const AdminDashboardView = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    // Add state for filters if needed later
    // const [filters, setFilters] = useState({ vendorId: '', date: '' });

    useEffect(() => {
        const fetchAllOrders = async () => {
            setLoading(true);
            try {
                // Admin fetches all orders without specific filters initially
                const response = await getDeliveryOrders({ page: 0, size: 20 });
                setOrders(response.data.content);
            } catch (error) {
                console.error("Failed to fetch all orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllOrders();
    }, []);

    return (
        <div className="card">
            <h3>All Delivery Orders (Admin View)</h3>
            {/* Add filter inputs here in the future */}
            {loading ? <p>Loading all orders...</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vendor Name</th>
                            <th>Delivery Date</th>
                            <th>Total Orders in File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>{o.vendor.vendorName}</td>
                                <td>{o.orderDeliveryDate}</td>
                                <td>{o.totalOrders}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboardView;