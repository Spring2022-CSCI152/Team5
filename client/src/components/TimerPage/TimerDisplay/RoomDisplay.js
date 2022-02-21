import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const RoomDisplay = ({pomosCompleted, multiplier}) => {
    return (
        <Box sx={{mr: 10, width: '9%'}}>
        <Card>
            <CardContent>
                <Typography variant="h6" sx={{mb: 1}}>
                    Quests
                </Typography>
                <Typography variant="p">
                    Completed: {pomosCompleted}
                    <br/>
                    Multiplier: {pomosCompleted === 0 ? 1 : 1 + (multiplier)}
                </Typography>
            </CardContent>
        </Card>
        </Box>
    )
}

export default RoomDisplay;