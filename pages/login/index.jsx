"use client"
import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { userContext } from '@/utils/context/userProvider';

const Login = () => {
  const { login } = useContext(userContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setSubmitting(true);

    if (formData.email === '' || formData.password === '') {
      if (formData.email === '') setEmailMessage('Ingresa tu correo');
      if (formData.password === '') setPasswordMessage('Ingresa tu contraseña');
    } else {
      try {
        await login(formData.email, formData.password);
        router.push('/user/main');
      } catch (error) {
        console.log('error login', error.code);
        setErrorMessage(
          error?.code === 'auth/user-not-found'
            ? 'Usuario no registrado'
            : error.code === 'auth/wrong-password'
            ? 'Contraseña incorrecta'
            : error.code === 'auth/invalid-login-credentials'
            ? 'Email o contraseña incorrectos'
            : 'Algo está incorrecto, intenta nuevamente'
        );
      }
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Head>
        <title>Trueque Vocacional - Entra a tu cuenta</title>
      </Head>
      <Navbar />
      <form onSubmit={handleSubmit} className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 pt-4 mt-24 lg:px-8 border w-4/5 md:w-1/2 max-w-xl mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Trueque Vocacional
          </h2>
          <p className="mt-10 text-center text-xl leading-9 tracking-tight text-gray-900">Entra a tu cuenta</p>
          <span className="text-red-600 text-lg font-semibold">{errorMessage}</span>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setEmailMessage('Ingresa tu correo');
                    } else {
                      setEmailMessage('');
                    }
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 input-padding"
                />
                <p className="text-red-600">{emailMessage}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setPasswordMessage('Please input your password!');
                    } else {
                      setPasswordMessage('');
                    }
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 input-padding"
                />
                <p className="text-red-600">{passwordMessage}</p>
              </div>
            </div>

            <div>
              <button
                disabled={submitting}
                className={`flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${
                  submitting ? 'italic text-white bg-gray-300' : ''
                }`}
                type="submit"
              >
                {submitting ? 'Revisando credenciales...' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
