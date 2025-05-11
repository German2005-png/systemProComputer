'use client'
import { useAppContext } from '@/context/appContext';
import transactionIcon from '../../../public/svg/transaction.svg';
import exitIcon from '../../../public/svg/exit.svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Cookies from 'js-cookie';

export default function NavUser() {
  const { showUser, user, setUser, setShowUser } = useAppContext();
  return (
    <div className={`fixed z-[45] bg-article p-4 rounded-es-[30px] transition-all ease-linear delay-75 ${user.username && showUser.state ? 'right-0 opacity-1' : '-right-full opacity-0'} w-full max-w-[200px]`}>
      <div className="flex flex-col gap-2">
        <ul className='flex flex-col gap-4 overflow-auto'>
          <Link href={`/`} className='flex items-center gap-2'>
            <Image src={transactionIcon} width={24} height={24} alt=''/>
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
              <Image src={exitIcon} width={24} height={24} alt=''/>
              <span>Salir</span>
            </button>
          </div>
        </ul>
      </div>
    </div>
  )
}
