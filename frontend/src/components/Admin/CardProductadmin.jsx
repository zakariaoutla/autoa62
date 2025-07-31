import { NavLink } from "react-router-dom";
import { MdPreview } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

export default function CardProductAdmin(props) {
    const [showModal, setShowModal] = useState(false);
    

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const confirmDelete = () => {
        props.onDelet(props.id);
        closeModal();
    };
    return (
        <>

            <div className="card p-3 car-card-admin">
                <div className="card-header1 p-1"><img className="card-img-top car-image" src={`http://localhost:8080/uploads/${props.filename}`} alt={props.brand} /></div>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title text-light">{props.brand} {props.model}</h5>
                        <h6 className={`status-${props.status.toLowerCase().replace(" ", "-")}`} >{props.status}</h6>
                    </div>
                    <div className="d-flex justify-content-between pt-2" style={{ color: "#B3B3B3", fontSize: "15px" }}>
                        <label>Year:</label>
                        <span>{props.year}</span>
                    </div>
                    <div className="d-flex justify-content-between pt-2" style={{ color: "#B3B3B3", fontSize: "15px" }}>
                        <label>License Plate:</label>
                        <span>{props.licenseplate}</span>
                    </div>
                    <div className="d-flex justify-content-between pt-2" style={{ color: "#B3B3B3", fontSize: "15px" }}>
                        <label>Mileage:</label>
                        <span>{props.mileage}</span>
                    </div>
                    <div className="d-flex justify-content-between pt-2" style={{ color: "#B3B3B3", fontSize: "15px" }}>
                        <label>Daily Price:</label>
                        <span style={{ color: "#ff9900", fontWeight: "800" }}>{props.price}Dh</span>
                    </div>
                </div>
                <div className="d-flex mt-3">
                    <NavLink to={'/car/'+props.id} className="btn1 text-light text-center" ><MdPreview /> View</NavLink>
                    <NavLink to={'/admin/edit-car/' + props.id} className="btn1 text-light text-center"><FaEdit /> Edit</NavLink>
                    <div className=" mx-3" style={{ backgroundColor: '#DC4344', color: "white", borderRadius: '7px' }}><NavLink className="btn" onClick={openModal} style={{ border: "none", fontSize: "19px" }}><MdDelete /></NavLink></div>
                </div>
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
                                <p>Do you really want to delete? <strong>{props.brand}</strong> ?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}