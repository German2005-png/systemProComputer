import { NextRequest } from "next/server";
import { createCard } from "../../controllers/auth.controllers";

export async function POST(req: NextRequest){
    return await createCard(req);
}