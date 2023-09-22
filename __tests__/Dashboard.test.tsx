import Dashboard from "@/app/dashboard/page";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

//prevent resize observer undefined error
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

describe("Dashboard", () => {
  it("renders upload form", () => {
    render(<Dashboard />);
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  })

  it("should contain Uppy instance", () => {
    const { getByText } = render( <Dashboard />);
    const uppy = getByText('Uppy')
    expect(uppy).toBeInTheDocument();
  })
})
