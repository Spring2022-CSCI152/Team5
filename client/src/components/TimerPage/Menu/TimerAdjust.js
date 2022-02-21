import React, {useState} from 'react'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ButtonGroup from '@mui/material/ButtonGroup';
// for adjust group (move into sep component once functionality is clear)
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import TimeMath from '../../../services/TimeMath'

const AdjustGroup = ({title, handleAddClick, handleSubClick, newLength, setNewLength}) => {
    return (
        <Box sx={
            {display: 'flex', textAlign: 'center',flexDirection: 'column', mb: 2}
        }>
            <Typography>{title}</Typography>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <TextField value={newLength} />
                <ButtonGroup sx={{display: 'flex', flexDirection: 'column'}}>
                    <IconButton onClick={() => {handleAddClick(newLength, setNewLength)}}> <AddIcon /> </IconButton>
                    <IconButton onClick={() => {handleSubClick(newLength, setNewLength)}}> <RemoveIcon /> </IconButton>
                </ButtonGroup>
            </Box>
        </Box>
    )
}

// for now this breaks the progress bar which i have to fix
const TimerAdjust = ({pomodoro , setPomodoro, shortBreak, setShortBreak, longBreak, setLongBreak, setTimerSeconds}) => {
    const [open, setOpen] = useState(false);
    const [newPomodoroLength, setNewPomodoroLength] = useState(pomodoro);
    const [newShortBreakLength, setNewShortBreakLength] = useState(shortBreak);
    const [newLongBreakLength, setNewLongBreakLength] = useState(longBreak);

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setPomodoro(newPomodoroLength)
        setShortBreak(newShortBreakLength)
        setLongBreak(newLongBreakLength)
        // future use probably find a way to find the currently active timer so it doesnt recent the timer if the user were to update it while they are on a break or something
        setTimerSeconds(TimeMath.convMinSec(newPomodoroLength));
    }
    // setTimerSeconds(TimeMath.convMinSec(pomodoro));
    const handleAddClick = (menuMinute, setMenuMinute) => {
        setMenuMinute(menuMinute + 1)
    }

    const handleSubClick = (menuMinute, setMenuMinute) => {
        if (menuMinute - 1 <= 1){
            setMenuMinute(1);
        } else {
            setMenuMinute(menuMinute - 1)
        }

    }

return(
    <Box>
        <IconButton onClick={handleClickOpen}>
            <SettingsIcon />
        </IconButton>

        <Dialog open={open}>
            <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{display: 'flex', flexDirection: 'column',margin: 5}}>
                    <AdjustGroup title={'Pomodoro'} handleAddClick={handleAddClick} handleSubClick={handleSubClick} newLength={newPomodoroLength} setNewLength={setNewPomodoroLength}/>
                    <AdjustGroup title={'Short Break'} handleAddClick={handleAddClick} handleSubClick={handleSubClick} newLength={newShortBreakLength} setNewLength={setNewShortBreakLength}/>
                    <AdjustGroup title={'Long Break'} handleAddClick={handleAddClick} handleSubClick={handleSubClick} newLength={newLongBreakLength} setNewLength={setNewLongBreakLength}/>
                </Box>
            </ClickAwayListener>
        </Dialog>
    </Box>
)
}

export default TimerAdjust