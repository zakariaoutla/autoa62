import { FaShieldAlt, FaCertificate, FaCheckCircle, FaCreditCard } from "react-icons/fa";

export default function TrustedSection() {
    const features = [
        {
            icon: <FaShieldAlt className="feature-icon text-success" />,
            title: "GDPR Compliant",
            description: "Full compliance with Morocco data protection regulations",
        },
        {
            icon: <FaCertificate className="feature-icon text-warning" />,
            title: "ISO 27001 Certified",
            description: "International standard for information security management",
        },
        {
            icon: <FaCheckCircle className="feature-icon text-primary" />,
            title: "EU Safety Standards",
            description: "All vehicles meet Morocco safety and emission standards",
        },
        {
            icon: <FaCreditCard className="feature-icon text-warning" />,
            title: "Secure Payments",
            description: "PCI DSS compliant payment processing",
        },
    ];
    return (
        <>
            <div className="container py-5">
                <div className="row g-4">
                    {features.map((feature, index) => (
                        <div className="col-12 col-sm-6 col-lg-3" key={index}>
                            <div className="feature-card text-center p-4 h-100">
                                {feature.icon}
                                <h5 className="fw-bold mt-3">{feature.title}</h5>
                                <p className="text-muted mb-0">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}