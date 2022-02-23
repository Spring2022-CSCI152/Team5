import React, {useEffect, useState} from 'react'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import BackpackIcon from '@mui/icons-material/Backpack';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {getInventory, getUser} from "../../../services/ApiCalls";

const InventoryItem = ({itemName, itemType}) => {
    return (
        <Card sx={{display: "flex", flexDirection: "column", textAlign: "center", border: "red solid 1" ,minWidth: 100, height: 100, m: 2}}>
            <Typography>
                {itemName} <br />
                {itemType} <br />
            </Typography>
        </Card>
    )
}

const InventoryModal = ({open, handleClose, inventory, isLoading}) => {

    if (isLoading){
        return (
            <Dialog open={open}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{p: 5}}>
                        <p>Loading</p>
                    </Box>
                </ClickAwayListener>
            </Dialog>
        )
    }
    else {
        return (
            <Dialog open={open}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{p: 5}}>
                        {inventory.length === 0  ? "You have no items" : inventory.items.map(item => <InventoryItem itemName={item.name} itemType={item.type} />)}
                    </Box>
                </ClickAwayListener>
            </Dialog>
        )
    }
}

const Inventory = () => {
    const [inventory, setInventory] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getInventory()
            .then(
                initialInventory => {
                    setInventory(initialInventory)
                    setLoading(false)
                }
            )
            .catch(error => {
                console.log(error)
            })

    }, [inventory] )

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Box>
            <IconButton onClick={handleClickOpen}>
                <BackpackIcon />
            </IconButton>
            <InventoryModal open={open} handleClose={handleClose} inventory={inventory} isLoading={isLoading}/>

        </Box>

    )
}

export default Inventory