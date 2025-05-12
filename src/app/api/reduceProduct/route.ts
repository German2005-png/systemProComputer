import { NextRequest } from "next/server";
import { reduceProduct } from "../../server/controllers/auth.controllers";

export async function PUT(req: NextRequest) {
    return await reduceProduct(req);
}