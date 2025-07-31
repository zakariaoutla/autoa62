import { useState } from "react";
import { FaCar } from "react-icons/fa6";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CardForm from "../../components/Admin/CardForm";
export default function NewCar() {
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [licenseplate, setLicenseplate] = useState('')
    const [color, setColor] = useState('')
    const [mileage, setMileage] = useState('')
    const [fuel_type, setFuel_type] = useState("gasoline")
    const [transmission, setTransmission] = useState("automatic")
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState("available")
    const [image, setImageFile] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();



    const Handelsubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('brand', brand);
        formData.append('model', model);
        formData.append('year', year);
        formData.append('color', color);
        formData.append('price', price);
        formData.append('mileage', mileage);
        formData.append('licenseplate', licenseplate);
        formData.append('fuel_type', fuel_type);
        formData.append('status', status);
        formData.append('transmission', transmission);
        if (image) {
            formData.append('images', image);
        }


        try {
            const res = await axios.post('http://localhost:8080/car/new-car', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setShowModal(true);
            setTimeout(() => {
                const newCarId = res.data.carId;
                navigate(`/admin/edit-car/${newCarId}`);
            }, 1000);
        } catch (error) {
            console.error('Erreur POST:', error);
        }
    };



    return (
        <>
           <div className="container">
            <div className="d-flex">
                <div>
                    <span style={{ color: "white", fontSize: "40px", backgroundColor: "#ff9900", padding: "10px", borderRadius: "10px" }}><FaCar /></span>
                </div>
                <div className="text-light mx-4">
                    <h3>Add New Vehicle</h3>
                    <p>Add a new vehicle to your rental fleet</p>
                </div>
            </div>


            <div className="container mt-5">
                <CardForm brand={brand} setBrand={setBrand}
                    model={model} setModel={setModel}
                    year={year} setYear={setYear}
                    price={price} setPrice={setPrice}
                    color={color} setColor={setColor}
                    mileage={mileage} setMileage={setMileage}
                    licenseplate={licenseplate} setLicenseplate={setLicenseplate}
                    fuel_type={fuel_type} setFuel_type={setFuel_type}
                    status={status} setStatus={setStatus}
                    transmission={transmission} setTransmission={setTransmission}
                    onSubmit={Handelsubmit}
                    setImageFile={setImageFile}
                    isEditing={false}
                />

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
                        ✅ The car has been added successfully!
                    </div>
                )}

            </div >

  </div>

        </>
    )
}