'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">404 • דף לא נמצא</h1>
      <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">מצטערים, לא מצאנו את הדף שחיפשת.</p>
      <div className="flex gap-4">
        <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          חזרה לדף הבית
        </Link>
        <Link href="/blog" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
          מעבר לבלוג
        </Link>
      </div>
    </main>
  );
} 