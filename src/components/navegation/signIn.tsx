'use client'
import { useAppContext } from '@/context/appContext';
import Link from 'next/link';
import React, { useState } from 'react';
import loadingIcon from '../../../public/svg/loading.svg';
import Image from 'next/image';
import Cookie from "js-cookie";

interface SignInInputChange {
  username: string;
  password: string;
}

export default function SignIn() {
  const { showSign, setShowSign, setErrorSign, setUser } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [SingInInputChange, setSignInInputChange] = React.useState<SignInInputChange>({username: '', password: ''});
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const data = {
      username: SingInInputChange.username,
      password: SingInInputChange.password
    }
    const response = await fetch('/server/api/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if(result.error) {
      setErrorSign({type: "Error", title: "Error", message: result.error});
      setTimeout(() => {
        setErrorSign({type: "", title: "", message: ""});
      }, 5000);
    } else {
      Cookie.set('token', result.user.token);
      setUser({username: result.user.username, createdAt: result.user.createdAt});
      setErrorSign({type: "Success", title: "Success", message: "Usuario encontrado!"});
      setShowSign("");
    }
    console.log(result);
    setLoading(false);
  }
  function handleSignInText(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignInInputChange((prevState) => ({...prevState, [name]: value.trimStart()}));
  }
  return (
    <form className={`${showSign == "inicia sesíon" ? "signInAnimation" : "signInAnimationOff"}  flex-col transition-all duration-150 ease-in p-10 m-auto z-50 bg-article rounded-[35px] gap-[20px] w-full max-w-[500px]`} onSubmit={handleSubmit}>
      <h1 className='mx-auto font-semibold text-[34px]'>Iniciar Sesión</h1>
      <ul className='flex flex-col gap-2'>
        <li className='flex flex-col w-full gap-[10px]'>
          <label className='font-semibold text-[18px]' htmlFor="input-username-id">Usuario</label>
          <input className='w-full py-2 px-4 border-[3px] border-solid border-[#FD4E4E] rounded-[18px] outline-none' type="text" id='input-username-id' name='username' value={SingInInputChange.username} required onChange={handleSignInText}/>
          <div className='m-0 p-0 flex'>
            <Link href="/reset-username" className='text-[12px] text-[#000000b7]'>Olvide mi usuario</Link>
          </div>
        </li>
        <li className='flex flex-col gap-[10px]'>
          <label className='font-semibold text-[18px]' htmlFor="input-password-id">Contraseña</label>
          <input className='w-full py-2 px-4 border-[3px] border-solid border-[#FD4E4E] rounded-[18px] outline-none' type="password" id='input-passowrd-id' name='password' value={SingInInputChange.password} required onChange={handleSignInText}/>
          <div className='m-0 p-0 flex' >
            <Link href="/reset-password" className='text-[12px] text-[#000000b7]'>Olvide mi contraseña</Link>
          </div>
        </li>
      </ul>
        <button type='submit' className='w-full rounded-[18px] bg-btn p-[10px] font-semibold text-white text-[18px] text-center flex items-center justify-center' disabled={false}>
          {loading ? <Image className='w-[24px] h-[24px]' src={loadingIcon} width={24} height={24} alt=''/> : "Iniciar Sesión"}</button>
        <span className='cursor-pointer' onClick={()=> {setShowSign("Crear Cuenta")}}>¿ No tienes cuenta ?</span>
    </form>
  )
}
