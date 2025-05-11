'use client'
import { useAppContext } from '@/context/appContext'
import React from 'react'
import SignIn from './signIn';
import SignUp from './signUp';
import ErrorComponent from '../error/modal';

export default function ContSign() {
  const { showSign, setShowSign, errorSign } = useAppContext();
  function handleShowSign() {
    setShowSign("");
  }
  return (
    <>
    {errorSign.message.length > 1 ? <ErrorComponent type={errorSign.type} title={errorSign.title} message={errorSign.message}/>: ""}
    <div className={`fixed ${showSign == "inicia sesíon" || showSign == "Crear Cuenta" ? "cont-sign-flex" : "hidden"} justify-center w-full h-full m-auto z-[46] transition-all duration-150 ease-in backdrop-blur-[1px] bg-[#4444442d]`}>
        <SignIn /><SignUp />
      <div className='fixed flex w-full h-screen z-[47]' onClick={handleShowSign}></div>
    </div>
    </>
  )
}
