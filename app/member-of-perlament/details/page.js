"use client";
import axiosClient from "@/app/axiosClient";
import "../../form/style.css";
import { useEffect, useRef, useState } from "react";
import { set } from "mongoose";
import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from "next/navigation";

export default function Form() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);

    const router = useRouter();
    const searchParames = useSearchParams();
    const id = searchParames.get("id");

    const [name, setName] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [description, setDescription] = useState('');
    const [perferred_language, setPerferred_language] = useState('');
    const [hill_office_house_of_commons, setHill_office_house_of_commons] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [hill_office_telephone, setHill_office_telephone] = useState('');
    const [hill_office_fax, setHill_office_fax] = useState('');
    const [constituency_office_main_office, setConstituency_office_main_office] = useState('');
    const [constituency_telephone, setConstituency_telephone] = useState('');
    const [constituency, setConstituency] = useState('');
    const [constituency_fax, setConstituency_fax] = useState('');
    const [contactWebsite, setContactWebsite] = useState('');
    const [image, setImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [political_affiliation, setPolitical_affiliation] = useState('');
    const [zip, setZip] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [coverImageBase64, setCoverImageBase64] = useState(null);


    const fetchData = async () => {
        try {
            //const objectId = mongoose.Types.ObjectId(id);
            const { data } = await axiosClient.get(`member-of-perlamant/details/?id=${id}`);

            setSelectedState(data.memberPerlamants.state);
            setSelectedCountry(data.memberPerlamants.country);
            setSelectedCity(data.memberPerlamants.city);
            setName(data.memberPerlamants.name);
            setZip(data.memberPerlamants.zip);
            setHill_office_fax(data.memberPerlamants.hill_office_fax);
            setHill_office_house_of_commons(data.memberPerlamants.hill_office_house_of_commons);
            setHill_office_telephone(data.memberPerlamants.hill_office_telephone);
            setPerferred_language(data.memberPerlamants.perferred_language);
            setPolitical_affiliation(data.memberPerlamants.political_affiliation);
            setContactWebsite(data.memberPerlamants.contact_website);
            setImage(data.memberPerlamants.image);
            setCoverImage(data.memberPerlamants.cover_image);
            setConstituency(data.memberPerlamants.constituency);
            setConstituency_fax(data.memberPerlamants.constituency_fax);
            setConstituency_office_main_office(data.memberPerlamants.constituency_office_main_office);
            setConstituency_telephone(data.memberPerlamants.constituency_telephone);
            setContactEmail(data.memberPerlamants.contact_email);


            console.log(data.businessProfile.city);
            // setSelec(data.result.name);
            // setCategoryArName(data.result.ar_name);
            // setSlug(data.result.slug);
        } catch (error) {
            console.error('Error fetching business post:', error);
        }
    };

    useEffect(() => {
        
    
        fetchData();
    }, [id]); // Empty dependency array means this effect runs only once, similar to componentDidMount


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [countryRes, stateRes, cityRes] = await Promise.all([
                    axiosClient.get("/country/list/"),
                    axiosClient.get("/state/list/"),
                    axiosClient.get("/city/list/")
                ]);
                if (countryRes.data.success) setCountries(countryRes.data.countries);
                if (stateRes.data.success) setStates(stateRes.data.states);
                if (cityRes.data.success) setCities(cityRes.data.citys);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchStates = async () => {
            if (selectedCountry) {
                try {
                    const stateRes = await axiosClient.get(`/state/list/${selectedCountry}`);
                    if (stateRes.data.success) setStates(stateRes.data.states);
                } catch (error) {
                    console.error('Error fetching states:', error);
                }
            }
        };

        fetchStates();
    }, [selectedCountry]);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedState) {
                try {
                    const cityRes = await axiosClient.get(`/city/list/${selectedState}`);
                    if (cityRes.data.success) setCities(cityRes.data.citys);
                } catch (error) {
                    console.error('Error fetching cities:', error);
                }
            }
        };

        fetchCities();
    }, [selectedState]);

    // const convertToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = error => reject(error);
    //     });
        
    // };



    const handleImage = (e) => {
  
        console.log(e);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            console.log("hello");
            reader.onloadend = () => {
            // Once the FileReader has read the file, set the base64 data
            setImageBase64(reader.result);
            //setImage(reader.result);
            };
    
            // Read the file as a data URL (base64)
            reader.readAsDataURL(file);
        }
        
        
      };

      const handleCoverImage = (e) => {
  
        console.log(e);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            console.log("hello");
            reader.onloadend = () => {
            // Once the FileReader has read the file, set the base64 data
            setCoverImageBase64(reader.result);
            //setImage(reader.result);
            };
    
            // Read the file as a data URL (base64)
            reader.readAsDataURL(file);
        }
        
        
      };
    
      const inputFile = useRef(null);
      const inputFile2 = useRef(null);

    const convertCoverImageToBase64 = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setCoverImageBase64(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            // const imageFile = formData.get('image');
            // const coverImageFile = formData.get('cover_image');

            // const imageBase64 = imageFile ? await convertToBase64(imageFile) : '';
            // const coverImageBase64 = coverImageFile ? await convertToBase64(coverImageFile) : '';

            console.log('imageBase64:', imageBase64);
            console.log('coverImageBase64:', coverImageBase64);

            const data = {
                name,
                zip,
                image: imageBase64,
                cover_image: coverImageBase64,
                country: selectedCountry,
                state: selectedState,
                city: selectedCity,
                political_affiliation,
                constituency,
                perferred_language,
                contact_email: contactEmail,
                contact_website: contactWebsite,
                hill_office_house_of_commons,
                hill_office_telephone,
                hill_office_fax,
                constituency_office_main_office,
                constituency_telephone,
                constituency_fax
            };

            const response = await axiosClient.post(`/member-of-perlamant/edit?id=${id}`, data);
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
                Swal.fire({
                    title: 'success',
                    text: response.data.message,
                    icon: 'success',
                    // confirmButtonText: 'Cool'
                })
                // handle success, e.g., redirect or show success message
            }
            else
            {
                Swal.fire({
                    title: 'error',
                    text: "Something went wrong",
                    icon: 'error',
                    // confirmButtonText: 'Cool'
                })
            }
        } catch (error) {
            console.error('Error creating business post:', error);
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
                <h3 className='title'>Member Of Perlamant Details</h3>
            </div>
            <div style={{ display: 'inline-flex' }}>

            <div style={{ padding: '20px' }}>
                <h6 >Current Image</h6>
                <img src={image} style={{ height: '200px', width: '300px' }}></img>
            </div>

            <div style={{ padding: '20px' }}>
                <h6>Current Cover Image</h6>
                <img src={coverImage} style={{ height: '200px', width: '300px' }}></img>
            </div>
            </div>

            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-card'>
                            <div className='card-header'>
                                <h5 className='mb-0 h6'>Member Of Perlamant Information</h5>
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
                                            name='name'
                                            placeholder='Enter your name'
                                            readonly
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Country <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <select
                                            className="form-control"
                                            name="country"
                                            readonly
                                            value={selectedCountry}
                                            onChange={(e) => setSelectedCountry(e.target.value)}
                                        >
                                            <option value="">Select One</option>
                                            {countries.map((country, index) => (
                                                <option key={index} value={country._id}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        State <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <select
                                            className="form-control"
                                            name="state"
                                            readonly
                                            value={selectedState}
                                            onChange={(e) => setSelectedState(e.target.value)}
                                        >
                                            <option value="">Select One</option>
                                            {states.map((state, index) => (
                                                <option key={index} value={state._id}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        City <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <select className="form-control" name="city" readonly onChange={(e)=> setSelectedCity(e.target.value)} readonly>
                                            <option value="">Select One</option>
                                            {cities.map((city, index) => (
                                                <option key={index} value={city._id}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/* Add more form fields for speciality, description, address, contact info, and images */}
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Zip <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='zip'
                                            value={zip}
                                            onChange={(e) => setZip(e.target.value)}
                                            placeholder='Enter your zip'
                                            readonly
                                        />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Political Affiliation <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='political_affiliation'
                                            value={political_affiliation}
                                            onChange={(e) => setPolitical_affiliation(e.target.value)}
                                            placeholder='Enter your political affiliation'
                                            readonly
                                        />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Constituency <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control aiz-tag-input'
                                            name='tags'
                                            value={constituency}
                                            onChange={(e) => setConstituency(e.target.value)}
                                            placeholder='Enter constituency'
                                            readonly
                                        />
                                       
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Perferred Language <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control aiz-tag-input'
                                            name='tags'
                                            value={perferred_language}
                                            onChange={(e) => setPerferred_language(e.target.value)}
                                            placeholder='Enter perferred_language'
                                            readonly
                                        />
                                       
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
                                            value={contactEmail}
                                            readonly
                                            onChange={(e) => setContactEmail(e.target.value)}
                                            placeholder='Enter your contact email'
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
                                            value={contactWebsite}
                                            onChange={(e) => setContactWebsite(e.target.value)}
                                            placeholder='Enter your website'
                                            readonly
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Hill office house of commons
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='hill_office_house_of_commons'
                                            value={hill_office_house_of_commons}
                                            onChange={(e) => setHill_office_house_of_commons(e.target.value)}
                                            placeholder='Enter your hill office house of commons'
                                            readonly
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Hill office telephone
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='hill_office_telephone'
                                            value={hill_office_telephone}
                                            onChange={(e) => setHill_office_telephone(e.target.value)}
                                            placeholder='Enter your hill office telephone'
                                            readonly
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Hill office fax
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='hill_office_fax'
                                            value={hill_office_fax}
                                            onChange={(e) => setHill_office_fax(e.target.value)}
                                            placeholder='Enter your hill office fax'
                                            readonly
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Constituency office main office
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='hill_office_fax'
                                            value={constituency_office_main_office}
                                            onChange={(e) => setConstituency_office_main_office(e.target.value)}
                                            placeholder='Enter your hill office fax'
                                            readonly
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Constituency telephone
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='constituency_telephone'
                                            value={constituency_telephone}
                                            onChange={(e) => setConstituency_telephone(e.target.value)}
                                            placeholder='Enter your Constituency telephone'
                                            readonly
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Constituency fax
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='constituency_fax'
                                            value={constituency_fax}
                                            onChange={(e) => setConstituency_fax(e.target.value)}
                                            placeholder='Enter your constituency fax'
                                            readonly
                                        />
                                    </div>
                                </div>
                               
                            </div>
                        </div>

                        {/* <div className='form-card'>
                            <div className='card-header'>
                                <h5 className='mb-0 h6'>Photos</h5>
                            </div>
                            <div className='card-body'>
                                <div className="form-group row">
                                    <label className="col-md-3 col-from-label">
                                        New Image
                                    </label>
                                    <div className="col-md-8">
                                        <div className="input-group" data-toggle="aizuploader" data-type="image" data-multiple="true">
                                           <input type="file" name="image"  className="selected-files"  ref={inputFile}
                                        onChange={handleImage}/>
                                        </div>
                                        <div className="file-preview box sm"></div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-from-label">
                                       New Cover Image
                                    </label>
                                    <div className="col-md-8">
                                        <div className="input-group" data-toggle="aizuploader" data-type="image" data-multiple="true">
                                          <input type="file" name="cover_image"  className="selected-files" ref={inputFile2}
                                        onChange={handleCoverImage}/>
                                        </div>
                                        <div className="file-preview box sm"></div>
                                    </div>
                                </div>
                                <div className="form-group mb-0 text-right">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </div>
                            </div>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
}
