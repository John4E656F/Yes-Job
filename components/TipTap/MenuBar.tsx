import React, { FC, ReactNode } from 'react';

import type { Editor } from '@tiptap/react';
import { MenuItem } from './MenuItem';
import { LuBold, LuItalic, LuStrikethrough, LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from 'react-icons/lu';
import {
  RiMarkPenLine,
  RiListUnordered,
  RiListOrdered,
  RiListCheck2,
  RiDoubleQuotesL,
  RiSeparator,
  RiTextWrap,
  RiFormatClear,
  RiArrowGoBackFill,
  RiArrowGoForwardFill,
} from 'react-icons/ri';
import { PiParagraphBold } from 'react-icons/pi';
interface MenuBarProps {
  editor: Editor | null;
}

interface MenuItemData {
  icon?: ReactNode;
  title?: string;
  action?: () => void;
  isActive?: () => boolean | null;
  type?: string;
}

export const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const items: MenuItemData[] = [
    {
      icon: <LuBold size={20} className='font-black' />,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: <LuItalic size={20} />,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: <LuStrikethrough size={20} />,
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: <RiMarkPenLine size={20} />,
      title: 'Highlight',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      type: 'divider',
    },
    {
      icon: <LuHeading1 size={20} />,
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <LuHeading2 size={20} />,
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <LuHeading3 size={20} />,
      title: 'Heading 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <LuHeading4 size={20} />,
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      isActive: () => editor.isActive('heading', { level: 4 }),
    },
    {
      icon: <PiParagraphBold size={20} />,
      title: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: <RiListUnordered size={20} />,
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: <RiListOrdered size={20} />,
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: <RiListCheck2 size={20} />,
      title: 'Task List',
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskList'),
    },
    {
      type: 'divider',
    },
    {
      icon: <RiDoubleQuotesL size={20} />,
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: <RiSeparator size={20} />,
      title: 'Horizontal Rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: <RiTextWrap size={20} />,
      title: 'Hard Break',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: <RiFormatClear size={20} />,
      title: 'Clear Format',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: <RiArrowGoBackFill size={20} />,
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <RiArrowGoForwardFill size={20} />,
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className='flex border-b w-full items-center p-2 rounded-t'>
      {items.map((item, index) => (
        <React.Fragment key={index}>{item.type === 'divider' ? <div className='divider' /> : <MenuItem {...item} />}</React.Fragment>
      ))}
    </div>
  );
};
