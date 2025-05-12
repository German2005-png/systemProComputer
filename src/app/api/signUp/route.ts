import { NextRequest } from "next/server";
import { createUser } from "../../server/controllers/auth.controllers";

export async function POST(req: NextRequest){
    return await createUser(req);
}