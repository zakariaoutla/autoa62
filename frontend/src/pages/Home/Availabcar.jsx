import { useEffect } from "react";
import CardProductHome from "../../components/Home/CardProductHome";
import { useState } from "react";
import axios from "axios";

export default function Availabcar() {
    const [cars, setAvailableCars] = useState([]);

    useEffect(() => {
        const cars = localStorage.getItem('availableCars');
        if (cars) {
            setAvailableCars(JSON.parse(cars));
        }
    }, []);

    return (
        <>
            <div className="container py-5 mt-5">
                <div className="row g-4">
                    {cars.slice(0, 8).map(car => (
                        <div className="col-md-4" key={car.id}>
                            <CardProductHome car={car} />
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}