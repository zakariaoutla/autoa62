
import { FaCalendarAlt } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Reviews from "./Reviews";


export default function CardProductHome({ car }) {
    const location = useLocation();
    const navigate = useNavigate();


    function getStatusClass(status) {
        switch (status) {
            case "available":
                return "btn-available";
            case "rented":
                return "btn-rented";
            case "maintenance":
                return "btn-rented";
            default:
                return "btn-outline-secondary";
        }
    }


    const handleBookClick = () => {
        if (car.status !== "available") return;

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/log-in", {
                state: {
                    from: "/book",
                    selectedCar: car
                }
            });
        } else {

            navigate(`/book/${car.id}` , {
                    state: {
                        selectedCar: car
                    }
                });
        }
    };

    return (
        <div className="card shadow rounded-4 overflow-hidden product-card">
            <div className="position-relative">
                <img src={`http://localhost:8080/uploads/${car.filename}`} alt={car.brand} className="w-100 product-image" />
                <span className={`badge position-absolute top-0 start-0 m-2 ${getStatusClass(car.status)}`}>
                    {car.status === "available" ? "Book Now" :
                        car.status === "rented" ? "Booked" :
                            car.status === "maintenance" ? "Booked" :
                                "Unknown"
                    }
                </span>

                <div className="position-absolute top-0 end-0 m-2 price-badge">
                    {car.price}Dh/<small>day</small>
                </div>
            </div>

            <div className="p-4">
                <h5 className="fw-bold mb-0">{car.brand} {car.model}</h5>
                <div className="d-flex align-items-center mt-2">
                    <Reviews rating={car.rating} reviewsCount={car.review_count}/>
                </div>


                <div className="d-flex justify-content-between pt-2" style={{ color: "#B3B3B3", fontSize: "15px" }}>
                    <label>Year:</label>
                    <span>{car.year}</span>
                </div>
                <div className="d-flex justify-content-between pt-2" style={{ color: "#B3B3B3", fontSize: "15px" }}>
                    <label>License Plate:</label>
                    <span>{car.licenseplate}</span>
                </div>
                <div className="d-flex justify-content-between pt-2" style={{ color: "#B3B3B3", fontSize: "15px" }}>
                    <label>Mileage:</label>
                    <span>{car.mileage}</span>
                </div>

                <div className="d-flex gap-2  mt-4">
                    <div className="col-md-5">
                        <NavLink to={`/car/${car.id}`} className="btn-productD  d-flex align-items-center"><AiOutlineExclamationCircle className="me-1" /> Details</NavLink>
                    </div>
                    <div className="col-md-7">

                        <button
                            onClick={handleBookClick}
                            className={`${getStatusClass(car.status)} d-flex align-items-center`}
                            disabled={car.status !== "available"}
                        >
                            <FaCalendarAlt className="me-1" style={{ fontSize: "15px" }} />
                            {car.status === "available" ? "Book Now" : "Unavailable"}
                        </button>

                    </div>




                </div>

            </div>
        </div>
    );
}


