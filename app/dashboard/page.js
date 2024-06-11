"use client";
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
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
                            <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
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
                            <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
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
                            <svg width={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z"/></svg>
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
                            <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>
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
                            <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M64 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16h80V400c0-26.5 21.5-48 48-48s48 21.5 48 48v64h80c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm88 40c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V104zM232 88h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V104c0-8.8 7.2-16 16-16zM88 232c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V232zm144-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V232c0-8.8 7.2-16 16-16z"/></svg>
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
                            <svg width={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
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
