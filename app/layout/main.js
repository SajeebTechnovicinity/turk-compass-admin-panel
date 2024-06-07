"use client";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import Header from "../partial/header/header";
import Sidebar from "../partial/sidebar/sidebar";

export default function Main({ children }) {
    const pathname = usePathname();
    const router = useRouter(); // Initialize the router

    const token = getCookie("authToken");

    if (pathname !== "/login" && pathname !== "/app_info/privacy-policy" && pathname !== "/app_info/terms-and-condition") {
        //if (token) {
            return (
                <>
                    <Header />
                    <section className='dashboard-body account-body'>
                        <Sidebar />
                        {children}
                    </section>
                </>
            );
        // } else {
        //     // Redirect to login page
        //     router.push("/login");
        //     return null; // Return null while redirecting
        // }
    } else {
        // Render only children components for unauthenticated users or on the login page
        return <>{children}</>;
    }
}
