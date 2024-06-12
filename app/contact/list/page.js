"use client";
import { EDIT } from "@/app/assets/icons";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [categoryList, setCategory] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosClient.get("/contact/list");
          const responseData = response.data; // Rename data variable for clarity

          if (responseData.success === true) {
            setCategory(responseData.contacts);
          }
        } catch (error) {
          console.error('Error fetching business posts:', error);
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
                <h3 className='title'>Contact List</h3>

                {/* <Link
                                href={{
                                    pathname: "/business-category/create",
                                    
                                }}
                                className='db-button'
                            >
                                Create
                        </Link> */}
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
                                    <th>Subject</th>                               
                                    <th>Mesage</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                              {
                                categoryList && categoryList.map( (post,index)=>{
                                  return <tr key={post._id}>
                                  <td>{index+1}</td>
                                  <td>{post.name}</td>
                                  <td>{post.email}</td>
                                  <td>{post.subject}</td>
                                  <td>{post.message}</td>
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
