import { NextRequest } from "next/server";
import speakeasy from "speakeasy";

import { getServerSession } from "next-auth/next"
import { Secret } from "@/lib/model/screct";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { getCookie } from "cookies-next";

export async function POST(req, res) {

    const { secret, token } = await req.json();
    console.log("verify process", secret, token);

    const authToken = getCookie('authToken');

    // Here, we have to implement 2 strategies
    // 1. Verifying during LOGIN
    // 2. Enabling 2FA for the first time


    // 1. Verifying during LOGIN
    if (secret == undefined || secret == null || secret == "") {

        //mongodb connection
        console.log("withouot secret");
        await mongoose.connect(connectionStr);
        let secretInfo = await Secret.findOne();
        let decrypted_secret = secretInfo.secret;

        const verified = speakeasy.totp.verify({
            secret: decrypted_secret, // Secret Key
            encoding: "base32",
            token: token,   // OTP Code
        });
        console.log("verified", verified);
        if(verified)
        {
            return Response.json({ verified, status: 200, message: "Successfully Verified" });
        }
        else
        {
            return Response.json({ verified, status: 400, message: "Invalid OTP" });
        }

    } else {

    // 2. Enabling 2FA for the first time
        const verified = speakeasy.totp.verify({
            secret: secret, // Secret Key
            encoding: "base32",
            token: token,   // OTP Code
        });

        console.log("with secret");

        if (verified) {
            // save the secret in sceret collection
            //mongodb connection
            await mongoose.connect(connectionStr);
            //first delete the existing secret
            await Secret.deleteMany({});
            //save the new secret
            await Secret.create({ secret: secret });
            
        }
        console.log("verified", verified);
        return Response.json({ verified, status: 200, message: "2FA enabled successfully" });

    }

}