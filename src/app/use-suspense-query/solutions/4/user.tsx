'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchUsers } from '@/app/use-suspense-query/solutions/4/fetcher';


export default function Users() {
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