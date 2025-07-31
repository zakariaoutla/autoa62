import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { FiPhone } from "react-icons/fi";
import { MdFeedback } from "react-icons/md"
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ReviewForm from "../../components/Home/ReviewForm";
export default function Userdashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [pendingRentals, setPendingRentals] = useState([]);
    const [historyRentals, setHistoryRentals] = useState([]);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [rentalToCancel, setRentalToCancel] = useState(null);

    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedRental, setSelectedRental] = useState(null);


    const fetchRentalHistory = () => {
        if (!user) return;
        axios
            .get(`http://localhost:8080/rental/${user.id}/history`)
            .then((res) => setHistoryRentals(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const decoded = jwt_decode(token);
        const userId = decoded.userId || decoded.id;


        axios
            .get(`http://localhost:8080/user/users/${userId}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch(console.error);


        axios
            .get(`http://localhost:8080/rental/rental/${userId}/pending`)
            .then((res) => setPendingRentals(res.data))
            .catch(console.error);


        axios
            .get(`http://localhost:8080/rental/${userId}/history`)
            .then((res) => setHistoryRentals(res.data))
            .catch(console.error);
    }, []);

    const confirmCancel = (rentalId) => {
        setRentalToCancel(rentalId);
        setShowCancelModal(true);
    };

    const handleConfirmCancel = () => {
        if (!rentalToCancel) return;
        axios
            .put(`http://localhost:8080/rental/cancel/${rentalToCancel}`)
            .then(() => {
                setPendingRentals((prev) => prev.filter((r) => r.id !== rentalToCancel));
                setShowCancelModal(false);
                setRentalToCancel(null);
            })
            .catch(console.error);
    };

    const openFeedbackModal = (rental) => {
        setSelectedRental(rental);
        setShowFeedbackModal(true);
    };

    const closeFeedbackModal = () => {
        setShowFeedbackModal(false);
        setSelectedRental(null);
    };

    const handleContact = () => {
        navigate("/contact-us");
    };

    return (
        <div className="bg-light" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
            <div className="container">
                <div className="row mt-5 py-3">
                    <div className="col-md-12 dashboard-header mt-5 py-3 px-4">
                        <div className="header-content">
                            <div className="d-flex align-items-center gap-4">
                                <div className="avatar">
                                    <span className="icon-user">
                                        <FaRegUser />
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-light mt-3">Good evening, {user?.fullname || "Guest"}!</h2>
                                    <p className="date text-light">Membre</p>
                                </div>
                            </div>
                        </div>
                        <div className="alert alert-warning mt-3" style={{ border: "none" }}>
                            <span className="info-icon">ℹ️</span> You have active booking. Don't forget to return your vehicle on time!
                        </div>
                    </div>
                </div>

                <div className="row mt-3 gap-5">
                    <div className="col-md-7 col-lg-7 mb-5">
                        <div className="main-content">
                            {/* Pending Rentals */}
                            {pendingRentals
                                .filter((rental) => rental.status === "pending" || rental.status === "active")
                                .map((rental) => (
                                    <div className="row mb-4 bg-white p-4 shadow rounded-4" key={rental.id}>
                                        <div className="col-md-12 d-flex align-items-center justify-content-between gap-3 mb-4">
                                            <h4 className="mt-3">Current reservation</h4>
                                            <span className="badge text-bg-success">{rental.status}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <img
                                                src={`http://localhost:8080/uploads/${rental.filename}`}
                                                alt={rental.brand}
                                                className="img-fluid mb-3 rounded-4"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex gap-5">
                                                <div>
                                                    <h6 className="text-secondary">Recovery</h6>
                                                    {new Date(rental.rental_date).toLocaleDateString()}
                                                </div>
                                                <div>
                                                    <h6 className="text-secondary">Retour</h6>
                                                    {new Date(rental.return_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="mt-2 d-flex align-items-center gap-2">
                                                <SiGooglemaps size={30} className="text-secondary" />
                                                <p className="mt-3">Aéroport Charles de Gaulle Terminal 2E, 95700 Roissy-en-France</p>
                                            </div>
                                            <div className="mt-2 d-flex align-items-center gap-2">
                                                <FiPhone size={20} className="text-secondary" />
                                                {user?.phone || "N/A"}
                                            </div>
                                            <hr className="mt-5" />
                                            <div className="d-flex justify-content-between">
                                                <h6>Total</h6>
                                                {rental.total_amount} MAD
                                            </div>
                                        </div>
                                        <div className="col-md-12 d-flex justify-content-between">
                                            <div>
                                                <h2>
                                                    {rental.brand} {rental.model}
                                                </h2>
                                            </div>
                                            {rental.status === "pending" && (
                                                <button className="btn btn-danger" onClick={() => confirmCancel(rental.id)}>
                                                    Cancel
                                                </button>
                                            )}
                                            {rental.status === "active" && (
                                                <button className="btn btn-success" onClick={handleContact}>
                                                    Contact
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                            {/* Cancel Confirmation Modal */}
                            {showCancelModal && (
                                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Confirm Cancellation</h5>
                                                <button type="button" className="btn-close" onClick={() => setShowCancelModal(false)}></button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Are you sure you want to cancel this rental?</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn btn-secondary" onClick={() => setShowCancelModal(false)}>
                                                    No
                                                </button>
                                                <button className="btn btn-danger" onClick={handleConfirmCancel}>
                                                    Yes, Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Booking History */}
                            <div className="bg-white py-4 px-3 shadow" style={{ borderRadius: "10px" }}>
                                <h4 className="mb-3" style={{ color: "#2c3e50" }}>Booking History</h4>
                                {historyRentals.length === 0 ? (
                                    <p>No completed or cancelled rentals.</p>
                                ) : (
                                    historyRentals.map((rental) => (
                                        <div
                                            key={rental.id}
                                            className="border p-3 mb-3 rounded-3  d-flex align-items-center"
                                        >
                                            <div className="me-3">
                                                <img
                                                    src={`http://localhost:8080/uploads/${rental.filename}`}
                                                    alt={rental.brand}
                                                    className=" mb-3 rounded-4"
                                                    height="120 rem"
                                                />
                                            </div>
                                            <div className="me-5">
                                                <strong>
                                                    {rental.brand} {rental.model}
                                                </strong>
                                                <div>
                                                    {new Date(rental.rental_date).toLocaleDateString()} → {new Date(rental.return_date).toLocaleDateString()}
                                                </div>
                                                <div>{rental.pickup_city || "Unknown Location"}</div>
                                                <div>{rental.total_amount} Dh</div>

                                            </div>
                                            <div className="me-5">
                                                <span className={`badge ${rental.status === "completed" ? "bg-success" : "bg-danger"}`}>
                                                    {rental.status}
                                                </span>
                                            </div>

                                            {rental.status === "completed" && (
                                                <button className="btn-book" onClick={() => openFeedbackModal(rental)}>
                                                    <MdFeedback size={20} style={{ marginRight: "5px" }} />
                                                    Feedback
                                                </button>
                                            )}

                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5 col-lg-4 mb-5">
                        <div className="fixed-sidebar w-100">
                            <div className="summary-box shadow">
                                <div className="d-flex align-items-center gap-3 mb-2">
                                    <FaRegUser size={25} color="#ff9700" />
                                    <h5 className="mt-2 fw-medium">Personal Information</h5>
                                </div>
                                <div className="rental-summary mt-3">
                                    <h6>
                                        <strong>Full name: </strong>
                                        {user?.fullname || ""}
                                    </h6>
                                    <p>
                                        <strong>Email: </strong>
                                        {user?.email || ""}
                                    </p>
                                    <p>
                                        <strong>Phone: </strong> {user?.phone || ""}
                                    </p>
                                    <p>
                                        <strong>Member Since: </strong>{" "}
                                        {user?.created_at ? new Date(user.created_at).toLocaleDateString() : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Modal */}
                {showFeedbackModal && selectedRental && (
                    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content p-3">
        
                                <h5>
                                    Leave Feedback for {selectedRental.brand} {selectedRental.model}
                                </h5>
                                <ReviewForm
                                    userId={user?.id}
                                    carId={selectedRental.car_id}
                                    onClose={closeFeedbackModal}
                                    onReviewAdded={fetchRentalHistory}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
