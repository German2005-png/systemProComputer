import React from 'react'

interface ContentProps {
    children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({children}) => {
    return(
        <main className='w-full max-w-[1366px] mx-auto content-query py-2 px-8 relative'>
            {children}
        </main>
    )
}

export default Content;
