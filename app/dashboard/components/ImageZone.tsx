'use client'

import Uppy from '@uppy/core'
import XHR from '@uppy/xhr-upload'
import { Dashboard } from '@uppy/react'

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

import { useEffect, useState } from 'react';
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
  const [originalImage, setOriginalImage] = useState<null | string>(null);
  const [fileAdded, setFileAdded] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<null | string>(null);

  //keep track of when image is added
  useEffect(() => {
    uppy.on("file-added", () => setFileAdded(true));
    uppy.on("file-removed", () => setFileAdded(false));
  }, []);

  //add form information as meta
  async function handleUpload (data: z.infer<typeof FormSchema>) {
    if(!fileAdded) {
      uppy.info("You must upload image", "error");
      return;
    }
    uppy.setMeta(data);
    uppy.upload();
  }

  return (
    <main className='flex flex-col w-screen h-screen justify-items-center items-center p-7 gap-4'>
      <section>
        { !originalImage && <Dashboard uppy={uppy} hideUploadButton width="2/3" height="2/3"/> }
      </section>
      <section className='flex-1'>
        {!uploaded && <UploadImageForm handleUpload={handleUpload} />}
      </section>
    </main>
  )
}
