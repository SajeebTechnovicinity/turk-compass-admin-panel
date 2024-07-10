"use client";
import { DELETE } from "@/app/assets/icons";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
    const [industryList, setindustry] = useState([]);

    async function deleteaccount(id){
        const response = await axiosClient.get(`/app-info/petition-delete?id=${id}`);
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

        const fetchData = async () => {
            try {
              const response = await axiosClient.get("/app-info/petition/petitionList");
              const responseData = response.data; // Rename data variable for clarity

              if (responseData.success === true) {
                setindustry(responseData.info);
              }
            } catch (error) {
              console.error('Error fetching business posts:', error);
            }
          };
    useEffect(() => {
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
                <h3 className='title'>Petition List</h3>

                <Link
                                href={{
                                    pathname: "/petition/create",
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
                                    <th>Image</th>
                                    <th>Link</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                industryList.map( (post,index)=>{
                                  return <tr key={post._id}>
                                  {/* <td>{index+1}</td> */}
                                  <td>{post.title}</td>
                                  <td>{post.description}</td>
                                  <td> <img style={{"height":"100px"}} src={post.image}></img></td>
                                  <td>{post.link}</td>
                                  <td>{post.status==1?'active':"inactive"}</td>
                                  <td>
                                    <div className="act-btns">
                                    <button className="act-btn-danger act-btn" onClick={()=>{deleteaccount(post._id)}}>{DELETE}</button>
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
