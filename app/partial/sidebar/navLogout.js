import { setCookie } from "cookies-next";
import Link from "next/link";

export default function NavLogout() {

    const handleLogout = () => {
        setCookie('authToken', null); // Clear the authToken cookie
        sessionStorage.setItem("authToken", null); // Clear the authToken from session storage
    };

    return (
        <div className='user-logout'>
            <Link href='/login' className='logout-link flex-ctr-spb' onClick={handleLogout}>
                <span>Logout </span>
                <span className='icon'>
                    <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        {/* SVG path omitted for brevity */}
                    </svg>
                </span>
            </Link>
        </div>
    );
}

