"use client";
import axiosClient from "@/app/axiosClient";
import { useState } from "react";
import Swal from "sweetalert2";
import "../../form/style.css";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  // const [offerTitle, setOfferTitle] = useState("");
  const [url, setUrl] = useState("");
  const [homeBanner, setBanner] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5 MB in bytes
        Swal.fire({
          title: "Error",
          text: "The uploaded image exceeds the maximum allowed size of 5MB. Please choose a smaller file",
          icon: "error",
        });
        // if (fileInputRef.current) {
        //   fileInputRef.current.value = ""; // Reset the file input field
        // }
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        // Once the FileReader has read the file, set the base64 data
        console.log(reader.result);
        setImage(reader.result);
        //setImage(reader.result);
      };
      // Read the file as a data URL (base64)
      console.log(reader.readAsDataURL(file));
    }
  };
  const submit = async (event) => {
    event.preventDefault();
    var data = {
      petition: {
        title: title,
        image: image,
        description: description,
        link: url,
      },
    };
    const response = await axiosClient.post(
      "/app-info/petition/create-update",
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
      setUrl("");
      setTitle("");
      setImage("");
      Swal.fire({
        title: "success",
        text: response.data.message,
        icon: "success",
        // confirmButtonText: 'Cool'
      });
    }
  };
  return (
    <div className="dashboard-content">
      <div className="dashboard-content__topbar topbar flex-ctr">
        <div className="drawer-open">
          <span className="slice-top"></span>
          <span className="slice-middle"></span>
          <span className="slice-bottom"></span>
        </div>
      </div>
      <div className="dashboard-content__title-bar title-bar flex-ctr-spb"></div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <div className="dashboard-table-wrap flex-spb">
            <form onSubmit={submit}>
              <div className="form-card">
                <div className="card-header">
                  <h5 className="mb-0 h6">Petition Create</h5>
                </div>
                <div className="card-body">
                  <div className="form-group row">
                    <label className="col-md-3 col-from-label">
                      Title <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control"
                        name="business_name"
                        placeholder="Title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 col-from-label">
                      Description
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control"
                        name="business_name"
                        placeholder="Desctiption"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 col-from-label">
                      Url Link <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control"
                        name="url_name"
                        placeholder="Url"
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
                      <div className="file-wrap">
                        <input
                          type="file"
                          name="cover_image"
                          required
                          className="selected-files"
                          onChange={handleCoverImage}
                        />
                      </div>
                      <div className="file-preview box sm"></div>
                    </div>
                  </div>
                  <div className="btn-submit mt-40">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
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
