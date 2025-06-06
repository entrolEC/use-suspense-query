'use client';
import React, { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

function fetchProducts() {
  return fetch('https://fakestoreapi.com/products').then((res) => res.json());
}

function fetchUsers() {
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
  return (
    <div className="flex">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>상품 로딩 중...</div>}>
          <Products />
        </Suspense>
        <Suspense fallback={<div>유저 로딩 중...</div>}>
          <Users />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default Page;
