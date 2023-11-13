'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { MenuBar } from './MenuBar';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormLabel, InputError } from '@/components';

interface FormTextAreaProps {
  register: UseFormRegisterReturn;
  error: any;
  isRequiredMessage?: string;
  label: string;
  placeholder?: string;
}

export const Tiptap = ({ register, error, isRequiredMessage, label, placeholder }: FormTextAreaProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
    ],
    content: '<p>Hello World! 🌎️</p>',
  });

  return (
    <div className='bg-red-100 h-full max-h-96 flex-col border rounded shadow appearance-none '>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className='flex-auto overflow-x-hidden overflow-y-auto py-5 px-4 ' />
    </div>
  );
};
