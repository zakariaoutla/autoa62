import { useEffect, useState } from "react";
import axios from "axios";
import CardProductHome from "../../components/Home/CardProductHome";
import { LiaFilterSolid } from "react-icons/lia";
import { MdOutlineClear } from "react-icons/md";

export default function Cars() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;






    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredCars.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredCars.length / productsPerPage);



    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedFuel_Types, setSelectedFuelTypes] = useState([]);
    const [selectedTransmissions, setSelectedTransmissions] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);

    const handleCheckboxChange = (value, setFunction, selectedValues) => {
        if (selectedValues.includes(value)) {
            setFunction(selectedValues.filter((v) => v !== value));
        } else {
            setFunction([...selectedValues, value]);
        }
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setSelectedFuelTypes([]);
        setSelectedTransmissions([]);
        setSelectedColors([]);
        setMinPrice(0);
        setMaxPrice(5000);
    };

    useEffect(() => {
        let filtered = cars;

        if (selectedBrands.length > 0) {
            filtered = filtered.filter((car) => selectedBrands.includes(car.brand));
        }

        if (selectedFuel_Types.length > 0) {
            filtered = filtered.filter((car) => selectedFuel_Types.includes(car.fuel_type));
        }

        if (selectedTransmissions.length > 0) {
            filtered = filtered.filter((car) =>
                selectedTransmissions.includes(car.transmission)
            );
        }

        if (selectedColors.length > 0) {
            filtered = filtered.filter((car) => selectedColors.includes(car.color));
        }

        filtered = filtered.filter((car) => car.price >= minPrice && car.price <= maxPrice);

        setFilteredCars(filtered);
    }, [
        cars,
        selectedBrands,
        selectedFuel_Types,
        selectedTransmissions,
        selectedColors,
        maxPrice,
        minPrice
    ]);



    useEffect(() => {
        axios
            .get("http://localhost:8080/car/cars")
            .then((res) => {
                setCars(res.data);
                setFilteredCars(res.data);
            })
            .catch((err) => console.error(err));
    }, []);


    return (
        <div className="bg-light p-5" style={{paddingTop:"6rem", paddingBottom:"3rem"}}>
            <div className="container-fluid" style={{ marginTop: "7rem" }}>
                <div className="row ">
                    {/* Sidebar */}
                    <div className="col-12 col-md-3">
                        <div className="fixed-sidebar">
                            <div className="summary-box shadow">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-3 mt-2">
                                        <LiaFilterSolid /> Filters
                                    </h5>
                                    <button className="py-1 px-2 bg-white border border-0" onClick={clearFilters}>
                                        <MdOutlineClear color="red" size={25} /> Clear
                                    </button>

                                </div>

                                {/* Brand */}
                                <div className="mb-4 mt-4">
                                    <p className="fw-semibold">Brand</p>
                                    {["BMW", "Ferrari", "Toyota", "Ford", "Tesla", "Porsche"].map(
                                        (brand) => (
                                            <div className="form-check custom-check" key={brand}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={brand}
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            brand,
                                                            setSelectedBrands,
                                                            selectedBrands
                                                        )
                                                    }
                                                />
                                                <label className="form-check-label" htmlFor={brand}>
                                                    {brand}
                                                </label>
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Price Range */}
                                <div className="row mb-3">
                                    <p className="fw-semibold">Price Range</p>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="minPriceInput">Min Price</label>
                                        <input
                                            type="number"
                                            id="minPriceInput"
                                            className="form-control"
                                            value={minPrice}

                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                if (val >= 0 && val <= maxPrice) setMinPrice(val);
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="maxPriceInput">Max Price</label>
                                        <input
                                            type="number"
                                            id="maxPriceInput"
                                            className="form-control"
                                            value={maxPrice}

                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                if (val >= minPrice) setMaxPrice(val);
                                            }}
                                        />
                                    </div>



                                </div>

                                {/* Fuel Type */}
                                <div className="mb-3">
                                    <p className="fw-semibold">Fuel Type</p>
                                    {["Gasoline", "Diesel", "Hybrid", "Electric"].map((type) => (
                                        <div className="form-check custom-check" key={type}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={type}
                                                value={type}
                                                checked={selectedFuel_Types.includes(type)}
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        type,
                                                        setSelectedFuelTypes,
                                                        selectedFuel_Types
                                                    )
                                                }
                                            />
                                            <label className="form-check-label" htmlFor={type}>
                                                {type}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/* Transmission */}
                                <div className="mb-3">
                                    <p className="fw-semibold">Transmission</p>
                                    {["Automatic", "Manual", "CVT", "Single Speed"].map((gear) => (
                                        <div className="form-check custom-check" key={gear}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={gear}
                                                value={gear}
                                                checked={selectedTransmissions.includes(gear)}
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        gear,
                                                        setSelectedTransmissions,
                                                        selectedTransmissions
                                                    )
                                                }
                                            />
                                            <label className="form-check-label" htmlFor={gear}>
                                                {gear}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/* Color */}
                                <div className="mb-3">
                                    <p className="fw-semibold">Color</p>
                                    {["Silver", "Red", "White", "Black", "Blue", "Green"].map(
                                        (color) => (
                                            <div className="form-check custom-check" key={color}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={color}
                                                    checked={selectedColors.includes(color)}
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            color,
                                                            setSelectedColors,
                                                            selectedColors
                                                        )
                                                    }
                                                />
                                                <label className="form-check-label" htmlFor={color}>
                                                    {color}
                                                </label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Car Grid */}
                    <div className="col-md-9">
                        <div className="mb-4 d-flex justify-content-between align-items-center">
                            <h5 className="mt-3">Showing {currentProducts.length} cars</h5>
                        </div>

                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {currentProducts.map((car) => (
                                <div className="col" key={car.id}>
                                    <CardProductHome car={car} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pagination d-flex justify-content-center mt-5">
                        <button
                            className="btn btn-outline-warning mx-1"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`btn mx-1 ${currentPage === page ? "btn-warning text-light" : "btn-outline-warning"}`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            className="btn btn-outline-warning mx-1"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
