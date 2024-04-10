import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='my-8'>
      <div className='flex flex-row justify-center font-sans max-w-7xl mx-auto'>
          <div className='sm:mr-24 md:mr-0'>
              <nav className='flex flex-row justify-center text-md md:text-lg font-sans1 font-light '>
                  <Link className='mx-2 hover:font-bold ' href="/">Home</Link>
                  <Link className='mx-2 hover:font-bold ' href="/nosotros">Nosotros</Link>
              </nav>
          </div>
          <div className='flex flex-row justify-around ml-6 lg:ml-24'>
          <Link href="/signup" className='text-md md:text-lg font-sans1 font-light my-auto mb-4 hover:font-bold mr-8'>Crea tu cuenta</Link>
          <Link href="/login" className='text-md md:text-lg font-sans1 font-light my-auto mb-4 hover:font-bold'>Entrar</Link>
          </div>
      </div>
      <hr />
    </nav>
  )
}

export default Navbar