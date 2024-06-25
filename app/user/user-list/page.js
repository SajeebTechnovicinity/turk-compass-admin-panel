"use client";
import { BLOCK, CHECKMARK, EYE } from "@/app/assets/icons";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function deleteAccount(id) {
    try {
      const response = await axiosClient.get(
        `user-profile/general/status-active-inactive?id=${id}`
      );
      fetchData(); // Fetch updated data after account status change

      if (response.data.success === false) {
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error",
        });
      } else if (response.data.success === true) {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong!",
        icon: "error",
      });
      console.error("Error deleting account:", error);
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(`/user/get?page=${currentPage}`);
      const responseData = response.data;
      if (responseData.success === true) {
        setUserList(responseData.userList);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data whenever the current page changes

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
        <h3 className="title">User List</h3>
        <Link href="/user/user-list/create" className="db-button">
          Create
        </Link>
      </div>

      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <div className="dashboard-table-wrap flex-spb">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Package Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.package_type}</td>
                    <td className="status">
                      {user.status ? "inactive" : "active"}
                    </td>
                    <td>
                      <div className="act-btns">
                        <Link
                          href={{
                            pathname: "/user/user-list/details",
                            query: { id: user._id },
                          }}
                          className="act-btn act-btn-succes"
                        >
                          {EYE}
                        </Link>
                        <button
                          title={user.is_delete ? "Activate" : "Deactivate"}
                          className="act-btn act-btn-info"
                          onClick={() => deleteAccount(user._id)}
                        >
                          {user.status ? CHECKMARK : BLOCK}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
