'use client'

import Uppy from '@uppy/core'
import XHR from '@uppy/xhr-upload'
import { Dashboard } from '@uppy/react'

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

import { useEffect, useRef, useState } from 'react';
import UploadImageForm from './uploadImageForm';
import { formType } from './uploadImageForm';
import { SubmitHandler } from 'react-hook-form';

const uppy = new Uppy().use(XHR, {endpoint: "/restore/upload"});
//allow only one image at a time
uppy.setOptions({
  restrictions: {
    maxNumberOfFiles: 1,
    allowedFileTypes: [ "image/*" ],
  }
});

export default function Upload() {
  const [originalImage, setOriginalImage] = useState<null | any>(null);
  const [fileAdded, setFileAdded] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const originalImageContainerRef = useRef<null | HTMLElement>(null);
  const restoredImageContainerRef = useRef<null | HTMLElement>(null);

  //keep track of when image is added
  useEffect(() => {
    uppy.on("file-added", (file) => {
      setFileAdded(true)
      setOriginalImage(file);
    });
    uppy.on("file-removed", () => {
      setFileAdded(false);
    });
  }, []);

  //add form information as meta
  const handleUpload: SubmitHandler<formType> = (data) => {
    if(!fileAdded) {
      uppy.info("You must upload image", "error");
      return;
    }
    uppy.setMeta(data);
    uppy.upload();
    previewImage(originalImage, originalImageContainerRef);
    previewImage(originalImage, restoredImageContainerRef); //placeholder for the restored image for now
    setUploaded(true);
  }

  return (
    <main className='flex h-screen justify-center items-center p-7 gap-4'>
      { !uploaded && 
      <>
        <section className='max-w-[600px] max-h-[600px]'>
          <Dashboard 
            uppy={uppy} 
            hideUploadButton
            /> 
        </section>
        <section className='max-w-[600px] max-h-[600px]'>
          <UploadImageForm handleUpload={handleUpload} />
        </section>
      </>
      }
      { uploaded &&
        <>
          <section ref={originalImageContainerRef} className='max-w-[600px] max-h-[600px]'></section>
          <section ref={restoredImageContainerRef} className='max-w-[600px] max-h-[600px]'></section>
        </>
      }
    </main>
  )
}

function previewImage(image: any, ref:any) {
  const reader = new FileReader();

  reader.onload = function(e: any) {
    const img = document.createElement("img");
    img.src = e.target.result;
    img.alt = image.name;
    img.classList.add('max-w-[600px]',  'max-h-[600px]')
    ref.current.appendChild(img);
  };

  reader.readAsDataURL(image.data);
}
