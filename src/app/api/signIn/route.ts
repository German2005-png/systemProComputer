import { NextRequest } from "next/server";
import { login } from "../../server/controllers/auth.controllers";

export async function POST(req: NextRequest){
    return await login(req);
}