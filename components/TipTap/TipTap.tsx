'use client';

import { useEditor, EditorContent } from '@tiptap/react';
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
  const { onBlur, name, ref } = register;
  // console.log(name);

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
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      setValue('description', htmlContent);
      // onBlur(name);
      console.log(htmlContent);

      console.log(editor.getJSON());
    },
  });

  // useEffect(() => {
  //   onBlur(name);
  // }, [onBlur, name]);

  return (
    <div>
      <FormLabel htmlFor={`input${label}`} labelText={label} />
      <div className='bg-red-100 h-full max-h-96 flex-col border rounded shadow appearance-none '>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className='flex-auto overflow-x-hidden overflow-y-auto py-5 px-4 ' />
      </div>
    </div>
  );
};
