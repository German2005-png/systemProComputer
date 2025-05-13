'use client'
import Image from 'next/image';
import React, { useState } from 'react';
// Card Front
import cardFrontImage from "../../../public/image/cardImage.png";
import cardFrontImageVisa from "../../../public/image/cardImageVisa.png";
import cardFrontImageMaster from "../../../public/image/cardImageMaster.png";
import cardFrontImageAmericanExpress from "../../../public/image/cardImageAmericanExpress.png";
// Card Back
import cardBackImage from "../../../public/image/cardBackImage.png";
import cardBackImageVisa from "../../../public/image/cardBackImageVisa.png";
import cardBackImageMaster from "../../../public/image/cardBackImageMaster.png";
import cardBackImageAmericanExpress from "../../../public/image/cardBackImageAmericanExpress.png";
import { useAppContext } from '@/context/appContext';


export default function CardModal() {
  const [cardRotateY, setCardRotateY] = useState<boolean>(false);
  const { showCardModal, setShowCardModal, cardNumberDigits, setCardNumberDigits, cardDateNumber, setCardDateNumber, cardSecurityCode, setCardSecurityCode, fullName, setFullName, cardId, setCardId, cardpaymentTypeId, setCardPaymentMethodId, cardPaymentMethodId } = useAppContext();
  function handleCardNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setCardNumberDigits(formattedValue.split(" "))
    if(cardpaymentTypeId == "credit_card") {
      if(value.startsWith("4")) {
        setCardPaymentMethodId("visa");
      } else if(/^5[1-5]/.test(value)) {
      setCardPaymentMethodId("master")
      } else if(value.startsWith("34") || value.startsWith("37")) {
        setCardPaymentMethodId("amex")
      } else {
        setCardPaymentMethodId("");
      }
    } else if(cardpaymentTypeId == "debit_card") {
      if(value.startsWith("4")) {
        setCardPaymentMethodId("debvisa");
      } else if(/^5[1-5]/.test(value)) {
      setCardPaymentMethodId("debmaster")
      } else {
        setCardPaymentMethodId("");
      }
    } else {
      setCardPaymentMethodId("");
    }
  }
  function handleCardDateNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
    setCardDateNumber(formattedValue.split(" "))
  }
  function handleCardSecurityCode(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    setCardSecurityCode(value)
  }
  function handleCardId(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, '');
    setCardId(value)
  }
  console.log(cardPaymentMethodId)
  return (
    <div className={`${showCardModal ? "flex" : "hidden"} items-center bg-[#00000028] justify-center fixed z-[45] backdrop-blur-[8px] m-auto w-full h-full`}>
        <div className='flex flex-col bg-[#f3f3f3] m-auto border border-solid border-[#0000001a] w-full p-[20px] max-w-[750px] h-[430px] rounded-[20px] z-50'>
          <header className='flex items-center justify-between w-full mb-[20px]'>
            <h1>Ingresá una nueva tarjeta de {showCardModal}</h1>
            <button className={`bg-btn text-white px-[10px] py-[5px] rounded-[10px] ${cardNumberDigits.length > 1 && cardDateNumber.length > 1 && cardSecurityCode.length > 1 && cardId.length > 1 ? "opacity-100 cursor-pointer" : "opacity-70 cursor-not-allowed"}`} disabled={cardNumberDigits.length > 1 && cardDateNumber.length > 1 && cardSecurityCode.length > 1 && cardId.length > 1 ? true : false}>Ready</button>
          </header>
          <div className='flex items-center justify-between w-full h-full bg-white rounded-[20px] p-[15px]'>
            {/* form */}
            <div className='flex flex-col gap-[15px] w-full max-w-[350px]'>
              <form className='flex flex-col gap-[15px]'>
                <div className='flex flex-col gap-[5px]'>
                  <label className='text-[12px]'>Número de tarjeta</label>
                  <input type='text' className='w-full border-2 border-solid border-[#0000001a] py-[5px] px-[10px] rounded-[10px] outline-none' maxLength={19} onChange={(e)=> handleCardNumber(e)} value={cardNumberDigits.join(" ")}/>
                </div>
                <div className='flex flex-col gap-[5px]'>
                  <label className='text-[12px]'>Nombre y apellido</label>
                  <input className='w-full border-2 border-solid border-[#0000001a] py-[5px] px-[10px] rounded-[10px] outline-none' type="text" onChange={(e)=> setFullName(e.target.value.toUpperCase().replace(/[^a-zA-Z\s]/g, ''))} value={fullName} maxLength={20} required />
                </div>
                <div className='flex items-center gap-[10px]'>
                  <div className='flex flex-col gap-[5px]'>
                    <label className='text-[12px]'>Fecha de vencimiento</label>
                    <input className='w-full border-2 border-solid border-[#0000001a] py-[5px] px-[10px] rounded-[10px] outline-none' onChange={(e)=> handleCardDateNumber(e)} value={cardDateNumber.join("/")} maxLength={5} required/>
                  </div>
                  <div className='flex flex-col gap-[5px]'>
                    <label className='text-[12px]'>Código de seguridad</label>
                    <input className='w-full border-2 border-solid border-[#0000001a] py-[5px] px-[10px] rounded-[10px] outline-none' maxLength={4} onChange={(e)=> handleCardSecurityCode(e)} value={cardSecurityCode} onFocus={()=> setCardRotateY(true)} onBlur={()=> setCardRotateY(false)} required/>
                  </div>
                </div>
                <div className='flex flex-col gap-[5px]'>
                  <label className='text-[12px]'>DNI del titular de la tarjeta</label>
                  <input className='w-full border-2 border-solid border-[#0000001a] py-[5px] px-[10px] rounded-[10px] outline-none' onChange={(e)=> handleCardId(e)} value={cardId} required/>
                </div>
              </form>
            </div>
            {/* card 3d */}
            <div className='flex items-center justify-center m-auto w-full'>
              <div className='w-full rounded-[5px] max-w-[280px] h-[150px] card-container' style={{perspective: '1000px'}}>
                <div className='relative w-[280px] h-[150px] card' style={{transform: `${cardRotateY ? 'rotateY(180deg)' : 'rotateY(0deg)'}`}} onClick={()=> setCardRotateY(!cardRotateY)}>
                  <div className='absolute w-full h-full rounded-[5px] object-cover' style={{backfaceVisibility: 'hidden', transform: `rotateY(0deg)`}}>
                    <Image className='relative w-full h-full object-cover' src={cardPaymentMethodId == "visa" || cardPaymentMethodId == "debvisa" ? cardFrontImageVisa : cardPaymentMethodId == "master" || cardPaymentMethodId == "debmaster" ? cardFrontImageMaster : cardPaymentMethodId == "amex" ? cardFrontImageAmericanExpress : cardFrontImage} width={10000} height={10000} alt=''/>
                    <div className='absolute w-[95.3%] bottom-[45px]'>
                      <div className='flex items-center px-[20px] gap-[10px]'>
                        {[0,1,2,3].map((index)=> (
                          <span key={index} className={`${cardPaymentMethodId.length > 1 && cardPaymentMethodId !== "amex" ? "card-text" : cardPaymentMethodId == "amex" ? "text-[#838383]" : "text-[#838383]"} text-[20px]`}>{cardNumberDigits[index]?.padEnd(4, "*") || '****'}</span>
                        ))}
                      </div>
                    </div>
                    <div className='absolute w-[95.3%] bottom-[20px]'>
                      <div className='flex items-center justify-between px-[20px]'>
                        <span className={`text-[12px] ${cardPaymentMethodId.length > 1 && cardPaymentMethodId !== "amex" ? "card-text" : cardPaymentMethodId == "amex" ? "text-[#838383]" : "text-[#838383]"}`}>{!fullName ? "NOMBRE Y APELLIDO" : fullName}</span>
                        <span className={`text-[12px] ${cardPaymentMethodId.length > 1 && cardPaymentMethodId !== "amex" ? "card-text" : cardPaymentMethodId == "amex" ? "text-[#838383]" : "text-[#838383]"}`}>MM/AA</span>
                      </div>
                    </div>
                  </div>
                  <div className='absolute w-full h-full rounded-[5px] object-cover' style={{backfaceVisibility: 'hidden' , transform: 'rotateY(180deg)'}}>
                    <Image className='relative w-full h-full object-cover' src={cardPaymentMethodId == "visa" || cardPaymentMethodId == "debvisa" ? cardBackImageVisa : cardPaymentMethodId == "master" || cardPaymentMethodId == "debmaster" ? cardBackImageMaster : cardPaymentMethodId == "amex" ? cardBackImageAmericanExpress : cardBackImage} width={10000} height={10000} alt=''/>
                    <div className='absolute w-[95.3%] bottom-[78px] left-[200px]'>
                      <div className='flex items-center px-[20px] gap-[10px]'>
                      <span className={`${cardPaymentMethodId.length > 1 && cardPaymentMethodId !== "amex" ? "card-text" : cardPaymentMethodId == "amex" ? "text-[#838383]" : "text-[#838383]"} text-[14px]`}>{cardSecurityCode.padEnd(3, "*") || "***"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='fixed w-full h-full z-30' onClick={()=> setShowCardModal("")}></div>
    </div>
  )
}
