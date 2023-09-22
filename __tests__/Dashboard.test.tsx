import Dashboard from "@/app/dashboard/page";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Uppy from "@uppy/core";

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
})
