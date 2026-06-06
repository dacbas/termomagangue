import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

// ================= INPUT =================

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          className={`input ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

// ================= SELECT =================

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <select className={`input ${className}`} {...props}>
        <option value="">Seleccionar...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

// ================= BUTTON =================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses =
    'btn font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-95',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin" />
          <span>Cargando...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

// ================= ALERT =================

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  children,
  onClose,
}) => {
  const typeClasses = {
    success: 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800',
    info: 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800',
  };

  const textClasses = {
    success: 'text-green-800 dark:text-green-100',
    error: 'text-red-800 dark:text-red-100',
    warning: 'text-yellow-800 dark:text-yellow-100',
    info: 'text-blue-800 dark:text-blue-100',
  };

  return (
    <div className={`border rounded-lg p-4 ${typeClasses[type]}`}>
      <div className="flex justify-between items-start">
        <div className={textClasses[type]}>
          {title && <h3 className="font-bold mb-1">{title}</h3>}
          <p>{children}</p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className={`text-sm font-bold ${textClasses[type]} hover:opacity-75`}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

// ================= LOADING SPINNER =================

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 rounded-full animate-spin`}
      />
    </div>
  );
};