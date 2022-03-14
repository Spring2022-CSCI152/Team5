import React, {useEffect, useState} from 'react'
import {Card, CardContent, Typography, Avatar, Box, TextField} from '@mui/material';
import Inventory from "../Menu/Inventory"
import {updateCharacterName} from "../../../services/ApiCalls";


const NameDisplay = ({name, character, setCharacter}) => {
    const [newName, setNewName] = useState("")

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleSubmit = (e) => {
        if (e.keyCode === 13) {
            updateCharacterName(newName).then(setCharacter({...character, char_name: newName}))
        }
    }
    const returnedComponent = name
                                ? <Typography variant="p" className='nameDisplay'>{name}<br/></Typography>
                                : <TextField inputProps={{ "aria-label": "input-name" }} onKeyDown={handleSubmit} label="Name" variant="outlined" onChange={handleNameChange} size="small" sx={{width: "100%"}}/>
    return returnedComponent;
}

const CharacterDisplay = ({character, setCharacter}) => {
    return (
            <Card sx={{width: 150, mb: 2}}>
                <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
                    <Avatar sx={{mb: 1}}/>
                    <Box sx={{mt: 1}} alignItems="center">
                        {character && <NameDisplay name={character.char_name} character={character} setCharacter={setCharacter} />}
                        <Typography variant="p" data-testid='stat-display'>
                            Level: {character && character.stats.level} <br />
                            {character && character.stats.current_xp} / {character && character.stats.xp_to_next_level} <br />
                            Gold: {character && character.stats.gold}
                        </Typography>
                    </Box>

                    <Inventory />
                </CardContent>
            </Card>
    )
}

export default CharacterDisplay