'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
import axiosClient from "../axiosClient";
import { set } from "mongoose";

function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [is2FAEnabled, setIs2FAEnabled] = useState(false); // Track if 2FA is required
    const [otp, setOtp] = useState(''); // Store the OTP input by the user
    const [userSecret, setUserSecret] = useState(''); // Store the secret after successful login

    // Step 1: Login with email and password
    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const info = {
            email: email,
            password: password,
            usertype: "admin",
        };

        try {
            const responseData = await axiosClient.post("/auth/login", info);

            if (responseData.data.success === false) {
                setErrorMessage('Invalid Credentials');
            } else if (responseData.data.info.user_info.usertype === "admin") {
                setCookie('authToken', responseData.data.info.token, { maxAge: 60 * 60 * 24 }); // Use the token returned from the backend
                setUserSecret(null); // Set the user secret
                setIs2FAEnabled(true); // Show 2FA step after login
            } else {
                setErrorMessage('Invalid Credentials');
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            setErrorMessage('An error occurred during login');
        }
    };

    // Step 2: Verify 2FA OTP
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const verifyResponse = await fetch(`/api/2fa/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ secret: userSecret, token: otp }) // Send the secret and OTP to the backend
        });
        try {
    

            const responseData = await verifyResponse.json(); // Parse the JSON response
            console.log('2FA verification response:', verifyResponse);
            if (verifyResponse.ok && responseData.verified) {
                console.log(responseData);
                // If verification is successful, set the auth token and redirect
                //setCookie('authToken', responseData.data.info.token, { maxAge: 60 * 60 * 24 }); // Use the token returned from the backend
                const authToken = getCookie('authToken');
                console.log('Auth token:', authToken);
                router.push('/dashboard', { scroll: false });
            } else {
                // Handle failed verification
                console.error('2FA verification failed:', responseData.message);
                setErrorMessage(responseData.message || 'Invalid 2FA Code');
            }
        } catch (error) {
            console.error('2FA verification failed:', error);
            setErrorMessage('Failed to verify 2FA');
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
                                        <img src='https://res.cloudinary.com/daqxhckof/image/upload/v1717578539/turk-compass/turks_pgmiqi.png' alt='Login Background' />

                                        <h2 style={{ fontSize: '24px', textAlign: 'center', color: '#374151', marginBottom: '1.25rem' }}>
                                            {is2FAEnabled ? 'Enter 2FA Code' : 'Login'}
                                        </h2>

                                        {errorMessage && (
                                            <div style={{ backgroundColor: '#f87171', color: '#fff', borderRadius: '0.375rem', padding: '0.75rem', marginBottom: '1rem' }}>
                                                <strong>Error!</strong> {errorMessage}
                                            </div>
                                        )}

                                        {!is2FAEnabled && (
                                            <form onSubmit={submitForm}>
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <label htmlFor='email' style={{ display: 'block', color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
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
                                        )}

                                        {is2FAEnabled && (
                                            <form onSubmit={handleOtpSubmit}>
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <label htmlFor='otp' style={{ display: 'block', color: '#4b5563', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                                        Enter your 2FA Code
                                                    </label>
                                                    <input
                                                        style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                                                        id='otp'
                                                        type='text'
                                                        maxLength="6"
                                                        placeholder='Enter your 6-digit code'
                                                        value={otp}
                                                        onChange={e => setOtp(e.target.value)}
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                                                    <button style={{ backgroundColor: '#4b5563', color: '#fff', padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '0.375rem', cursor: 'pointer', border: 'none' }} type="submit">
                                                        Verify 2FA Code
                                                    </button>
                                                </div>
                                            </form>
                                        )}
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
