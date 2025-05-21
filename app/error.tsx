'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    // אפשר לוג בגוגל אנליטיקס או Sentry כאן
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">500 • שגיאת שרת</h1>
      <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">אירעה בעיה בלתי צפויה. אנא נסה שוב.</p>
      <div className="flex gap-4">
        <button
          onClick={() => router.refresh()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          נסה שוב
        </button>
        <button
          onClick={() => router.push('/')} 
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          חזור לדף הבית
        </button>
      </div>
    </main>
  );
} 