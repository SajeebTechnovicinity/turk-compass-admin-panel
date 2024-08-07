"use client";
import { EDIT } from "@/app/assets/icons";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [tagList, setTag] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosClient.get("/tag/list");
          const responseData = response.data; // Rename data variable for clarity

          if (responseData.success === true) {
            setTag(responseData.tags);
          }
        } catch (error) {
          console.error('Error fetching tags:', error);
        }
      };
  
      fetchData();
    }, []); // Empty dependency array means it runs only once on mount
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
                <h3 className='title'>Tag List</h3>

                <Link
                                href={{
                                    pathname: "/tag/create",
                                    
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
                                    <th>Name (English)</th>  
                                    <th>Name (Turkish)</th>                                  
                                    <th>Category</th>                                
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                tagList.map( (post,index)=>{
                                  return <tr key={post._id}>
                                  {/* <td>{index+1}</td> */}
                                  <td>{post.name}</td>
                                  <td>{post.name_tr}</td>
                                  <td>{post.category?post.category.name:'-'}</td>
                            
                                  {/* <td className='status'>{post.status}</td> */}
                                  <td>
                                      <div className='act-btns'>
                                      {/* <a href='#' className='act-btn act-btn-info'>{EYE}</a>
                                          <a href='#' className='act-btn act-btn-succes'>{EDIT}</a> */}

                                          <Link   href={{
                                    pathname: "/tag/edit",
                                    query: { id:post._id,name:post.name,name_tr:post.name_tr,category:post.category?post.category._id:''},
                                    
                                }} className='act-btn act-btn-succes'>{EDIT}</Link>
                                          {/* <a href='#' className='act-btn act-btn-danger'>{DELETE}</a> */}
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
