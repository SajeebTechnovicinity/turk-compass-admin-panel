"use client";
import axiosClient from "@/app/axiosClient";
import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import "../../form/style.css";

export default function Dashboard() {
    const [industryList, setindustry] = useState([]);
    const [categories, setcategories] = useState([]);
    const [category, setCategory] = useState();
    const [title, setTitle] = useState();
    const [image, setImage] = useState();
    const fileInputRef = useRef(null); 
    const handleCoverImage = (e) => {
        console.log(e);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            console.log("hello");
            reader.onloadend = () => {
                // Once the FileReader has read the file, set the base64 data
                setImage(reader.result);
                //setImage(reader.result);
            };

            // Read the file as a data URL (base64)
            reader.readAsDataURL(file);
        }
    };
    const submit = async(event) => {
        event.preventDefault();
        var data={
            "name":title
        }
        const response = await axiosClient.post('/tag/create', data);
        console.log("response", response);
        if(response.data.success==false){
            Swal.fire({
                title: 'error',
                text: response.data.message,
                icon: 'error',
                // confirmButtonText: 'Cool'
            })
        }
        else if (response.data.success==true) {
            setTitle('');
            Swal.fire({
                title: 'success',
                text: response.data.message,
                icon: 'success',
                // confirmButtonText: 'Cool'
            })

    }
}
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get("/category/list");
                const responseData = response.data; // Rename data variable for clarity
                if (responseData.success === true) {
                    setcategories(responseData.categories);
                }
            } catch (error) {
                console.error('Error fetching business posts:', error);
            }
        };

        fetchData();
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
                {/* <h3 className='title'>Industry Create</h3> */}
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <div className='dashboard-table-wrap flex-spb'>
                        <form onSubmit={submit} >
                            <div className='form-card'>
                                <div className='card-header'>
                                    <h5 className='mb-0 h6'>Tag Create</h5>
                                </div>
                                <div className='card-body'>
                                    <div className='form-group row'>
                                        <label className='col-md-3 col-from-label'>
                                            Name <span className='text-danger'>*</span>
                                        </label>
                                        <div className='col-md-8'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='business_name'
                                                placeholder='Enter your tag name'
                                                required
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                
                                    <div className="form-group mb-0 text-right">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>

                                </div>
                            </div>



                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
