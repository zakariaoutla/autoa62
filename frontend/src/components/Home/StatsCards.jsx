import { FaStar, FaUsers, FaHeart, FaHeadset } from 'react-icons/fa';
export default function StatsCards() {
    const statsData = [
        {
            value: '4.9',
            label: 'Average Rating',
            icon: <FaStar className="stat-icon text-warning" />,
        },
        {
            value: '50K+',
            label: 'Happy Customers',
            icon: <FaUsers className="stat-icon text-primary" />,
        },
        {
            value: '98%',
            label: 'Satisfaction Rate',
            icon: <FaHeart className="stat-icon text-danger" />,
        },
        {
            value: '24/7',
            label: 'Customer Support',
            icon: <FaHeadset className="stat-icon text-info" />,
        },
    ];

    return (
        <>
            <div className="container py-5">
                <div className="row justify-content-center">
                    {statsData.map((stat, index) => (
                        <div className="col-md-3 col-sm-6 mb-4" key={index}>
                            <div className="stat-card text-center shadow p-4 bg-white">
                                <h2 className="stat-value fw-bold">{stat.value}</h2>
                                <p className="text-muted mb-2">{stat.label}</p>
                                <div className="stat-icon">{stat.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
