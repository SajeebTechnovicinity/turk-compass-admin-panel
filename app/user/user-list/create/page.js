"use client";
import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "../../../form/style.css";

export default function Form() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');

    useEffect(() => {
        const fetchPackages = async () => {     
            try {
                const response = await axiosClient.get(`/package/get/`);
                setPackages(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission reload
        
        try {
            const data = {
                user_name: userName,
                email: email,
                password: password,
                package_type: selectedPackage
            };

            console.log('Submitting data:', data); // Debug log to check data

            const response = await axiosClient.post('/user-profile/create/', data);
            console.log("response", response);

            if (response.data.success === false) {
                Swal.fire({
                    title: 'Error',
                    text: response.data.message,
                    icon: 'error',
                });
            } else if (response.data.success === true) {
                Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                });

                setEmail('');
                setPassword('');
                setUserName('');
                setSelectedPackage('');

                // handle success, e.g., redirect or show success message
            } else {
                Swal.fire({
                    title: 'Error',
                    text: "Something went wrong",
                    icon: 'error',
                });
            }
        } catch (error) {
            console.error('Error creating user profile:', error);
            Swal.fire({
                title: 'Error',
                text: "There was an error creating the user profile.",
                icon: 'error',
            });
        }
    };

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
                <h3 className='title'>User Create</h3>
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-card'>
                            <div className='card-header'>
                                <h5 className='mb-0 h6'>User Information</h5>
                            </div>
                            <div className='card-body'>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Username <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='user_name'
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            placeholder='Enter your username'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Email <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='email'
                                            className='form-control'
                                            name='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter your email'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Password <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='password'
                                            className='form-control'
                                            name='password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='Enter your password'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Package <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <select
                                            className="form-control"
                                            name="package"
                                            required
                                            value={selectedPackage}
                                            onChange={(e) => setSelectedPackage(e.target.value)}
                                        >
                            
                                            <option value="">Select One</option>
     
                                                <option key="premium" value="premium">
                                                    Premium
                                                </option>
                                                <option key="premium_employer" value="premium_employer">
                                                    Premium Employer
                                                </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='form-card'>
                            <div className='card-body'>
                                <div className="btn-submit mt-40">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
