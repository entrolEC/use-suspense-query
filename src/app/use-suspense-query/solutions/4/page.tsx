import React, { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import getQueryClient from '@/app/queryclient';
import Products from '@/app/use-suspense-query/solutions/4/product';
import Users from '@/app/use-suspense-query/solutions/4/user';
import { ErrorFallback } from '@/app/use-suspense-query/solutions/4/fallback';
import { fetchProducts, fetchUsers } from '@/app/use-suspense-query/solutions/4/fetcher';


export default function Page() {
  // 서버에서 쿼리 클라이언트를 생성 후 쿼리 미리 가져오기(prefetch)
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({ queryKey: ['products'], queryFn: fetchProducts });
  queryClient.prefetchQuery({ queryKey: ['users'], queryFn: fetchUsers });

  // 미리 가져온 데이터를 탈수(dehydrate)
  const dehydratedState = dehydrate(queryClient);

  return (
    // HydrationBoundary에 미리 가져온 상태를 전달하여 클라이언트 쪽에서 재사용합니다.
    <div className="flex">
      <HydrationBoundary state={dehydratedState}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<div>로딩 중...</div>}>
            <Products />
            <Users />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
