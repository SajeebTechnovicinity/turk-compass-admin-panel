"use client";
import { EYE } from "@/app/assets/icons";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

export default function Dashboard() {
    const [userList, setuser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    async function deleteaccount(id){
    const response = await axiosClient.get(`user-profile/general/active-inactive?id=${id}`);
        fetchData();

        if(response.data.success==false){
            Swal.fire({
                title: 'error',
                text: response.data.message,
                icon: 'error',
                // confirmButtonText: 'Cool'
            })
        }
        else if (response.data.success==true) {
            Swal.fire({
                title: 'success',
                text: response.data.message,
                icon: 'success',
            })
        }
    }
     // Pagination click handler
     const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const buttonStyle = {
        padding: '8px 16px',
        margin: '0 5px',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    };

    const infoStyle = {
        margin: '0 10px',
        fontSize: '16px'
    };

const fetchData = async () => {
    try {
      const response = await axiosClient.get(`/user/get?page=${currentPage}`);
      const responseData = response.data; // Rename data variable for clarity
      if (responseData.success === true) {
        setuser(responseData.userList);
      }
    } catch (error) {
      console.error('Error fetching business posts:', error);
    }
  };
    useEffect(() => {
      fetchData();
    }, [currentPage]); // Empty dependency array means it runs only once on mount
    return (
        <div className='dashboard-content'>
            <div className='dashboard-content__topbar topbar flex-ctr'>
                <div className='drawer-open'>
                    <span className='slice-top'></span>
                    <span className='slice-middle'></span>
                    <span className='slice-bottom'></span>
                </div>
            </div>
            <div className='dashboard-content__title-bar title-bar flex-ctr-spb'>
                <h3 className='title'>User List</h3>
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <div className='dashboard-table-wrap flex-spb'>
                        <table className='dashboard-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Package type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                userList.map( (post,index)=>{
                                  return <tr key={post._id}>
                                  <td>{index+1}</td>
                                  <td>{post.userName}</td>
                                  <td>{post.email}</td>
                                  <td>{post.package_type}</td>

                                  <td className='status'>{post.is_delete?"inactive":'active'}</td>
                                  <td>
                                      <div className='act-btns'>
                                      <Link
                                                href={{
                                                    pathname: "/user/user-list/details",
                                                    query: { id: post._id },
                                                }}
                                                className='act-btn act-btn-succes'
                                            >
                                            {EYE}
                                        </Link>
                                          {/* <a href='#' className='act-btn act-btn-succes'>{EDIT}</a>
                                          <a href='#' className='act-btn act-btn-danger'>{DELETE}</a> */}

                                          <button className="btn danger" onClick={()=>{deleteaccount(post._id)}}>{post.is_delete ?"Active":"Inactive"}</button>
                                      </div>
                                  </td>
                              </tr>
                                })
                              }

                            </tbody>
                        </table>




                        <div className="has-pagination">

                            <div className="pagination" style={{ textAlign:'center' }}>
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
