import React from 'react';
import spcLogoIcon from '../../../public/svg/spcLogo.svg';
import visaIcon from '../../../public/svg/visa.svg';
import visaDebitoIcon from '../../../public/svg/visaDebito.svg';
import mastercardIcon from '../../../public/svg/mastercard.svg';
import naranjaIcon from '../../../public/svg/naranja.svg';
import americanExpressIcon from '../../../public/svg/americanExpress.svg';
import pagoFacilIcon from '../../../public/svg/pagoFacil.svg';
import mercadoPagoIcon from '../../../public/svg/mercadoPago.svg';
import rapiPagoIcon from '../../../public/svg/rapipago.svg';
import Image from 'next/image';

export default function Footer() {
    const mediosDePagoList = [visaIcon, mastercardIcon, americanExpressIcon, mercadoPagoIcon, visaDebitoIcon, naranjaIcon, pagoFacilIcon, rapiPagoIcon];
    const socialList = ["Facebook", "Instagram", "Tiktok", "Youtube"];
  return (
    <footer className='flex items-center flex-wrap justify-between w-full bg-content py-[25px] px-[30px] rounded-[29px]'>
        <div className='flex flex-col items-center gap-2 justify-center'>
            <Image src={spcLogoIcon} width={234} height={77} alt='' />
            <h2 className='font-medium text-[22px]'>SystemProComputer © 2023</h2>
            <span className='opacity-75'>Todos los derechos reservado</span>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <h2 className='font-semibold text-[#FD4E4E]'>ATENCIÓN AL CLIENTE:</h2>
            <ul className='flex flex-col items-center gap-1'>
                <li>Lunes a Viernes <br /> de 8hs a 18hs</li>
                <li>Sabado y Domingo <br /> de 9hs a 13hs</li>
                <li>Av. San Martín 1111, Mendoza</li>
            </ul>
        </div>
        <div className='flex flex-col items-center gap-[10px] justify-between'>
            <h2 className='font-semibold text-[#FD4E4E]'>MEDIOS DE PAGOS</h2>
            <ul className='flex flex-wrap max-w-[230px]'>
                {mediosDePagoList.map((Element, index)=> (
                    <Image key={index} src={Element} width={55} height={38} alt=''/>
                ))}
            </ul>
            <button className='bg-btn rounded-[30px] py-1 px-3 text-white'>Botón de arrepentimiento</button>
        </div>
        <div className='flex flex-col gap-[20px] justify-between'>
            <h2 className='font-semibold text-[#FD4E4E]'>SEGUINOS EN</h2>
            <ul className='flex flex-col gap-[5px]'>
                {socialList.map((Element, index)=> (
                    <li key={index}>{Element}</li>
                ))}
            </ul>
        </div>
    </footer>
  )
}
