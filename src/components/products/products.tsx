'use client'
import React, { useRef } from 'react';
import rightWIcon from '../../../public/svg/rightW.svg';
import leftWIcon from '../../../public/svg/leftW.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '@/context/appContext';
import CurrencyFormat from '@/utils/currencyFormat';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  quantity: number;
  title: string;
}

interface ProductsProps {
  name: string;
  showButton: boolean;
  data: Product[];
}

const Products: React.FC<ProductsProps> = ({name, showButton, data}) => {
  const contProducts = useRef<HTMLUListElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const { setShowCard, user } = useAppContext();
  function handleMoveLeft() {
    if(contProducts.current && productRef.current) {
      contProducts.current.scrollLeft -= productRef.current.clientWidth;
    }
  }
  function handleMoveRight() {
    if(contProducts.current && productRef.current) {
      contProducts.current.scrollLeft += productRef.current.clientWidth;
    }
  }
  function addProductToCart(product: Product) {
    setShowCard((prev) => {
      const productIndex = prev.products.findIndex(p => p.id === product.id);
      if(productIndex >= 0){
        const updatedProducts = prev.products.map((p, index) => index === productIndex ? {...p, quantity: p.quantity + 1} : p);
        return {...prev, products: updatedProducts};
      }
      return {...prev, products: [...prev.products, {...product, quantity: 1}]};
    });
  }
  function addProductCard(product: Product) {
    if(user.username) {
      fetch("/api/createCard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productsId: product.id, productQuantityValue: 1 }),
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
  return (
    <div className='flex flex-col mx-auto w-full px-1 rounded-[30px] gap-[10px]'>
        <div className='flex items-center gap-[10px] justify-between w-full'>
            <h3 className='font-semibold text-[#FD4E4E]'>{name}</h3>
            {/* <button className='flex items-center gap-[3px] font-semibold text-[#FD4E4E]'>Ordenar por <Image src={rightIcon} width={24} height={24} alt=''/></button> */}
        </div>
        <div className='flex items-center w-full'>
        {showButton && (
          <button className='p-2 absolute bg-[#FD4E4E] rounded-full left-10 z-20' onClick={handleMoveLeft}>
            <Image src={leftWIcon} width={24} height={24} alt=''/>
          </button>
        )}
        <ul ref={contProducts} className={`flex items-center ${!showButton ? "flex-wrap" : ""} relative scroll-smooth gap-[10px] w-full ${showButton ? "overflow-x-hidden" : ""} snap-x snap-proximity scroll-p-[0px]`} style={{scrollSnapType: 'x'}}>
          {data.map((product, index)=> (
            <div ref={productRef} key={index} className={`flex flex-col gap-1 shrink-0 snap-start overflow-hidden w-full flex-shrink-1 ${!showButton ? "product-category-sizes" : "basis-full sm:basis-[49.62%] md:basis-[32.7%] lg:basis-[24.4%]"} ${showButton ? "product-size" : "min-w-[240px]"}`}>
              <Link href={`/product/${product.id}/${encodeURIComponent(product.name)}`} className='flex mx-auto w-full max-w-[200px] max-h-[200px] object-cover snap-center'>
                <Image className='flex w-full h-full max-w-[100%] max-h-[202.27px] object-cover' src={`/image/${product?.images[0]}`} width={2000} height={2000} alt=''/>
              </Link>
              <Link className='text-limit' title={product.name} href={`/product/${product.id}/${product.name.toLocaleLowerCase().replaceAll(" ", "")}`}>{product.name}</Link>
              <CurrencyFormat className='font-medium' price={product.price} format='es-ES' key={index}/>
              <button className='border-2 border-solid rounded-full border-[#FD4E4E] hover:bg-[#FD4E4E] hover:text-white' onClick={async ()=> {
                addProductToCart(product);
                addProductCard(product);
              }}>Comprar</button>
            </div>
          ))}
        </ul>
        {showButton && (
          <button className='p-2 absolute bg-[#FD4E4E] rounded-full right-10 z-20' onClick={handleMoveRight}>
            <Image src={rightWIcon} width={24} height={24} alt=''/>
          </button>
        )}
        </div>
    </div>
  )
}

export default Products; 