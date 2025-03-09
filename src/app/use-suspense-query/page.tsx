'use client';
import React, { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

// 데이터를 호출하는 함수
function fetchProducts() {
  return fetch('https://fakestoreapi.com/products').then(res => res.json());
}

// 에러 발생 시 보여줄 컴포넌트
function ErrorFallback({ error }) {
  return <div>에러가 발생했습니다: {error.message}</div>;
}

function ProductsSuspense() {
  const { data } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <div>
      <h3>상품 목록 (useSuspenseQuery)</h3>
      <div className="gap-4 flex flex-col">
        {data.map((product) => (
          <div key={product.id} className="border border-green-400">
            <strong>{product.title}</strong>
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
