'use client';

import './Tiptap.css';
import { useEditor, EditorContent, EditorProvider } from '@tiptap/react';
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
    extensions: [StarterKit.configure(), Highlight, TaskList, TaskItem],
    content: `
  <h1>
    Hi there,
  </h1>
  <h2>
    Hi there,
  </h2>
  <h3>
  Hi there,
</h3>
  <p>
    this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
  </p>
  <ul>
    <li>
      That’s a bullet list with one …
    </li>
    <li>
      … or two list items.
    </li>
  </ul>
  <p>
    Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
  </p>
  <pre><code class="language-css">body {
  display: none;
  }</code></pre>
  <p>
    I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
  </p>
  <blockquote>
    Wow, that’s amazing. Good work, boy! 👏
    <br />
    — Mom
  </blockquote>
  `,
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      setValue('description', htmlContent);
      console.log(htmlContent);

      console.log(editor.getJSON());
    },
  });

  return (
    <div>
      <FormLabel htmlFor={`input${label}`} labelText={label} />
      <div className=' h-auto flex-col border rounded shadow appearance-none '>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className='flex-auto overflow-x-hidden overflow-y-auto py-5 px-4 ' />
      </div>
    </div>
  );
};
