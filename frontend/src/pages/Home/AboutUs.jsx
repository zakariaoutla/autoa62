import { FaCarAlt, FaBook, FaQuoteLeft, FaStar, FaHeart, FaSuitcase, FaUsers, FaShieldAlt } from 'react-icons/fa';
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdOutlineTrackChanges } from 'react-icons/md';
import ReviewCarousel from "../../components/Home/ReviewCarousel";
import TrustedSection from '../../components/Home/TrustedSection';
import CallToAction from '../../components/Home/CallToAction';

export default function AboutUs() {

    return (
        <>
            <div className="bg-light" style={{paddingTop:"6rem", paddingBottom:"3rem"}}>
                <div className='container'>
                    <div className="my-5 d-flex flex-column flex-md-row align-items-center justify-content-between">
                        <div className="text-section me-md-5">
                            <h6 className="text-orange d-flex align-items-center">
                                <FaCarAlt className="me-2" /> NOTRE HISTOIRE
                            </h6>
                            <h1 className="fw-bold mt-2" style={{ fontSize: "4rem", color: "#2C3E50" }}>
                                Let's transform it <br /><span className="text-orange">Car Rental</span>
                            </h1>
                            <p className="text-muted mt-3">
                                Since 2025, Auto A62 has been revolutionizing the car rental experience in Morocco, turning every journey into a premium adventure accessible to all.
                            </p>
                            <div className="d-flex container my-5 flex-wrap text-center">
                                <div className='text-muted me-5'><strong className="text-orange fs-3">50K+</strong><br />Happy Clients</div>
                                <div className='text-muted me-5'><strong className="text-orange fs-3">500+</strong><br />Premium Vehicles</div>
                                <div className='text-muted me-5'><strong className="text-orange fs-3">6</strong><br />Morocco Cities</div>
                            </div>
                            <div className="info-box-about p-3 rounded shadow-sm mb-3 bg-light">
                                <h6 className="fw-bold d-flex align-items-center" style={{ color: "#ff9900" }}>
                                    <MdOutlineTrackChanges className="me-2" /> Our Mission
                                </h6>
                                <p className="text-muted mb-0">Making automotive excellence accessible, transforming every rental into a memorable experience that exceeds expectations.</p>
                            </div>
                        </div>

                        <div className="image-section position-relative mt-4 mt-md-0">
                            <img src="../public/aboutus.jpg" alt="Analytics" className="img-fluid rounded shadow" />
                            <div className="cert-box p-3 bg-white rounded shadow position-absolute bottom-0 start-0 m-3">
                                <h6 className="mb-1 text-success d-flex align-items-center">
                                    <BsCheckCircleFill className="me-2" /> Certified Excellence
                                </h6>
                                <p className="mb-0 small">ISO 9001 certified for quality of service and customer satisfaction</p>
                            </div>
                        </div>
                    </div>
                    <div className='text-center py-5'>
                        <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
                            <FaBook color='#FF9700' />
                            <h6 className="text-orange mb-0">Our Journey</h6>
                        </div>
                        <h2 className="fw-bold" style={{ color: "#2C3E50" }}>A Story of Automotive Passion</h2>
                        <p className="text-muted mt-3 fs-6">
                            From a Azilal startup to a Morccon leader in premium car rental,<br /> discover how we revolutionized the automotive industry.
                        </p>
                    </div>



                    <div className='my-5 ' style={{ position: 'relative' }}>
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h2 className="fw-bold" style={{ color: "#2C3E50" }}>Our Founders' Vision</h2>
                                <p className="text-muted mt-3">
                                    "We created Auto A62 after experiencing frustration with traditional rental companies. Our vision was simple: what if renting a car could be as exciting as driving one?"
                                </p>
                                <p className="text-muted">
                                    This philosophy still guides every one of our decisions today, from selecting our vehicles to training our teams.
                                </p>

                                <div className="founder-box p-4 rounded shadow-sm mt-4">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="./public/zakariaoutla.jpg"
                                            alt="Zakaria Outla"
                                            className="founder-image rounded-circle me-3"
                                            width="70"
                                            height="70"
                                        />
                                        <div>
                                            <strong>Zakaria Outla</strong><br />
                                            <span className="text-muted">Founder & CEO</span>
                                        </div>
                                    </div>
                                    <p className="mt-3">
                                        <FaQuoteLeft className="quote-icon" />  "Every customer deserves to experience the thrill of driving an exceptional vehicle!"
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <img
                                    src="./public/team.jpg"
                                    alt="Team"
                                    className="img-fluid rounded shadow"
                                />
                            </div>
                        </div>
                        <div className="year-box">
                            <h4>2025</h4>
                            <small>Année de création</small>
                        </div>
                    </div>
                    <div className='py-5 text-center'>
                        <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
                            <FaStar color='#FF9700' />
                            <h6 className="text-orange mb-0">OUR VALUES</h6>
                        </div>
                        <h2 className="fw-bold" style={{ color: "#2C3E50" }} >What Drives Us Every Day</h2>
                        <p className="text-muted mt-3 fs-6">
                            Our core values guide every decision and shape <br />the exceptional experience we offer our clients.
                        </p>

                        <div className="my-5">
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">

                                <div className="col">
                                    <div className="card text-center h-100 d-flex flex-column">
                                        <div className="card-body card-body-about">
                                            <FaHeart className="card-icon mb-3 fs-1" />
                                            <h5 className="card-title">Automotive Passion</h5>
                                            <p className="card-text">
                                                We carefully select each vehicle with the eye of a true enthusiast, ensuring an exceptional driving experience.
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="col">
                                    <div className="card text-center h-100 d-flex flex-column">
                                        <div className="card-body card-body-about">
                                            <FaSuitcase className="card-icon mb-3 fs-1" />
                                            <h5 className="card-title">Freedom to Travel</h5>
                                            <p className="card-text">
                                                We believe that every journey should be an adventure, offering the freedom to explore without limits.
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="col">
                                    <div className="card text-center h-100 d-flex flex-column">
                                        <div className="card-body card-body-about">
                                            <FaUsers className="card-icon mb-3 fs-1" />
                                            <h5 className="card-title ">Customer Excellence</h5>
                                            <p className="card-text">
                                                Each interaction is an opportunity to exceed expectations and create lasting memories.
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="col">
                                    <div className="card text-center h-100 d-flex flex-column">
                                        <div className="card-body card-body-about">
                                            <FaShieldAlt className="card-icon mb-3 fs-1" />
                                            <h5 className="card-title">Absolute Trust</h5>
                                            <p className="card-text">
                                                Transparency, safety, and reliability are the pillars of our relationship with every client.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-5 text-center'>
                        <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
                            <FaStar color='#FF9700' />
                            <h6 className="text-orange mb-0">Customer Stories</h6>
                        </div>
                        <h2 className="fw-bold" style={{ color: "#2C3E50" }} >Real adventures, real experiences</h2>
                        <p className="text-muted mt-3 fs-6">
                            Discover how Auto A62 has made thousands of journeys across Morocco <br /> unforgettable
                        </p>
                        <div className='my-5'>
                            <ReviewCarousel />
                        </div>
                    </div>
                    <div className='py-5 text-center'>
                        <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
                            <VscWorkspaceTrusted color='#FF9700' />
                            <h6 className="text-orange mb-0">Trusted & Certified</h6>
                        </div>
                        <h2 className="fw-bold" style={{ color: "#2C3E50" }} >Your trust is our foundation</h2>
                        <p className="text-muted mt-3 fs-6">
                            Auto A62 Pro maintains the highest standards of security, compliance,<br/> and service quality across Morocco
                        </p>
                        <div className='mt-5'>
                            <TrustedSection/>
                        </div>
                    </div>

                    <div className='py-5'>
                        <CallToAction/>
                    </div>








                </div>
            </div>

        </>
    )
}