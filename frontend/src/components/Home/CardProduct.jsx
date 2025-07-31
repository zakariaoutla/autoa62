export default function CardProduct({ car }) {
    return (
        <div className="car-card p-3 bg-white">
            <div className="position-relative">
                <img
                    src={`http://localhost:8080/uploads/${car.filename}`}
                    alt={car.model}
                    className="img-fluid"
                    style={{ width: "100%", height: "340px", borderRadius: "30px" }}
                />
                <span className="badge bg-warning text-white position-absolute top-0 end-0 m-3 p-2">
                    €{car.price}/day
                </span>
            </div>
            <h5 className="mt-3 fw-bold" style={{ fontSize: "30px", fontWeight: "700" }}>{car.brand} {car.model}</h5>

            <div className="row d-flex mt-4 text-center">
                <p className="col-3 col-md-3 me-2 text-muted py-1 px-2" style={{ backgroundColor: "#F8F9FA", borderRadius: "10px" }}>{car.fuel_type}</p>
                <p className="col-3 col-md-3 me-2 text-muted py-1 px-1" style={{ backgroundColor: "#F8F9FA", borderRadius: "10px" }}>{car.transmission}</p>
                <p className="col-3 col-md-3 text-muted py-1 px-3" style={{ backgroundColor: "#F8F9FA", borderRadius: "10px" }}>{car.mileage}</p>

            </div>


            <div className="d-flex flex-wrap gap-2 mb-3">
                {car.features?.map((f, idx) => (
                    <span key={idx} className="badge bg-light text-secondary">
                        {f}
                    </span>
                ))}
            </div>
            
        </div>
    );
}
