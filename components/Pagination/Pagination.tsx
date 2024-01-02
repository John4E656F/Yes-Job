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
    <div className='pagination-container'>
      {pages.map((page) => (
        <button key={page} className={`page-item ${page === current ? 'active' : ''}`} onClick={() => onChange(page)}>
          {page}
        </button>
      ))}
    </div>
  );
}
