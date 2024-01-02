'use client';
import React from 'react';

interface PaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

export function Pagination({ total, current, onChange }: PaginationProps) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className='flex justify-center items-center space-x-1'>
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 border rounded ${
            page === current ? 'bg-blue-300 text-white' : 'bg-brand-primary text-white hover:bg-blue-500 hover:text-white'
          }`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
