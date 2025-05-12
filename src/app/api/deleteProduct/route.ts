import { NextRequest } from "next/server";
import { deleteProduct } from "../../server/controllers/auth.controllers";

export async function PUT(request: NextRequest) {
    return await deleteProduct(request);
}