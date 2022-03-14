import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import QuestDisplay from "../components/TimerPage/TimerDisplay/QuestDisplay";

test("There should be no rendered boxes when the array is empty.", () => {
    render(<QuestDisplay />)

})