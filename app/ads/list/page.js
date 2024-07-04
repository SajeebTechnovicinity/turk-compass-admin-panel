"use client";
import { EDIT } from "@/app/assets/icons";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [adsList, setAds] = useState([]);
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

  const infoStyle = {
    margin: "0 10px",
    fontSize: "16px",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          `/banner/all-banner?page=${currentPage}`
        );
        const responseData = response.data; // Rename data variable for clarity

        if (responseData.success === true) {
          setAds(responseData.bannerList);
        }
      } catch (error) {
        console.error("Error fetching business posts:", error);
      }
    };
    fetchData();
  }, [currentPage]); // Empty dependency array means it runs only once on mount

  // Pagination click handler
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
        <h3 className="title">Ads List</h3>

        {/* <Link
                                href={{
                                    pathname: "/industry/create",
                                }}
                                className='db-button'
                            >
                                Create
                        </Link> */}
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <div className="dashboard-table-wrap flex-spb">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User Name</th>
                  <th>Ads</th>
                  <th>Created Date</th>
                  <th>Expired Date</th>
                  <th>Status</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {adsList.map((post, index) => {
                  const expiryDate = new Date(post.createdAt);
                  const currentDate = new Date(post.createdAt);
                  expiryDate.setDate(expiryDate.getDate() + 30);

                  // Get today's date without time
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  // Get expiry date without time
                  const expiryDateOnly = new Date(expiryDate);
                  expiryDateOnly.setHours(0, 0, 0, 0);

                  // Determine status
                  const status = today > expiryDateOnly ? "Inactive" : "Active";

                  return (
                    <tr key={post._id}>
                      <td>{index + 1}</td>
                      <td>{post.user_id ? post.user_id.userName : ""}</td>
                      <td>
                        <img
                          style={{ height: "100px" }}
                          src={post.cover_img}
                          alt="Ad Cover"
                        />
                      </td>
                      <td>{currentDate.toLocaleDateString()}</td>
                      <td>{expiryDate.toLocaleDateString()}</td>
                      <td>{status}</td>
                    </tr>
                  );
                })}
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
