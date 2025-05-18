'use client'
import Link from 'next/link';
import React from 'react'

export default function NavProducts() {
    const categories = [
    "PC ARMADAS",
    "PERIFERICOS",
    "GABINETES",
    "PROCESADORES",
    "PLACAS MADRE",
    "MONITORES",
    "FUENTES DE PODER",
    "PLACAS DE VIDEOS",
    "MEMORIAS RAM",
    "REFRIGERAMIENTOS",
    "SILLAS GAMER",
  ];
  return (
    <div className='header-category flex-col items-center gap-[20px] justify-center w-full mt-[20px]'>
        <h3 className="text-[#FD4E4E] font-semibold">CATEGORÍAS</h3>
        <ul className='flex items-center w-full gap-[20px] scroll-smooth overflow-x-auto snap-x snap-proximity scroll-p-[0px] header-category-scroll'>
            {categories.map((Element, index)=> (
                <Link className='border-2 px-[10px] rounded-[30px] border-solid border-[#0000001a] snap-start whitespace-nowrap' key={index} href={`/productos/${Element.toLowerCase().replaceAll(" ", "")}`}>{Element}</Link>
            ))}
        </ul>
    </div>
  )
}
