import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, screen} from '@testing-library/react'
import CharacterDisplay from "../components/TimerPage/TimerDisplay/CharacterDisplay";
const nullCharacter = {
    char_name: null, stats: {}, inventory: []
}
const character = {
    char_name: "Johnny", stats: {"level": 1, "current_xp": 0, "xp_to_next_level":10,"max_hp":10,"current_hp":10,"gold":10}, inventory: []
}

test("if name exits then render it", () => {
    render(<CharacterDisplay character={character}/>)
    const element = screen.getByText('Johnny')
   expect(element).toBeDefined()
})

test("if name doesn't exist then render textbox that allows an input", () => {
    render(<CharacterDisplay character={nullCharacter}/>)
    const nameInput = screen.getByRole('textbox', {name: 'input-name'})
     expect(nameInput).toBeDefined()
})

test("inputting a new name into the textbox and pressing enter will change the name and redisplay a new name", () => {
    render(<CharacterDisplay character={nullCharacter}/>)
    const nameInput = screen.getByRole('textbox', {name: 'input-name'})
    fireEvent.change(nameInput, {value: "Jim"})
    console.log(nameInput)

})

test("if character exists then render stats", () => {
    render(<CharacterDisplay character={character} />)
    const statsdisplay = screen.getByTestId('stat-display')
    expect(statsdisplay.textContent).toEqual('Level: 1 0 / 10 Gold: 10')
})

test("if character doesn't exist then stats are rendered blank", () => {
    render(<CharacterDisplay character={nullCharacter} />)
    const statsdisplay = screen.getByTestId('stat-display')
    expect(statsdisplay.textContent).toEqual('Level:   /  Gold: ')
})


