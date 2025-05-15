'use client'
import React from 'react';
import hyperImage from '../../../public/image/hyper.png';
import corsairImage from '../../../public/image/corsair.png';
import replublicOfGamerImage from '../../../public/image/republicOfGamer.png';
import coolerMasterImage from '../../../public/image/coolerMaster.png';
import reDragonImage from '../../../public/image/redDragon.png';
import amdImage from '../../../public/image/amd.png';
import Image from 'next/image';

export default function ContSponsors() {
    const sponsorsImages = [hyperImage, corsairImage, replublicOfGamerImage, coolerMasterImage, reDragonImage, amdImage];
  return (
    <div className='bg-content p-6 rounded-[29px]'>
        <div className='flex items-center justify-center px-[20px] gap-[20px] ml-[20px] flex-wrap flex-sponsors'>
        {sponsorsImages.map((sponsor, index)=> (
            <Image className=' max-w-[171px] max-h-[85px] object-contain' key={index} src={sponsor} width={2000} height={2000} alt=''/>
        ))}
        </div>
    </div>
  )
}
