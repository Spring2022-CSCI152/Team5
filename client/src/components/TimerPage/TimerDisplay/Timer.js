import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Timer = ({timerMode, timer, reward, activeTask}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant='h4'>
                    {timerMode}
                </Typography>
                <Typography>
                    {activeTask}
                </Typography>
                <Typography variant='h2'>
                    {timer}
                </Typography>
                <Typography>
                    Reward: {reward}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default Timer