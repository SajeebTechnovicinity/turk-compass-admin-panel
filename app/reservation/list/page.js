"use client";
import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [reservation, setReservation] = useState([]);
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

  // Pagination click handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          `/reservation/all-list?page=${currentPage}`
        );
        const responseData = response.data; // Rename data variable for clarity
        console.log(response);

        if (responseData.success === true) {
          setReservation(responseData.reservations);
        }
      } catch (error) {
        console.error("Error fetching business posts:", error);
      }
    };
    fetchData();
  }, [currentPage]); // Empty dependency array means it runs only once on mount
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
        <h3 className="title">Reservation List</h3>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <div className="dashboard-table-wrap flex-spb">
            <table className="dashboard-table">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Created By</th>
                  <th>Business Post</th>
                  <th>Number of Person</th>
                  <th>Note</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reservation.map((res, index) => {
                  return (
                    <tr key={res._id}>
                      {/* <td>{index + 1}</td> */}
                      <td>{res.user ? res.user.userName : ""}</td>
                      <td>
                        {res.business_post
                          ? res.business_post.business_name
                          : ""}
                      </td>
                      <td>{res.number_of_person}</td>
                      <td>{res.note}</td>
                      {/* <td> <img style={{"height":"100px"}} src={post.image}></img></td>
                                  <td>{post.status==1?'active':"inactive"}</td> */}
                      <td>{res.is_canceled == 0 ? "Active" : "Inactive"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="has-pagination">
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
    </div>
  );
}
