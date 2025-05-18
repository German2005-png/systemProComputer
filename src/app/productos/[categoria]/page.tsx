'use client'
import Categories from '@/components/categories/categories'
import React from 'react';
import allProducts from "../../../jsons/allProduct.json";
import Products from '@/components/products/products';
import { useParams } from 'next/navigation';
import NavProducts from '@/components/navegation/navProducts';

export default function ProductosPage() {
  const params = useParams<{ categoria: string }>();
  return (
    <div className='flex flex-col w-full h-full gap-[20px] mx-auto'>
      <NavProducts />
      <main className='flex w-full h-full gap-[20px]'>
        <Categories />
        <div className='overflow-hidden relative'>
          <Products name='' showButton={false} data={allProducts.allProducts.filter(p => p.category === params.categoria)}/>
        </div>
    </main>
    </div>
  )
}
