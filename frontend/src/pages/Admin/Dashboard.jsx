import { LiaCarSideSolid } from "react-icons/lia";
import { CiCalendar } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import DaschCard from "../../components/Admin/DashCard";
import { useState, useEffect } from "react";
import axios from "axios";
import WeeklyRevenueChart from "../../components/Admin/WeeklyRevenueChart";
import StatusChart from "../../components/Admin/StatusChart";



export default function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/rental/dashboard-stats')
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!stats) return <p>Loading...</p>;


    const vehiclesChange = stats.newVehiclesThisWeek - stats.newVehiclesLastWeek;
    const rentalsChange = stats.newActiveRentalsYesterday;
    const customersChange = stats.newCustomersThisMonth;

    const formatChange = (num) => (num > 0 ? `${num}` : num === 0 ? '0' : `${num}`);
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="text-light">
                        <h1 style={{ fontWeight: '700' }}>Dashboard</h1>
                        <p style={{ color: "#736F75" }}>Welcome back! Here's what's happening with your car rental business.</p>
                    </div>
                </div>


                <div className="row mt-5">
                    <div className="col-12 col-md-3 mb-3">
                        <DaschCard
                            title="Total Vehicles"
                            totalVehicles={stats.totalVehicles}
                            changeAmount={formatChange(vehiclesChange)}
                            timeFrame="this week"
                            icon={<LiaCarSideSolid color="#ff9900" size={40} />}
                        />
                    </div>
                    <div className="col-12 col-md-3 mb-3">
                        <DaschCard
                            title="Active Rentals"
                            totalVehicles={stats.activeRentals}
                            changeAmount={rentalsChange}
                            timeFrame="from yesterday"
                            icon={<CiCalendar color="#ff9900" size={40} />}
                        />
                    </div>
                    <div className="col-12 col-md-3 mb-2">
                        <DaschCard
                            title="Total Customers"
                            totalVehicles={stats.totalCustomers}
                            changeAmount={customersChange}
                            timeFrame="this month"
                            icon={<FaUsers color="#ff9900" size={40} />}
                        />
                    </div>
                    <div className="col-12 col-md-3 mb-3">
                        <DaschCard
                            title="Monthly Revenue"
                            totalVehicles={`${stats.monthlyRevenue} Dh`}
                            changeAmount={`${stats.growth}%`}
                            timeFrame="growth"
                            icon={<CiMoneyBill color="#ff9900" size={50} />}
                        />
                    </div>
                </div>


                <div className="mt-5">
                    <div className="d-flex justify-content-between flex-wrap">
                        <div className="graph" style={{ flexBasis: '48%', minWidth: '300px',  marginBottom: '1rem' }}>
                            <div className="p-3">
                                <h5 className="text-light">Weekly Revenue</h5>
                                <p style={{ color: "#A3A3A5" }}>Revenue trend for the past 7 days</p>
                                <WeeklyRevenueChart />
                            </div>
                        </div>
                        <div className="graph" style={{ flexBasis: '48%', minWidth: '300px',  marginBottom: '1rem' }}>
                            <div className="p-3">
                                <h5 className="text-light">Vehicle Status</h5>
                                <p style={{ color: "#A3A3A5" }}>Current status of all vehicles</p>
                                <StatusChart />
                            </div>
                        </div>
                    </div>
                </div>







            </div>

        </>
    )
}