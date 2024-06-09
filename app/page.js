"use client";
import { useEffect, useState } from "react";
import axiosClient from "./axiosClient";
import "./style.css";
export default function Dashboard() {
    const [data, setDataList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosClient.get(`/admin/dashboard/show`);
          const responseData = response.data; // Rename data variable for clarity

          if (responseData.success === true) {
            setDataList(responseData);
            console.log(responseData); //
          }
        } catch (error) {
          console.error('Error fetching data:', error);
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
            <div className='dashboard-content__title-bar title-bar'>
                <h3 className='title'>Dashboard</h3>
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <div className='cards dashboard-main-content__cards flex-start-spb'>
                        <div className='card flex-ctr card-1'>
                            <div className='card__icon flex-ctr-ctr'>
                            <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>Total User</p>
                                <h3 className='card__text-main'>{data.totalUser}</h3>
                            </div>
                        </div>
                        <div className='card flex-ctr card-2'>
                            <div className='card__icon flex-ctr-ctr'>
                            <svg width="21" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM472 200H616c13.3 0 24 10.7 24 24s-10.7 24-24 24H472c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Total Inactive User
                                </p>
                                <h3 className='card__text-main'>{data.inactiveUser}</h3>
                            </div>
                        </div>
                        <div className='card flex-ctr card-3'>
                            <div className='card__icon flex-ctr-ctr'>
                            <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z"/></svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Total Reservation (Without Cancel)
                                </p>
                                <h3 className='card__text-main'>{data.totalConfirmedReservations}</h3>
                            </div>
                        </div>

                        <div className='card flex-ctr card-1'>
                            <div className='card__icon flex-ctr-ctr'>
                            <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z"/></svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>Reservation Cancel</p>
                                <h3 className='card__text-main'>{data.totalCanceledReservations}</h3>
                            </div>
                        </div>

                    </div>

                    <div className='cards dashboard-main-content__cards flex-start-spb'>
                        <div className='card flex-ctr card-4'>
                            <div className='card__icon flex-ctr-ctr'>
                            <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"/></svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Total Job
                                </p>
                                <h3 className='card__text-main'>{data.totalJob}</h3>
                            </div>
                        </div>
                        <div className='card flex-ctr card-2'>
                            <div className='card__icon flex-ctr-ctr'>
                            <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Free User
                                </p>
                                <h3 className='card__text-main'>{data.freeUser}</h3>
                            </div>
                        </div>
                        <div className='card flex-ctr card-3'>
                            <div className='card__icon flex-ctr-ctr'>
                            <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Premium User
                                </p>
                                <h3 className='card__text-main'>{data.premiumUser}</h3>
                            </div>
                        </div>
                        <div className='card flex-ctr card-4'>
                            <div className='card__icon flex-ctr-ctr'>
                            <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Job Seeker User
                                </p>
                                <h3 className='card__text-main'>{data.jobSeekerUser}</h3>
                            </div>
                        </div>
                    </div>

                    <div className='cards dashboard-main-content__cards flex-start-spb'>
                        <div className='card flex-ctr card-4'>
                            <div className='card__icon flex-ctr-ctr'>
                            <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z"/></svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    General Employer
                                </p>
                                <h3 className='card__text-main'>{data.general_employer}</h3>
                            </div>
                        </div>
                        <div className='card flex-ctr card-2'>
                            <div className='card__icon flex-ctr-ctr'>
                                <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z"/></svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Premium Employer
                                </p>
                                <h3 className='card__text-main'>{data.premium_employer}</h3>
                            </div>
                        </div>

                        <div className='card flex-ctr card-2'>
                            <div className='card__icon flex-ctr-ctr'>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <g id='Iconly/Bulk/Notification'>
                                        <g id='Notification'>
                                            <path
                                                id='Fill 1'
                                                d='M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453'
                                                fill='white'
                                            />
                                            <path
                                                id='Fill 4'
                                                opacity='0.4'
                                                d='M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284'
                                                fill='white'
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Total Active Business Post
                                </p>
                                <h3 className='card__text-main'>{data.totalActiveBusinessPost}</h3>
                            </div>
                        </div>

                        <div className='card flex-ctr card-2'>
                            <div className='card__icon flex-ctr-ctr'>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <g id='Iconly/Bulk/Notification'>
                                        <g id='Notification'>
                                            <path
                                                id='Fill 1'
                                                d='M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453'
                                                fill='white'
                                            />
                                            <path
                                                id='Fill 4'
                                                opacity='0.4'
                                                d='M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284'
                                                fill='white'
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Total Inactive Business Post
                                </p>
                                <h3 className='card__text-main'>{data.totalInactiveBusinessPost}</h3>
                            </div>
                        </div>

                    </div>

                    <div className='cards dashboard-main-content__cards flex-start-spb'>
                        <div className='card flex-ctr card-4'>
                            <div className='card__icon flex-ctr-ctr'>
                                <svg
                                    width='27'
                                    height='24'
                                    viewBox='0 0 27 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <g id='Iconly/Bulk/Paper Plus'>
                                        <g id='Paper Plus'>
                                            <path
                                                id='Fill 3'
                                                d='M20.6141 9.021C20.1193 9.021 19.4638 9.011 18.6478 9.011C16.6575 9.011 15.021 7.508 15.021 5.675V2.459C15.021 2.206 14.7986 2 14.5251 2H8.72799C6.0226 2 3.83594 4.026 3.83594 6.509V17.284C3.83594 19.889 6.12678 22 8.95371 22H17.5853C20.2821 22 22.4676 19.987 22.4676 17.502V9.471C22.4676 9.217 22.2463 9.012 21.9706 9.013C21.5083 9.016 20.9516 9.021 20.6141 9.021Z'
                                                fill='#FFFFFF'
                                            />
                                            <path
                                                id='Fill 1'
                                                d='M17.6283 2.56725C17.3006 2.25625 16.7285 2.47025 16.7285 2.90125V5.53825C16.7285 6.64425 17.727 7.55425 18.938 7.55425C19.703 7.56225 20.7639 7.56425 21.6648 7.56225C22.1262 7.56125 22.3608 7.05825 22.0407 6.75425C20.8845 5.65725 18.8142 3.69125 17.6283 2.56725Z'
                                                fill='#FFFFFF'
                                            />
                                            <path
                                                id='Fill 6'
                                                d='M15.7457 12.2363H13.8518V10.5093C13.8518 10.0983 13.4868 9.76428 13.0364 9.76428C12.5859 9.76428 12.2199 10.0983 12.2199 10.5093V12.2363H10.3271C9.87668 12.2363 9.51172 12.5703 9.51172 12.9813C9.51172 13.3923 9.87668 13.7263 10.3271 13.7263H12.2199V15.4523C12.2199 15.8633 12.5859 16.1973 13.0364 16.1973C13.4868 16.1973 13.8518 15.8633 13.8518 15.4523V13.7263H15.7457C16.1961 13.7263 16.5622 13.3923 16.5622 12.9813C16.5622 12.5703 16.1961 12.2363 15.7457 12.2363Z'
                                                fill='#FF0000'
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Total Category
                                </p>
                                <h3 className='card__text-main'>{data.totalCategory}</h3>
                            </div>
                        </div>
                        <div className='card flex-ctr card-2'>
                            <div className='card__icon flex-ctr-ctr'>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <g id='Iconly/Bulk/Notification'>
                                        <g id='Notification'>
                                            <path
                                                id='Fill 1'
                                                d='M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453'
                                                fill='white'
                                            />
                                            <path
                                                id='Fill 4'
                                                opacity='0.4'
                                                d='M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284'
                                                fill='white'
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Total SubCategory
                                </p>
                                <h3 className='card__text-main'>{data.totalSubCategory}</h3>
                            </div>
                        </div>

                        <div className='card flex-ctr card-2'>
                            <div className='card__icon flex-ctr-ctr'>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <g id='Iconly/Bulk/Notification'>
                                        <g id='Notification'>
                                            <path
                                                id='Fill 1'
                                                d='M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453'
                                                fill='white'
                                            />
                                            <path
                                                id='Fill 4'
                                                opacity='0.4'
                                                d='M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284'
                                                fill='white'
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Total Industry
                                </p>
                                <h3 className='card__text-main'>{data.totalIndustry}</h3>
                            </div>
                        </div>

                        <div className='card flex-ctr card-2'>
                            <div className='card__icon flex-ctr-ctr'>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <g id='Iconly/Bulk/Notification'>
                                        <g id='Notification'>
                                            <path
                                                id='Fill 1'
                                                d='M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453'
                                                fill='white'
                                            />
                                            <path
                                                id='Fill 4'
                                                opacity='0.4'
                                                d='M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284'
                                                fill='white'
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className='card__text'>
                                <p className='card__text-sub'>
                                    Total Member of Perlamant
                                </p>
                                <h3 className='card__text-main'>{data.totalMemerOfPerlamant}</h3>
                            </div>
                        </div>

                    </div>
                    {/* <div className='dashboard-main-content__box'>
                        <h3 className='dashboard-main-content__box-title'>
                            Client Statistic
                        </h3>
                        <div className='dashboard-main-content__box-body'>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. At officiis, facilis sint
                                consequuntur natus earum amet placeat nesciunt
                                aut dolore necessitatibus nam, quod eligendi
                                animi ipsum ratione! Eligendi reprehenderit
                                corporis, at tempore atque dolorum quo vero
                                magnam molestiae reiciendis saepe assumenda rem
                                voluptatum fuga explicabo veniam. Reiciendis
                                corrupti perspiciatis praesentium optio
                                voluptate accusamus recusandae, earum, veniam
                                ipsam iste officiis pariatur, nesciunt tempora
                                eligendi deleniti saepe? Blanditiis impedit hic
                                in optio! Repudiandae vel, repellendus quod
                                molestias porro, qui recusandae, consectetur
                                repellat debitis mollitia quam quas? Assumenda
                                iste autem, dignissimos facere delectus eaque et
                                repellendus in. Vitae saepe deserunt excepturi
                                enim iure.
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
