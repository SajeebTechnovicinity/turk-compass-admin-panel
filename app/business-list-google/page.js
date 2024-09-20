"use client";
import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [businessList, setBusinessList] = useState([]);
  const [turkBusiness, setTurkBusiness] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const buttonStyle = {
    padding: "8px 16px",
    margin: "0 5px",
    backgroundColor: "var(--primary-color)",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      try {
        const response = await fetch("/api/places");
        const data = await response.json();
        setBusinessList(data.results);
        console.log("Nearby Places:", data.results);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchNearbyPlaces();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(
        `/business-post/compare-list?page=${currentPage}`
      );
      const responseData = response.data;
      if (responseData.success) {
        setTurkBusiness(responseData.businessPosts);
        console.log("Turk Business:", responseData.businessPosts);
      }
    } catch (error) {
      console.error("Error fetching business posts:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <div className="dashboard-content__title-bar title-bar flex-ctr-spb">
        <h3 className="title">Business List</h3>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <div className="dashboard-table-wrap flex-spb">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Turk Business Name</th>
                  <th>Turk Business Address</th>
                  <th>Corresponding Multiple Business Addresses</th>
                </tr>
              </thead>
              <tbody>
                {turkBusiness.map((business, index) => (
                  <tr key={index}>
                    <td>{business.business_name}</td>
                    <td>{business.address}</td>
                    <td>
                      {businessList
                        .filter(
                          (googleBusiness) =>
                            googleBusiness.name === business.business_name
                        )
                        .map((googleBusiness, gIndex) => (
                          <div key={gIndex}>
                            <p>{googleBusiness.formatted_address}
                            <button
                              style={buttonStyle}
                              onClick={async () => {
                                try {
                                  const response = await axiosClient.post(
                                    `/business-post/update-address/?id=${business._id}`,
                                    {
                                      address: business.address,
                                    }
                                  );
                                  const responseData = response.data;
                                  if (responseData.success) {
                                    fetchData(); // Refresh data after update
                                    Swal.fire({
                                      title: "success",
                                      text: "Ignored Successfully",
                                      icon: "error",
                                      // confirmButtonText: 'Cool'
                                    });
                                  }
                                  console.log("Update response:", responseData);
                                } catch (error) {
                                  console.error("Error updating business post:", error);
                                }
                              }}
                            >
                              Ignore
                            </button>
                            <button
                              style={buttonStyle}
                              onClick={async () => {
                                try {
                                  const response = await axiosClient.post(
                                    `/business-post/update-address/?id=${business._id}`,
                                    {
                                      address: googleBusiness.formatted_address,
                                    }
                                  );
                                  const responseData = response.data;
                                  if (responseData.success) {
                                    fetchData(); // Refresh data after update
                                    Swal.fire({
                                      title: "success",
                                      text: "Address Updated Successfully",
                                      icon: "error",
                                      // confirmButtonText: 'Cool'
                                    });
                                  }
                                  console.log("Update response:", responseData);
                                } catch (error) {
                                  console.error("Error updating business post:", error);
                                }
                              }}
                            >
                              Update Address
                            </button>
                            </p>
                          </div>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination" style={{ textAlign: "center" }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={buttonStyle}
              >
                Previous
              </button>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                style={buttonStyle}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
