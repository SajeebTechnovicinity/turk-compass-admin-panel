"use client";

import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import "../form/style.css";

export default function AppInfo() {
  const [aboutUs, setAboutUs] = useState('');
  const [condition, setCondition] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [image, setImage] = useState('');
  const [opening, setOpening] = useState([]);
  const [addressList, setAddressList] = useState([]);

  const incrementOpeningInfo =async (addressIndex,index) =>{
    var addressListdata=addressList;
    addressListdata[addressIndex].OpenTimeList= await [...addressListdata[addressIndex].OpenTimeList,{index,info:""}];
    setOpening(pre=>addressListdata)



    // setOpening([...opening, [{index,info: ''}]]);
  };

  
  const incrementAddressInfo = () => {
    setAddressList([...addressList, { branchName: '', address: '', phone: '', fax: '', email: '', OpenTimeList: [{info:""}]}]);
  };

  const handleCoverImage = (e) => {

    console.log(opening)
    // const file = e.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setImage(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = addressList.map((address, i) => 
      i === index ? { ...address, [field]: value } : address
    );
    setAddressList(updatedAddresses);
  };

  const handleOpeningChange = (addressIndex, openingIndex, value) => {



    opening


    console.log(addressIndex)
    console.log(openingIndex)



    // const updatedOpening = opening.map((info, i) =>
    //   i === openingIndex && info.addressIndex === addressIndex
    //     ? { ...info, info: value }
    //     : info
    // );
    // setOpening(updatedOpening);
  };

  const submit = async (event) => {
    event.preventDefault();

    console.log(addressList)
    console.log(opening)
  
  };

  useEffect(() => {
    const fetchData = async () => {
      const appinfo = await axiosClient.get("/app-info/get");
      const data = appinfo.data.appinfo || {};
      setAboutUs(data.about_us || '');
      setCondition(data.terms_condition || '');
      setPrivacy(data.privacy_policy || '');
      // Assuming API provides addresses and opening info in the required format
      setAddressList(data.addresses || []);
      setOpening(data.opening_info || []);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-content">
      <div className="dashboard-content__topbar topbar flex-ctr">
        <div className="drawer-open">
          <span className="slice-top"></span>
          <span className="slice-middle"></span>
          <span className="slice-bottom"></span>
        </div>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <div className="form-card">
            <div className="card-header">
              <h5 className="mb-0 h6">Consulate Info</h5>
            </div>
            <form onSubmit={submit}>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-md-12 col-from-label">Consulate Description</label>
                  <div className="col-md-12">
                    <textarea
                      name="meta_description"
                      onChange={(e) => setAboutUs(e.target.value)}
                      rows="8"
                      className="form-control"
                      value={aboutUs}
                    ></textarea>
                    <small className="text-muted">About Us</small>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 col-from-label">Image</label>
                  <div className="col-md-8">
                    <input
                      type="file"
                      name="cover_image"
                      required
                      className="selected-files"
                      onChange={handleCoverImage}
                    />
                  </div>
                </div>
                <br />
                <div className="form-group row">
                  <label className="col-md-3 col-from-label">Add Address</label>
                  <div className="col-md-8">
                    <span onClick={incrementAddressInfo}>Add Address</span>
                  </div>
                </div>
                {addressList.map((address, addressIndex) => (
                  <div key={addressIndex}>
                    <br />
                    <hr />
                    <div className="form-group row bg-info">
                      {['branchName', 'address', 'phone', 'fax', 'email'].map((field, idx) => (
                        <div key={idx} className="col-md-4">
                          <label className="col-md-12 col-from-label">
                            {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-danger">*</span>
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control"
                              name={field}
                              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                              required
                              onChange={(e) => handleAddressChange(addressIndex, field, e.target.value)}
                              value={address[field]}
                            />
                          </div>
                        </div>
                      ))}
                      <div className="col-md-4">
                        <label className="col-md-12 col-from-label">
                          Opening Info <span className="text-danger">*</span> 
                          <span onClick={() => incrementOpeningInfo(addressIndex)}>Create</span>
                        </label>
                        {addressList[addressIndex].OpenTimeList.map((info, openingIndex) => (
                          <div key={openingIndex} className="col-md-12">
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              name="opening_info"
                              placeholder="Opening Info"
                              onChange={(e) => handleOpeningChange(addressIndex,openingIndex,e.target.value)}
                              value={info.info}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
                <div className="form-group mb-0 text-right">
                  <button type="submit" className="btn btn-primary">
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
