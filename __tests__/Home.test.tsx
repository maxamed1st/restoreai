import Home from "../app/page";
import { expect, it, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

describe("Home component", () => {
  it("renders link to the dashboard", () => {
    render(<Home />);
    expect(screen.getByRole('link').getAttribute('href')).toBe('/dashboard');
  })
})
