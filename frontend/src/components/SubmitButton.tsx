'use client'
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  use: string;
  customStyles?: {
    default: string;
    hover: string;
    pending: string;
  };
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ use, customStyles }) => {
  const { pending } = useFormStatus();

  const defaultStyles = customStyles?.default || 'bg-blue-500 text-white border border-blue-500 rounded-lg px-4 py-2 m-2';
  const hoverStyles = customStyles?.hover || '';
  const pendingStyles = customStyles?.pending || 'bg-blue-500 text-white border border-blue-500 rounded-lg px-4 py-2 m-2';

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className={`${defaultStyles} ${pending ? pendingStyles : hoverStyles}`}
    >
      {pending ? 'Loading...' : use}
    </button>
  );
};

export default SubmitButton;