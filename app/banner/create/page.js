"use client";
import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "../../form/style.css";

export default function Dashboard() {
    const [title, setTitle] = useState('');
    const [offerTitle, setOfferTitle] = useState('');
    const [url, setUrl] = useState("");
    const [homeBanner, setBanner] = useState("");
    const [image, setImage] = useState("");

    const handleCoverImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Once the FileReader has read the file, set the base64 data
                console.log(reader.result);
                setImage(reader.result);
                //setImage(reader.result);
            };

            // Read the file as a data URL (base64)
            console.log(reader.readAsDataURL(file))
        }
    };
    const submit = async(event) => {
        event.preventDefault();
        var data={
           "home_banner":{
            "offer_name": offerTitle,
            "title": title,
            "image": image,
            "link":url,
           }
        }

        const response = await axiosClient.post('/app-info/create-update', data);
        console.log("response", response);
        if(response.data.success==false){
            Swal.fire({
                title: 'error',
                text: response.data.message,
                icon: 'error',
                // confirmButtonText: 'Cool'
            })
        } else if (response.data.success==true) {
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
                const response = await axiosClient.get("/app-info/get");
                const responseData = response.data; // Rename data variable for clarity

                if (responseData.success === true) {
                    setBanner(responseData.appinfo.home_banner);
                    let data=responseData.appinfo.home_banner
                    setTitle(data.title);
                    setOfferTitle(data.offer_name);
                    setUrl(data.link);
                    setImage(data.image);
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
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <div className='dashboard-table-wrap flex-spb'>
                        <form onSubmit={submit} >
                            <div className='form-card'>
                                <div className='card-header'>
                                    <h5 className='mb-0 h6'>Home Offer Banner</h5>
                                </div>
                                <div className='card-body'>
                                    <div className='form-group row'>
                                        <label className='col-md-3 col-from-label'>
                                            Title <span className='text-danger'>*</span>
                                        </label>
                                        <div className='col-md-8'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='business_name'
                                                placeholder='Title'
                                                required
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-md-3 col-from-label'>
                                            Offer Title <span className='text-danger'>*</span>
                                        </label>
                                        <div className='col-md-8'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='offer_title'
                                                placeholder='Offer Title'
                                                required
                                                value={offerTitle}
                                                onChange={(e) => setOfferTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-md-3 col-from-label'>
                                        Url Link <span className='text-danger'>*</span>
                                        </label>
                                        <div className='col-md-8'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='business_name'
                                                placeholder='Url'
                                                required
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-from-label">
                                            Cover Image
                                        </label>
                                        <div className="col-md-8">
                                            <div className="file-wrap" data-toggle="aizuploader" data-type="image" data-multiple="true">
                                                <input type="file" name="cover_image" required className="selected-files"
                                                    onChange={handleCoverImage} />
                                            </div>
                                            <div className="file-preview box sm"></div>
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
        </div>
    );
}
