"use client";

import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import "./style.css";

export default function appInfo() {
    const [apping, setAppinfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data from an API or other source
           const appinfo = await axiosClient.get("/app-info/get");
           console.log(appinfo.data.appinfo);
           setAppinfo(appinfo.data.appinfo);
        };
        fetchData();
    }, []);
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
                <h3 className='title'>Login Page</h3>
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>

                    <div className='form-card'>
                        <div className='card-header'>
                            <h5 className='mb-0 h6'>Product Information</h5>
                        </div>
                        <div className='card-body'>

                            <div className='form-group row'>
                                <label className='col-md-3 col-from-label'>
                                   About Us
                                </label>
                                <div className='col-md-8'>
                                    <textarea name="meta_description" rows="8" className="form-control">{apping? apping.about_us : ''}</textarea>
                                    <small className='text-muted'>
                                     About Us
                                    </small>
                                </div>
                            </div>

                            <div className='form-group row'>
                                <label className='col-md-3 col-from-label'>
                                  Terms and conditions
                                </label>
                                <div className='col-md-8'>
                                    <textarea name="meta_description" rows="8" className="form-control"></textarea>
                                    <small className='text-muted'>
                                    Terms and conditions
                                    </small>
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label className='col-md-3 col-from-label'>
                                   Privacy policy
                                </label>
                                <div className='col-md-8'>
                                    <textarea name="meta_description" rows="8" className="form-control"></textarea>
                                    <small className='text-muted'>
                                        
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                 
                </div>
            </div>
        </div>
    );
}