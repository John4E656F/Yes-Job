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
import { type FirstPublishFormInputs } from '@/app/[locale]/(home)/annonce/publier/firstPublishFormResolver';
import { type PublishFormInputs } from '@/app/[locale]/(home)/publier/publishFormResolver';
import { type EditFormInputs } from '@/app/[locale]/dashboard/job-listing/edit/[id]/editFormResolver';

interface FormTextAreaProps {
  register?: UseFormRegisterReturn;
  error?: any;
  isRequiredMessage?: string;
  label?: string;
  placeholder?: string;
  setFirstPublishValue?: UseFormSetValue<FirstPublishFormInputs>;
  setValue?: UseFormSetValue<PublishFormInputs>;
  setDashboardValue?: UseFormSetValue<EditFormInputs>;
  isDashboard: boolean;
  editable: boolean;
  content?: string;
}

export const Tiptap = ({
  register,
  error,
  isRequiredMessage,
  label,
  placeholder,
  setFirstPublishValue,
  setValue,
  setDashboardValue,
  isDashboard,
  editable,
  content,
}: FormTextAreaProps) => {
  const editor = useEditor({
    editable: editable,
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
        class: `rounded-md border-hidden focus:outline-none ${editable && 'h-96'}`,
      },
    },
    content: content ? content : '',
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      if (editable) {
        if (isDashboard && setDashboardValue) {
          setDashboardValue('description', htmlContent);
        } else if (setFirstPublishValue) {
          setFirstPublishValue('description', htmlContent);
        } else if (setValue) {
          setValue('description', htmlContent);
        }
      }
    },
  });

  let errorMessage = 'Description is required';

  return (
    <div>
      {editable ? (
        <>
          {label && <FormLabel htmlFor={`input${label}`} labelText={label} />}
          <div className='h-auto  flex-col border rounded shadow appearance-none '>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className='flex-auto overflow-x-hidden overflow-y-auto py-5 px-4 h-auto min-h-96' />
          </div>
        </>
      ) : (
        <div>
          <EditorContent editor={editor} className='flex-auto overflow-y-auto' />
        </div>
      )}
      {error && <InputError error={{ message: errorMessage }} />}
    </div>
  );
};
