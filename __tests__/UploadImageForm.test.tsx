import UploadImageForm from "@/dashboard/components/uploadImageForm";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

describe("UploadImageForm", () => {
  const handleSubmit = vi.fn();

  it('has default values', () => {
    const { container } = render(<UploadImageForm handleUpload={handleSubmit} />);
    const enhance = container.querySelector('input[value="none"]') as HTMLInputElement;
    const colorize = container.querySelector('input[value=no]') as HTMLInputElement;

    expect(enhance.checked).toBe(true);
    expect(colorize.checked).toBe(true);
  });
});
