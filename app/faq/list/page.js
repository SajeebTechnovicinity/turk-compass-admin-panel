"use client";
import { DELETE, EDIT } from "@/app/assets/icons";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
    const [categoryList, setCategory] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosClient.get("/faq/list");
          const responseData = response.data; // Rename data variable for clarity

          if (responseData.success === true) {
            setCategory(responseData.faqs);
          }
        } catch (error) {
          console.error('Error fetching faqs:', error);
        }
      };
  
      fetchData();
    }, []); // Empty dependency array means it runs only once on mount

    const handleDelete = async (id) => {
        try {
            const response = await axiosClient.get(`/faq/delete?id=${id}`);
            if (response.data.success) {
                setCategory(prevCategories => prevCategories.filter(category => category._id !== id));

                Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                });
            } else {
                console.error('Failed to delete faq:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting faq:', error);
        }
    };

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
                <h3 className='title'>Faq List</h3>

                <Link
                                href={{
                                    pathname: "/faq/create",
                                    
                                }}
                                className='db-button'
                            >
                                Create
                        </Link>
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <div className='dashboard-table-wrap flex-spb'>
                        <table className='dashboard-table'>
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Title</th>                                
                                    <th>Description</th>
                                    {/* <th>Status</th> */}
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                              {
                                categoryList.map( (post,index)=>{
                                  return <tr key={post._id}>
                                  {/* <td>{index+1}</td> */}
                                  <td>{post.title}</td>
                                 <td>{post.description}</td>
                            
                                  {/* <td className='status'>{post.status}</td> */}
                                  <td>
                                      <div className='act-btns'>
                                      {/* <a href='#' className='act-btn act-btn-info'>{EYE}</a>
                                          <a href='#' className='act-btn act-btn-succes'>{EDIT}</a> */}

                                          <Link   href={{
                                    pathname: "/faq/edit",
                                    query: { id:post._id,title:post.title,description:post.description},
                                    
                                }} className='act-btn act-btn-succes'>{EDIT}</Link>
                                         <a
                                                            href='#'
                                                            className='act-btn act-btn-danger'
                                                            onClick={() => handleDelete(post._id)}
                                                        >
                                                            {DELETE}
                                                        </a>
                                      </div>
                                  </td>
                              </tr>
                                })
                              }
                            </tbody>
                        </table>

                       
                    </div>
                </div>
            </div>
        </div>
    );
}
