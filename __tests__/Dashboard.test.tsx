import Dashboard from "@/app/dashboard/page";
import { describe, it, expect, vi } from "vitest";
import { act, render } from "@testing-library/react";
import Uppy from "@uppy/core";
import path from 'path';
import fs from 'node:fs';

//prevent resize observer undefined error
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

//mock a global URL object
global.URL.createObjectURL = vi.fn();

describe("Dashboard", () => {
  const uppy = new Uppy();
  //allow only one image at a time
  uppy.setOptions({
    restrictions: {
      maxNumberOfFiles: 1,
      allowedFileTypes: [ "image/*" ],
    }
  });

  it("renders upload form", () => {
    render(<Dashboard uppy={uppy} />);
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  })

  it("should contain Uppy instance", () => {
    const { getByText } = render( <Dashboard uppy={uppy} />);
    const Uppy = getByText('Uppy')
    expect(Uppy).toBeInTheDocument();
  })

  it("should upload image", async () => {
    //mock event callback
    const onUpload = vi.fn();

    const imagePath = path.resolve(__dirname, './testImage.jpg');
    const image = fs.readFileSync(imagePath);

    render( <Dashboard uppy={uppy} /> );

    await act (async () => {
      //subscribe to upload event
      uppy.on('upload', onUpload);

      //set metadata
      uppy.setMeta({
        enhance: '2x',
        colorize: 'yes',
      })

      //upload image
      uppy.addFile({
        name: 'testImage.jpg',
        type: 'image/jpg',
        data: new File([image], 'testImage', {type: 'image/jpg'}),
      });
      await uppy.upload();
    });

    // Assert upload event to be fired
    expect(onUpload).toHaveBeenCalled();
  });
})
