"use client";

import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import "../form/style.css";
import "./style.css";

export default function AppInfo() {
    const [consulateDetails, setConsulateDetails] = useState("");
    const [condition, setCondition] = useState("");
    const [privacy, setPrivacy] = useState("");
    const [image, setImage] = useState("");
    const [addressList, setAddressList] = useState([]);
    const incrementOpeningInfo = (addressIndex) => {
        setAddressList((prevState) => {
            const updatedAddresses = prevState.map((address, index) => {
                if (index === addressIndex) {
                    return {
                        ...address,
                        opening_info: [...address.opening_info, { opening_info: "" }],
                    };
                }

                return address;
            });

            return updatedAddresses;
        });
    };

    const incrementAddressInfo = () => {
        setAddressList((prevState) => [
            ...prevState,
            {
                title: "",
                address: "",
                phone: "",
                fax: "",
                email: "",
                opening_info: [{ opening_info: "" }],
            },
        ]);
    };

    const handleCoverImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleAddressChange = (index, field, value) => {
        setAddressList((prevState) => {
            const updatedAddresses = [...prevState];
            updatedAddresses[index][field] = value;
            return updatedAddresses;
        });
    };

    const handleOpeningChange = (addressIndex, openingIndex, value) => {
        setAddressList((prevState) => {
            const updatedAddresses = [...prevState];
            updatedAddresses[addressIndex].opening_info[
                openingIndex
            ].opening_info = value;
            return updatedAddresses;
        });
    };

    const submit = async (event) => {
        event.preventDefault();
        let data = {
            consulate_info: consulateDetails,
            consulate_img: image,
            branch_info: addressList,
        };

        // const data = {
        //   about_us: aboutUs,
        //   terms_condition: condition,
        //   privacy_policy: privacy,
        //   cover_image: image,
        //   addresses: addressList
        // };

        const response = await axiosClient.post(
            "/consultate/consultate-create",
            data
        );
        if (response.data.success) {
            alert("Success: " + response.data.message);
        } else {
            alert("Error: " + response.data.message);
        }
    };

    useEffect(() => {}, []);

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
                            <h5 className='mb-0 h6'>Consulate Info</h5>
                        </div>
                        <form onSubmit={submit}>
                            <div className='card-body'>
                                <div className='form-group row'>
                                    <label className='col-md-12 col-from-label'>
                                        Consulate Description
                                    </label>
                                    <div className='col-md-12'>
                                        <textarea
                                            name='meta_description'
                                            onChange={(e) =>
                                                setConsulateDetails(
                                                    e.target.value
                                                )
                                            }

                                            rows='8'
                                            className='form-control'
                                            value={consulateDetails}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-from-label'>
                                        Image
                                    </label>
                                    <div className='col-md-9'>
                                        <div className='file-wrap'>
                                            <input
                                                type='file'
                                                name='cover_image'
                                                required
                                                className='selected-files'
                                                onChange={handleCoverImage}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className='form-group row'>
                                    <h4 className='col-md-3 col-from-label'>
                                        Addresses
                                    </h4>
                                </div>
                                {addressList.map((address, addressIndex) => (
                                    <div
                                        className='address-form-items'
                                        key={addressIndex}
                                    >
                                        <br />
                                        <hr />
                                        <div className='row bg-info'>
                                            {[
                                                "title",
                                                "address",
                                                "phone",
                                                "fax",
                                                "email",
                                            ].map((field, idx) => (
                                                <div
                                                    key={idx}
                                                    className='col-md-4 form-group '
                                                >
                                                    <label className='col-md-12 col-from-label'>
                                                        {field
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            field.slice(1)}{" "}
                                                        <span className='text-danger'>
                                                            *
                                                        </span>
                                                    </label>
                                                    <div className='col-md-12'>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            name={field}
                                                            placeholder={
                                                                field
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                field.slice(1)
                                                            }

                                                            required
                                                            onChange={(e) =>
                                                                handleAddressChange(
                                                                    addressIndex,
                                                                    field,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }

                                                            value={
                                                                address[field]
                                                            }

                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <div className='col-md-4'>
                                                <label className='col-md-12 col-from-label op-info'>
                                                    <span>Opening Info{" "}
                                                    <span className='text-danger'>
                                                        *
                                                    </span></span>
                                                    <span
                                                        className="btn-mini"
                                                        onClick={() =>
                                                            incrementOpeningInfo(
                                                                addressIndex
                                                            )
                                                        }

                                                    >
                                                        Create
                                                    </span>
                                                </label>
                                                {address.opening_info.map(
                                                    (info, openingIndex) => (
                                                        <div
                                                            key={openingIndex}
                                                            className='form-group col-md-12'
                                                        >
                                                            <input
                                                                type='text'
                                                                className='form-control'
                                                                name='opening_info'
                                                                placeholder='Opening Info'
                                                                onChange={(e) =>
                                                                    handleOpeningChange(
                                                                        addressIndex,
                                                                        openingIndex,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }

                                                                value={
                                                                    info.info
                                                                }

                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                                <div className='row'>
                                    <div className='col-md-6 btn-submit' style={{padding: '25px 0 10px'}}>
                                        <button
                                            type='submit'
                                            className='btn btn-primary'
                                        >
                                            Save
                                        </button>
                                    </div>
                                    <div className='col-md-6 address-btn-wrap text-right'>
                                        <span onClick={incrementAddressInfo}>
                                            Add Address
                                        </span>
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
