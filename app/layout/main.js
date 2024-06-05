"use client";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import Header from "../partial/header/header";
import Sidebar from "../partial/sidebar/sidebar";
import Login from "../login/page";

export default function Main({ children }) {
    const pathname = usePathname();
    const router = useRouter(); // Initialize the router

    const token = sessionStorage.getItem("authToken");

    if (pathname !== "/login") {
        if (token) {
            return (
                <>
                    <Header />
                    <section className='dashboard-body account-body'>
                        <Sidebar />
                        {children}
                    </section>
                </>
            );
        } else {
            // Redirect to login page
            router.push("/login");
            return null; // Return null while redirecting
        }
    } else {
        // Render only children components for unauthenticated users or on the login page
        return <>{children}</>;
    }
}
