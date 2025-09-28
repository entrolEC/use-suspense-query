'use client';
import Link from 'next/link';
import getQueryClient from '@/app/queryclient';

export default function Home() {
  const queryClient = getQueryClient();

  const handleClick = () => {
    queryClient.clear();
  };

  return (
    <div className="w-full">
      <ol className="list-disc ml-10 space-y-1 text-2xl">
        <li className="underline"><Link href="/use-query">useQuery로 구현 </Link></li>
        <li className="underline"><Link href="/use-suspense-query">useSuspenseQuery로 구현 + 문제점 </Link></li>
        <li className="underline"><Link href="/use-suspense-query/solutions/1">해결 방법 #1</Link></li>
        <li className="underline"><Link href="/use-suspense-query/solutions/2">해결 방법 #2</Link></li>
        <li className="underline"><Link href="/use-suspense-query/solutions/3">해결 방법 #3</Link></li>
        <li className="underline"><Link href="/use-suspense-query/solutions/4">해결 방법 #3 + 응용</Link></li>
      </ol>
      <button type="button" onClick={handleClick}
              className="bg-blue-400 cursor-pointer active:opacity-70 mt-10 ml-10">캐시 초기화
      </button>
    </div>
  );
}
