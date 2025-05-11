'use client'
import React, { useEffect } from 'react';
import CurrencyFormat from './currencyFormat';

interface CurrencyValueProps {
    value: number[];
    index: number;
}

const CurrencyValue: React.FC<CurrencyValueProps> = ({value, index}) => {
    // reduce
    function handleMax(total: number, num: number) {
      return total + num;
    }
  return (
    <CurrencyFormat className='text-white font-medium' format='es-ES' price={value.reduce(handleMax)} key={index}/>
  )
}

export default CurrencyValue;
