import { NextRequest } from "next/server";
import { createCard } from "../../server/controllers/auth.controllers";

export async function POST(req: NextRequest){
    return await createCard(req);
}