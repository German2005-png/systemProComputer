'use client'
import React from 'react';
import walletIcon from '../../../public/svg/wallet.svg';
import truckIcon from '../../../public/svg/truck.svg';
import truckFastIcon from '../../../public/svg/truckFast.svg';
import Image from 'next/image';


export default function Deliveries() {
  return (
    <div className='flex items-center justify-center gap-[100px]'>
        <article className='flex flex-col gap-3 justify-center items-center relative top-5'>
            <Image src={walletIcon} width={70} height={70} alt=''/>
            <p className='text-center'>PAGA hasta <br /> 12 cuotas con las principales <br /> tarjetas de creditos</p>
        </article>
        <article className='flex flex-col gap-1 justify-center items-center'>
            <Image src={truckIcon} width={70} height={70} alt=''/>
            <p className='text-center'>Envió en <br /> todo el PAíS</p>
        </article>
        <article className='flex flex-col gap-1 justify-center items-center'>
            <Image src={truckFastIcon} width={70} height={70} alt=''/>
            <p className='text-center'>Envió Express <br /> Solo en Mendoza</p>
        </article>
    </div>
  )
}
