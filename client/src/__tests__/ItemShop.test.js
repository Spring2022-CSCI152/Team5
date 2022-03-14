import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, getAllByRole, getByRole, render, screen} from '@testing-library/react'
import ItemShop from "../components/TimerPage/Menu/ItemShop";

const character = {
    char_name: "Johnny", stats: {"level": 1, "current_xp": 0, "xp_to_next_level":10,"max_hp":10,"current_hp":10,"gold":10}, inventory: []
}

test("When the item shop button is clicked open the item shop modal", () => {
    render(<ItemShop />)
    const invButton = screen.getByRole('button');
    fireEvent.click(invButton)
    expect(screen.getByText("Loading...")).toBeDefined()
})

test("When the item shop button has not been clicked the menu should be not visible", () => {
    render(<ItemShop />)
    expect(screen.queryByText('Loading...')).toBeFalsy()
})