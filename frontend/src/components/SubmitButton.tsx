'use client'
 
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
    use: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ use }) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending}>
        {pending ? 'Loading...' : use}
        </button>
    );
};
  
export default SubmitButton;