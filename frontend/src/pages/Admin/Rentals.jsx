import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import StatusCard from "../../components/Admin/StatusCard";
import Status from "../../components/Admin/Status";
import RentalStatusButtons from "../../components/Admin/RentalStatusButtons"

export default function Rentals() {
    const [rentals, setrentals] = useState([]);
    const [status, setStatus] = useState('all')
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleterentalId, setDeleterentalId] = useState(null);
    const [deleterentalName, setDeleterentalName] = useState('');
    const [stats, setStats] = useState({});


    function calcDuration(rentalDate, returnDate) {
        if (!rentalDate || !returnDate) return '-';
        const start = new Date(rentalDate);
        const end = new Date(returnDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + (diffDays > 1 ? ' days' : ' day');
    }


    useEffect(() => {
        axios.get('http://localhost:8080/rental/details')
            .then(res => setrentals(res.data))
            .catch(err => console.error("Error fetching rentals:", err));
    }, []);

    const openModal = (id, fullname) => {
        setDeleterentalId(id);
        setDeleterentalName(fullname);
        setShowModal(true);
    };

    const closeModal = () => {
        setDeleterentalId(null);
        setDeleterentalName('');
        setShowModal(false);
    };

    useEffect(() => {
        axios.get("http://localhost:8080/rental/stats")
            .then(res => setStats(res.data))
            .catch(err => console.error("Failed to fetch stats:", err));
    }, []);


    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="text-light">
                        <h3 style={{ fontWeight: '700' }}>Rental Management</h3>
                        <p style={{ color: "#736F75" }}>Track and manage all rental activities</p>
                    </div>
                </div>

                <div className="mt-5 d-flex justify-content-between row">
                    <div className="searchinput col-md-10"><input type="text" placeholder="Search rentals..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>

                    <div className="col-md-2">
                        <select
                            className="formSelect text-white px-3"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)} >
                            <option value="all">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">In process</option>
                            <option value="Cencelled">Cencelled</option>
                        </select>
                    </div>
                </div>


                <div className="row mt-5 container">
                    <div className="col-md-3 mb-4">
                        <StatusCard
                            title="Active Rentals"
                            count={stats.activeRentals || 0}
                            status="Active"
                        />
                    </div>
                    <div className="col-md-3 mb-4">
                        <StatusCard
                            title="Completed"
                            count={stats.completedRentals || 0}
                            status="Completed"
                        />
                    </div>
                    <div className="col-md-3 mb-4">
                        <StatusCard
                            title="In process"
                            count={stats.inProcessRentals || 0}
                            status="Pending"
                        />
                    </div>

                    <div className="col-md-3 mb-4">
                        <StatusCard
                            title="Total Revenue"
                            count={`${stats.totalRevenue || 0} Dh`}
                            status="Completed"
                        />
                    </div>


                </div>




                <table className="table  overflow-hidden  mt-5">
                    <thead>
                        <tr>
                            <th>Rental ID</th>
                            <th>Customer</th>
                            <th>Vehicle</th>
                            <th>Duration</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals
                            .filter(rental =>
                                (status === "all" || (rental.status && rental.status.toLowerCase() === status.toLowerCase())) &&
                                rental.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
                            ).length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center text-white">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                                        alt="Not found"
                                        width="80"
                                        height="80"
                                        style={{ opacity: 0.6 }}
                                    />
                                    <div className="mt-2">
                                        {
                                            searchTerm.trim() !== '' ? (
                                                <>No customer found matching: <span style={{ color: "#FF9F43" }}>"{searchTerm}"</span></>
                                            ) : (
                                                <>No customers available for status: <span style={{ color: "#FF9F43" }}>"{status}"</span></>
                                            )
                                        }
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rentals
                                .filter(rental =>
                                    (status === "all" || (rental.status && rental.status.toLowerCase() === status.toLowerCase())) &&
                                    rental.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
                                )


                                .map(rental => (
                                    <tr key={rental.rental_id}>
                                        <td>
                                            <div>{rental.rental_id}</div>

                                        </td>
                                        <td>
                                            <div> {rental.customer_name}</div>

                                        </td>
                                        <td>
                                            <div>{rental.vehicle_brand} {rental.vehicle_model}</div>

                                        </td>
                                        <td>
                                            <div>{calcDuration(rental.rental_date, rental.return_date)}</div>

                                        </td>
                                        <td>{rental.amount} Dh</td>
                                        <td ><Status bgstatus={rental.status} typestatus={rental.status} mode="table" /></td>
                                        <td>
                                            <RentalStatusButtons
                                                rentalId={rental.rental_id}
                                                currentStatus={rental.status}
                                                onStatusChange={(newStatus) => {
                                                    setrentals(prev => prev.map(r => r.rental_id === rental.rental_id ? { ...r, status: newStatus } : r));
                                                }}
                                            />

                                        </td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>



            </div>



            {showModal && (
                <div className="modal show fade d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Voulez-vous vraiment supprimer <strong>{deleterentalName}</strong> ?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                                <button className="btn btn-danger" onClick={confirmDelete}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    )
}