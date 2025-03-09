'use client';


export function ErrorFallback({ error }) {
  return <div>에러가 발생했습니다: {error.message}</div>;
}