import { NextRequest } from "next/server";
import { paymentMp } from "../../server/controllers/auth.controllers";

export async function POST(req: NextRequest) {
    return await paymentMp(req);
}