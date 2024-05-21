"use client";
import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [industryList, setindustry] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosClient.get("/job/industry-get");
          const responseData = response.data; // Rename data variable for clarity

          if (responseData.success === true) {
            setindustry(responseData.industry);
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
                <h3 className='title'>Industry Create</h3>
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <div className='dashboard-table-wrap flex-spb'>
                    </div>
                </div>
            </div>
        </div>
    );
}
