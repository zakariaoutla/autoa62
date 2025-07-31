import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CardProduct from "../../components/Admin/CardProductadmin";
import StatusCard from "../../components/Admin/StatusCard";

export default function Vehicles() {
    const [cars, setCars] = useState([]);
    const [status, setStatus] = useState('All Status')
    const [searchTerm, setSearchTerm] = useState('');


    const availableCount = cars.filter(car => car.status.toLowerCase() === "available").length;
    const rentedCount = cars.filter(car => car.status.toLowerCase() === "rented").length;
    const maintenanceCount = cars.filter(car => car.status.toLowerCase() === "maintenance").length;

    useEffect(() => {

        const url =
            status === 'All Status'
                ? 'http://localhost:8080/car/cars'
                : `http://localhost:8080/car/cars/status/${status}`;

        axios.get(url)
            .then(res => setCars(res.data))
            .catch(err => console.error('Error fetching cars:', err));
    }, [status]);


    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/car/delete-car/${id}`)
            .then(() => {
                setCars(prevCars => prevCars.filter(car => car.id !== id));
            })
            .catch(err => console.error("❌ Error deleting car:", err));
    }

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="text-light">
                        <h3 style={{ fontWeight: '700' }}>Vehicle Management</h3>
                        <p style={{ color: "#736F75" }}>Manage your fleet of rental vehicles</p>
                    </div>
                    <div className="mt-4">
                        <NavLink to={"/admin/add-car"} className="btn-search nav-link text-light"><FaPlus />  Add Vehicle</NavLink>
                    </div>
                </div>

                <div className="mt-5 d-flex justify-content-between row">
                    <div className="searchinput col-md-10"><input type="text" placeholder="Search Vehicle..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>

                    <div className="col-md-2">
                        <select
                            className="formSelect text-white px-3"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)} >
                            <option>All Status</option>
                            <option>Available</option>
                            <option>Rented</option>
                            <option>Maintenance</option>
                        </select>
                    </div>
                </div>

                <div>

                </div>
                <div className="row mt-5 container">
                 <div className="col-md-4 mb-4">
                    <StatusCard
                        title="Available Vehicles"
                        count={availableCount}
                        description="Ready for rental"
                        status="Active"
                    />
                 </div>
                    <div className="col-md-4 mb-4">
                        <StatusCard
                        title="Rented Vehicles"
                        count={rentedCount}
                        description="Currently rented out"
                        status="pending"
                    />
                    </div>
                    
                    <div className="col-md-4 mb-4">
                        <StatusCard
                        title="Maintenance Vehicles"
                        count={maintenanceCount}
                        description="Under maintenance"
                        status="danger"
                    />
            
                    </div>
                </div>


                <div className="mt-4" style={{ marginRight: "60px" }}>
                    <div className="row">
                        {cars.filter(car =>
                            car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            car.model?.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length === 0 && (
                                <p className="text-light text-center" style={{ height: "320px" }}>No vehicles found.</p>
                            )}

                        {cars
                            .filter(car =>
                                car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                car.model?.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((car, index) => (
                                <div className="col-md-4 mb-4" key={index}>
                                    <CardProduct
                                        brand={car.brand}
                                        model = {car.model}
                                        status={car.status}
                                        year={car.year}
                                        licenseplate={car.licenseplate}
                                        mileage={car.mileage}
                                        price={car.price}
                                        id={car.id}
                                        filename={car.filename}
                                        onDelet={handleDelete}
                                    />
                                </div>
                            ))}
                    </div>
                </div>



            </div>


        </>
    )
}