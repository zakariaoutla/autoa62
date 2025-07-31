import { useEffect, useState } from "react";
import axios from "axios";
import { FaCar, FaCalendarCheck, FaStar, FaCarSide, FaMoneyBillWave, FaClock, FaUsers, FaShieldAlt, FaAward } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { CiHeart } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router";
import { FiChevronRight } from "react-icons/fi";
import CardProduct from "../../components/Home/CardProduct";
import QuickBooking from "../../components/Home/QuickBooking";
import FeatureCard from "../../components/Home/FeatureCard";
import CardProductHome from "../../components/Home/CardProductHome";
import ReviewCarousel from "../../components/Home/ReviewCarousel";
import StatsCards from "../../components/Home/StatsCards";
import TrustedSection from "../../components/Home/TrustedSection";
import CallToAction from "../../components/Home/CallToAction";


export default function Home() {
    const [cars, setCars] = useState([]);
    const [vehicles, setVehicles] = useState(0);
    const [cities, setCities] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [visibleCars, setVisibleCars] = useState(6);
    const navigate = useNavigate();


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.role === "admin") {
            navigate('/'); 
        }
   
        axios
            .get("http://localhost:8080/car/cars")
            .then((res) => setCars(res.data))
            .catch((err) => console.error(err));
   

    
        const duration = 1500;
        const frameDuration = 30;
        const totalFrames = Math.round(duration / frameDuration);

        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            setVehicles(prev => {
                const progress = frame / totalFrames;
                return Math.min(Math.floor(500 * progress), 500);
            });
            setCities(prev => {
                const progress = frame / totalFrames;
                return Math.min(Math.floor(50 * progress), 50);
            });

            if (frame === totalFrames) clearInterval(counter);
        }, frameDuration);
    }, []);

    return (
        <>
            <div className="bg-light" style={{paddingTop:"6rem", paddingBottom:"3rem"}}>
                <header className="d-flex ">
                    <div className="container fleet-text">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-5 mb-5 mb-md-0 " style={{ marginTop: "80px" }}>
                                <p className="text-warning fw-bold mb-1">⚡ Premium Fleet Available</p>
                                <h1 className="py-3" style={{ fontSize: "70px", fontWeight: "700" }}>
                                    Your perfect <br />
                                    <span className="text-orange">drive awaits</span>
                                </h1>
                                <p className="text-secondary fs-5">
                                    Experience automotive excellence with our curated <br /> fleet of premium vehicles.
                                    From luxury sedans to <br /> SUVs, find your perfect companion for every journey.
                                </p>
                                <div className="stats d-flex  gap-5 mt-4" style={{ fontWeight: "700" }}>
                                    <div>
                                        <h4 className="fw-bold fs-2">{vehicles}+</h4>
                                        <p className="text-muted">Premium Vehicles</p>
                                    </div>
                                    <div>
                                        <h4 className="fw-bold fs-2">{cities}+</h4>
                                        <p className="text-muted">Morocco Cities</p>
                                    </div>
                                    <div>
                                        <h4 className="fw-bold fs-2">24/7</h4>
                                        <p className="text-muted">Support</p>
                                    </div>
                                </div>
                                <div className="mt-4 d-flex gap-3">
                                    <NavLink className="btn-explore" to="/cars"><FaCar /> Explore Fleet</NavLink>
                                    <NavLink className="btn-book" to="/cars"><FaCalendarCheck /> Book Now</NavLink>
                                </div>
                            </div>

                            {/*CAROUSEL */}
                            <div className="col-12 col-md-7">
                                <div className="carousel-container px-3 bg-white py-4 shadow mt-5">
                                    <div className="product-display">
                                        {cars.length > 0 && cars[activeIndex] && (
                                            <CardProduct car={cars[activeIndex]} />
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="dots mt-3 d-flex justify-content-start">
                                            {cars.slice(0, 3).map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={`dot ${index === activeIndex ? 'active' : ''}`}
                                                    onClick={() => setActiveIndex(index)}
                                                ></span>
                                            ))}
                                        </div>
                                        <div>
                                            <NavLink className="btn-details" to={"/cars"}>View Details <FiChevronRight /></NavLink>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </header>
                {/*start Quickbook booking*/}
                <div className="col-12 col-md-12">
                   <QuickBooking />
                </div>
                

                {/*Start Why Choose CarRent Pro */}
                <div className="whychoose container text-center">
                    <p className="text-orange fw-semibold mb-2" >
                        <FaStar className="me-1" /> Why Choose Auto a62
                    </p>
                    <h2 className="fw-bold display-5 mb-3" style={{ color: "#2C3E50" }}>
                        Experience the <span className="text-orange">difference</span>
                    </h2>
                    <p className="text-muted fs-5">
                        We've revolutionized car rental with cutting-edge technology,
                        premium vehicles, <br className="d-none d-md-block" />
                        and unmatched service quality.
                    </p>
                    <div className="row mt-5">
                        <FeatureCard
                            icon={<FaCarSide />}
                            title="Large Vehicle Selection"
                            description="Find the perfect car for every journey — compact, family-size, SUV or luxury. We’ve got something for everyone."
                            list={["Wide Range of Models", "Regularly Serviced", "Comfort & Safety Guaranteed"]}
                            color="warning"
                        />
                        <FeatureCard
                            icon={<FaMoneyBillWave />}
                            title="Affordable & Transparent Pricing"
                            description="Get the best value with no hidden fees. Enjoy competitive rates, clear pricing, and flexible rental periods."
                            list={["No Hidden Charges", "Flexible Packages", "Daily & Weekly Rates"]}
                            color="primary"
                        />
                        <FeatureCard
                            icon={<FaClock />}
                            title="Fast & Easy Booking"
                            description="Reserve your car in minutes via our intuitive online platform. Quick process, instant confirmation."
                            list={["Online Reservation", "24/7 Availability", "Instant Confirmation"]}
                            color="success"
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <div className="customer-card shadow-sm d-flex align-items-center p-4 rounded-4 bg-white">
                        <div className="d-flex gap-2 me-3">
                            <div className="icon-circle bg-warning text-white">
                                <FaUsers />
                            </div>
                            <div className="icon-circle bg-primary text-white">
                                <FaShieldAlt />
                            </div>
                            <div className="icon-circle bg-success text-white">
                                <FaAward />
                            </div>
                        </div>
                        <div>
                            <h5 className="fw-bold mb-0">Join 50,000+ satisfied customers</h5>
                            <p className="text-muted mb-0">Experience premium car rental across Morocco</p>
                        </div>
                    </div>
                </div>
                {/*Start section Product */}
                <div className="whychoose container text-center">
                    <p className="text-orange fw-semibold mb-2" >
                        <FaCar className="me-1" /> Premium Fleet Collection
                    </p>

                    <h2 className="fw-bold display-5 mb-3" style={{ color: "#2C3E50" }}>
                        Discover your perfect <span className="text-orange">vehicle</span>
                    </h2>

                    <p className="text-muted fs-5">
                        Find the right car for every journey. Whether it's business or adventure,
                        <br className="d-none d-md-block" />
                        our premium fleet is ready when you are.
                    </p>
                </div>

                <div className="container py-5">
                    <div className="row g-4">
                        {cars.slice(0, visibleCars).map(car => (
                            <div className="col-md-4" key={car.id}>
                                <CardProductHome car={car} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="fleet-card shadow p-4 d-flex align-items-center justify-content-between rounded-4">
                    <div>
                        <h2 className="fw-bold mb-2">Explore Our Complete Fleet</h2>
                        <p className="text-muted mb-0">
                            Discover over 500+ premium vehicles across 50+ Morocco cities
                        </p>
                    </div>
                    <div className="btn-group">
                        <NavLink to="/cars" className="btn-available me-2">View All Vehicles →</NavLink>
                    </div>
                </div>


                <div className="whychoose container text-center">
                    <p className="text-orange fw-semibold mb-2" >
                        <CiHeart className="me-1" fontSize={20} /> Customer Stories
                    </p>

                    <h2 className="fw-bold display-5 mb-3" style={{ color: "#2C3E50" }}>
                        Real adventures, <span className="text-orange">real experiences</span>
                    </h2>

                    <p className="text-muted fs-5">
                        Discover how Auto A62 has made thousands of journeys across Morocco <br /> unforgettable
                    </p>
                </div>
                {/*Start Reviews section*/}
                <ReviewCarousel />
                <StatsCards />

                {/*Start Trusted section */}
                <div className="whychoose container text-center">
                    <p className="text-success fw-semibold mb-2" >
                        <VscWorkspaceTrusted className="me-1" /> Trusted & Certified
                    </p>

                    <h2 className="fw-bold display-5 mb-3" style={{ color: "#2C3E50" }}>
                        Your trust is our <span className="text-orange">foundation</span>
                    </h2>

                    <p className="text-muted fs-5">
                        Auto A62 Pro maintains the highest standards of security, compliance,<br/> and service quality across Morocco
                    </p>
                </div>
                <TrustedSection />
                <div className="container mt-2">
                    <CallToAction/>
                </div>
            </div>
        </>
    );
}
