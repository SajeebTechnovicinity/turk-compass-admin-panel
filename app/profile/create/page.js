"use client";
import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "../../form/style.css";

export default function Form() {

    const [email, setEmail] = useState('');

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [userInfo, setUserInfo] = useState([]);
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');

    useEffect(() => {
        const fetchPackages = async () => {     
            try {
                const response = await axiosClient.get(`/package/get/`);
                setPackages(response.data);
            
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };


        const getuserInfo = async () => {     
            try {
                const response = await axiosClient.get(`/user-profile/list`);
                // console.log(response.data.profile);
                setUserInfo(response.data.profile);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        getuserInfo();

        fetchPackages();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission reload


        
        try {
            const data = {
                password: password,
            };

            if(password!==confirmPassword){
                Swal.fire({
                    title: 'Error',
                    text: "Password and confirm password does not match",
                    icon: 'error',
                });
                return;
            }

            const response = await axiosClient.post('/user/change-password', data);
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
                <h3 className='title'>My Profile</h3>
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>

                <div className='form-card'>
                            <div className='card-header'>
                                <h5 className='mb-0 h6'>User Information</h5>
                            </div>
                            <div className='card-body'>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Username 
                                    </label>
                                    <div className='col-md-8'>
                                    {userInfo && userInfo.name}
                                        {/* <input
                                            type='text'
                                            className='form-control'
                                            name='user_name'
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            placeholder='Enter your username'
                                            required
                                        /> */}
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Email 
                                    </label>
                                    <div className='col-md-8'>
                                    {userInfo && userInfo.email}
                                    
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Type 
                                    </label>
                                    <div className='col-md-8'>
                                    {userInfo && userInfo.usertype}
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Package 
                                    </label>
                                    <div className='col-md-8'>
                                    {userInfo && userInfo.package_type?userInfo.package_type:'No Package Available'}
                                    </div>
                                </div>
                            </div>
                        </div>



                    <form onSubmit={handleSubmit}>
                        <div className='form-card'>
                            <div className='card-body'>

                            <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Password 
                                    </label>
                                    <div className='col-md-8'>
                                    <input
                                            type='password'
                                            className='form-control'
                                            name='user_name'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='Enter your New Password'
                                            required
                                        />
                                    </div>
                                    </div>
                                    <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                    Confirm Password
                                    </label>
                                    <div className='col-md-8'>
                                    <input
                                            type='password'
                                            className='form-control'
                                            name='user_name'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder='Confirm Password'
                                            required
                                        />
                                    </div>
                                    </div>

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
