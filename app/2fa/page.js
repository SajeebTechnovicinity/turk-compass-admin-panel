'use client';
import React, { useState, useEffect } from 'react';

const BASE_URL = process.env.BASE_URL;

const TwoFactorModal = () => {
    const [otp, setOtp] = useState('');
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [qrImage, setQrImage] = useState();
    const [secret, setSecret] = useState();

    /* Generate a QR */
    const get2faQrCode = async () => {
        try {
            const response = await fetch(`/api/2fa/qrcode`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                setQrImage(data.data);
                setSecret(data.secret);
            }
        } catch (error) {
            console.error('Error fetching QR code:', error);
        }
    };

    useEffect(() => {
        get2faQrCode();
    }, []);

    /* Validate Code */
    const handleOtpChange = async (e) => {
        setOtp(e.target.value);

        if (e.target.value.length === 6) {
            const token = e.target.value;
            
            try {
                const response = await fetch(`/api/2fa/verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ secret, token })
                });
                const data = await response.json();
                if (data.verified) {
                    alert('Code verified');
                    console.log('Code verified');
                } else {
                    setInvalidOtp(true);
                }
            } catch (error) {
                console.error('Error verifying OTP:', error);
                setInvalidOtp(true);
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', maxWidth: '600px', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* QR Code Display */}
                    

                    {/* 2FA Instructions and Input */}
                    <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#374151', marginBottom: '16px', textAlign: 'center' }}>
                        Contact with the Admin to Enable Two-Factor Authentication
                    </h2>
                 
                </div>
            </div>
        </div>
    );
};

export default TwoFactorModal;











// //enable 2fa
// 'use client';
// import React, { useState, useEffect } from 'react';

// const BASE_URL = process.env.BASE_URL;

// const TwoFactorModal = () => {
//     const [otp, setOtp] = useState('');
//     const [invalidOtp, setInvalidOtp] = useState(false);
//     const [qrImage, setQrImage] = useState();
//     const [secret, setSecret] = useState();

//     /* Generate a QR */
//     const get2faQrCode = async () => {
//         try {
//             const response = await fetch(`/api/2fa/qrcode`, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             const data = await response.json();

//             if (response.status === 200) {
//                 setQrImage(data.data);
//                 setSecret(data.secret);
//             }
//         } catch (error) {
//             console.error('Error fetching QR code:', error);
//         }
//     };

//     useEffect(() => {
//         get2faQrCode();
//     }, []);

//     /* Validate Code */
//     const handleOtpChange = async (e) => {
//         setOtp(e.target.value);

//         if (e.target.value.length === 6) {
//             const token = e.target.value;
            
//             try {
//                 const response = await fetch(`/api/2fa/verify`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ secret, token })
//                 });
//                 const data = await response.json();
//                 if (data.verified) {
//                     alert('Code verified');
//                     console.log('Code verified');
//                 } else {
//                     setInvalidOtp(true);
//                 }
//             } catch (error) {
//                 console.error('Error verifying OTP:', error);
//                 setInvalidOtp(true);
//             }
//         }
//     };

//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
//             <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', maxWidth: '600px', width: '100%' }}>
//                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                     {/* QR Code Display */}
//                     {qrImage && (
//                         <img
//                             src={qrImage}
//                             alt="2FA QR Code"
//                             style={{
//                                 borderRadius: '8px',
//                                 border: '2px solid #d1d5db',
//                                 boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
//                                 marginBottom: '24px'
//                             }}
//                         />
//                     )}

//                     {/* 2FA Instructions and Input */}
//                     <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#374151', marginBottom: '16px', textAlign: 'center' }}>
//                         Enable Two-Factor Authentication
//                     </h2>
//                     <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '16px', textAlign: 'center' }}>
//                         Scan the QR code using your authenticator app, and enter the 6-digit code generated by the app to enable 2FA.
//                     </p>

//                     <ul style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px', textAlign: 'center', padding: '0', listStyleType: 'none' }}>
//                         <li style={{ marginBottom: '8px' }}><strong>Step 1:</strong> Scan the QR Code with your Authenticator app.</li>
//                         <li><strong>Step 2:</strong> Enter the code below from your app.</li>
//                     </ul>

//                     {/* OTP Input */}
//                     <input
//                         type="text"
//                         maxLength="6"
//                         value={otp}
//                         onChange={handleOtpChange}
//                         placeholder="Enter 6-digit code"
//                         style={{
//                             width: '100%',
//                             padding: '12px',
//                             fontSize: '18px',
//                             borderRadius: '8px',
//                             border: '1px solid #d1d5db',
//                             textAlign: 'center',
//                             boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
//                             marginBottom: '12px'
//                         }}
//                     />

//                     {/* Invalid Input */}
//                     {invalidOtp && (
//                         <p style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center', marginBottom: '16px' }}>
//                             *Invalid Code
//                         </p>
//                     )}

//                     {/* Submit button */}
//                     <button
//                         onClick={handleOtpChange}
//                         style={{
//                             backgroundColor: '#4f46e5',
//                             color: '#ffffff',
//                             fontWeight: '600',
//                             padding: '12px 24px',
//                             borderRadius: '8px',
//                             border: 'none',
//                             cursor: 'pointer',
//                             boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
//                             transition: 'background-color 0.2s ease'
//                         }}
//                     >
//                         Verify Code
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TwoFactorModal;