'use client';
import React, { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchProducts, fetchUsers } from '@/app/use-suspense-query/solutions/4/fetcher';

// 에러 발생 시 보여줄 컴포넌트
function ErrorFallback({ error }) {
  return <div>에러가 발생했습니다: {error.message}</div>;
}

function ProductsSuspense() {
  const { data: productsData } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <div className="flex">
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
      <Suspense fallback={<div>로딩 중...</div>}>
        <UserSuspense />
      </Suspense>
    </div>
  );
}

function UserSuspense() {
  const { data: usersData } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <div className="flex-1">
      <h3>유저 목록 (useSuspenseQuery)</h3>
      <div className="gap-4 flex flex-col">
        {usersData.map((users) => (
          <div key={users.id} className="border border-green-400">
            <strong>{users.username}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function Page() {
  return (
    // Suspense와 ErrorBoundary로 감싸주어 로딩과 에러 처리를 위임합니다.
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div>로딩 중...</div>}>
        <ProductsSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Page;
