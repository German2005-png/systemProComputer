'use client'
import { useAppContext } from '@/context/appContext';
import React, { useState } from 'react';
import loadingIcon from '../../../public/svg/loading.svg';
import Cookies from 'js-cookie';
import Image from 'next/image';

interface SignUpInputChange {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const { showSign, setShowSign, setErrorSign, setUser } = useAppContext();
  const [singUpInputChange, setSignUpInputChange] = useState<SignUpInputChange>({username: '', password: '', confirmPassword: ''});
  const [loading, setLoading] = useState<boolean>(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
    const data = {
      username: singUpInputChange.username,
      password: singUpInputChange.password,
      confirmPassword: singUpInputChange.confirmPassword
    }
    const response = await fetch('/server/api/signUp', {
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
      }, 4000);
    } else {
      Cookies.set('token', result.user.token);
      setUser({username: result.user.username, createdAt: result.user.createdAt});
      setErrorSign({type: "Success", title: "Success", message: "Nuevo usuario!"});
      setShowSign("");
    }
    console.log(result);
    setLoading(false);
    } catch (error) {
      setErrorSign({type: "Error", title: "Error", message: "Error al crear la cuenta"});
      console.error(error);
      setLoading(false);
    }
  }
  function handleSignUpText(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignUpInputChange((prevState) => ({...prevState, [name]: value.trimStart()}));
  }
  return (
    <form className={`${showSign == "Crear Cuenta" ? "signInAnimation" : "signInAnimationOff"} flex-col transition-all duration-150 ease-in p-10 m-auto z-50 bg-article rounded-[35px] gap-[20px] w-full max-w-[500px]`} onSubmit={handleSubmit}>
      <h1 className='mx-auto font-semibold text-[34px]'>Crear Cuenta</h1>
      <ul className='flex flex-col gap-2'>
        <li className='flex flex-col w-full gap-[10px]'>
          <label className='font-semibold text-[18px]' htmlFor="signUp-username-id">Usuario</label>
          <input className='w-full py-2 px-4 border-[3px] border-solid border-[#FD4E4E] rounded-[18px] outline-none' type="text" id='signUp-username-id' name='username' required value={singUpInputChange.username} onChange={handleSignUpText}/>
        </li>
        <li className='flex flex-col gap-[10px]'>
          <label className='font-semibold text-[18px]' htmlFor="signUp-password-id">Contraseña</label>
          <input className='w-full py-2 px-4 border-[3px] border-solid border-[#FD4E4E] rounded-[18px] outline-none' type="password" id='signUp-password-id' name='password' required value={singUpInputChange.password} onChange={handleSignUpText}/>
        </li>
        <li className='flex flex-col gap-[10px]'>
          <label className='font-semibold text-[18px]' htmlFor="signUp-password-confirm-id">Confirmar Contraseña</label>
          <input className='w-full py-2 px-4 border-[3px] border-solid border-[#FD4E4E] rounded-[18px] outline-none' type="password" id='signUp-password-confirm-id' name='confirmPassword' required value={singUpInputChange.confirmPassword} onChange={handleSignUpText}/>
        </li>
      </ul>
        <button type='submit' className='w-full text-center rounded-[18px] bg-btn p-[10px] font-semibold text-white text-[18px] flex items-center justify-center'>
          {loading ? <Image className='w-[24px] h-[24px]' src={loadingIcon} width={24} height={24} alt=''/> : "Crear Cuenta"}
        </button>
        <span className='cursor-pointer' onClick={()=> {setShowSign("inicia sesíon")}}>¿ Ya tienes cuenta ?</span>
    </form>
  )
}
