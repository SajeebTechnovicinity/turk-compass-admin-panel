"use client";
import axiosClient from "@/app/axiosClient";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "../../form/style.css";
export default function Dashboard() {
    const searchParames = useSearchParams();
    const id = searchParames.get("id");
    const category_id = searchParames.get("category");

    const [industryList, setindustry] = useState([]);
    const [categories, setcategories] = useState([]);
    const [category, setCategory] = useState(searchParames.get("category"));
    const [title, setTitle] = useState(searchParames.get("name"));
    const [image, setImage] = useState();
    const handleCoverImage = (e) => {
        console.log(e);
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5 MB in bytes
                Swal.fire({
                    title: 'Error',
                    text: 'The uploaded cover image exceeds the maximum allowed size of 5MB. Please choose a smaller file',
                    icon: 'error',
                });
                // if (fileInputRef.current) {
                //     fileInputRef.current.value = ''; // Reset the file input field
                // }
                return;
            }
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
            "category":category,
            "name":title,
            "image":image,
            "id":id,
        }

        const response = await axiosClient.post('/subcategory/edit', data);
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
                                    <h5 className='mb-0 h6'>Subcategory Create</h5>
                                </div>
                                <div className='card-body'>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Category <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <select
                                            className="form-control"
                                            name="category"
                                            required
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="">Select One</option>
                                            {categories && categories.map((category, index) => (
                                                <option key={index} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                    <div className='form-group row'>
                                        <label className='col-md-3 col-from-label'>
                                            Title <span className='text-danger'>*</span>
                                        </label>
                                        <div className='col-md-8'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='business_name'
                                                placeholder='Enter your business name'
                                                required
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-from-label">
                                            Cover Image
                                        </label>
                                        <div className="col-md-8">
                                            <div className="input-group file-wrap" data-toggle="aizuploader" data-type="image" data-multiple="true">
                                                <input type="file" name="cover_image"  className="selected-files"
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
