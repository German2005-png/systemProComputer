"use client";
import React, { useEffect, useRef, useState } from "react";
import locationIcon from "../../../public/svg/location.svg";
import Image from "next/image";
import Footer from "@/components/footer/footer";
import { useAppContext } from "@/context/appContext";
import CurrencyFormat from "@/utils/currencyFormat";
import paymentIcon from "../../../public/svg/payment.svg";
import leftWIcon from "../../../public/svg/leftW.svg";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import Link from "next/link";
import Cookies from "js-cookie";
import exp from "constants";

declare global {
  interface Window {
    MercadoPago?: new (publicKey: string, options?: { locale: string }) => {
      createCardToken: (params: {
        cardNumber: string;
        cardholderName: string;
        expirationMonth: number;
        expirationYear: number;
        securityCode: string;
        identificationType: string;
        identificationNumber: string;
        payment_method_id: string

      }) => Promise<{ id: string }>;
    };
  }
}
interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  quantity: number;
}

interface ChooseDeviveryProps {
  receivePackage: string;
  removePackage: string;
}

export default function PaymentPage() {
  const [chooseDevivery, setChooseDelivery] = useState<ChooseDeviveryProps>({receivePackage: "Llega el Lunes", removePackage: "Retirar entre el Lunes a Martes"});
  const [formScroll, setFormScroll] = useState<number>(0);
  const { user, showCard, setShowCard, setShowCardModal, cardNumberDigits, cardDateNumber, cardSecurityCode, fullName, cardId } = useAppContext();
  const formScrollRef = useRef<HTMLDivElement>(null);
  const btnFormScrooll = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if(typeof window !== 'undefined' && !window.MercadoPago) {
        loadMercadoPago().then(() => {
          console.log("MercadoPago SDK cargado correctamente");
        }).catch((error) => {
          console.error("Error cargando MercadoPago SDK: ", error);
        });
    }
  }, []);

  async function deleteProduct(product: ProductProps) {
    if(Cookies.get("token") || user.username){
      setShowCard((prev) => ({products: prev.products.filter((item) => item.id !== product.id), state: prev.state}));
      const response = await fetch("/server/api/deleteProduct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.id }),
      });
      await response.json();
    }
  }
  async function reduceProduct(product: ProductProps) {
    if(Cookies.get("token") || user.username) {
      if(product.quantity == 1) {
        await deleteProduct(product);
      } else {
        const response = await fetch("/server/api/reduceProduct", {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ productId: product.id, reduce: 1 })
        });
        await response.json();
        setShowCard((prev) => ({...prev, products: prev.products.map((p) => p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p)}));
      }
    }
  }

  async function addProduct(product: ProductProps) {
    if(user.username || Cookies.get("token")) {
      try {
        const response = await fetch("/server/api/createCard", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ productsId: product.id, productQuantityValue: 1 })
        });
        await response.json();
        setShowCard((prev) => ({...prev, products: prev.products.map((p)=> p.id === product.id ? {...p, quantity: p.quantity + 1} : p)}));
      } catch (error) {
        console.error("Ha occurrido un error", error);
      }
    }
  }
  async function handleBtnFormNext() {
    setShowCardModal("");
    if(formScrollRef.current && formScroll == 0) {
      formScrollRef.current.scrollTo({left: formScrollRef.current.offsetWidth, behavior: "smooth"});
    }
    if(formScrollRef.current && formScroll == 400) {
      console.log("Comprar");
      if(window.MercadoPago) {
        const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY || "", {locale: "es-AR"});
        console.log("mp: ", mp);
        const cardTokenResponse = await mp?.createCardToken({
          cardNumber: cardNumberDigits.join(""),
          cardholderName: fullName,
          expirationMonth: parseInt(cardDateNumber[0]),
          expirationYear: parseInt(cardDateNumber[1]),
          // expirationDate: cardDateNumber[0] + "/" + cardDateNumber[1],
          securityCode: cardSecurityCode,
          identificationType: "DNI",
          identificationNumber: cardId,
          payment_method_id: "visa"
        })
        // const cardTokenResponse = await mp?.createCardToken({
        //   cardNumber: "5031755734530604",
        //   cardholderName: "APRO",
        //   expirationMonth: 11,
        //   expirationYear: 30,
        //   securityCode: "123",
        //   identificationType: "DNI",
        //   identificationNumber: "12345678",
        //   payment_method_id: "master"
        // })
        console.log("cardTokenResponse: ", cardTokenResponse);
        const response = await fetch("/server/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: cardTokenResponse.id, identificationType: 'DNI', identificationNumber: cardId })
        });
        const result = await response.json();
        console.log("RESULT: ", result);
      }
      
    }
  }
  function handleBtnFormBack() {
    setShowCardModal("");
    if(formScrollRef.current) {
      formScrollRef.current.scrollTo({left: formScrollRef.current.offsetWidth - formScrollRef.current.offsetWidth, behavior: "smooth"});
    }
  }
  console.log("cardNumberDigits: ", cardNumberDigits.join(""));
  console.log("fullName: ", fullName);
  console.log("cardSecurityCode: ", cardSecurityCode);
  console.log("cardDateNumber: ", parseInt(cardDateNumber[0]), parseInt(cardDateNumber[1]));
  console.log("cardDateNumberType: ", typeof parseInt(cardDateNumber[0]), typeof cardDateNumber[1]);
  console.log("cardID: ", cardId);
  console.log("Date: ", new Date());
  return (
    <>
    {/* Payment form */}
      <div className="flex w-full justify-between">
        <div className="relative flex gap-[10px] w-full max-w-[400px] overflow-hidden">
          <div ref={formScrollRef} className="flex w-full min-w-[400px] overflow-auto form-scroll snap-x" onScroll={()=> setFormScroll(formScrollRef?.current?.scrollLeft || 0)}>
          <div className="flex flex-col gap-[10px] w-full min-w-[400px] snap-center">
          <h1 className="font-semibold text-[#fd4e4e] text-[22px]">
            Como queres recibir o retirar tu compra ?
          </h1>
          <form className="flex flex-col gap-[10px]">
            <label className="font-semibold text-[#fd4e4e]" htmlFor="">
              Domicilio
            </label>
            <div className="flex items-center w-full gap-[5px] border border-solid border-[#0000001a] p-[10px] rounded-[10px]">
              <Image src={locationIcon} width={24} height={24} alt="" />
              <input className="w-full outline-none border-none" type="text" placeholder="Escribe tu domicilio"/>
            </div>
            <label className="font-semibold text-[#fd4e4e]">
              Recibir paquete
            </label>
            <div className="flex items-center w-full gap-[5px] border border-solid border-[#0000001a] p-[10px] rounded-[10px] cursor-pointer" onClick={() => setChooseDelivery((prev)=> ({...prev, receivePackage: "Llega el Lunes"}))}>
              <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full border border-solid border-[#0000001a]">
                {chooseDevivery.receivePackage === "Llega el Lunes" && (
                  <div className="w-[12px] h-[12px] rounded-full bg-[#fd4e4e]"></div>
                )}
              </div>
              <span>Llega el Lunes</span>
            </div>
            <div className="flex items-center w-full gap-[5px] border border-solid border-[#0000001a] p-[10px] rounded-[10px] cursor-pointer" onClick={() => setChooseDelivery((prev)=> ({...prev, receivePackage: "Llega el Miercoles"}))}>
              <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full border border-solid border-[#0000001a]">
                {chooseDevivery.receivePackage === "Llega el Miercoles" && (
                  <div className="w-[12px] h-[12px] rounded-full bg-[#fd4e4e]"></div>
                )}
              </div>
              <span>Llega el Miercoles</span>
            </div>
            <label className="font-semibold text-[#fd4e4e]">
              Retirar paquete
            </label>
            <div className="flex items-center w-full gap-[5px] border border-solid border-[#0000001a] p-[10px] rounded-[10px] cursor-pointer" onClick={() => setChooseDelivery((prev)=> ({...prev, removePackage: "Retirar entre el Lunes a Martes"}))}>
              <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full border border-solid border-[#0000001a]">
                {chooseDevivery.removePackage === "Retirar entre el Lunes a Martes" && (
                  <div className="w-[12px] h-[12px] rounded-full bg-[#fd4e4e]"></div>
                )}
              </div>
              <span>Retirar entre el Lunes a Martes</span>
            </div>
          </form>
          </div>
          <div className="flex flex-col gap-[10px] w-full min-w-[400px] snap-center">
            <h1 className="text-[#fd4e4e] font-semibold text-[22px]">
              Metodos de pagos
            </h1>
            <ul className="flex flex-col gap-[10px] w-full">
              <label className="font-semibold text-[#fd4e4e]" htmlFor="">
                Tarjetas de débito
              </label>
              <button className="flex items-center gap-[5px] w-full border border-solid border-[#0000001a] p-[10px] rounded-[10px] cursor-pointer" type="button" onClick={() => setShowCardModal("débito")}>
                <Image className="w-[24px] h-[24px] min-w-[24px]" src={paymentIcon} width={24} height={24} alt=""/>
                Agregar tarjeta de débito
              </button>
              {/* <div className='flex items-center w-full gap-[5px] border border-solid border-[#0000001a] p-[10px] rounded-[10px]'>
              <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full border border-solid border-[#0000001a]">
                <div className="w-[12px] h-[12px] rounded-full bg-[#fd4e4e]"></div>
              </div>
                <span>Visa Débito **** 0000</span>
              </div> */}
              <label className="font-semibold text-[#fd4e4e]" htmlFor="">
                Tarjetas de crédito
              </label>
              <button className="flex items-center gap-[5px] w-full border border-solid border-[#0000001a] p-[10px] rounded-[10px] cursor-pointer" type="button" onClick={() => setShowCardModal("crédito")}>
                <Image className="w-[24px] h-[24px] min-w-[24px]" src={paymentIcon} width={24} height={24} alt=""/>
                Agregar tarjeta de crédito
              </button>
            </ul>
          </div>
          </div>
          <div className="absolute bottom-0 flex items-center w-full">
              {formScroll > 0 && (
                <button className="flex bg-[#fd4e4e] text-white py-[2px] px-[20px] rounded-[15px] z-30" type="button" onClick={handleBtnFormBack} disabled={formScroll == 0}>
                  <Image className="w-[24px] h-[24px] min-w-[24px]" src={leftWIcon} width={24} height={24} alt=""/>
                </button>
              )}
          </div>
          <div className="absolute bottom-0 justify-end flex items-center w-full">
              <button ref={btnFormScrooll} className="flex bg-[#fd4e4e] text-white py-[2px] px-[20px] rounded-[15px]" type="button" onClick={handleBtnFormNext}>{formScroll == 400 ? "Comprar" : "Continuar"}</button>
          </div>
        </div>
        {/* Card */}
        <div className="flex flex-col justify-between gap-[10px] w-full max-w-[500px] h-full min-h-[500px] inset-shadow-xs shadow-xl/30 shadow-[3px_0px_10px_1px_#0000001a] p-[20px] rounded-[10px]">
          <ul className="flex flex-col w-full gap-[10px] overflow-x-auto">
            {showCard.products.map((Element, index) => (
              <article key={index} className="flex w-full inset-shadow-xs shadow-xl/30 shadow-[3px_0px_10px_1px_#0000001a] rounded-[10px] gap-[5px] p-[10px]">
                <div className="w-[80px] h-[80px] min-w-[80px] rounded-[10px]">
                  <Link href={`/product/${Element.id}/${encodeURIComponent(Element.name).replaceAll(" ", "")}`}>
                    <Image className="w-full h-full" src={`/image/${Element.images[0]}`} width={1000} height={1000}alt=""/>
                  </Link>
                </div>
                <div className="flex flex-col gap-[3px]">
                  <Link href={`/product/${Element.id}/${encodeURIComponent(Element.name).replaceAll(" ", "")}`} className="text-limit">
                    {Element.name}
                  </Link>
                    <CurrencyFormat className="font-semibold text-[22px]" price={Element.price} format="es-ES" key={index}/>
                    <div className="flex items-center gap-[10px]">
                      <div className="flex items-center border-2 border-solid border-[#0000001a] rounded-[20px]">
                        <button className="px-[10px] rounded-l-[20px] border-r-2 border-[#0000001a]" onClick={async () => await reduceProduct(Element)}>-</button>
                        <span className="text-[12px] px-[10px] text-[#000000a6]">{Element.quantity}</span>
                        <button className="px-[10px] rounded-r-[20px] border-l-2 border-[#0000001a]" onClick={async () => await addProduct(Element)}>+</button>
                      </div>
                      <button className="text-[#fd4e4e]" onClick={async () => await deleteProduct(Element)}>Eliminar</button>
                    </div>
                </div>
              </article>
            ))}
          </ul>
          <div className="flex items-center gap-[3px] w-full inset-shadow-xs shadow-xl/30 shadow-[3px_0px_10px_1px_#0000001a] rounded-[10px] p-2 text-[20px]">
            Total: 
            <CurrencyFormat className="font-semibold text-[#fd4e4e]" price={showCard.products.reduce((total, product)=> total + (product.price * product.quantity || 0),0 )} format="es-ES"/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
