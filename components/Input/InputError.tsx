import { HiOutlineExclamationCircle } from 'react-icons/hi';

type InputErrorProps = {
  error: {
    message?: string;
  };
};

export function InputError({ error }: InputErrorProps) {
  if (!error || !error.message) {
    return null;
  }

  return (
    <span className='flex pt-2 italic items-center gap-1 text-red-500'>
      <HiOutlineExclamationCircle size={20} />
      {error.message}
    </span>
  );
}
