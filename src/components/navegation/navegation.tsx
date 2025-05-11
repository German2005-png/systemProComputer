'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import spcImage from "../../../public/image/systemProComputerImage.png";
import cardIcon from "../../../public/svg/card.svg";
import burgerIcon from "../../../public/svg/burger.svg";
import { useAppContext } from '@/context/appContext';
import Cookies from 'js-cookie';

export default function Navegation() {
    const { showCard, setShowCard, showUser, setShowUser, setShowSign, user } = useAppContext();
    const links = [{text: 'Inicio', link: '/'}, {text: 'Productos', link: 'productos/pcarmadas'}];
    const [token, setToken] = useState<boolean>(true);
    useEffect(()=> {
        if (Cookies.get("token")) {
            setToken(true);
        } else {
            setToken(false);
        }
    },[])
  return (
    <nav className='sticky top-0 flex items-center justify-between w-full bg-article py-[10px] px-[2%] shadow-md z-40'>
        <Link className='min-w-[106px]' href="/">
            <Image src={spcImage} width={106} height={48} alt='System Pro Computer' />
        </Link>
        <ul className='flex items-center gap-[40px]'>
            {links.map((link, index)=> (
                <Link className='text-black font-semibold nav-links' key={index} href={`/${link.link.toLowerCase().replace("", "")}`}>{link.text}</Link>
            ))}
            {user && user.username ? (
                <button className='text-black font-semibold nav-links' onClick={()=> {
                    setShowUser({user: {username: showUser.user.username, createdAt: showUser.user.createdAt}, state: !showUser.state});
                    setShowCard((prev)=> ({products: prev.products, state: false}));
                }}>{user.username}</button>   
            ) : (
                <button className='text-center font-semibold bg-btn text-[14px] py-[5px] px-[8px] rounded-[15px] text-white whitespace-nowrap truncate nav-links' disabled={token} onClick={()=> setShowSign("inicia sesíon")}>Iniciar Sesión</button>
            )}
            <button className='min-w-[24px] min-h-[24px] nav-burger'>
                <Image className='w-[24px] h-[24px]' src={burgerIcon} width={24} height={24} alt=''/>
            </button>
            <button className='relative' onClick={()=> {
                setShowCard({products: showCard.products, state: !showCard.state});
                setShowUser((prev) => ({user: {username: prev.user.username, createdAt: prev.user.createdAt}, state: false}));
            }}>
                {showCard.products.length > 0 && (
                    <div className='absolute bg-white rounded-full p-[1px] -top-[5px] left-[15px]'>
                        <div className='flex items-center w-[8px] h-[8px] px-[4px] rounded-full justify-center text-center bg-btn'>
                        </div>
                    </div>
                )}
                <Image src={cardIcon} width={18} height={18} alt=''/>
            </button>
        </ul>
    </nav>
  )
}
