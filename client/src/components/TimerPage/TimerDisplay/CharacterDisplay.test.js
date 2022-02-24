import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import NameDisplay from "./CharacterDisplay";

test('renders name if name exists', () => {
    render(<NameDisplay name={'Johnny'}/>)
})