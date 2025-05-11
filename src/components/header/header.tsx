import React from 'react';

import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface HeaderProps {
  image: StaticImport;
  height: string;
}

const Header: React.FC<HeaderProps> = ({image, height}) => {
  return (
    <header className={`flex w-full h-[${height}] object-cover`}>
        <Image className='m-0 object-cover' src={image} width={1440} height={438} alt=''/>
    </header>
  )
}

export default Header;