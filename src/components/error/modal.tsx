'use client'
import React, { useEffect } from 'react';
import errorIcon from '../../../public/svg/error.svg';
import Image from 'next/image';

interface ErrorComponentProps {
  type: string;
  title: string;
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({type, title, message}) => {
  const contErrorRef = React.useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      if(contErrorRef.current){
        contErrorRef.current.classList.remove('error-style');
        contErrorRef.current.classList.add('error-style-off');
      }
    }, 2000);
    return () => clearTimeout(timeout);
  },[])
  return (
    <div ref={contErrorRef} className={`fixed w-full max-w-[300px] error-style transition-all duration-150 ease-in-out left-1/2 rounded-[15px] p-3 transform -translate-x-1/2 mt-2 z-50 ${type === "Error" ? "bg-[#fD4E4E]": type === "Warning" ? "bg-[#f7c523]" : type === "Success" ? "bg-[#4efd4e]" : "bg-[#fD4E4E]"} shadow-xl`}>
      <nav className='flex w-full items-center gap-[5px]'>
        <Image src={errorIcon} width={24} height={24} alt='Error'/>
        <h2 className='text-white font-semibold error-nav'>{title}</h2>
      </nav>
      <p className='text-white font-medium error-nav'>{message}</p>
    </div>
  )
}

export default ErrorComponent;