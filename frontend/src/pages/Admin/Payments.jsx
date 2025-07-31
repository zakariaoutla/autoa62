import { BiExport } from "react-icons/bi";
import { useState, useEffect} from "react";
import axios from "axios";
import Status from "../../components/Admin/Status";
import StatusCard from "../../components/Admin/StatusCard";

export default function Payments() {
    const [payments, setPayments] = useState([]);
    const [status, setStatus] = useState('All Status');
    const [searchTerm, setSearchTerm] = useState('');


    const totalPayments = payments.length;
  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingPayments = payments.filter(p => p.status === "Pending").length;
  const failedPayments = payments.filter(p => p.status === "Failed").length;

    useEffect(() => {
        axios.get('http://localhost:8080/payment/payments')
            .then(res => setPayments(res.data))
            .catch(err => console.error(err));
    }, []);




    const filteredPayments = payments.filter(payment => {
        const matchStatus = status === "All Status" || payment.status === status;
        const matchSearch =
            payment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.payment_id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchStatus && matchSearch;
    });

    return (
        <>
            <div>
                <div className="d-flex justify-content-between">
                    <div className="text-light">
                        <h3 style={{ fontWeight: '700' }}>Payments & Invoices</h3>
                        <p style={{ color: "#736F75" }}>Track all payment records and generate invoices</p>
                    </div>
                </div>

                <div className="mt-5 d-flex justify-content-between row">
                    <div className="searchinput col-md-10">
                        <input
                            type="text"
                            placeholder="Search Customers or Payment ID..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}

                        />
                    </div>

                    <div className="col-md-2">
                        <select
                            className="formSelect text-white px-3"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option>All Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>
                </div>


               <div className="row mt-5 container">
                                   <div className="col-md-3 mb-4">
                                       <StatusCard
                                           title="Total Payments"
                                           count={totalPayments}
                                           status="completed"
                                       />
                                   </div>
                                   <div className="col-md-3 mb-4">
                                       <StatusCard
                                           title="Total Revenue"
                                           count={`${totalRevenue} DH`}
                                           status="completed"
                                       />
                                   </div>
                                   <div className="col-md-3 mb-4">
                                       <StatusCard
                                           title="Pending Payments"
                                           count={pendingPayments}
                                           status="Active"
                                       />
                                   </div>
                                   <div className="col-md-3 mb-4">
                                       <StatusCard
                                           title="Failed Payments"
                                           count={failedPayments}
                                           status="completed"
                                       />
                                   </div>
                               </div>


                <table className="table overflow-hidden mt-5">
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Customer</th>
                            <th>Rental Details</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center text-white">No payments found.</td>
                            </tr>
                        ) : (
                            filteredPayments.map(payment => (
                                <tr key={payment.id}>
                                    <td>{payment.payment_id}</td>
                                    <td>{payment.customer_name}</td>
                                    <td>
                                        <strong>{payment.car_model}</strong><br />
                                        Rental: {payment.rental_code}
                                    </td>
                                    <td>${Number(payment.amount).toFixed(2)}</td>
                                    <td>{payment.payment_method}</td>
                                    <td>{payment.payment_date}</td>
                                    <td><Status bgstatus={payment.status} typestatus={payment.status} mode="table" /></td>
                                    <td>
                                        <a
                                            href={`http://localhost:8080/payment/invoice/${payment.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btnInvoice nav-link text-light"
                                        >
                                            <BiExport className="mx-2" /> Invoice
                                        </a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>
        </>
    );

};