'use client';

interface LabelProps {
    className: string;
    htmlFor: string;
    children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ className, htmlFor, children }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={className}
        >
            {children}
        </label>
    );
};

export default Label;