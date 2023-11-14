'use client';

import './Tiptap.css';
import { useEditor, EditorContent } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { MenuBar } from './MenuBar';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { FormLabel, InputError } from '@/components';
import { type PublishFormInputs } from '@/app/[locale]/annonce/publier/publishFormResolver';

interface FormTextAreaProps {
  register: UseFormRegisterReturn;
  error: any;
  isRequiredMessage?: string;
  label: string;
  placeholder?: string;
  setValue: UseFormSetValue<PublishFormInputs>;
}

export const Tiptap = ({ register, error, isRequiredMessage, label, placeholder, setValue }: FormTextAreaProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: placeholder,
      }),
      Highlight,
      TaskList,
      TaskItem,
    ],
    editorProps: {
      attributes: {
        class: 'rounded-md border-hidden focus:outline-none h-96',
      },
    },
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      setValue('description', htmlContent);
      console.log(htmlContent);

      console.log(editor.getJSON());
    },
  });

  return (
    <div className=''>
      <FormLabel htmlFor={`input${label}`} labelText={label} />
      <div className='h-auto  flex-col border rounded shadow appearance-none '>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className='flex-auto overflow-x-hidden overflow-y-auto py-5 px-4 h-auto min-h-96' />
      </div>
    </div>
  );
};
