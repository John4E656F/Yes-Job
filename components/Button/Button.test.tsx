import { render, fireEvent } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders the button with the provided text', () => {
    const { getByText } = render(<Button btnType="submit" text="Test button" />);

    expect(getByText('Test button')).toBeDefined();
  });

  it('calls the onClick handler when the button is clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button btnType="submit" text="Test button" onClick={handleClick} />,
    );

    fireEvent.click(getByText('Test button'));

    expect(handleClick).toHaveBeenCalled();
  });

  it('sets the button type to the provided btnType', () => {
    const { getByText } = render(<Button text="Test button" btnType="submit" />);

    const btnElement = getByText('Test button').closest('button');
    expect(btnElement && btnElement.getAttribute('type')).toBe('submit');
  });
});
