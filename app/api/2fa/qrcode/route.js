import QRCode from "qrcode";
import speakeasy from "speakeasy";

export async function GET() {

    const secret = speakeasy.generateSecret({
        name: "Turks Compass",
    });

    const data = await QRCode.toDataURL(secret.otpauth_url);
    console.log("data", data);
    console.log("secret", secret.base32);

    return Response.json({ data, secret: secret.base32, status: 200 });
}