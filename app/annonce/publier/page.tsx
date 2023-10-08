'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { BiUpload } from 'react-icons/bi';
import type { FormData } from '@/types';
import { Image } from '@/components';
import { supabase } from '@/supabase/supabase';
import { v4 as uuidv4 } from 'uuid';
import { getOrCreateCompanyId } from '@/utils/getOrCreateCompanyId';

const page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    logo: '',
    title: '',
    jobFunction: '',
    cdd: false,
    cdi: false,
    fullTime: false,
    partTime: false,
    experience: false,
    description: '',
    location: '',
    salaryMin: null,
    salaryMax: null,
    applicationMethod: 'yesJob',
    externalFormURL: '',
    contactName: '',
    contactEmail: '',
  });

  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [isExternalFormURLValid, setIsExternalFormURLValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const selectedFile = fileInput.files?.[0];

      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({ ...formData, logo: selectedFile });
          setLogoPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }
    } else if (type === 'checkbox') {
      const checkboxInput = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checkboxInput.checked });
    } else if (type === 'radio') {
      if (name === 'noExperienceRequired') {
        // For "Pas d'expérience requise" radio button
        setFormData({ ...formData, experience: false });
      } else if (name === 'experienceRequired') {
        // For "Expérience requise" radio button
        setFormData({ ...formData, experience: true });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      if (name === 'salaryMin' || name === 'salaryMax') {
        const newValue = parseInt(value, 10);
        if (!isNaN(newValue) && newValue >= 0) {
          setFormData({ ...formData, [name]: newValue });
        } else {
          // Handle invalid input (e.g., show an error message)
        }
      } else {
        setFormData({ ...formData, [name]: value });

        if (name === 'externalFormURL') {
          const urlPattern = /^((https?:\/\/)?(www\.)?)?[^\/]+[a-z]{2,}(\.[a-z]{2,})?(\/.*)?$/i;
          setIsExternalFormURLValid(urlPattern.test(value));
        }

        if (name === 'contactEmail') {
          const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          setIsEmailValid(emailPattern.test(value));
        }
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    if (formData.logo instanceof File) {
      const fileExtension = formData.logo.name.split('.').pop();
      const filename = `${uuidv4()}.${fileExtension}`;

      try {
        // Upload the logo to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage.from('logo').upload(filename, formData.logo, {
          cacheControl: '3600',
          upsert: false,
        });

        if (uploadError) {
          console.error('Error uploading logo:', uploadError.message);
          return;
        }

        const { data: publicUrlData } = await supabase.storage.from('logo').getPublicUrl(uploadData.path, { transform: { width: 50, height: 50 } });

        console.log(uploadData);

        const publicUrl = publicUrlData.publicUrl;

        // Update the form data with the uploaded logo path
        formData.logo = publicUrl;
      } catch (uploadError: any) {
        console.error('An error occurred while uploading the logo:', uploadError.message);
        return;
      }
    }

    try {
      const companyId = await getOrCreateCompanyId(formData.companyName, formData.contactEmail, formData.logo, formData.contactName);

      const { data: insertData, error: insertError } = await supabase.from('jobPosting').insert({
        companyId: companyId,
        title: formData.title,
        jobFunction: formData.jobFunction,
        cdd: formData.cdd,
        cdi: formData.cdi,
        fullTime: formData.fullTime,
        partTime: formData.partTime,
        description: formData.description,
        experience: formData.experience,
        location: formData.location,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
        applicationMethod: formData.applicationMethod,
        externalFormURL: formData.externalFormURL,
      });

      if (insertError) {
        console.error('Error inserting job posting:', insertError.message);
        return;
      }

      console.log('Form data submitted successfully:', insertData);
    } catch (error: any) {
      console.error('An error occurred:', error.message);
    }

    setFormData({
      companyName: '',
      logo: null,
      title: '',
      jobFunction: '',
      cdd: false,
      cdi: false,
      fullTime: false,
      partTime: false,
      experience: false,
      description: '',
      location: '',
      salaryMin: null,
      salaryMax: null,
      applicationMethod: 'yesJob',
      externalFormURL: '',
      contactName: '',
      contactEmail: '',
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <header className='w-full flex justify-center bg-brand-lightbg'>
      <form className='flex flex-col container py-4 md:py-16 gap-16' onSubmit={handleSubmit}>
        <h2 className='text-4xl font-semibold'>Créer une annonce</h2>
        <div className='flex flex-col bg-white p-4 lg:p-8 gap-6'>
          <h3 className='text-2xl font-semibold'>Informations sur l'entreprise</h3>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium'>Nom de l'entreprise *</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='companyName'
              value={formData.companyName}
              onChange={handleInputChange}
              type='text'
              placeholder='Quick, McDonald ...'
              required
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium'>Logo de l'entreprise</label>
            <div className='flex flex-col items-center justify-center w-full gap-4'>
              {logoPreviewUrl ? (
                <Image src={logoPreviewUrl} alt='Logo Preview' className='w-24 h-24 p-1 object-contain bg-blue-200 rounded-xl' />
              ) : (
                <div className='w-24 h-24 bg-blue-200 rounded-xl' />
              )}
              <label
                htmlFor='logo'
                className='flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <BiUpload />
                  <p className='mb-2 text-sm  text-gray-500'>
                    <span className='font-semibold'>Click to upload</span> or drag and drop
                  </p>
                  <p className='text-xs text-gray-500'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id='logo' name='logo' onChange={handleInputChange} type='file' className='hidden' />
              </label>
            </div>
          </div>
          <div className='w-full h-px bg-slate-300 rounded' />
          <h2 className='text-2xl font-semibold'>Créer une annonce</h2>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium'>Titre de l'annonce *</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              type='text'
              placeholder='Employé polyvalent en restauration H/F'
              required
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium'>Fonction *</label>
            <select
              className='shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-500  focus:outline-none focus:shadow-outline'
              name='jobFunction'
              value={formData.jobFunction}
              onChange={handleInputChange}
              placeholder='Employé polyvalent en restauration H/F'
              required
            >
              <option value='' disabled>
                Sélectionner une fonction
              </option>
              <option value='waiter'>Serveur(se)</option>
              <option value='cook'>Cuisinier</option>
              <option value='chefCook'>Cuisinier</option>
              <option value='bartender'>Barman/barmaid</option>
              <option value='dishwasher'>Plongeur(se)</option>
              <option value='shiftLeader'>Shift Leader</option>
              <option value='cleaningStaff'>Personnel de nettoyage</option>
              <option value='Restaurant Manager'>Gérant de restaurant</option>
              <option value='hotelReceptionist'>Réceptionniste d'hôtel</option>
              <option value='hotelManager'>Gérant d'hôtel</option>
              <option value='maitredHotel'>Maître d'hôtel</option>
              <option value='pastryChef'>Chef pâtissier</option>
              <option value='deliveryDriver'>Livreur</option>
              <option value='other'>Autre</option>
            </select>
          </div>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col gap-3'>
              <label className='text-lg font-medium'>Durée du contrat</label>
              <div className='flex flex-row gap-8 justify-evenly '>
                <div className='flex mb-4 '>
                  <input
                    className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                    name='cdd'
                    checked={formData.cdd}
                    onChange={handleInputChange}
                    type='checkbox'
                    placeholder='Employé polyvalent en restauration H/F'
                  />
                  <label htmlFor='default-checkbox' className='ml-2 text-sm text-gray-900 '>
                    <p className='font-medium'>CDD</p>
                    <p className='text-gray-600'>Contrat du Déterminée</p>
                  </label>
                </div>
                <div className='flex mb-4'>
                  <input
                    className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                    name='cdi'
                    checked={formData.cdi}
                    onChange={handleInputChange}
                    type='checkbox'
                    placeholder='Employé polyvalent en restauration H/F'
                  />
                  <label htmlFor='default-checkbox' className='ml-2 text-sm text-gray-900 '>
                    <p className='font-medium'>CDI</p>
                    <p className='text-gray-600'>Contrat du Indéterminée</p>
                  </label>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <label className='text-lg font-medium'>Durée du travail</label>
              <div className='flex flex-row gap-8 justify-evenly'>
                <div className='flex  mb-4'>
                  <input
                    className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                    name='fullTime'
                    checked={formData.fullTime}
                    onChange={handleInputChange}
                    type='checkbox'
                    placeholder='Employé polyvalent en restauration H/F'
                  />
                  <label htmlFor='default-checkbox' className='ml-2 text-sm font-medium text-gray-900 '>
                    Temp Plein
                  </label>
                </div>
                <div className='flex  mb-4'>
                  <input
                    className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                    name='partTime'
                    checked={formData.partTime}
                    onChange={handleInputChange}
                    type='checkbox'
                    placeholder='Employé polyvalent en restauration H/F'
                  />
                  <label htmlFor='default-checkbox' className='ml-2 text-sm font-medium text-gray-900 '>
                    Temp Partial
                  </label>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <label className='text-lg font-medium'>Expérience</label>
              <div className='flex flex-row gap-8 justify-evenly '>
                <div className='flex mb-4 '>
                  <input
                    className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                    name='noExperienceRequired'
                    checked={!formData.experience}
                    onChange={handleInputChange}
                    type='radio'
                    placeholder="Pas d'expérience requise"
                  />
                  <label htmlFor='default-checkbox' className='ml-2 text-sm text-gray-900 '>
                    <p className='font-medium'>Pas d'expérience requise</p>
                  </label>
                </div>
                <div className='flex mb-4'>
                  <input
                    className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                    name='experienceRequired'
                    checked={formData.experience}
                    onChange={handleInputChange}
                    type='radio'
                    placeholder='Expérience requise'
                  />
                  <label htmlFor='default-checkbox' className='ml-2 text-sm text-gray-900 '>
                    <p className='font-medium'>Expérience requise</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 w-full'>
            <label className='text-lg font-medium'>Salaire</label>
            <div className='flex flex-row gap-3 justify-between'>
              <div className='flex items-center gap-2 w-full'>
                <h6 className='text-sm'>De</h6>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='salaryMin'
                  value={formData.salaryMin !== null ? formData.salaryMin : 0}
                  onChange={handleInputChange}
                  type='number'
                  placeholder='Salaire Gross Minimun'
                  required
                />
              </div>
              <div className='flex items-center gap-2 w-full'>
                <h6 className='text-sm'>À</h6>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='salaryMax'
                  value={formData.salaryMax !== null ? formData.salaryMax : 0}
                  onChange={handleInputChange}
                  type='number'
                  placeholder='Salaire Gross Maximum'
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium'>Description de l'emploi *</label>
            <textarea
              className='shadow appearance-none border rounded w-full h-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              placeholder="En tant que caissier(ère) chez [Nom de l'entreprise], vous serez chargé(e) de traiter les transactions des clients de manière précise et efficace ..."
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium'>Lieu de travail *</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='location'
              value={formData.location}
              onChange={handleInputChange}
              type='text'
              placeholder="Recherche d'adresse"
              required
            />
          </div>
          <div className='w-full h-px bg-slate-300 rounded' />
          <h2 className='text-2xl font-semibold'>Application</h2>
          <h3 className='text-md'>Comment le candidat doit-il postuler pour l'offre?</h3>
          <div className='flex mb-4'>
            <input
              className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
              name='applicationMethod'
              value='yesJob'
              checked={formData.applicationMethod === 'yesJob'}
              onChange={handleInputChange}
              type='radio'
              placeholder='Employé polyvalent en restauration H/F'
            />
            <div className='flex flex-col'>
              <label htmlFor='default-checkbox' className='ml-2 text-sm font-medium text-gray-900 '>
                Application par Yes Job
              </label>
              <h5 className='text-xs pl-2'>Vous recevrez une notification des nouvelles applications par e-mail</h5>
            </div>
          </div>
          <div className='flex flex-col mb-4'>
            <div className='flex '>
              <input
                className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                name='applicationMethod'
                value='externalForm'
                checked={formData.applicationMethod === 'externalForm'}
                onChange={handleInputChange}
                type='radio'
              />
              <div className='flex flex-col'>
                <label htmlFor='default-checkbox' className='ml-2 text-sm font-medium text-gray-900 '>
                  Rediriger vers un formulaire externe
                </label>
                <h5 className='text-xs pl-2'>Le candidat sera redirigé vers l'extérieur que vous spécifiez</h5>
              </div>
            </div>
            {formData.applicationMethod === 'externalForm' && (
              <>
                <input
                  className='mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='externalFormURL'
                  value={formData.externalFormURL}
                  onChange={handleInputChange}
                  type='text'
                  placeholder='External Form url'
                  required
                />
                {!isExternalFormURLValid && <p className='text-red-500 text-sm'>Veuillez entrer une URL valide.</p>}
              </>
            )}
          </div>
          <div className='flex flex-col mb-4'>
            <div className='flex '>
              <input
                className='w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                name='applicationMethod'
                value='both'
                checked={formData.applicationMethod === 'both'}
                onChange={handleInputChange}
                type='radio'
                placeholder='Employé polyvalent en restauration H/F'
              />
              <div className='flex flex-col'>
                <label htmlFor='default-checkbox' className='ml-2 text-sm font-medium text-gray-900 '>
                  Application par Yes Job et un formulaire externe
                </label>
                <h5 className='text-xs pl-2'>
                  Le candidat peut envoyer sa candidature via Yes Job ou vous pouvez le rediriger vers un formulaire externe.
                </h5>
              </div>
            </div>
            {formData.applicationMethod === 'both' && (
              <>
                <input
                  className='mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='externalFormURL'
                  value={formData.externalFormURL}
                  onChange={handleInputChange}
                  type='text'
                  placeholder='External Form url'
                  required
                />
                {!isExternalFormURLValid && <p className='text-red-500 text-sm'>Veuillez entrer une URL valide.</p>}
              </>
            )}
          </div>
          <div className='w-full h-px bg-slate-300 rounded' />
          <h2 className='text-2xl font-semibold'>Coordonnées</h2>
          <h3 className='text-md '>Ces données sont uniquement à vous contacter en cas d'annonce de questions. Ils ne seront affichés nulle part.</h3>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium'>Nom et prénom *</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='contactName'
              value={formData.contactName}
              onChange={handleInputChange}
              type='text'
              placeholder='Lenny De Wolf'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium'>Adres e-mail *</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              name='contactEmail'
              value={formData.contactEmail}
              onChange={handleInputChange}
              type='text'
              placeholder='recrument@mcdonalds.be'
            />
            {!isEmailValid && <p className='text-red-500 text-sm'>Veuillez entrer une adresse e-mail valide.</p>}
          </div>
        </div>
        <button
          type='submit'
          className='w-full md:block md:w-auto items-center px-4 h-11 justify-center text-sm bg-brand-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200  '
        >
          Publier votre annonce gratuitement
        </button>
      </form>
    </header>
  );
};

export default page;
