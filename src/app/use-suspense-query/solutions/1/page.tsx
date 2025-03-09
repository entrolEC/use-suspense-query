'use client';
import React, { Suspense } from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

function fetchProducts() {
  return fetch('https://fakestoreapi.com/products').then((res) => res.json());
}

function fetchUsers() {
  return fetch('https://fakestoreapi.com/users').then((res) => res.json());
}

function ErrorFallback({ error }) {
  return <div>에러가 발생했습니다: {error.message}</div>;
}

function ProductsSuspense() {
  // useSuspenseQueries를 사용하여 두 개의 쿼리를 동시에 호출합니다.
  const results = useSuspenseQueries({
    queries: [
      {
        queryKey: ['products'],
        queryFn: fetchProducts,
      },
      {
        queryKey: ['users'],
        queryFn: fetchUsers,
      },
    ],
  });

  // 첫 번째 쿼리는 products, 두 번째 쿼리는 users에 해당합니다.
  const productsData = results[0].data;
  const usersData = results[1].data;

  return (
    <div className="flex">
      <div className="flex-1">
        <h3>상품 목록 (useSuspenseQueries)</h3>
        <div className="gap-4 flex flex-col">
          {productsData.map((product) => (
            <div key={product.id} className="border border-green-400">
              <strong>{product.title}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <h3>유저 목록 (useSuspenseQueries)</h3>
        <div className="gap-4 flex flex-col">
          {usersData.map((user) => (
            <div key={user.id} className="border border-green-400">
              <strong>{user.username}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div>로딩 중...</div>}>
        <ProductsSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Page;
