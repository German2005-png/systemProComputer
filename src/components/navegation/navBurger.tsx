'use client'
import { useAppContext } from '@/context/appContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function NavBurger() {
  const { user, setUser, setShowUser, showBurger, setShowSign } = useAppContext();
  const [token, setToken] = useState<boolean>(true);
    useEffect(()=> {
        if (Cookies.get("token")) {
            setToken(true);
        } else {
            setToken(false);
        }
    },[])
  return (
    <div className={`fixed z-[45] bg-article p-4 rounded-es-[30px] shadow-md transition-all ease-linear delay-75 ${showBurger ? 'right-0 opacity-1' : '-right-full opacity-0'} w-full max-w-[200px]`}>
      <div className="flex flex-col gap-2">
        <ul className='flex flex-col gap-4 overflow-auto'>
          <Link href={`/`} className='flex items-center gap-2'>
            <span>Inicio</span>
          </Link>
          <Link href={`productos/pcarmadas`} className='flex items-center gap-2'>
            <span>Productos</span>
          </Link>
          {user && user.username ? "" : (
            <button className='text-center font-semibold bg-btn text-[14px] py-[5px] px-[8px] rounded-[15px] text-white whitespace-nowrap truncate' disabled={token} onClick={()=> setShowSign("inicia sesíon")}>Iniciar Sesión</button>
          )}
          {user.username && (
            <>
            <Link href={`/`} className='flex items-center gap-2'>
            <span>Transactions</span>
          </Link>
          <div>
            <button className='flex items-center gap-2' onClick={()=> {
              Cookies.remove('token');
              setShowUser({state: false, user: {username: '', createdAt: ''}});
              setUser({username: '', createdAt: ''});
              if(typeof window !== 'undefined') {
                window.location.reload();
              }
            }}>
              <span>Salir</span>
            </button>
          </div>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
