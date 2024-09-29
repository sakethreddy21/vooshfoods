"use client";
import React, { useState } from 'react';
import useLogin from '@/hooks/useLogin'; // Renaming useAuth to useLogin

interface FormField {
  name: keyof FormData;
  type: string;
  placeholder: string;
  required: boolean;
}

interface FormData {
  email: string;
  password: string;
}

const formFields: FormField[] = [
  { name: 'email', type: 'email', placeholder: 'Email', required: true },
  { name: 'password', type: 'password', placeholder: 'Password', required: true },
];

interface LoginProps {
  onLoginClick: () => void;
   // Prop to handle redirecting to login
   onUserLogin :()=> void
}

const Login: React.FC<LoginProps> = ({ onLoginClick, onUserLogin }) => {
  const { login, loading, error } = useLogin(); // Using useAuth but naming it useLogin
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);

    if (success) {
      onUserLogin()
    }
  };



  return (
    <div className='flex justify-center items-center p-10'>
      <div className='max-w-[450px] sm:w-[450px] shadow-sm p-4 rounded-xl'>
        <div className='text-[30px] font-bold text-blue-600 pb-3'>Login</div>
        <div className='flex border-2 border-blue-500 justify-center items-center' style={{ borderRadius: '8px' }}>
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

            <button type="submit" disabled={loading} className='w-full bg-blue-600 p-2 text-white text-[16px]'>
              {loading ? 'logging in...' : 'Login'}
            </button>

            <div className='flex flex-row p-4'>
              <div className='font-semibold'>Dont have a Account?</div>
              <button type="button" onClick={onLoginClick} className='text-blue-400 font-semibold'>
                &nbsp;&nbsp;SignUp
              </button>
            </div>

            {error && <p className='text-red-500'>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
