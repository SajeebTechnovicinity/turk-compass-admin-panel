"use client";
import axiosClient from "@/app/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import "../../form/style.css";

export default function Form() {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);

    const [businessName, setBusinessName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [description, setDescription] = useState('');
    const [exempt, setExempt] = useState('');
    const [address, setAddress] = useState('');
    const [contactAddress, setContactAddress] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactLocatedIn, setContactLocatedIn] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactWebsite, setContactWebsite] = useState('');
    const [isReservationAvailable, setIsReservationAvailable] = useState(1);
    const [image, setImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [tags, setTags] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [previousImage, setPreviousImage] = useState(null);
    const [previousCoverImage, setPreviousCoverImage] = useState(null);
    const [coverImageBase64, setCoverImageBase64] = useState(null);

    const router = useRouter();
    const searchParames = useSearchParams();
    const id = searchParames.get("id");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryRes, subCategoryRes, countryRes, stateRes, cityRes,tagRes] = await Promise.all([
                    axiosClient.get("/category/list?type=business"),
                    axiosClient.get("/subcategory/list/"),
                    axiosClient.get("/country/list/"),
                    axiosClient.get("/state/list/"),
                    axiosClient.get("/city/list/"),
                    axiosClient.get("/tag/list/")
                ]);

                if (categoryRes.data.success) setCategories(categoryRes.data.categories);
                if (subCategoryRes.data.success) setSubCategories(subCategoryRes.data.subCategories);
                if (countryRes.data.success) setCountries(countryRes.data.countries);
                if (stateRes.data.success) setStates(stateRes.data.states);
                if (cityRes.data.success) setCities(cityRes.data.citys);
                if (tagRes.data.success) setTagList(tagRes.data.tags);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //const objectId = mongoose.Types.ObjectId(id);
            const { data } = await axiosClient.get(`business-post/id-wise-details/?id=${id}`);
            console.log(data.businessProfile);
            setCategory(data.businessProfile.category);
            setSubCategory(data.businessProfile.sub_category);
            setSelectedState(data.businessProfile.state);
            setSelectedCountry(data.businessProfile.country);
            setBusinessName(data.businessProfile.business_name);
            setSpeciality(data.businessProfile.speciality);
            setDescription(data.businessProfile.description);
            setAddress(data.businessProfile.address);
            setContactAddress(data.businessProfile.contact_address);
            setContactLocatedIn(data.businessProfile.contact_located_in);
            setContactPhone(data.businessProfile.contact_phone);
            setContactWebsite(data.businessProfile.contact_website);
            setContactEmail(data.businessProfile.contact_email);
            setTags(data.businessProfile.tag);
            setPreviousImage(data.businessProfile.image);
            setPreviousCoverImage(data.businessProfile.cover_image);
            setSelectedCity(data.businessProfile.city);
            setExempt(data.businessProfile.is_exempt);
            console.log("Exempt");
            console.log(data.businessProfile.is_exempt);
            console.log(data.businessProfile.city);
            // setSelec(data.result.name);
            // setCategoryArName(data.result.ar_name);
            // setSlug(data.result.slug);
        } catch (error) {
            console.error('Error fetching business post:', error);
        }
    };

    const handleTagChange = (e) => {
        const options = e.target.options;
        const selectedTags = [];
        for (const option of options) {
            if (option.selected) {
                selectedTags.push(option.value);
            }
        }

        setTags(selectedTags);
    };

    useEffect(() => {
        fetchData();
    }, [id]); // Empty dependency array means this effect runs only once, similar to componentDidMount

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
                category,
                sub_category: subCategory,
                business_name: businessName,
                speciality,
                description,
                image: imageBase64,
                tag:tags,
                cover_image: coverImageBase64,
                address,
                country: selectedCountry,
                state: selectedState,
                city: selectedCity,
                contact_address: contactAddress,
                contact_email: contactEmail,
                contact_located_in: contactLocatedIn,
                contact_phone: contactPhone,
                contact_website: contactWebsite,
                is_reservation_available: isReservationAvailable,
                is_exempt: exempt,
            };

            const response = await axiosClient.post(`business-post/edit?id=${id}`, data);
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
                fetchData();
                // handle success, e.g., redirect or show success message
            } else {
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
                <h3 className='title'>Business Post Edit</h3>
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-card'>
                            <div className='card-header'>
                                <h5 className='mb-0 h6'>Business Information</h5>
                            </div>
                            <div style={{ display: 'inline-flex' }}>

                                <div style={{ padding: '20px' }}>
                                    <h6 >Current Image</h6>
                                    <img src={previousImage} style={{ height: '200px', width: '300px' }}></img>
                                </div>

                                <div style={{ padding: '20px' }}>
                                    <h6>Current Cover Image</h6>
                                    <img src={previousCoverImage} style={{ height: '200px', width: '300px' }}></img>
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
                                            placeholder='Enter your business name'
                                            required
                                            value={businessName}
                                            onChange={(e) => setBusinessName(e.target.value)}
                                        />
                                    </div>
                                </div>
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
                                            {categories.map((category, index) => (
                                                <option key={index} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Sub Category <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <select
                                            className="form-control"
                                            name="subcategory"
                                            required
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                        >
                                            <option value="">Select One</option>
                                            {subcategories.map((subcategory, index) => (
                                                <option key={index} value={subcategory._id}>
                                                    {subcategory.name}
                                                </option>
                                            ))}
                                        </select>
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
                                            required
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
                                        Province <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <select
                                            className="form-control"
                                            name="state"
                                            required
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
                                        <select className="form-control" value={selectedCity} name="city" required onChange={(e)=> setSelectedCity(e.target.value)}>
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
                                        Address <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='address'
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder='Enter your address'

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
                                            value={description}
                                            placeholder='Enter your description'

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
                                            value={speciality}
                                            onChange={(e) => setSpeciality(e.target.value)}
                                            placeholder='Enter your speciality'

                                        />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Tags <span className='text-danger'>*</span>
                                    </label>
                                    <div className='col-md-30'>
                                        <select
                                            multiple
                                            className='form-select'
                                            id='tags'
                                            name='tags'
                                            value={tags}
                                            onChange={handleTagChange}
                                            aria-label='Default select example'
                                            required
                                        >
                                            {tagList.map((tag) => (
                                                <option key={tag.id} value={tag._id}>
                                                    {tag.name}
                                                </option>
                                            ))}
                                        </select>
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
                                            required
                                            onChange={(e) => setContactEmail(e.target.value)}
                                            placeholder='Enter your contact email'
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
                                            value={contactPhone}
                                            onChange={(e) => setContactPhone(e.target.value)}
                                            placeholder='Enter your phone number'
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Contact Website
                                    </label>
                                    <div className='col-md-8'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='website'
                                            value={contactWebsite}
                                            onChange={(e) => setContactWebsite(e.target.value)}
                                            placeholder='Enter your website'
                                            required
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
                                            required
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
                                            value={contactAddress}
                                            onChange={(e) => setContactAddress(e.target.value)}
                                            placeholder='Enter your contact address'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='form-card'>
                            <div className='card-header'>
                                <h5 className='mb-0 h6'>Photos</h5>
                            </div>
                            <div className='card-body'>
                                <div className="form-group row">
                                    <label className="col-md-3 col-from-label">
                                       New Image
                                    </label>
                                    <div className="col-md-8">
                                        <div className="input-group file-wrap" data-toggle="aizuploader" data-type="image" data-multiple="true">
                                           <input type="file" name="image"  className="selected-files"  ref={inputFile}
                                        onChange={handleImage}/>
                                        </div>
                                        <div className="file-preview box sm"></div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-from-label">
                                      New  Cover Image
                                    </label>
                                    <div className="col-md-8">
                                        <div className="input-group file-wrap" data-toggle="aizuploader" data-type="image" data-multiple="true">
                                          <input type="file" name="cover_image"   className="selected-files" ref={inputFile2}
                                        onChange={handleCoverImage}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-from-label">
                                        Exempt
                                    </label>
                                    <div className='col-md-8'>
                                        <select
                                            className="form-control"
                                            name="is_exempt"
                                            required
                                            onChange={(e) => setExempt(e.target.value === 'true')}
                                            value={exempt === '' ? '' : exempt.toString()}
                                        >
                                            <option value="">Select One</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="btn-submit mt-40">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
