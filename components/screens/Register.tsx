"use client"
import React, { useState } from 'react';
import { useRegister } from '@/hooks/useRegister';

interface FormField {
  name: keyof FormData; 
  type: string;
  placeholder: string;
  required: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const formFields: FormField[] = [
  { name: 'firstName', type: 'text', placeholder: 'First Name', required: true },
  { name: 'lastName', type: 'text', placeholder: 'Last Name', required: true },
  { name: 'email', type: 'email', placeholder: 'Email', required: true },
  { name: 'password', type: 'password', placeholder: 'Password', required: true },
  { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password', required: true },
];

interface RegisterProps {
  onLoginClick: () => void; // Prop to handle redirecting to login
}

const Register: React.FC<RegisterProps> = ({ onLoginClick }) => {
  const { register, loading, error, success } = useRegister();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className='flex justify-center items-center p-10'>
      <div className='max-w-[450px] sm:w-[450px] shadow-sm p-4 rounded-xl'>
        <div className='text-[30px] font-bold text-blue-600 pb-3'>SignUp</div>
        <div className='flex border-2 border-blue-500 justify-center items-center' style={{borderRadius:'8px'}}>
          <form className='flex flex-col p-4 w-full justify-center items-center' onSubmit={handleSubmit}>
            {formFields.map(({ name, type, placeholder, required }) => (
              <input
                key={name}
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                className='border-[2px] w-full border-gray-300 p-1 my-2'
              />
            ))}

            <button type="submit" disabled={loading} className='w-full bg-blue-600 p-2 text-white text-[16px] '>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>

            <div className='flex flex-row p-4'>
              <div className='font-semibold'>
                Already have an account?
              </div>
              <button type="button" onClick={onLoginClick} className='text-blue-400 font-semibold'>
                &nbsp;&nbsp;Login
              </button>
            </div>

            {error && <p>{error}</p>}
            {success && <p>Registration successful!</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
