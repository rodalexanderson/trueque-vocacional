import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {

  return (
    <main className='font-sans max-w-7xl mx-auto'>
      <Navbar />
      <h1 className='text-5xl text-center tracking-wider'>Bienvenido a la app de prueba de Trueque Vocacional</h1>
      <main className="container mx-auto py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">¿Qué es nuestra app?</h2>
          <p className="text-xl mb-4">
            Nuestra aplicación está diseñada para crear oportunidades para todos, permitiendo a las personas acceder a servicios a través de una moneda digital llamada "talentos".
          </p>
          <p className="text-xl mb-4">
            Con 50 talentos iniciales al abrir una cuenta, los usuarios pueden intercambiar estos talentos por diversos servicios ofrecidos por profesionales en la comunidad.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">¿Qué son los Talentos?</h2>
          <p className="text-xl mb-4">Los talentos será nuestra forma de darle valor a estas habilidades y nuestra vocación, sin que el dinero físico nos limite.</p>
          <p className="text-xl mb-4">
            Por ejemplo, un programador podría cobrar 3 talentos por una clase de programación, mientras que un músico podría cobrar 2 talentos por una clase de música.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Beneficios de Nuestra App</h2>
          <ul className="list-disc list-inside text-xl mb-4">
            <li>Acceso a servicios asequibles.</li>
            <li>Oportunidad para mostrar y compartir tus habilidades y talentos.</li>
            <li>Fomenta la economía colaborativa y solidaria.</li>
            <li>Contribuye a la reducción de la desigualdad social.</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">¿Cómo Funciona?</h2>
          <ol className="list-decimal list-inside text-xl mb-4">
            <li>Crea una cuenta gratuita y recibe 50 talentos iniciales.</li>
            <li>Explora los servicios disponibles en la plataforma.</li>
            <li>Intercambia tus talentos por servicios de profesionales.</li>
            <li>Comparte tus propios servicios y habilidades para ganar más talentos.</li>
          </ol>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Únete a Nuestra Comunidad</h2>
          <p className="text-xl mb-4">
            No esperes más para ser parte de esta revolución social y económica. Únete a nuestra comunidad y comienza a beneficiarte de los servicios disponibles y a compartir tus propios talentos.
          </p>
          <div className='text-center'>
            <Link href="/registro" className='text-4xl text-red-500 font-bold'>
                Regístrate Ahora
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </main>
  );
}

