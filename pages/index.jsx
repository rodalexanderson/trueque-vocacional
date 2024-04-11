import React from 'react';
import Link from 'next/link'
import Navbar from '@/components/Navbar';

export default function Home() {

  return (
    <main className='font-sans max-w-7xl mx-auto'>
      <Navbar />
      <main className="container mx-auto py-12 px-10">
        <section className="mb-16">
          <p className="text-xl mb-4">
            Esta App. es para que pruebes cómo transferir "Puntos" (que llamamos 'Talentos') de celular a celular.
          </p>
          <p className="text-xl mb-4">
            Es un simulacro, sin efecto real alguno.
          </p>
        </section>

          <div className='text-center'>
            <Link href="/signup" className='text-4xl text-blue-500 font-bold'>
                Regístrate Ahora
            </Link>
          </div>

      </main>
    </main>
  );
}

