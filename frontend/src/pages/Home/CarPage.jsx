import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Reviews from "../../components/Home/Reviews";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaTimesCircle, FaCheckCircle, FaStar, FaRegStar, FaCalendarAlt, FaCheck, FaTachometerAlt, FaPalette, FaGasPump, FaCogs, FaUserFriends, FaClock, FaCreditCard, FaShieldAlt } from 'react-icons/fa';



export default function CarPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState([])
    const [reviews, setReviews] = useState([])
    const [stats, setStats] = useState(null);
    const today = new Date().toISOString().split('T')[0];
    const [rental_date, setRental_date] = useState('')
    const [return_date, setReturn_date] = useState('')
    const minReturnDate = rental_date
        ? new Date(new Date(rental_date).getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0]
        : '';

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
        const token = localStorage.getItem("token");
        if (!token) return;
        const { userid } = jwt_decode(token);
        axios
            .get(`http://localhost:8080/car/car/${id}`)
            .then((res) => setCar(res.data))
            .catch((err) => console.error(err));

        axios
            .get(`http://localhost:8080/review/${id}/reviews`)
            .then((res) => setReviews(res.data))
            .catch((err) => console.error("Error fetching reviews:", err));

        axios
            .get(`http://localhost:8080/review/${id}/reviews/stats`)
            .then((res) => setStats(res.data))
            .catch((err) => console.error('Error fetching rating stats:', err));

    }, [id]);

    const getBarWidth = (count) => {
        const max = Math.max(...Object.values(stats.breakdown));
        return `${(count / max) * 100}%`;
    };


    const getInitials = (fullname) => {
        const words = fullname.trim().split(" ");
        const first = words[0]?.charAt(0).toUpperCase() || "";
        const second = words[1]?.charAt(0).toUpperCase() || "";
        return first + second;
    };

    return (
        <>
            <div className="bg-light" style={{paddingTop:"6rem", paddingBottom:"3rem"}}>


                <div className="container py-5">
                    <div className="row py-5 mt-3">
                        <div className="col-md-7 mb-5">
                            <div className="main-content">

                                <div className="mb-4 bg-white  shadow-sm rounded-4">
                                    <img src={`http://localhost:8080/uploads/${car.filename}`} alt={car.brand} width="100%" className="rounded-4" />
                                </div>

                                <h1 className="mt-5">{car.brand} {car.model}</h1>
                                <div className="d-flex align-items-center mt-2">
                                    <Reviews rating={car.rating} reviewsCount={car.review_count} />

                                </div>
                                <div className="mt-5">
                                    <h3 className="mb-4">Specifications</h3>

                                    <div className="row">

                                        <div className="col-md-4 col-sm-6 mb-4">
                                            <div className="spec-box p-3 shadow-sm rounded bg-white text-center h-100">
                                                <FaCalendarAlt className="mb-2" style={{ fontSize: '1.5rem', color: "#ff9700" }} />
                                                <div className="label text-muted">Year</div>
                                                <div className="value fw-bold">{car.year}</div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-6 mb-4">
                                            <div className="spec-box p-3 shadow-sm rounded bg-white text-center h-100">
                                                <FaTachometerAlt className="mb-2" style={{ fontSize: '1.5rem', color: "#ff9700" }} />
                                                <div className="label text-muted">Mileage</div>
                                                <div className="value fw-bold">{car.mileage}</div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-6 mb-4">
                                            <div className="spec-box p-3 shadow-sm rounded bg-white text-center h-100">
                                                <FaPalette className="mb-2" style={{ fontSize: '1.5rem', color: "#ff9700" }} />
                                                <div className="label text-muted">Color</div>
                                                <div className="value fw-bold">{car.color}</div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-6 mb-4">
                                            <div className="spec-box p-3 shadow-sm rounded bg-white text-center h-100">
                                                <FaGasPump className="mb-2" style={{ fontSize: '1.5rem', color: "#ff9700" }} />
                                                <div className="label text-muted">Fuel Type</div>
                                                <div className="value fw-bold">{car.fuel_type}</div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-6 mb-4">
                                            <div className="spec-box p-3 shadow-sm rounded bg-white text-center h-100">
                                                <FaCogs className="mb-2" style={{ fontSize: '1.5rem', color: "#ff9700" }} />
                                                <div className="label text-muted">Transmission</div>
                                                <div className="value fw-bold">{car.transmission}</div>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-6 mb-4">
                                            <div className="spec-box p-3 shadow-sm rounded bg-white text-center h-100">
                                                <FaUserFriends className="mb-2" style={{ fontSize: '1.5rem', color: "#ff9700" }} />
                                                <div className="label text-muted">License plate</div>
                                                <div className="value fw-bold">{car.licenseplate}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="mb-3 mt-5">Features & Amenities</h4>
                                        <div className="row">


                                            <div className="col-md-4">
                                                <ul className="list-unstyled">
                                                    <li className="mb-2 d-flex align-items-center text-success">
                                                        <FaCheck className="me-2" />
                                                        <span className="text-dark">Bluetooth Connectivity</span>
                                                    </li>
                                                    <li className="mb-2 d-flex align-items-center text-success">
                                                        <FaCheck className="me-2" />
                                                        <span className="text-dark">USB Charging Ports</span>
                                                    </li>
                                                    <li className="mb-2 d-flex align-items-center text-success">
                                                        <FaCheck className="me-2" />
                                                        <span className="text-dark">Central Locking</span>
                                                    </li>
                                                </ul>
                                            </div>


                                            <div className="col-md-4">
                                                <ul className="list-unstyled">
                                                    <li className="mb-2 d-flex align-items-center text-success">
                                                        <FaCheck className="me-2" />
                                                        <span className="text-dark">GPS Navigation</span>
                                                    </li>
                                                    <li className="mb-2 d-flex align-items-center text-success">
                                                        <FaCheck className="me-2" />
                                                        <span className="text-dark">Keyless Entry</span>
                                                    </li>
                                                    <li className="mb-2 d-flex align-items-center text-success">
                                                        <FaCheck className="me-2" />
                                                        <span className="text-dark">ABS Brakes</span>
                                                    </li>
                                                </ul>
                                            </div>


                                            <div className="col-md-4">
                                                <ul className="list-unstyled">
                                                    <li className="mb-2 d-flex align-items-center text-success">
                                                        <FaCheck className="me-2" />
                                                        <span className="text-dark">Backup Camera</span>
                                                    </li>
                                                    <li className="mb-2 d-flex align-items-center text-success">
                                                        <FaCheck className="me-2" />
                                                        <span className="text-dark">Power Windows</span>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>



                                    <div className="mt-5">
                                        <h4 className="mb-3">Rental Terms</h4>
                                        <div className="p-4 rounded" style={{ backgroundColor: "#fadcaeff" }}>

                                            <div className="mb-3 d-flex">
                                                <FaClock className="me-3 mt-1" size={20} color="#ff9700" />
                                                <div>
                                                    <strong>Minimum Rental Period</strong>
                                                    <div className="text-muted">24 hours</div>
                                                </div>
                                            </div>

                                            <div className="mb-3 d-flex">
                                                <FaCreditCard className="me-3 mt-1" size={20} color="#ff9700" />
                                                <div>
                                                    <strong>Security Deposit</strong>
                                                    <div className="text-muted">2000 MAD (refundable)</div>
                                                </div>
                                            </div>

                                            <div className="mb-3 d-flex">
                                                <FaShieldAlt className="me-3 mt-1" size={20} color="#ff9700" />
                                                <div>
                                                    <strong>Insurance</strong>
                                                    <div className="text-muted">Basic coverage included, premium options available</div>
                                                </div>
                                            </div>

                                            <div className="d-flex">
                                                <FaGasPump className="me-3 mt-1" size={20} color="#ff9700" />
                                                <div>
                                                    <strong>Fuel Policy</strong>
                                                    <div className="text-muted">Return with same fuel level</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Customer Reviews */}

                                    <div className="mt-5">
                                        <h4 className="mb-3">Customer Reviews</h4>
                                        <div className="row">

                                            {/* ✅ Average Rating */}
                                            {stats ? (
                                                <>
                                                    <div className="col-md-5 d-flex gap-3">
                                                        <h1 className="fw-bold">
                                                            {typeof stats?.averageRating === 'number'
                                                                ? stats.averageRating.toFixed(1)
                                                                : Number(stats?.averageRating || 0).toFixed(1)}
                                                        </h1>
                                                        <div>
                                                            <div className="text-warning mb-1">
                                                                {[...Array(5)].map((_, i) =>
                                                                    i < Math.round(stats.averageRating) ? (
                                                                        <FaStar key={i} className="text-warning me-1" />
                                                                    ) : (
                                                                        <FaRegStar key={i} className="text-warning me-1" />
                                                                    )
                                                                )}

                                                            </div>
                                                            <div className="text-muted">
                                                                Based on {stats.totalReviews} reviews
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* ✅ Star Breakdown */}
                                                    <div className="col-md-7">
                                                        {Object.entries(stats.breakdown)
                                                            .sort((a, b) => b[0] - a[0])
                                                            .map(([star, count]) => (
                                                                <div className="d-flex align-items-center mb-2" key={star}>
                                                                    <div className="text-muted" style={{ width: '30px' }}>{star}★</div>
                                                                    <div
                                                                        className="flex-grow-1 bg-light rounded"
                                                                        style={{ height: '8px', position: 'relative' }}
                                                                    >
                                                                        <div
                                                                            className="bg-warning rounded"
                                                                            style={{
                                                                                height: '100%',
                                                                                width: getBarWidth(count),
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <div className="ms-2 text-muted" style={{ width: '30px' }}>{count}</div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <p>Loading rating...</p>
                                            )}
                                        </div>
                                    </div>




                                    <div className="pt-5" >
                                        {reviews.length === 0 ? (
                                            <p>No reviews yet</p>
                                        ) : (
                                            reviews.map((review) => (
                                                <div className=" mt-5 mb-3" key={review.id}>
                                                    <div className="card-body d-flex align-items-start">
                                                        <div className="avatar-circle me-3">
                                                            {getInitials(review.user_fullname)}
                                                        </div>
                                                        <div>
                                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                                <h6 className="mb-0 fw-bold">{review.user_fullname}</h6>
                                                                <small className="text-muted">{new Date(review.created_at).toLocaleDateString()}</small>
                                                            </div>
                                                            <div className="text-warning mb-2">
                                                                {[...Array(5)].map((_, i) =>
                                                                    i < review.rating ? (
                                                                        <FaStar key={i} className="text-warning me-1" />
                                                                    ) : (
                                                                        <FaRegStar key={i} className="text-warning me-1" />
                                                                    )
                                                                )}

                                                            </div>
                                                            <p className="mb-2">{review.comment}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 mb-5">
                            <div className="fixed-sidebar w-100">
                                <div className="summary-box shadow">
                                    <div className="d-flex align-items-center gap-3 mb-2">
                                        <h5 className="mt-2 fw-medium"><span className="fs-3 fw-bold" style={{ color: "#FF9700" }}>{car.price} DH</span>/Day</h5>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Pick-up Date</label>
                                        <input min={today} value={rental_date} onChange={(e) => setRental_date(e.target.value)} type="date" className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Drop-off Date</label>
                                        <input min={minReturnDate} value={return_date} onChange={(e) => setReturn_date(e.target.value)} type="date" className="form-control" required />
                                    </div>

                                    <div className="mt-2">
                                        {car.status === "available" ? (
                                            <div className="text-success d-flex align-items-center mb-3 fw-semibold">
                                                <FaCheckCircle className="me-2" />
                                                Available for selected dates
                                            </div>
                                        ) : (car.status === "rented" || car.status === "maintenance") ? (
                                            <div className="text-danger d-flex align-items-center mb-3 fw-semibold">
                                                <FaTimesCircle className="me-2" />
                                                This rental is not available for selected dates
                                            </div>
                                        ) : (
                                            <div className="text-muted mb-3">Loading availability...</div>
                                        )}
                                    </div>


                                    <div className="text-center p-4 rounded-4">
                                        <NavLink
                                            to={
                                                car.status === "available" && rental_date && return_date
                                                    ? `/book/${car.id}`
                                                    : "#"
                                            }
                                            className={`w-100 btn-search py-3 fw-bold d-flex align-items-center justify-content-center
                                              ${!(car.status === "available" && rental_date && return_date)
                                                    ? "btn btn-secondary disabled"
                                                    : "btn btn-success"
                                                }`}
                                            onClick={(e) => {
                                                if (!(car.status === "available" && rental_date && return_date)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <RiSecurePaymentFill size={25} color="#fff" className="me-2" />
                                            {`Select Dates to Book - ${total.toFixed(2)}Dh`}
                                        </NavLink>


                                    </div>






                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}