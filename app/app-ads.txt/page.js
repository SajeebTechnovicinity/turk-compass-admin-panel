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
        <div>
            <p>google.com, pub-1293614982065372, DIRECT, f08c47fec0942fa0</p>
            <p>google.com, pub-1388022891413955, DIRECT, f08c47fec0942fa0</p>
        </div>
    );
};

export default TwoFactorModal;