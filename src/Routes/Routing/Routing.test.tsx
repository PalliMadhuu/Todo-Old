import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Routing from './Routing';

describe('<Routing />', () => {
  test('it should mount', () => {
    render(<Routing />);
    
    const routing = screen.getByTestId('Routing');

    expect(routing).toBeInTheDocument();
  });
});