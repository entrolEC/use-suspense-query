'use client';
import { ReactNode } from 'react';
import getQueryClient from '@/app/queryclient';

export default function Layout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  const handleClick = () => {
    queryClient.clear();
    window.location.reload();
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <button type="button" onClick={handleClick}
              className="rounded-lg bg-sky-200 hover:opacity-70 cursor-pointer py-2 font-medium text-gray-800">캐시초기화 &
        새로고침
      </button>
      {children}
    </div>
  );
}
