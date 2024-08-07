"use client";

import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../axiosClient";
import "./style.css";
export default function AppInfo() {
    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
          CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
          ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
        };
        setEditorLoaded(true);
      }, []);

    const [apping, setAppinfo] = useState([]);

    const [aboutUs, setAboutUs] = useState();
    const [condition, setCondition] = useState();
    const [privacy, setPrivacy] = useState();
    const [is_google_email, setIs_google_email] = useState();
    const [eventPrice, setEventPrice] = useState();
    const [adsPrice, setAdsPrice] = useState();

    const submit = async (event) => {
        event.preventDefault();
        var data = {
            about_us: aboutUs,
            terms_condition: condition,
            privacy_policy: privacy,
            is_google_email:is_google_email,
            amount:eventPrice,
            ads_price: adsPrice,
        };

        const response = await axiosClient.post(
            "/app-info/create-update",
            data
        );
        console.log("response", response);
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
                // confirmButtonText: 'Cool'
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data from an API or other source
            const appinfo = await axiosClient.get("/app-info/get");
            console.log(appinfo.data.appinfo);
            var data = appinfo.data.appinfo;

            setAppinfo(data ? data : []);
            setAboutUs(data ? data.about_us : "");
            setCondition(data ? data.terms_condition : "");
            setPrivacy(data ? data.privacy_policy : "");
            setIs_google_email(data? data.is_google_email : "");
            setEventPrice(data? data.amount : "");
            setAdsPrice(data? data.ads_price : "");
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
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <div className='form-card'>
                        <div className='card-header'>
                            <h5 className='mb-0 h6'>App Info</h5>
                        </div>
                        <form onSubmit={submit}>
                            <div className='card-body'>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        About Us
                                    </label>
                                    <div className='col-md-8'>
                                        {editorLoaded ? <CKEditor
                                            editor={ClassicEditor}
                                            data={aboutUs ? aboutUs : ""}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setAboutUs(data);
                                            }}
                                        /> : 'Loading ...'}
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Terms and conditions
                                    </label>
                                    <div className='col-md-8'>
                                        {editorLoaded ? <CKEditor
                                            editor={ClassicEditor}
                                            data={condition ? condition : ""}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setCondition(data);
                                            }}
                                        /> : 'Loading ...'}
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Privacy policy
                                    </label>
                                    <div className='col-md-8'>
                                        {editorLoaded ? <CKEditor
                                            editor={ClassicEditor}
                                            data={privacy ? privacy : ""}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setPrivacy(data);
                                            }}
                                        /> : "Loading ..."}
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Event Price <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='number'
                                            className='form-control'
                                            name='event_price'
                                            placeholder='Enter price'
                                            required
                                            value={eventPrice}
                                            onChange={(e) => setEventPrice(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Ads Price <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='number'
                                            className='form-control'
                                            name='ads_price'
                                            placeholder='Enter price'
                                            required
                                            value={adsPrice}
                                            onChange={(e) => setAdsPrice(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Is Google Email <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <select className="form-control" name="is_google_email" required onChange={(e)=> setIs_google_email(e.target.value)}  value={is_google_email}>            
                                            <option value="">Select One</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='btn-submit mt-40'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
