import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Inventory from "../Menu/Inventory"
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl, { useFormControl } from '@mui/material/FormControl';

const NameDisplay = ({name, character, setCharacter}) => {
    const profile = JSON.parse(localStorage.getItem('profile'))
    const userId = profile.result._id
    const [newName, setNewName] = useState("")

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleSubmit = (e) => {
        if (e.keyCode === 13){
            const newNameObj = {
                user_id: userId,
                char_name: newName
            }
            setCharacter({...character, char_name: newName})
            axios.put(`http://localhost:5000/api/v1/users/character`, newNameObj)
                .catch(e => console.log(e.response))
        }

    }


    if (name === null){
        return (
                <TextField onKeyDown={handleSubmit} label="Name" variant="outlined"  onChange={handleNameChange} size="small" sx={{width: "100%"}} />
        )
    }

    else {
        return (
            <Typography variant="p">
                {name} <br />
            </Typography>
        )
    }
}


const CharacterDisplay = ({character, setCharacter}) => {
    return (
            <Card sx={{width: 150, mb: 2}}>
                <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
                    <Avatar sx={{mb: 1}}/>
                    <Box sx={{mt: 1}} alignItems="center">
                        {character && <NameDisplay name={character.char_name} character={character} setCharacter={setCharacter} />}
                        <Typography variant="p">
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

export default CharacterDisplay;