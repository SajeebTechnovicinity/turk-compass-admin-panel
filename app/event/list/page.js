"use client";
import { DELETE, EDIT, EYE } from "@/app/assets/icons";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [memberPerlaments, setmemberPerlaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function deleteaccount(id) {
    const response = await axiosClient.get(`event/delete?id=${id}`);
    fetchData();

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
      });
    }
  }

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

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(
        `/event/get-event?page=${currentPage}`
      );
      const responseData = response.data; // Rename data variable for clarity
      console.log(responseData);
      if (responseData.success === true) {
        setmemberPerlaments(responseData.eventList);
        console.log(responseData); // Log the response data
      }
    } catch (error) {
      console.error("Error fetching Member of Perlamants:", error);
    }
  };

  useEffect(() => {
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
        <h3 className="title">Event List</h3>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          {/* <form action='#' className='dashboard-form flex-ctr-spb'>

                        <Link
                                href={{
                                    pathname: "/member-of-perlament/create",

                                }}
                                className='db-button'
                            >
                                {" "}
                                Create
                        </Link>

                    </form> */}
          <div className="dashboard-table-wrap flex-spb">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>City</th>
                  <th>Start Date & Time</th>
                  <th>Start Date & Time</th>
                  <th>Payment Status</th>
                  <th>Payment Amount</th>
                  <th>Created At</th>
                  {/* <th>Status</th>
                                    <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {memberPerlaments.map((post) => {
                  return (
                    <tr key={post._id}>
                      <td>{post.title}</td>
                      <td>{post.company}</td>
                      <td>{post.city_name}</td>
                      <td>{post.start_date}</td>
                      <td>{post.end_date}</td>
                      <td>{post.payment_status ? "Completed" : "Not Completed"}</td>
                      <td>{post.payment_amount}</td>
                      <td>{post.createdAt}</td>
                      {/* <td className='status'>Active</td>
                                  <td>
                                      <div className='act-btns'>
                                      <Link
                                                href={{
                                                    pathname: "/member-of-perlament/details",
                                                    query: { id: post._id },
                                                }}
                                                className='act-btn act-btn-succes'
                                            >
                                            {EYE}
                                        </Link>
                                        <Link
                                                href={{
                                                    pathname: "/member-of-perlament/edit",
                                                    query: { id: post._id },
                                                }}
                                                className='act-btn act-btn-succes'
                                            >
                                            {EDIT}
                                        </Link>
                                        <button className='act-btn act-btn-danger' onClick={()=>{deleteaccount(post._id)}}>{DELETE}</button>

                                      </div>
                                  </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
  );
}
