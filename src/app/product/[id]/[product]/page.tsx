"use client";
import React, { MouseEvent, useEffect, useState } from "react";
import products from "../../../../jsons/allProduct.json";
import { useParams } from "next/navigation";
import CurrencyFormat from "@/utils/currencyFormat";
import walletIcon from "../../../../../public/svg/wallet.svg";
import truckIcon from "../../../../../public/svg/truck.svg";
import lineUpIcon from "../../../../../public/svg/lineUp.svg";
import lineDownIcon from "../../../../../public/svg/lineDown.svg";
import Image from "next/image";
import { useAppContext } from "@/context/appContext";
import ContSponsors from "@/components/sponsors/contSponsors";
import Deliveries from "@/components/deliveries/deliveries";
import Footer from "@/components/footer/footer";
import allProduct from "../../../../jsons/allProduct.json";
import Products from "@/components/products/products";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  quantity: number;
  title: string;
  category: string;
}

// interface ProductsFindProps {
//   products: ProductProps[];
// }

export default function Product() {
  const [productFound, setProductFound] = useState<ProductProps>({id: 0, name: "", price: 0, image: "", images: [], quantity: 0, title: "", category: ""});
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  // const [productsFind, setProductsFind] = useState<ProductsFindProps>({products: []});
  const params = useParams<{ id: string; product: string }>();
  const { setShowCard, user } = useAppContext();
  const [hoverImage, setHoverImage] = useState<string>("");
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const productFind = products.allProducts.find(
      (p) => p.id.toString() == params.id
    );
    if (productFind) {
      setProductFound({id: productFind.id, name: productFind.name, price: productFind.price, image: productFind.image, images: productFind.images, quantity: productFind.quantity, title: productFind.title, category: productFind.category});
    }
  }, [params.id]);
  useEffect(() => {
    if(productFound.images.length > 0) {
      setSelectedImage(productFound.images[0]);
    } else {
      setSelectedImage(productFound.image);
    }
  }, [productFound]);
  function handleClickUp() {
    setQuantity((prev)=> prev + 1);
  }
  function handleClickDown() {
    setQuantity((prev) => prev - 1 > 0 ? prev - 1 : 1);
  }
  function addProductToCart(productFound: ProductProps) {
    setShowCard((prev) => {
      const productIndex = prev.products.findIndex(p => p.id === productFound.id);
      if(productIndex >= 0){
        const updatedProducts = prev.products.map((p, index) => index === productIndex ? {...p, quantity: p.quantity + quantity} : p);
        return {...prev, products: updatedProducts};
      }
      return {...prev, products: [...prev.products, {...productFound, quantity}]};
    });
  }
  // useEffect(() => {
  //   if(productFound) {
  //     const productFinds = allProduct.allProducts.filter((p) => p.title === productFound.title && p.id !== productFound.id);
  //     if(productFinds.length > 0) {
  //       setProductsFind({products: productFinds});
  //     }
  //   }
  // },[productFound]);
  function addProductServer(product: ProductProps) {
    if(user.username) {
      fetch("/api/createCard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productsId: product.id, productQuantityValue: product.quantity + quantity }),
    })
    .then((res) => {
        if(!res.ok) {
            console.error("Error al crear el card");
            return null;
        }
        return res.json();
    })
    .then((data) => {
        console.log("new Card: ", data);
        if(data) {
            console.log("La DATA PA: ", data);
        }
    })
    .catch((error) => {
        console.error("Hubo un error al hacer la solicitud:", error);
    });
    }
  }
  function handleMouseMoveImage(e: MouseEvent<HTMLDivElement>) {
    if(imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;
      const posX = Math.max(0, Math.min(x, width));
      const posY = Math.max(0, Math.min(y, height));
      setZoomPosition({
        x: (posX / width) * 100,
        y: (posY / height) * 100,
      });
    }
  }
  function handleMouseEnterImage(image: string) {
    setHoverImage(image);
  }
  function handleMouseLeaveImage() {
    setHoverImage("");
  }
  return (
    <div className="flex flex-col gap-[60px] mt-[40px]">
      <div className="flex w-full justify-between gap-[50px]">
        <div className="flex items-start max-h-[400px] gap-[50px]">
          <div className="flex flex-col gap-[30px] justify-start">
            {productFound?.images.map((productImage, index)=> (
              <article key={index} className={`flex items-center justify-center cursor-pointer w-[120px] min-w-[120px] h-[80px] min-h-[80px] bg-[#eeeeee] rounded-[20px] ${productImage === selectedImage ? "border-2 border-solid border-[#FD4E4E]" : ""}`} onClick={()=> setSelectedImage(productImage)}>
                <Image className="w-full h-full object-contain" src={`/image/${productImage}`} width={10000} height={10000} alt=""/>
              </article>
            ))}
          </div>
          <div className="flex items-center justify-center m-auto w-full min-w-[478px] object-contain h-[410px] rounded-[30px]" onMouseLeave={()=> handleMouseLeaveImage()} onMouseMove={handleMouseMoveImage} onMouseEnter={()=> handleMouseEnterImage(selectedImage)}>
            <Image ref={imgRef} className="h-auto w-full max-w-[450px] rounded-[30px]" src={`/image/${selectedImage}`} width={100000} height={10} alt=""/>
          </div>
        </div>
        <div className="flex flex-col relative w-full flex-1 gap-[10px]">
          {hoverImage.length > 0 && (
            <div className="absolute w-[100%] h-full bg-no-repeat bg-[#ffffff] z-[20]" style={{
              backgroundImage: `url(/image/${selectedImage})`,
              backgroundSize: '180%',
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}>
            </div>
          )}
          <h2 className="text-[24px] font-semibold">
            {productFound ? productFound.name : ""}
          </h2>
          <label>Precio efectivo o transferencia</label>
          <CurrencyFormat className="font-semibold text-[42px]" format="ES-es" price={productFound ? productFound.price * quantity : 0}/>
          <div className="flex flex-col gap-[3px]">
            <label>Precio Mercado pago</label>
            <CurrencyFormat className="font-semibold text-[24px] opacity-50" format="ES-es" price={productFound ? productFound.price * 1.12 * quantity : 0}/>
          </div>
          <div className="flex flex-col gap-[20px]">
            <span className="flex items-center gap-[10px] text-[#FD4E4E]">
              <Image src={truckIcon} width={24} height={24} alt="" />
              Envió en todo el PAÍS
            </span>
            <span className="flex items-center gap-[10px] text-[#FD4E4E]">
              <Image src={walletIcon} width={24} height={24} alt="" />
              PAGA hasta 12 cuotas con las principales tarjetas de créditos
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <button className="bg-btn text-white py-[10px] px-[20px] rounded-[30px] font-semibold" onClick={()=> {
              addProductToCart(productFound);
              addProductServer(productFound);
            }}>
              Comprar ahora
            </button>
            <div className="flex items-center gap-[8px] bg-btn text-white py-[5px] px-[20px] rounded-[30px] font-semibold">
              <span>{quantity}</span>
              <div className="flex flex-col gap-[1px]">
                <button className="w-[18px]" onClick={handleClickUp}>
                  <Image className="w-[18px]" src={lineUpIcon} width={18} height={18} alt="" />
                </button>
                <button className="w-[18px]" onClick={handleClickDown}>
                  <Image className="w-[18px]" src={lineDownIcon} width={18} height={18} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Products name={productFound.category} showButton={true} data={allProduct.allProducts.filter((p)=> p.category == productFound.category).filter((e)=> e.id !== productFound.id)} />
      <ContSponsors />
      <Deliveries />
      <Footer />
    </div>
  );
}
