import React from 'react'

interface CurrencyFormatProps {
    price: number;
    format: string;
    className: string;
}
const CurrencyFormat: React.FC<CurrencyFormatProps> = ({price, format, className}) => {
  return (
    <span className={className}>${new Intl.NumberFormat(format).format(price)}</span>
  )
}


export default CurrencyFormat;