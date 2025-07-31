import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { LuCar } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineLocalPhone, MdOutlinePayments } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";




export default function BookPage() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [user, setUser] = useState(null);
    const [rental, setrentals] = useState([]);
    const [rental_date, setRental_date] = useState('')
    const [return_date, setReturn_date] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('');
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const today = new Date().toISOString().split('T')[0];
    const minReturnDate = rental_date
        ? new Date(new Date(rental_date).getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0]
        : '';

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);






    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const { userId: id } = jwt_decode(token);
            axios.get(`http://localhost:8080/user/users/${id}`)
                .then(res => {
                    setUser(res.data);
                    setFullName(res.data.fullname);
                    setEmail(res.data.email);
                    setPhone(res.data.phone);
                })
                .catch(console.error);
        }
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/car/car/${id}`)
            .then((res) => setCar(res.data))
            .catch((err) => console.error("Error fetching car:", err));
    }, [id]);


    const calculateRentalDays = () => {
        const start = new Date(rental_date);
        const end = new Date(return_date);
        const diff = Math.abs(end - start);
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    };


    const rentalDays = calculateRentalDays();
    const subtotal = car ? rentalDays * car.price : 0;
    const tax = subtotal * 0.2;
    const total = subtotal + tax;


    useEffect(() => {
        axios.get('http://localhost:8080/rental/rentals/details')
            .then(res => setrentals(res.data))
            .catch(err => console.error("Error fetching rentals:", err));
    }, []);


    const handleReservation = async () => {
        try {
            await axios.post("http://localhost:8080/rental/rentals", {
                user_id: user.id,
                car_id: car.id,
                rental_date: rental_date,
                return_date: return_date,
                total_amount: total,
            });




            await axios.post("http://localhost:8080/payment/payment", {
                payment_id: car.id,
                customer_name: user.fullname,
                car_model: car.brand + ' ' + car.model,
                amount: total,
                payment_method: paymentMethod,
                status: 'pending',
            });

            setShowModal(true);
            setTimeout(() => {
                const rentelid = user.id;
                navigate(`/myaccount/${rentelid}`);
            }, 1000);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        }
    };


    if (!car || !user) return <div>Loading...</div>;

    return (
        <>
            <div className="bg-light" style={{ paddingTop: "6rem", paddingBottom: "3rem" }}>
                <div className="container mt-5 pt-3">
                    <div className="mt-5 text-center">
                        <h2 className="fw-bold display-5 mb-3" style={{ color: "#2C3E50" }}>
                            Complete Your <span className="text-orange">Reservation</span>
                        </h2>
                        <p className="text-muted fs-5">
                            Just a few more details to secure your rental
                        </p>
                    </div>
                    <div className="row mt-5 gap-3">
                        <div className="col-md-4 col-lg-4 mb-5">
                            <div className="fixed-sidebar">
                                <div className="summary-box shadow">
                                    <div className="d-flex align-items-center gap-3 mb-2">
                                        <LuCar color="#ff9700" size={25} />
                                        <h5 className="mt-2 fw-medium">Rental Summary</h5>
                                    </div>

                                    <img src={`http://localhost:8080/uploads/${car.filename}`} className="img-fluid mb-3 rounded-3" alt="Car" />
                                    <p className="fs-5"><strong>{car.brand} {car.model}</strong></p>
                                    <div className="row">
                                        <span className="text-black col-md-3 py-1 px-3 me-1 fw-lighter" style={{ backgroundColor: "#F8F9FA", borderRadius: "10px" }}>{car.fuel_type}</span>
                                        <span className="text-black col-md-3 py-1 px-3 me-1 fw-lighter" style={{ backgroundColor: "#F8F9FA", borderRadius: "10px" }}>{car.transmission}</span>
                                        <span className="text-black col-md-3 py-1 px-3 me-1 fw-lighter" style={{ backgroundColor: "#F8F9FA", borderRadius: "10px" }}>{car.mileage}</span>
                                        <span className="text-black col-md-2 py-1 px-3 fw-lighter" style={{ backgroundColor: "#F8F9FA", borderRadius: "10px" }}>{car.year}</span>
                                    </div>


                                    <hr style={{ color: "#ABB2B6" }} />

                                    <p className="text-muted">Price per day:  {car.price} Dh</p>
                                    <p className="text-muted">Rental duration: {rentalDays} {rentalDays === 1 ? 'day' : 'days'}</p>

                                    <hr style={{ color: "#ABB2B6" }} />

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted">Subtotal:</p>
                                        <p className="text-muted">{(rentalDays * car.price).toFixed(2)} Dh</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted">Taxes & Fees:</p>
                                        <p className="text-muted">{tax.toFixed(2)}Dh</p>
                                    </div>

                                    <hr style={{ color: "#ABB2B6" }} />


                                    <div className="d-flex justify-content-between" style={{ color: "#ff9900", fontWeight: "800" }}>
                                        <p className="fs-5">Total:</p>
                                        <p className="fs-5">{total.toFixed(2)}Dh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-7">
                            <div className="main-content">
                                <div className="row mb-4 bg-white p-4 shadow rounded-4">
                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <FaRegUser size={25} color="#ff9700" />
                                        <h4 className="mt-2">Personal Information</h4>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label">Full name</label>
                                        <div className="input-wrapper">
                                            <FaRegUser className="input-icon" size={20} />
                                            <input type="text" className="form-control" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <div className="input-wrapper">
                                            <MdOutlineEmail className="input-icon" size={20} />
                                            <input type="email" className="form-control" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </div>

                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <label htmlFor="phone" className="form-label">Phone Number</label>
                                        <div className="input-wrapper">
                                            <MdOutlineLocalPhone className="input-icon" size={20} />
                                            <input type="tel" className="form-control" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                        </div>

                                    </div>
                                </div>
                                <div className="row mb-4 bg-white p-4 shadow rounded-4" >
                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <FaCalendarAlt size={25} color="#ff9700" />
                                        <h4 className="mt-2">Rental Details</h4>
                                    </div>
                                    <div className="col-md-4">
                                        <input min={today} type="date" value={rental_date} onChange={(e) => setRental_date(e.target.value)} className="form-control p-2" required />
                                    </div>
                                    <div className="col-md-4">
                                        <input min={minReturnDate} type="date" value={return_date} onChange={(e) => setReturn_date(e.target.value)} className="form-control p-2" required />
                                    </div>
                                    <div className="col-md-4">
                                        <select className="form-select p-2">
                                            <option value="Azilal">Azilal</option>
                                            <option value="Beni Mellal">Beni Mellal</option>
                                            <option value="Casablanca">Casablanca</option>
                                            <option value="Rabat">Rabat</option>
                                            <option value="Marrakech">Marrakech</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="row  mb-5 bg-white p-4 shadow rounded-4 ">
                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <MdOutlinePayments size={25} color="#ff9700" />
                                        <h4 className="mt-2">Method payment</h4>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            value="cash"
                                            checked={paymentMethod === "cash"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="cash">
                                            💵 Cash on Delivery
                                        </label>
                                    </div>

                                    <div className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={paymentMethod === "card"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="card">
                                            💳 Credit Card
                                        </label>
                                    </div>

                                    <div className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            value="paypal"
                                            checked={paymentMethod === "paypal"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="paypal">
                                            🅿️ PayPal
                                        </label>
                                    </div>

                                    {paymentMethod === 'cash' && (
                                        <div className="alert alert-info">
                                            You will pay in cash upon receiving the car.
                                        </div>
                                    )}

                                    {paymentMethod === 'card' && (
                                        <div className="alert alert-danger">
                                            coming soon
                                        </div>
                                    )}

                                    {paymentMethod === 'paypal' && (
                                        <div className="alert alert-danger">
                                            coming soon
                                        </div>
                                    )}

                                </div>
                            </div>
                            <div className="row mb-5 bg-white p-4 shadow rounded-4">
                                <div className="col-md-12 text-center">
                                    <button
                                        onClick={handleReservation}
                                        disabled={paymentMethod !== 'cash' || !user.fullname || !user.email || !user.phone || !rental_date || !return_date}
                                        className={`w-100 btn-search py-3 fw-bold d-flex align-items-center justify-content-center
                                        ${paymentMethod !== 'cash' || !user.fullname || !user.email || !user.phone || !rental_date || !return_date
                                                ? 'btn btn-secondary disabled'
                                                : 'btn btn-success'}`}
                                    >
                                        <RiSecurePaymentFill size={25} color="#fff" className="me-2" />
                                        {`Confirm Reservation - ${total.toFixed(2)}Dh`}
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#454954',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    zIndex: 1000,
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                }}>
                    ✅ Your reservation was completed successfully!
                </div>
            )}

        </>
    );
}
