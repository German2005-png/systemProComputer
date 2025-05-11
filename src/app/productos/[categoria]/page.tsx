'use client'
import Categories from '@/components/categories/categories'
import React from 'react';
import allProducts from "../../../jsons/allProduct.json";
import Products from '@/components/products/products';
import { useParams } from 'next/navigation';

export default function ProductosPage() {
  const params = useParams<{ categoria: string }>();
  return (
    <main className='flex w-full h-full mx-auto gap-[20px]'>
        <Categories />
        <div className='overflow-hidden relative'>
          <Products name='' showButton={false} data={allProducts.allProducts.filter(p => p.category === params.categoria)}/>
        </div>
    </main>
  )
}
