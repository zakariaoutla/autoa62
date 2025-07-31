import { FaSave } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { NavLink } from "react-router-dom";

export default function CardForm({
    brand, setBrand,
    model, setModel,
    year, setYear,
    licenseplate, setLicenseplate,
    color, setColor,
    mileage, setMileage,
    fuel_type, setFuel_type,
    transmission, setTransmission,
    price, setPrice,
    status, setStatus,
    onSubmit,
    setImageFile,
    isEditing
}) {



    return (
        <>  
            <form className="Basic-Information" onSubmit={onSubmit}>
                <div className="card car-card-admin text-light p-4">
                    <h4 className="mb-4">Basic Information</h4>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Brand</label>
                            <input type="text" className="form-control1" placeholder="Toyota, Honda, BMW..." value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Model</label>
                            <input type="text" className="form-control1" placeholder="Camry, Civic, X5..." value={model} onChange={(e) => setModel(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Year</label>
                            <input type="number" className="form-control1 price-input" placeholder="2023" value={year} onChange={(e) => setYear(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">License Plate</label>
                            <input type="text" className="form-control1" placeholder="ABC-123" value={licenseplate} onChange={(e) => setLicenseplate(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Color</label>
                            <input type="text" className="form-control1 " placeholder="Black, White, Silver..." value={color} onChange={(e) => setColor(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mileage (km)</label>
                            <input type="number" className="form-control1 price-input" placeholder="15000" value={mileage} onChange={(e) => setMileage(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="card car-card-admin text-light p-4 mt-5">
                    <h4 className="mb-4">Technical Details</h4>
                    <div className="row mb-3">
                        <div className="col-md-6 ">
                            <label className="form-label">Fuel Type</label>
                            <select
                                className="form-select1 text-white px-3"
                                value={fuel_type} onChange={(e) => setFuel_type(e.target.value)}>
                                <option value="gasoline" >Gasoline</option>
                                <option value="diesel">Diesel</option>
                                <option value="hybrid" >Hybrid</option>
                                <option value="electric" >Electric</option>
                            </select>
                        </div>
                        <div className="col-md-6 ">
                            <label className="form-label">Transmission</label>
                            <select
                                className="form-select1 text-white px-3"
                                value={transmission} onChange={(e) => setTransmission(e.target.value)} >
                                <option value="automatic" >Automatic</option>
                                <option value="manual">Manual</option>
                                <option value="cvt">CVT</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card car-card-admin text-light p-4 mt-5">
                    <h4 className="mb-4">Rental Information</h4>
                    <div className="row mb-3">
                        <div className="col-md-6 ">
                            <label className="form-label">Daily Price (DH)</label>
                            <input type="number" className="form-control1  price-input" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="col-md-6 ">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select1 text-white px-3"
                                value={status} onChange={(e) => setStatus(e.target.value)} >
                                <option value="available" >Available</option>
                                <option value="rented" >Rented</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>
                        <div className="col-md-12 mt-4 ">
                            <label className="form-label">Images</label>
                            <input className="mx-5" type="file" accept="image/*" name="images"  onChange={(e) => setImageFile(e.target.files[0])} />
                        </div>

                    </div>

                </div>
                <div className="d-flex justify-content-end mt-5">
                    <NavLink to={"/admin/vehicles"} className="btn-location nav-link text-light d-flex justify-content-center"><TiDeleteOutline style={{ marginRight: "7px", fontSize: "24px" }} /> Cancel</NavLink>
                    <button type="submit" className="btn-search text-light mx-5 d-flex justify-content-center"><FaSave style={{ marginRight: "10px", fontSize: "20px" }} /> {isEditing ? "Update car" : "Add car"}</button>
                </div>
            </form>
        </>
    )
}