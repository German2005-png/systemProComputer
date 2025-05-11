'use client'
import { useAppContext } from '@/context/appContext';
import CurrencyFormat from '@/utils/currencyFormat';
import deleteIcon from '../../../public/svg/deleteBlack.svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  quantity: number;
}

export default function NavCart() {
  const { showCard, setShowCard, user, setErrorSign } = useAppContext();
  async function deleteProduct(product: ProductProps) {
    const response = await fetch("/server/api/deleteProduct", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: product.id }),
    });
    const result = await response.json();
    console.log(result);
  }
  return (
    <div className={`fixed z-[45] bg-article p-4 rounded-es-[30px] transition-all ease-linear delay-75 ${showCard.state ? 'right-0 opacity-1' : '-right-full opacity-0'} w-full max-w-[280px]`}>
      <div className="flex flex-col gap-2">
        <ul className='flex flex-col gap-1 h-[168px] overflow-auto'>
          {showCard.products.length > 0 ? (
            <>
            {showCard.products.map((product, index)=> (
            <article key={index} className='flex gap-2 bg-content p-2 rounded-[15px]'>
              <Link className='relative flex items-center justify-center w-[60px] h-[65px] min-w-[65px] bg-transparent rounded-[10px] object-contain' href={`/product/${product.id}/${encodeURIComponent(product.name)}`}>
              {product.quantity >= 2 && (
                <span className='absolute bg-btn rounded-full text-white top-0 right-0 z-20 px-[5px] py-[1px] text-[8px]'>{product.quantity}</span>
              )}
              <Image className='filter contrast-[0.8]' src={`/image/${product.images[0]}`} width={65} height={65} alt=''/>
              </Link>
              <div className='flex flex-col justify-between'>
                <div className='flex items-start gap-[3px]'>
                <Link href={`/product/${product.id}/${encodeURIComponent(product.name)}`} className='font-semibold text-limit text-[12px]'>
                  {product.name}
                </Link>
                <button className='min-w-[10px] min-h-[10px] bg-transparent mt-[4px]' onClick={async()=> {
                  setShowCard((prev) => ({products: prev.products.filter((item) => item.id !== product.id), state: prev.state}));
                  if(user.username) {
                    await deleteProduct(product);
                  }
                }}>
                  <Image className='w-[10px] h-[10px]' src={deleteIcon} width={24} height={24} alt=''/>
                </button>
                </div>
                <CurrencyFormat className='font-semibold text-[20px]' price={product.price} format='es-ES' key={index} />
              </div>
            </article>
          ))}
            </>
          ) : (<h4 className='text-center'>No hay productos</h4>)}
        </ul>
        <Link href={`/payment`} className='w-full text-center bg-btn px-2 text-white font-medium rounded-md' onClick={()=> {
          if(!user.username) {
            setErrorSign({type: "Warning", title: "Advertencia", message: "Necesitás iniciar sesión para continuar."});
          }
        }}>Total: <CurrencyFormat className='text-white font-medium' format='ES-es' price={(showCard.products).reduce((total, product) => total + (product.price * product.quantity || 0), 0)} key={2}></CurrencyFormat></Link>
      </div>
    </div>
  )
}
