import { NextRequest } from "next/server";
import { deleteProduct } from "../../controllers/auth.controllers";

export async function PUT(request: NextRequest) {
    return await deleteProduct(request);
}