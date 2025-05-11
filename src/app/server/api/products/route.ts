import { NextRequest } from "next/server";
import { getCard } from "../../controllers/auth.controllers";

export async function GET(req: NextRequest) {
    return await getCard(req);
}