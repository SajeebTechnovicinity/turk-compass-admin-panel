"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function Profile() {
    const pathname = usePathname();
    const [profileOpen, setProfileOpen] = useState(false);
    function onProfileClick() {
        setProfileOpen(!profileOpen);
    }

    useEffect(() => {
        setProfileOpen(false);
    }, [pathname]);

    return (
        <div
            className={`header__profile profile dropdown ${
                profileOpen ? "dropdown-active" : ""
            }`}
        >
            <div
                className='profile__trigger dropdown__trigger'
                onClick={onProfileClick}
            >
                <span className='profile__img'>
                    {/* <img src='imgs/user-img.png' alt='profile-image' /> */}
                </span>
                <span className='profile__name'>Admin</span>
                <span className='profile__arrow'>
                    <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M13 5.5L8 10.5L3 5.5'
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </span>
            </div>
            <ul className='profile__dropdown dropdown-body'>
                <li>
                    <Link
                        href={{
                            pathname: "/profile/create",
                        }}
                        className='profile__dropdown-link'
                    >
                        Profile
                    </Link>
                </li>
                <li>
                    <Link className='profile__dropdown-link' href='/login'>
                        Log-out
                    </Link>
                </li>
            </ul>
        </div>
    );
}
