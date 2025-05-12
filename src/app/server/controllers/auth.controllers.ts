import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createToken } from "../createToken/auth.token";
import { userFound } from "../userFound/userFound";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function createUser(req: NextRequest) {
  const { username, password, confirmPassword } = await req.json();
  try {
    if(password !== confirmPassword)
      return NextResponse.json({ error: "Las contraseñas no coinciden" },{ status: 500 });
    const userFound = await prisma.user.findFirst({where: { username: username }});
    if(userFound) {
      return NextResponse.json({ error: "Este usuario ya existe" },{ status: 500 });
    } else {
      const hashedPassword = await bcrypt.hash(password, 15);
      if(!hashedPassword)
        return NextResponse.json({ error: "Al crear la contraseña" },{ status: 500 });
      const newUser = await prisma.user.create({data: { username: username, password: hashedPassword }});
      if(!newUser)
        return NextResponse.json({ error: "Al crear un nuevo Usuario" },{ status: 500 });
      const token = createToken({ id: newUser.id });
      console.log(newUser);
      return NextResponse.json({user: {username: newUser.username, token: token, createdAt: newUser.createdAt}}, { status: 200 });
    }
  } catch (error) {
    console.error("ERROR create user");
    return NextResponse.json({ message: "Al crear un nuevo usuario", error: error }, { status: 500 });
  }
}

export async function login(req: NextRequest) {
  const { username, password } = await req.json();
  try {
    const userFound = await prisma.user.findFirst({ where: { username } });
    console.log("USER FOUND: ", userFound);
    if(!userFound)
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 500 });
    const passwordCompare = await bcrypt.compare(password, userFound.password);
    console.log(passwordCompare);
    if(!passwordCompare)
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 500 }
      );
    const token = createToken({ id: userFound.id });
    return NextResponse.json({user: {username: userFound.username, token: token, createdAt: userFound.createdAt}}, { status: 200 });
  } catch (error) {
    console.error("ERROR user found: ", error);
    return NextResponse.json({ error: "Usuario no encontrado, intentelo de nuevo!", err: error }, { status: 500 });
  }
}

interface CardRequestBodyProps {
  productsId: number;
  productQuantity: number;
  productQuantityValue: number;
}

export async function createCard(req: NextRequest) {
  const { productsId, productQuantityValue }: CardRequestBodyProps = await req.json();
  console.log("PRODUCTS ID: ", productsId);
  try {
    const foundUser = await (await userFound(req)).json();
    console.log("PASA POR EL FOUND USER: ", foundUser);
    if(!foundUser || !foundUser.user || foundUser.error) {
      console.log("PASA POR EL ENCUENTRO DE FOUND USER: ", foundUser);
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 500 });
    } else {
      console.log("PASA POR EL ELSE DE QUE ENCONTRO FoundUser: ", foundUser);
      if(productsId !== null) {
        console.log("No es null y tiene productos: ", productsId);
        console.log("user id: ", foundUser.user.id);
        const foundProduct = await prisma.card.findFirst({
          where: {
            userId: foundUser.user.id,
            products: { equals: productsId },
          },
        });
        console.log("FOUND PRODUCT: ", foundProduct);
        if(!foundProduct) {
          const newCard = await prisma.card.create({
            data: {
              user: { connect: { id: foundUser.user.id } },
              products: productsId,
              productQuality: productQuantityValue,
            },
          });
          console.log("CREA EL NUEVO CARD: ", newCard);
          if(!newCard)
            return NextResponse.json({ error: "Error al crear la tarjeta" }, { status: 500 });
          return NextResponse.json({ newCard: newCard }, { status: 200 });
        } else {
          console.log("Ya existe la tarjeta: ", foundProduct);
          const updatedCard = await prisma.card.update({
            where: { id: foundProduct.id },
            data: {
              products: productsId,
              productQuality:
                foundProduct.productQuality + productQuantityValue,
            },
          });
          if(!updatedCard)
            return NextResponse.json({ error: "Error al crear la tarjeta" },{ status: 500 });
          return NextResponse.json({ card: updatedCard }, { status: 200 });
        }
      }
    }
  } catch (error) {
    console.error("ERROR al agregar productos", error);
    return NextResponse.json(
      { error: "ERROR al agregar productos" },
      { status: 500 }
    );
  }
}

interface ReduceProductProps {
  productId: number;
  reduce: number;
}

