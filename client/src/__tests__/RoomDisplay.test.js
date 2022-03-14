import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import RoomDisplay from "../components/TimerPage/TimerDisplay/RoomDisplay";

test('display pomodoros completed and streak multiplier', () => {
    render(<RoomDisplay pomosCompleted={2} multiplier={3}/>)
    const element = screen.getByText('Quests: ' +
        'Completed: 2' +
        'Multiplier: 4')
    expect(element).toBeDefined()
})