import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {addQuest, getQuests} from "../../../services/ApiCalls";

const NewTaskHandler = ({quests, setQuests}) => {
    const [newQuest, setNewQuest] = useState("")

    const handleQuestChange = (event) => {
        setNewQuest(event.target.value)
    }

    const handleQuestAdd = () => {
        addQuest(newQuest)
            .then(res => {
                setQuests(quests.concat(res.data.task))
                setNewQuest('')
                })
            .catch(err => console.log(err))
    }

return (
    <Box sx={{display: "flex", mt: 1, p: 1}}>
        <TextField id="outlined-basic" label="Enter new task" variant="outlined" onChange={handleQuestChange} value={newQuest} size="small" sx={{width: "100%"}} />
        <Box sx={{display: "flex", alignItems: "center", ml: 2}}>
            <Button variant={"contained"} size={"small"} onClick={handleQuestAdd}>+</Button>
        </Box>
    </Box>
)
}

const QuestDisplay = ({setActiveTask}) => {
    const [quests, setQuests] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleClick = (quest) => {
        setSelectedIndex(quest._id)
        setActiveTask(quest.name)
    }

    useEffect(() => {
        getQuests()
            .then(initialQuests => {
                if (initialQuests.data.tasks.length !== 0){
                    setQuests(initialQuests.data.tasks)
                    setSelectedIndex(initialQuests.data.tasks[0]._id)
                    setActiveTask(initialQuests.data.tasks[0].name)
                }
            })
    }, [])

    return (
        <Box>
            <List sx={{maxHeight: 105, overflow: 'auto', mt: 5}}>
                {quests.map(quest =>
                    <ListItemButton selected={selectedIndex === quest._id} onClick={() => handleClick(quest)}> {quest.name} </ListItemButton>
                )}
            </List>
            <NewTaskHandler setQuests={setQuests} quests={quests}/>
        </Box>

    )
}

export default QuestDisplay