"use client";

//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../../axiosClient";
import "../style.css";
export default function AppInfo() {
  const [apping, setAppinfo] = useState([]);

  const [aboutUs, setAboutUs] = useState();
  const [condition, setCondition] = useState();
  const [privacy, setPrivacy] = useState();

  const submit = async (event) => {
    event.preventDefault();
    var data = {
      about_us: aboutUs,
      terms_condition: condition,
      privacy_policy: privacy,
    };

    const response = await axiosClient.post("/app-info/create-update", data);
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
          <center>
            <img
              src="https://res.cloudinary.com/daqxhckof/image/upload/v1717578539/turk-compass/turks_pgmiqi.png"
              width="400px"
            ></img>
          </center>
          <br></br>
          <br></br>

          <div className="form-card">
            <div className="card-header">
              <h5 className="mb-0 h6">Privacy Policy</h5>
            </div>

            <div className="card-body">
              <div className="form-group row">
                <div dangerouslySetInnerHTML={{ __html: privacy }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
