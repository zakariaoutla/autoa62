import { useState } from 'react';
import { FaCalendarAlt, FaSearch, FaLocationArrow } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function QuickBooking() {
    const navigate = useNavigate();
    
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [rental_date, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('10:00');
    const [return_date, setDropoffDate] = useState('');
    const [dropoffTime, setDropoffTime] = useState('10:00');
    

    const handleSearch = async () => {
        if (!pickupLocation || !dropoffLocation || !rental_date || !return_date) {
            alert('Please fill all fields');
            return;
        }

        const requestBody = {
            pickup_city: pickupLocation,
            dropoff_city: dropoffLocation,
            rental_date,
            return_date,
        };


        try {
            const response = await axios.post('http://localhost:8080/rental/available-cars', requestBody);
            localStorage.setItem('availableCars', JSON.stringify(response.data));
           
            navigate('/available-cars');



        } catch (error) {
            console.error('Error fetching cars:', error);
            alert('Something went wrong.');
        }
    };

    return (
        <div className="container my-5">
            <div className="p-5 bg-white shadow-lg" style={{ borderRadius: "20px" }}>
                <div className="mb-4 d-flex align-items-center gap-3">
                    <FaCalendarAlt className=" me-2" size={24} color='#FF9700' />
                    <div>
                        <h4 className="mb-0 fw-bold" style={{ color: "#2C3E50" }}>Quick Booking</h4>
                        <small className="text-secondary ">Find and reserve your perfect vehicle</small>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Pickup Location</label>
                        <select className="form-select" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
                            <option value="">Select pickup city</option>
                            <option value="Azilal">Azilal</option>
                            <option value="Beni Mellal">Beni Mellal</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Rabat">Rabat</option>
                            <option value="Marrakech">Marrakech</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Dropoff Location</label>
                        <select className="form-select" value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)}>
                            <option value="">Select dropoff city</option>
                            <option value="Azilal">Azilal</option>
                            <option value="Beni Mellal">Beni Mellal</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Rabat">Rabat</option>
                            <option value="Marrakech">Marrakech</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Pickup Date</label>
                        <input type="date" className="form-control" value={rental_date} onChange={(e) => setPickupDate(e.target.value)} />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Pickup Time</label>
                        <input type="time" className="form-control" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Dropoff Date</label>
                        <input type="date" className="form-control" value={return_date} onChange={(e) => setDropoffDate(e.target.value)} />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Dropoff Time</label>
                        <input type="time" className="form-control" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} />
                    </div>
                </div>

                <div className="row mt-4  ">
                    <div className='col-md-9'>
                        <button className=" w-100 btn-search px-4 fw-bold d-flex align-items-center justify-content-center" onClick={handleSearch}>
                            <FaSearch className="me-2" />
                            Search Available Cars
                        </button>
                    </div>
                    <div className='col-md-3'><button className="w-100 btn-location d-flex align-items-center justify-contant-center">
                        <FaLocationArrow className="me-2" />
                        Use My Location
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
