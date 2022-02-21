import React, {useState, useEffect} from 'react'

const levelUp = ({character, loExperience}) => {
    // increment characterobj level and set the experience to 0 then increment with the left over experience

}

const experienceIncrease = ({experienceEarned}) => {
    useEffect(() => {
    //    api call to get character information on call of this function
    })

    // psuedo
    if(experienceEarned + characterExperience > experienceReq){
        levelUp(character, loExperience)
    } else {
        // axios.patch experience for the character
    }
}

export default { experienceIncrease }