'use client'

import Uppy from '@uppy/core'
import XHR from '@uppy/xhr-upload'
import { Dashboard } from '@uppy/react'

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

import { useEffect, useRef, useState } from 'react';
import UploadImageForm from './uploadImageForm';
import { FormSchema } from './uploadImageForm';
import * as z from 'zod';

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
  async function handleUpload (data: z.infer<typeof FormSchema>) {
    if(!fileAdded) {
      uppy.info("You must upload image", "error");
      return;
    }
    uppy.setMeta(data);
    uppy.upload();
    previewImage(originalImage, restoredImageContainerRef);
    setUploaded(true);
  }

  return (
    <main className='flex h-screen justify-center items-center p-7 gap-4'>
      { !uploaded && 
      <>
        <section className='w-full'>
          <Dashboard 
            uppy={uppy} 
            hideUploadButton 
            width="1/3" 
            height="1/3"
            
            /> 
        </section>
        <section className='w-full'>
          <UploadImageForm handleUpload={handleUpload} />
        </section>
      </>
      }
      { uploaded &&
        <>
          <section ref={originalImageContainerRef} className=''></section>
          <section ref={restoredImageContainerRef} className='w-full'></section>
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
    ref.current.appendChild(img);
  };

  reader.readAsDataURL(image.data);
}
