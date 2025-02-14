import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  helpText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  children,
  required,
  helpText,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        
      </label>
      {children}
      {helpText && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>
      )}
    </div>
  );
};

export default FormField;