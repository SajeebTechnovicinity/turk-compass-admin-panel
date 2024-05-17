// Login.js
"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import axiosClient from "../axiosClient";

function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitForm = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setErrorMessage('');

        const info = {
            email: email,
            password: password,
            usertype: "admin",
        };

        try {
            // Mocking login response
            const responseData = await axiosClient.post("/auth/login", info);
            //console.log(responseData.data.info.user_info.usertype);
            if (responseData.data.success === false) {
                setErrorMessage('Invalid Credentials');
            } else if (responseData.data.info.user_info.usertype === "admin") {
                setCookie('authToken', responseData.data.info.user_info.token);
                router.push('/dashboard', { scroll: false });
            } else {
                setErrorMessage('Invalid Credentials');
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            setErrorMessage('An error occurred during login');
        }
    };

    return (
        <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
            <div style={{ position: 'relative', flex: '1', overflowY: 'auto', overflowX: 'hidden' }}>
                <main>
                    <div style={{ paddingLeft: '1rem', paddingRight: '1rem', width: '100%' }}>
                        <div style={{ fontFamily: 'sans-serif', WebkitFontSmoothing: 'antialiased', backgroundColor: '#f3f4f6' }}>
                            <div style={{ width: '100%', backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '4rem' }}>
                                <div style={{ maxWidth: '400px', width: '100%' }}>
                                    <div style={{ backgroundColor: '#fff', borderRadius: '0.375rem', boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
                                        <h2 style={{ fontSize: '24px', textAlign: 'center', color: '#374151', marginBottom: '1.25rem' }}>
                                            Login
                                        </h2>
                                        {errorMessage && (
                                            <div style={{ backgroundColor: '#f87171', color: '#fff', borderRadius: '0.375rem', padding: '0.75rem', marginBottom: '1rem' }}>
                                                <strong>Error!</strong> {errorMessage}
                                            </div>
                                        )}
                                        <form onSubmit={submitForm}>
                                            <div style={{ marginBottom: '1rem' }}>
                                                <label htmlFor='email-address' style={{ display: 'block', color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                                    Email Address
                                                </label>
                                                <input
                                                    style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                                                    id='email'
                                                    type='email'
                                                    placeholder='Your email address'
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ marginBottom: '1rem' }}>
                                                <label htmlFor='password' style={{ display: 'block', color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                                    Password
                                                </label>
                                                <input
                                                    style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                                                    id='password'
                                                    type='password'
                                                    placeholder='Your secure password'
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                                                <button style={{ backgroundColor: '#4b5563', color: '#fff', padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '0.375rem', cursor: 'pointer', border: 'none' }} type="submit">
                                                    Log in
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Login;
