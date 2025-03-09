'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

function fetchProducts() {
  return fetch('https://fakestoreapi.com/products').then(res => res.json());
}

function Page() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'], queryFn: fetchProducts,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      <h3>상품 목록 (useQuery)</h3>
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

export default Page;
