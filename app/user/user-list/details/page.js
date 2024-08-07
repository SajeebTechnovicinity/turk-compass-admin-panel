"use client";
import axiosClient from "@/app/axiosClient"; // Ensure this path is correct based on your setup
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "../../../form/style.css";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("tab1");
    const [generlProfile, setGeneralProfile] = useState(null);
    const [businessProfile, setBusinessProfile] = useState(null);
    const [jobProfile, setJobProfile] = useState(null);

 

    const searchParames = useSearchParams();
    const id = searchParames.get("id");


    useEffect(() => {
        // Fetch data when component mounts
        axiosClient.get(`/user-profile/all?id=${id}`) // Replace with your actual data endpoint
            .then(response => {
                setGeneralProfile(response.data.generalProfile);
                setJobProfile(response.data.jobProfile);
                console.log(response.data.jobProfile);
                setBusinessProfile(response.data.businessProfile);
                
                console.log(response.data.businessProfile);
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
            });
    }, [id]);

    const renderContent = () => {
        switch (activeTab) {
            case "tab1":
                return <div className='dashboard-content'>

                <div className='dashboard-content__topbar topbar flex-ctr'>
                    <div className='drawer-open'>
                        <span className='slice-top'></span>
                        <span className='slice-middle'></span>
                        <span className='slice-bottom'></span>
                    </div>
                </div>
                <div className='dashboard-content__title-bar title-bar flex-ctr-spb'>
                    <h3 className='title'>General Profile</h3>
                </div>
                <div className='dashboard-main-content-wrap'>
                    <div className='dashboard-main-content'>
                        <form >
                            <div className='form-card'>
                                <div className='card-header'>
                                    <h5 className='mb-0 h6'>General Information</h5>
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
                                                name='business_name'
                                    
                                                readOnly
                                                value={generlProfile && generlProfile.userName}
                                                
                                            />
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-md-3 col-from-label'>
                                         Package Name <span className='text-danger'>*</span>
                                        </label>
                                        <div className='col-md-8'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='business_name'
                                                
                                                readOnly
                                                value={generlProfile && generlProfile.package_type}
                                                
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label className='col-md-3 col-from-label'>
                                         Package Start <span className='text-danger'>*</span>
                                        </label>
                                        <div className='col-md-8'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='business_name'
                                                
                                                readOnly
                                                value={generlProfile && generlProfile.package_start_date}
                                                
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label className='col-md-3 col-from-label'>
                                         Package End <span className='text-danger'>*</span>
                                        </label>
                                        <div className='col-md-8'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='business_name'
                                                
                                                readOnly
                                                value={generlProfile && generlProfile.package_end_date}
                                                
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label className='col-md-3 col-from-label'>
                                         Vacation State Date <span className='text-danger'>*</span>
                                        </label>
                                        <div className='col-md-8'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='business_name'
                                                
                                                readOnly
                                                value={generlProfile && generlProfile.from_date_vacation}
                                                
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label className='col-md-3 col-from-label'>
                                         Vacation End Date <span className='text-danger'>*</span>
                                        </label>
                                        <div className='col-md-8'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='business_name'
                                                
                                                readOnly
                                                value={generlProfile && generlProfile.to_date_vacation}
                                                
                                            />
                                        </div>
                                    </div>

                                   
                                    
                                </div>
                            </div>

                            
                        </form>
                    </div>
                </div>
  




            </div>;
            case "tab2":
                return <div className='dashboard-content'>

                        <div className='dashboard-content__topbar topbar flex-ctr'>
                            <div className='drawer-open'>
                                <span className='slice-top'></span>
                                <span className='slice-middle'></span>
                                <span className='slice-bottom'></span>
                            </div>
                        </div>
                        <div className='dashboard-content__title-bar title-bar flex-ctr-spb'>
                            <h3 className='title'>Business Profile</h3>
                        </div>
                        <div className='dashboard-main-content-wrap'>
                            <div className='dashboard-main-content'>
                                <form >
                                    <div className='form-card'>
                                        <div className='card-header'>
                                            <h5 className='mb-0 h6'>Business Information</h5>
                                        </div>
                                        <div style={{ display: 'inline-flex' }}>

                                            <div style={{ padding: '20px' }}>
                                                <h6 >Current Image</h6>
                                                <img src={businessProfile && businessProfile.image} style={{ height: '200px', width: '300px' }}></img>
                                            </div>

                                            <div style={{ padding: '20px' }}>
                                                <h6>Current Cover Image</h6>
                                                <img src={businessProfile && businessProfile.cover_image} style={{ height: '200px', width: '300px' }}></img>
                                            </div>
                                        </div>
                                        
                                        
                                        <div className='card-body'>
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                    Business Name <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        name='business_name'
                                                        
                                                        readOnly
                                                        value={businessProfile && businessProfile.business_name}
                                                        
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 Category <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        name='business_name'
                                                        
                                                        readOnly
                                                        value={businessProfile?.category?.name}
                                                        
                                                    />
                                                </div>
                                            </div>

                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 Sub Category <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        name='business_name'
                                                        
                                                        readOnly
                                                        value={businessProfile?.sub_category?.name}
                                                        
                                                    />
                                                </div>
                                            </div>

                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 Country <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        name='business_name'
                                                        
                                                        readOnly
                                                        value={businessProfile && businessProfile.country.name}
                                                        
                                                    />
                                                </div>
                                            </div>

                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 State <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        name='business_name'
                                                       
                                                        readOnly
                                                        value={businessProfile?.state?.name}
                                                        
                                                    />
                                                </div>
                                            </div>

                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 City <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        name='business_name'
                                                       
                                                        readOnly
                                                        value={businessProfile?.city?.name}
                                                        
                                                    />
                                                </div>
                                            </div>
                                           
                                            {/* Add more form fields for speciality, description, address, contact info, and images */}
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                    Address <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        name='address'
                                                        value={businessProfile && businessProfile.contact_address}
                                                       
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                    Description <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    <textarea
                                                        rows="8"
                                                        className='form-control'
                                                        name='description'
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        value={businessProfile && businessProfile.description}
                                                        
                                                        readOnly
                                                    />
                                                    
                                                </div>
                                            </div>
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                    Speciality <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        name='speciality'
                                                        value={businessProfile && businessProfile.speciality}
                                                     
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                    Tags <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='text'
                                                        className='form-control aiz-tag-input'
                                                        name='tags'
                                                        value={businessProfile && businessProfile.tag}
                                                   
                                                        
                                                        readOnly
                                                    />
                                                    <small className='text-muted'>
                                                        This is used for search. Input those words by which customers can find this product.
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-card'>
                                        <div className='card-header'>
                                            <h5 className='mb-0 h6'>Contact Information</h5>
                                        </div>
                                        <div className='card-body'>
                                    
                                    
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                    Contact Email
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='email'
                                                        className='form-control'
                                                        name='contact_email'
                                                        value={businessProfile && businessProfile.contact_email}
                                                        readOnly
                                                        onChange={(e) => setContactEmail(e.target.value)}
                                                        
                                                    />
                                                </div>
                                            </div>
                                    
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                    Contact Phone<span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='tel'
                                                        className='form-control'
                                                        name='phone_number'
                                                        value={businessProfile && businessProfile.contact_phone}
                                                       
                                                      
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                    Contact Website
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='url'
                                                        className='form-control'
                                                        name='website'
                                                        value={businessProfile && businessProfile.contact_website}
                                                     
                                                       
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                    Contact Located In
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        name='contact_located_in'
                                                        value={contactLocatedIn}
                                                        onChange={(e) => setContactLocatedIn(e.target.value)}
                                                        placeholder='Enter your contact located in'
                                                        readOnly
                                                    />
                                                </div>
                                            </div> */}
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                    Contact Address
                                                </label>
                                                <div className='col-md-8'>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        name='contact_address'
                                                        value={businessProfile && businessProfile.contact_address}
                                    
                                                       
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    
                                </form>
                            </div>
                        </div>
          




                </div>;
            case "tab3":
                        return <div className='dashboard-content'>

                        <div className='dashboard-content__topbar topbar flex-ctr'>
                            <div className='drawer-open'>
                                <span className='slice-top'></span>
                                <span className='slice-middle'></span>
                                <span className='slice-bottom'></span>
                            </div>
                        </div>
                        <div className='dashboard-content__title-bar title-bar flex-ctr-spb'>
                            <h3 className='title'>Job Profile</h3>
                        </div>
                        <div className='dashboard-main-content-wrap'>
                            <div className='dashboard-main-content'>
                                <form >
                                    <div className='form-card'>
                                        <div className='card-header'>
                                            <h5 className='mb-0 h6'>Job Profile Information</h5>
                                        </div>

                                        {jobProfile && (
                                       <>
                                        <div className='card-body'>
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                   Address  <span className='text-danger'></span>
                                                </label>
                                                <div className='col-md-8'>
                                                 Country: {jobProfile?jobProfile.country && jobProfile.country.name:''}  <br></br> <br></br>
                                                 City: {jobProfile?jobProfile.city && jobProfile.city.name:''}  <br></br> <br></br>
                                                 State: {jobProfile?jobProfile.state && jobProfile.state.name:''} <br></br> <br></br>
                                                </div>
                                            </div>
                                            {/* <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 Phone <span className='text-danger'></span>
                                                </label>
                                                <div className='col-md-8'>
                                                {jobProfile?jobProfile.phone && jobProfile.phone:''} 
                                                {jobProfile?jobProfile.name && jobProfile.name:''} 
                                                {jobProfile?jobProfile.email && jobProfile.email:''} 
                                                {jobProfile?jobProfile.summary && jobProfile.summary:''} 
                                                </div>
                                            </div> */}
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 Name <span className='text-danger'></span>
                                                </label>
                                                <div className='col-md-8'>
                                                    
                                                {jobProfile?jobProfile.name && jobProfile.name:''} 

                                                </div>
                                            </div>
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 Phone <span className='text-danger'></span>
                                                </label>
                                                <div className='col-md-8'>
                                                {jobProfile?jobProfile.phone && jobProfile.phone:''} 
                                      
                                                </div>
                                            </div>
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 Email <span className='text-danger'></span>
                                                </label>
                                                <div className='col-md-8'>
                                                {jobProfile?jobProfile.email && jobProfile.email:''} 
                                                </div>
                                            </div>
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 Expart <span className='text-danger'></span>
                                                </label>
                                                <div className='col-md-8'>
                                                {jobProfile?jobProfile.expart && jobProfile.expart:''} 
                                                </div>
                                            </div>
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 Summary <span className='text-danger'></span>
                                                </label>
                                                <div className='col-md-8'>
                                                {jobProfile?jobProfile.summary && jobProfile.summary:''} 
                                                </div>
                                            </div>

                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 Education <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    {jobProfile.education && jobProfile.education.map((value,index)=>{
                                                        return <div key={index}>
                                                            <h6>Degree:{value.degree}</h6>
                                                            <h6>Institute name:{value.institute_name}</h6>
                                                            <h6>Start Date:{value.start_date}</h6>
                                                            <h6>End Date:{value.end_date}</h6>
                                                           <br></br>
                                                        </div>

                                                    })}

                                                </div>
                                            </div>

                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                 Skill <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    {jobProfile.skill && jobProfile.skill.map((value,key)=>{
                                                        return <div key={key}>
                                                            <h6>{key+1} : {value}</h6>
                                                    
                                                        </div>

                                                    })}

                                                </div>
                                            </div>
                                            <div className='form-group row'>
                                                <label className='col-md-3 col-from-label'>
                                                Work History <span className='text-danger'>*</span>
                                                </label>
                                                <div className='col-md-8'>
                                                    {jobProfile.work_history && jobProfile.work_history.map((value,key)=>{
                                                        return <div key={key}>
                                                            <h6>Designation : {value.designation}</h6>
                                                            <h6>Company : {value.company}</h6>
                                                            <h6>Responsibility : {value.responsibility}</h6>
                                                            <h6>Start Date : {value.start_date}</h6>
                                                            <h6>End Date : {value.end_date}</h6>
                                                            <br></br>
                                                    
                                                        </div>

                                                    })}

                                                </div>
                                            </div>

                                           
                                        
                                        </div>
                                        </>)
                                                
        }
                                    </div>

                                 

                                    
                                </form>
                            </div>
                        </div>
          




                </div>;
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <nav>
                <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
                    <li style={{ marginRight: '10px' }}>
                        <button
                            onClick={() => setActiveTab("tab1")}
                            style={{
                                padding: '10px 20px',
                                cursor: 'pointer',
                                backgroundColor: activeTab === "tab1" ? '#0070f3' : '#eaeaea',
                                color: activeTab === "tab1" ? '#fff' : '#000',
                                border: 'none',
                                borderRadius: '5px'
                            }}
                        >
                            General Profile
                        </button>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                        <button
                            onClick={() => setActiveTab("tab2")}
                            style={{
                                padding: '10px 20px',
                                cursor: 'pointer',
                                backgroundColor: activeTab === "tab2" ? '#0070f3' : '#eaeaea',
                                color: activeTab === "tab2" ? '#fff' : '#000',
                                border: 'none',
                                borderRadius: '5px'
                            }}
                        >
                            Business Profile
                        </button>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                        <button
                            onClick={() => setActiveTab("tab3")}
                            style={{
                                padding: '10px 20px',
                                cursor: 'pointer',
                                backgroundColor: activeTab === "tab3" ? '#0070f3' : '#eaeaea',
                                color: activeTab === "tab3" ? '#fff' : '#000',
                                border: 'none',
                                borderRadius: '5px'
                            }}
                        >
                            Job Profile
                        </button>
                    </li>
                </ul>
            </nav>
            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                {renderContent()}
            </div>
        </div>
    );
}
