'use client';
import React, { Suspense, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import getQueryClient from '@/app/queryclient';

function fetchProducts() {
  return fetch('https://fakestoreapi.com/products').then((res) => res.json());
}

async function fetchUsers() {
  // await delay(2000);
  return fetch('https://fakestoreapi.com/users').then((res) => res.json());
}

// 에러 발생 시 보여줄 컴포넌트
function ErrorFallback({ error }) {
  return <div>에러가 발생했습니다: {error.message}</div>;
}

function Products() {
  const { data: productsData } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <div className="flex-1">
      <h3>상품 목록 (useSuspenseQuery)</h3>
      <div className="gap-4 flex flex-col">
        {productsData.map((product) => (
          <div key={product.id} className="border border-green-400">
            <strong>{product.title}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function Users() {
  const { data: usersData } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <div className="flex-1">
      <h3>유저 목록 (useSuspenseQuery)</h3>
      <div className="gap-4 flex flex-col">
        {usersData.map((user) => (
          <div key={user.id} className="border border-green-400">
            <strong>{user.username}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function Page() {
  const queryClient = getQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({ queryKey: ['products'], queryFn: fetchProducts });
    queryClient.prefetchQuery({ queryKey: ['users'], queryFn: fetchUsers });
  }, [queryClient]);

  return (
    <div className="flex">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>로딩 중...</div>}>
          <Products />
          <Users />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default Page;
