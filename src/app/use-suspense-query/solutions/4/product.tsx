'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchProducts } from '@/app/use-suspense-query/solutions/4/fetcher';


export default function Products() {
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