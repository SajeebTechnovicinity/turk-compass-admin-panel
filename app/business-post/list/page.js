
"use client";
import { DELETE, EDIT, EYE } from "@/app/assets/icons";
import axiosClient from "@/app/axiosClient";
import { useState,useEffect } from "react";
import Link from "next/link";
import Swal from 'sweetalert2';

export default function Dashboard() {
    const [businessPosts, setBusinessPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    async function deleteaccount(id){
        const response = await axiosClient.get(`user-profile/business/active-inactive?id=${id}`);
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
    

    const buttonStyle = {
        padding: '8px 16px',
        margin: '0 5px',
        backgroundColor: '#4CAF50',
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
          const response = await axiosClient.get(`/business-post/admin-list?page=${currentPage}`);
          const responseData = response.data; // Rename data variable for clarity
          console.log(responseData);
          if (responseData.success === true) {
            setBusinessPosts(responseData.businessPosts);
            console.log(responseData); // Log the response data
          }
        } catch (error) {
          console.error('Error fetching business posts:', error);
        }
      };

    useEffect(() => {
      
  
      fetchData();
    }, [currentPage]); // Empty dependency array means it runs only once on mount

        // Pagination click handler
        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        };
    
        useEffect(() => {
            fetchData();
        }, [currentPage]);
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
                <h3 className='title'>Business Post</h3>
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <form action='#' className='dashboard-form flex-ctr-spb'>
                        <div className='dashboard-form__fields flex-ctr'>
                            <div className='dashboard-form__field select-field'>
                                <select name='category' className='select'>
                                    <option value='1'>Counter 1</option>
                                    <option value='2'>Counter 2</option>
                                </select>
                            </div>
                            <div className='dashboard-form__field select-field'>
                                <select name='category' className='select'>
                                    <option value='0' hidden>
                                        Employee
                                    </option>
                                    <option value='1'>John Doe</option>
                                    <option value='2'>John Doe</option>
                                </select>
                            </div>
                            <div className='dashboard-form__field select-field'>
                                <select
                                    name='date-range'
                                    id=''
                                    className='select'
                                    defaultValue={"0"}
                                >
                                    <option value='0' hidden>
                                        Date range
                                    </option>
                                    <option value='1'>01 - 10</option>
                                    <option value='2'>11 - 20</option>
                                    <option value='3'>21 - 31</option>
                                </select>
                            </div>
                        </div>
                        <Link
                                href={{
                                    pathname: "/business-post/create",
                                    
                                }}
                                className='db-button'
                            >
                                {" "}
                                Create
                        </Link>
                       
                    </form>
                    <div className='dashboard-table-wrap flex-spb'>
                        <table className='dashboard-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Business Post Name</th>                                
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Created At</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                businessPosts.map( (post)=>{
                                  return <tr key={post._id}>
                                  <td>{post._id}</td>
                                  <td>{post.business_name}</td>
                                  <td>{post.address}</td>
                                  <td>{post.contact_phone}</td>
                                  <td>{post.createdAt}</td>
                                  <td className='status'>{post.is_delete ?"Inactive":"Active"}</td>
                                  <td>
                                      <div className='act-btns'>
                                      <Link
                                                href={{
                                                    pathname: "/business-post/details",
                                                    query: { id: post._id },                                               
                                                }}
                                                className='act-btn act-btn-succes'
                                            >
                                            {EYE}
                                        </Link>
                                        <Link
                                                href={{
                                                    pathname: "/business-post/edit",
                                                    query: { id: post._id },                                               
                                                }}
                                                className='act-btn act-btn-succes'
                                            >
                                            {EDIT}
                                        </Link>
                                        <button className="btn danger" onClick={()=>{deleteaccount(post._id)}}>{post.is_delete ?"Active":"Inactive"}</button>
                                    
                                      </div>
                                  </td>
                              </tr>
                                })
                              }

                            </tbody>
                        </table>

                  

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
    );
}
