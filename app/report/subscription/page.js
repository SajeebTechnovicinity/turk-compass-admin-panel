"use client";
import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
    const [industryList, setindustry] = useState([]);
    const [startDate, setStartDate] = useState("2024-06-23");
    const [endDate, setEndDate] = useState("2024-06-27");
    const [paymentList, setList] = useState([]);

    async function deleteaccount(id) {
        const response = await axiosClient.get(
            `/app-info/petition-delete?id=${id}`
        );
        fetchData();
        if (response.data.success == false) {
            Swal.fire({
                title: "error",
                text: response.data.message,
                icon: "error",
                // confirmButtonText: 'Cool'
            });
        } else if (response.data.success == true) {
            Swal.fire({
                title: "success",
                text: response.data.message,
                icon: "success",
            });
        }
    }

    const reportdata = async () => {
        try {
            const data = {
                startDate: startDate,
                endDate: endDate,
                type: "subscription",
            };
            const response = await axiosClient.post(
                "/payment/payment-report",
                data
            );
            const responseData = response.data; // Rename data variable for clarity

            if (responseData.success === true) {
                setList(responseData.payments);
            }
        } catch (error) {
            console.error("Error fetching business posts:", error);
        }
    };

    const search = async () => {
        reportdata();
    };

    const fetchData = async () => {
        try {
            const response = await axiosClient.get(
                "/app-info/petition/petitionList"
            );
            const responseData = response.data; // Rename data variable for clarity

            if (responseData.success === true) {
                setindustry(responseData.info);
            }
        } catch (error) {
            console.error("Error fetching business posts:", error);
        }
    };
    useEffect(() => {
        fetchData();
        reportdata();
    }, []); // Empty dependency array means it runs only once on mount
    return (
        <div className='dashboard-content'>
            <div className='dashboard-content__topbar topbar flex-ctr'>
                <div className='drawer-open'>
                    <span className='slice-top'></span>
                    <span className='slice-middle'></span>
                    <span className='slice-bottom'></span>
                </div>
            </div>
            <div className='dashboard-content__title-bar title-bar flex-ctr-spb'>
                <h3 className='title'>Subscription Report</h3>
            </div>

            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <div className='form-card'>
                        <div className='card-body'>
                            <div className='form-group row'>
                                <div className='date-search'>
                                    <label>
                                        <span>From</span>
                                        <input
                                            type='date'
                                            className='form-control'
                                            name='business_name'
                                            placeholder='Enter your title'
                                            required
                                            value={startDate}
                                            onChange={(e) =>
                                                setStartDate(e.target.value)
                                            }

                                        />
                                    </label>
                                    <label>
                                        <span>To</span>
                                        <input
                                            type='date'
                                            className='form-control'
                                            name='business_name'
                                            placeholder='Enter your title'
                                            required
                                            value={endDate}
                                            onChange={(e) =>
                                                setEndDate(e.target.value)
                                            }

                                        />
                                    </label>

                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                        onClick={search}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className='dashboard-table-wrap flex-spb'>
                        <table className='dashboard-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Payment</th>
                                    <th>User Name</th>
                                    <th>Payment ID</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentList &&
                                    paymentList.map((post, index) => {
                                        return (
                                            <tr key={post._id}>
                                                <td>{index + 1}</td>
                                                <td>SUBSCRIPTION</td>
                                                <td>{post.user_id.userName}</td>
                                                <td>{post.payment_id}</td>
                                                <td>{post.amount}</td>
                                                <td>{post.date}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
