import Dashboard from "@/app/dashboard/page";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Uppy from "@uppy/core";
import XHR from '@uppy/xhr-upload'

//prevent resize observer undefined error
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

describe("Dashboard", () => {
  const uppy = new Uppy().use(XHR, {endpoint: "/api/upload"});
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
})
