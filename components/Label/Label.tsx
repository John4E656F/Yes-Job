'use client';
import React, { useState, useEffect } from 'react';
import { HiOutlineMapPin } from 'react-icons/hi2';

interface LabelProps {
  className?: string;
  text: string;
  type: string;
}
export const Label = ({ className, text, type }: LabelProps) => {
  const [bg, setBg] = useState('');

  useEffect(() => {
    if (type === 'location') {
      setBg('bg-slate-300');
    } else if (type === 'noExp') {
      setBg('bg-orange-200');
    } else {
      setBg('bg-green-300');
    }
  }, [type]);

  return (
    <div className={`${className} flex h-fit w-fit items-center justify-center gap-1 rounded px-2.5 py-1  ${bg}`}>
      {type === 'location' && <HiOutlineMapPin />}
      <p>{text}</p>
    </div>
  );
};
