import React from 'react'
import Navbar from '@/components/Navbar'

const Nosotros = () => {
  return (
    <div className='font-sans max-w-7xl mx-auto'>
      <Navbar/>
      <h1 className='text-center font-bold text-2xl mb-24'>¡Te invito a conocer el proyecto de Trueque Vocacional!</h1>
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/p9tx4HkV7o4" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        className='mx-auto'
      ></iframe>

    </div>
  )
}

export default Nosotros