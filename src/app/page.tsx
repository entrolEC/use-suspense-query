'use client';
import Link from 'next/link';
import getQueryClient from '@/app/queryclient';

export default function Home() {
  const queryClient = getQueryClient();

  const handleClick = () => {
    queryClient.clear();
  };

  return (
    <div className="w-full px-4 space-y-6">
      <button type="button" onClick={handleClick}
              className="w-full bg-blue-300 cursor-pointer hover:opacity-70 rounded-lg p-2">캐시 초기화
      </button>
      <div><span className="font-bold">사용 방법:</span> 개발자 도구(f12)에서 network탭을 열고 아래의 각 예제 페이지로 진입하여
        네트워크 요청 흐름을 확인합니다.
        <br /><span className="text-amber-400">메인으로 이동</span>을 눌러 돌아온 뒤, <span
          className="text-blue-400">캐시 초기화</span> 버튼을 누르고 다른 예제를 확인합니다.
      </div>
      <ol className="list-disc ml-10 space-y-1 text-2xl">
        <li className="underline"><Link href="/use-query">useQuery로 구현 </Link></li>
        <li className="underline"><Link href="/use-suspense-query">useSuspenseQuery로 구현 + 문제점 </Link></li>
        <li className="underline"><Link href="/use-suspense-query/solutions/1">해결 방법 #1</Link></li>
        <li className="underline"><Link href="/use-suspense-query/solutions/2">해결 방법 #2</Link></li>
        <li className="underline"><Link href="/use-suspense-query/solutions/3">해결 방법 #3</Link></li>
        <li className="underline"><Link href="/use-suspense-query/solutions/4">해결 방법 #3 + 응용</Link></li>
      </ol>
    </div>
  );
}
