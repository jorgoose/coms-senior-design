'use client'
 
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
    use: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ use }) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending} className="bg-blue-500 text-white border border-blue-500 rounded-lg px-4 py-2 m-2">
            {pending ? 'Loading...' : use}
        </button>
    );
};
  
export default SubmitButton;