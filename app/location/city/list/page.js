"use client";
import { EDIT } from "@/app/assets/icons";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [cityList, setCityList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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

    // Pagination click handler
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosClient.get(`/city/admin/list?page=${currentPage}`);
          const responseData = response.data; // Rename data variable for clarity
          if (responseData.success === true) {
            setCityList(responseData.citys);
          }
        } catch (error) {
          console.error('Error fetching business posts:', error);
        }
      };
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
                <h3 className='title'>City List</h3>
                <Link
                                href={{
                                    pathname: "/location/city/create",
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
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                cityList && cityList.map( (city,index)=>{
                                  return <tr key={city._id}>
                                  {/* <td>{index+1}</td> */}
                                  <td>{city.country && city.country.name}</td>
                                  <td>{city.state && city.state.name}</td>
                                  <td>{city.name}</td>
                                  <td>{city.status==1?'active':"inactive"}</td>
                                  <td>
                                      <div className='act-btns'>
                                      {/* <a href='#' className='act-btn act-btn-info'>{EYE}</a> */}
                                          {/* <a href='#' className='act-btn act-btn-succes'>{EDIT}</a> */}

                                    <Link   href={{
                                    pathname: "/location/city/edit",
                                    query: { id:city._id,name:city.name,country:city.country._id,state:city.state?city.state._id:null},
                                }} className='act-btn act-btn-succes'>{EDIT}</Link>

                                          {/* <a href='#' className='act-btn act-btn-danger'>{DELETE}</a> */}
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
