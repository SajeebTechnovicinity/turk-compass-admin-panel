"use client";
import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [businessList, setBusinessList] = useState([]);
  const [turkBusiness, setTurkBusiness] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [placesData, setPlacesData] = useState({}); // For storing places data

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

  // Fetch nearby places for a specific business
  const fetchNearbyPlaces = async (businessName, businessId) => {
    try {
      const response = await fetch(`/api/places?business_name=${businessName}`);
      const data = await response.json();
      setPlacesData((prevData) => ({
        ...prevData,
        [businessId]: data.results, // Store results by businessId
      }));
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(
        `/business-post/compare-list?page=${currentPage}`
      );
      const responseData = response.data;
      if (responseData.success) {
        setTurkBusiness(responseData.businessPosts);
        console.log("Turk Business:", responseData.businessPosts);

        // Fetch nearby places for each business
        responseData.businessPosts.forEach((business) => {
          fetchNearbyPlaces(business.business_name, business._id);
        });
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

  const updateBusinessAddress = async (businessId, newAddress, action) => {
    try {
      const response = await axiosClient.post(
        `/business-post/update-address/?id=${businessId}`,
        { address: newAddress }
      );
      const responseData = response.data;
      if (responseData.success) {
        fetchData(); // Refresh data after update
        Swal.fire({
          title: action === "ignore" ? "Ignored" : "Address Updated",
          text:
            action === "ignore"
              ? "Business was ignored."
              : "Address updated successfully.",
          icon: action === "ignore" ? "info" : "success",
        });
      }
      console.log("Update response:", responseData);
    } catch (error) {
      console.error("Error updating business post:", error);
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
                {turkBusiness.map((business) => (
                  <tr key={business._id}>
                    <td>{business.business_name}</td>
                    <td>{business.address}</td>
                    <td>
                      {placesData[business._id] ? (
                        placesData[business._id]
                          .filter(
                            (googleBusiness) =>
                              googleBusiness.name === business.business_name
                          ) // Filter matching business names
                          .map((googleBusiness, gIndex) => (
                            <div key={gIndex}>
                              <p>{googleBusiness.name}</p>
                              <p>
                                {googleBusiness.formatted_address}
                                <button
                                  style={buttonStyle}
                                  onClick={() =>
                                    updateBusinessAddress(
                                      business._id,
                                      business.address,
                                      "ignore"
                                    )
                                  }
                                >
                                  Ignore
                                </button>
                                <button
                                  style={buttonStyle}
                                  onClick={() =>
                                    updateBusinessAddress(
                                      business._id,
                                      googleBusiness.formatted_address,
                                      "update"
                                    )
                                  }
                                >
                                  Update Address
                                </button>
                              </p>
                            </div>
                          ))
                      ) : (
                        <p>Matching with Google Business...</p>
                      )}
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