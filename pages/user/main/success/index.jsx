import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';

const TransferSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/user/main');
    }, 3000); // Redirigir a UserMain después de 3 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 bg-white rounded-md shadow-md text-center w-96 mx-auto mt-24">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Talentos enviados exitosamente</h2>
      <p>Redirigiendo a <Link href="'/user/main'">página principal</Link> en unos segundos...</p>
    </div>
  );
};

export default TransferSuccess;
