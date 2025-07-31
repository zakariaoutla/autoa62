import { NavLink } from "react-router-dom";

export default function CallToAction() {
    return (
        <>
            <div className="row text-center p-5" style={{backgroundColor:"#ff9900", borderRadius:"20px"}}>
                <h2 className="fw-bold mb-3 text-light fs-1">Ready to Find Your Perfect Vehicle?</h2>
                <p className="text-light mb-4">
                    Contact AutoA62 today and let our experienced team help you find the ideal car for <br />
                    purchase or rental in the Azilal region.
                </p>
                <div className="cta-buttons d-flex justify-content-center gap-3">
                    <NavLink to='/contact-us' className="btn-contact">Contact Us Today</NavLink>
                    <NavLink to="/cars" className="btn-ourcar">View Our Inventory</NavLink>
                </div>
            </div>
        </>

    );
};