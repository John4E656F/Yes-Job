'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Image } from '@/components';

interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}
declare var grecaptcha: any;

const validateEmail = (email: string) => {
  // Simple email regex - you might want to use a library for this in real application
  return /\S+@\S+\.\S+/.test(email);
};

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email' && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, [name]: 'Please enter a valid email address.' }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate the form data before submitting
    if (!formData.fullName || !formData.email || !formData.message) {
      setErrors((prev) => ({
        ...prev,
        fullName: !formData.fullName ? 'Full name is required' : '',
        email: !formData.email ? 'Email is required' : '',
        message: !formData.message ? 'Message is required' : '',
      }));
      return;
    }

    // Make a POST request to the Formspark endpoint
    const response = await fetch('https://submit-form.com/PSmSObp9', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        message: formData.message,
      }),
    });
    if (response.ok) {
      setFormData({
        fullName: '',
        email: '',
        message: '',
      });
      alert('Email sent successfully!');
    } else {
      console.log(await response.text());

      alert('There was an error sending the email.');
    }
  };

  return (
    <section className='w-full flex justify-center bg-brand-lightbg py-4 md:py-8'>
      <form className='flex flex-col container py-2 gap-4' onSubmit={handleSubmit}>
        <h2 className='text-4xl font-semibold'>Contact us</h2>
        <div className='flex flex-col bg-white p-4 lg:p-5 gap-6'>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium'>Full name *</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='fullName'
              value={formData.fullName}
              onChange={handleInputChange}
              type='text'
              placeholder='John'
              required
            />
            {errors.fullName && <p className='text-red-500'>{errors.fullName}</p>}
          </div>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium'>Email address *</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              type='text'
              placeholder='Your email address'
              required
            />
            {errors.email && <p className='text-red-500'>{errors.email}</p>}
          </div>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium'>Message *</label>
            <textarea
              className='shadow appearance-none border rounded w-full h-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              placeholder='Hello'
            />
            {errors.message && <p className='text-red-500'>{errors.message}</p>}
          </div>
        </div>
        <button
          type='submit'
          className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200  '
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default ContactPage;
