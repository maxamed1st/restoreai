import Dashboard from "@/dashboard/page";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";

//prevent resize observer undefined error
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

window.URL.createObjectURL = vi.fn();

describe("Dashboard", () => {
  it("renders upload form", () => {
    render(<Dashboard />);
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  })

  it('has default values', () => {
    const { container } = render(<Dashboard />);
    const enhance = container.querySelector('input[value="none"]') as HTMLInputElement;
    const colorize = container.querySelector('input[value=no]') as HTMLInputElement;

    expect(enhance.checked).toBe(true);
    expect(colorize.checked).toBe(true);
  })

  it("should contain Uppy instance", () => {
    const { getByText } = render( <Dashboard />);
    const uppy = getByText('Uppy')
    expect(uppy).toBeInTheDocument();
  })

  it('uploads an image', async () => {
    /* test upload functionality */

    /* set up variables */
    const { container } = render(<Dashboard />);
    const uploadInput = container.querySelector('input[type=file]') as HTMLInputElement;
    const submitButton = container.querySelector('button[type=submit]') as HTMLButtonElement;
    const enhance = container.querySelector('input[value="2"]') as HTMLInputElement;
    const colorize = container.querySelector('input[value=yes]') as HTMLInputElement;

    //assert the input fields not to be undefined
    expect(enhance).not.toBeUndefined();
    expect(colorize).not.toBeUndefined();
    expect(uploadInput).not.toBeUndefined();
    expect(submitButton).not.toBeUndefined();

    /* upload image */

    //assert upload input and submit button are in the document
    expect(uploadInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    
    //assert submit button and upload input are of type submit and file respectively
    expect(uploadInput.type).toBe('file');
    expect(submitButton.type).toBe('submit');
    
    //upload the image with fireEvent.change
    await waitFor( () => {
      fireEvent.change(uploadInput, { 
        target: { files: [new File(['(⌐□_□)'], 'test.png', { type: 'image/png' })] }
      });
      expect(uploadInput.files).toHaveLength(1);
    });

    /* select enhance factor and colorize */

    //assert enhance and colorize are in the document and of type radio
    expect(enhance).toBeInTheDocument();
    expect(colorize).toBeInTheDocument();
    expect(enhance.type).toBe('radio');
    expect(colorize.type).toBe('radio');

    //check enhance and colorize
    await waitFor( () => {
      enhance.checked = true;
      colorize.checked = true;

      //assert enhance and colorize are checked
      expect(enhance.checked).toBe(true);
      expect(colorize.checked).toBe(true);
    });


    /* submit form with image */
    await waitFor( () => {
      submitButton.click();
    });

    //assert image to be in the document
    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
  });
});
