import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function createToken(payload: object) {
    try {
        const token = jwt.sign(payload, String(process.env.secretJWT), {expiresIn: '1d'});
        if(!token) return NextResponse.json({error: "ERROR create token"}, {status: 500});
        return token
    } catch (error) {
        console.log("ERROR create token");
        return NextResponse.json({error: "ERROR create token in server"}, {status: 500});
    }
}