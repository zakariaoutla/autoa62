import { FaTimes, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';

export default function RentalStatusButtons({ rentalId, currentStatus, onStatusChange }) {
    const [loading, setLoading] = useState(false);

    const updateStatus = (newStatus) => {
        setLoading(true);
        axios.patch(`http://localhost:8080/rental/rentals/${rentalId}/status`, { status: newStatus })
            .then(() => {
                onStatusChange(newStatus);
            })
            .catch(err => {
                alert("Error updating status");
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    if (currentStatus.toLowerCase() !== 'pending') {
        return null; 
    }

    return (
        <>
            <button
                className="btn3 view-btn me-2 text-danger"
                disabled={loading}
                onClick={() => updateStatus('cancelled')}
                title="Cancel Rental"
            >
                <FaTimes />
            </button>

            <button
                className="btn3 edit-btn me-2 text-success"
                disabled={loading}
                onClick={() => updateStatus('active')}
                title="Activate Rental"
            >
                <FaCheck />
            </button>
        </>
    );
}
