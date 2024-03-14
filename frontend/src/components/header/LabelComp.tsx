'use client';

interface LabelProps {
    className: string;
    htmlFor: string;
    children: React.ReactNode;
    onClick: () => void;
}

const Label: React.FC<LabelProps> = ({ className, htmlFor, children, onClick }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={className}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            {children}
        </label>
    );
};

export default Label;