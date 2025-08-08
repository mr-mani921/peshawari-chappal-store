// ./Contexts/btn.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded px-4 py-2 font-medium focus:outline-none';
  const variantStyles =
    variant === 'outline'
      ? 'border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-50'
      : 'bg-blue-600 text-white hover:bg-blue-700';
  const sizeStyles =
    size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