export async function reduceProduct(req: NextRequest) {
  const { productId, reduce }: ReduceProductProps = await req.json();
  console.log("ProductId: ", productId);
  console.log("Reduce: ", reduce);
  try {
    const foundUser = await (await userFound(req)).json();
    console.log(foundUser);
    if (!foundUser || !foundUser.user || foundUser.error) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 500 }
      );
    } else {
      console.log("Antes de actualizar");
      const productLess = await prisma.card.updateMany({
        where: {
          userId: foundUser.user.id,
          products: productId,
        },
        data: {
          productQuality: {
            decrement: 1,
          },
        },
      });
      console.log("Despues de actualizar");
      if (!productLess) {
        return NextResponse.json(
          { error: "Error less Product" },
          { status: 500 }
        );
      } else {
        return NextResponse.json({ less: productLess }, { status: 200 });
      }
    }
  } catch (error) {
    console.error("Error al lees user", error);
    return NextResponse.json(
      { message: "ERROR less product" },
      { status: 500 }
    );
  }
}

export async function deleteProduct(req: NextRequest) {
  const { productId } = await req.json();
  try {
    const foundUser = await (await userFound(req)).json();
    if (!foundUser || !foundUser.user || foundUser.error) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 500 }
      );
    } else {
      const deletedProduct = await prisma.card.deleteMany({
        where: { userId: foundUser.user.id, products: { in: [productId] } },
      });
      if (!deletedProduct)
        return NextResponse.json(
          { error: "Error al eliminar el producto" },
          { status: 500 }
        );
      return NextResponse.json(
        { message: "Producto eliminado correctamente" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error al eliminar el producto: ", error);
    return NextResponse.json(
      { error: "Error al eliminar el producto" },
      { status: 500 }
    );
  }
}

export async function getCard(req: NextRequest) {
  try {
    const foundUser = await (await userFound(req)).json();
    if (!foundUser || !foundUser.user || foundUser.error) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 500 }
      );
    } else {
      const cardFound = await prisma.card.findMany({
        where: { userId: foundUser.user.id },
      });
      if (!cardFound)
        return NextResponse.json(
          { error: "Error al obtener la tarjeta" },
          { status: 500 }
        );
      return NextResponse.json(
        {
          card: cardFound.map((card) => {
            return {
              id: card.id,
              products: card.products,
              productQuality: card.productQuality,
            };
          }),
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error al obtener la tarjeta", error);
    return NextResponse.json(
      { error: "Error al obtener la tarjeta" },
      { status: 500 }
    );
  }
}

// OLD MERCADO PAGO

// mercadopago.configure({
//     access_token: process.env.ACCESS_TOKEN_MERCADO_PAGO || ""
// });
// const preference = {
//     items: [
//       {
//         title: 'Test',
//         quantity: 1,
//         currency_id: 'ARS' as const,
//         unit_price: 10.5
//       },
//       {
//         title: 'Test 2',
//         quantity: 1,
//         currency_id: 'ARS' as const,
//         unit_price: 40.5
//       }
//     ]
//   };

// const pago = await mercadopago.preferences.create(preference)
// console.log(pago)

export async function paymentMp(req: NextRequest) {
  const { token, identificationType, identificationNumber } = await req.json();
  console.log("Token recibido: ", token);
  console.dir(token, { depth: null });
  try {
    const foundUser = await (await userFound(req)).json();

    if(!foundUser || !foundUser.user || foundUser.error) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 500 });
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.ACCESS_TOKEN_MERCADO_PAGO || "",
      options: { timeout: 5000 },
    });

    const payment = new Payment(client);

    console.log(payment);

    const body = {
      transaction_amount: 100.1,
      token: token,
      description: "Compra en tienda",
      installments: 1,
      payment_method_id: "visa",
      payer: {
        email: "german.contacto06@gmail.com",
        identification: {
          type: identificationType,
          number: identificationNumber,
        },
      },
    };

    const requestOptions = {
      idempotencyKey: randomUUID(),
    };

    const data = await payment.create({ body, requestOptions });

    console.log("Pago exitoso: ", data);
    
    return NextResponse.json({ message: "Pago realizado!", data: data }, { status: 200 });
  } catch (error) {
    console.error("Error al pagar: ", error);
    return NextResponse.json(
      { error: "Error al procesar el pago" },
      { status: 500 }
    );
  }
}
