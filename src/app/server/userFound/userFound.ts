import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: number;
    iat: number;
    exp: number;
  }

export async function userFound(req: NextRequest) {
    const prisma = new PrismaClient();
    try {
        const token = req.cookies.get("token")?.value;
        if(token) {
            let decoded = await new Promise<DecodedToken | false>((resolve, reject)=> {
                jwt.verify(token, String(process.env.secretJWT), (err, decoded)=> {
                    if(err) {
                        console.error("Error al obtener el usuario");
                        return reject(err.message);
                    } else {
                        return resolve(decoded as DecodedToken);
                    }
                })
            })
            if(!decoded || typeof decoded !== "object" || !decoded.id) {
                return NextResponse.json({ message: "Not Found" });
            }
            const user = await prisma.user.findUnique({where: {id: decoded.id}});
            if(!user) {
                return NextResponse.json({error: "Usuario no encontrado"}, {status: 500});
            } else {
                return NextResponse.json({user: {id: user.id, username: user.username, createdAt: user.createdAt}}, {status: 200});
            }
        } else {
            return NextResponse.json({error: "No se encontraron credenciales del usuario!"}, {status: 500});
        }
    } catch (error) {
        console.error("Error POST server and users");
        return NextResponse.json({message: "There's a problema widh the server!", error}); 
    }
}