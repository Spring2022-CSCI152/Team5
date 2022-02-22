import React, {useState, useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import StoreIcon from '@mui/icons-material/Store';
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import Card from '@mui/material/Card';
import {buyItem, updateGold, getItemShop} from "../../../services/ApiCalls";

const Item = ({item, isOwned, handleBuy}) => {
    if(isOwned){
        return (
            <Card sx={{display: "flex", flexDirection: "column", textAlign: "center", border: "red solid 1" ,minWidth: 100, height: 100, m: 2}}>
                <Typography>
                    {item.name} <br />
                    {item.type} <br />
                    {item.cost} <br />
                </Typography>
                <Button>Owned</Button>
            </Card>
        )
    } else {
        return (
            <Card sx={{display: "flex", flexDirection: "column", textAlign: "center", minWidth: 100, height: 100, m: 2}}>
                <Typography>
                    {item.name} <br />
                    {item.type} <br />
                    {item.cost} <br />
                </Typography>
                <Button onClick={() => handleBuy(item)}>Buy</Button>
            </Card>
        )
    }
}

const ItemShop = ({character, setCharacter}) => {
    const [itemShop, setItemShop] = useState([])
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleBuy = (item) => {
        if ((character.stats.gold) >= item.cost){
            setCharacter({...character, stats: {...character.stats, gold: character.stats.gold - item.cost}, inventory: character.inventory.concat(item)})
            updateGold(character.stats.gold - item.cost).catch(err => console.log(err))
            buyItem(item).catch(err => console.log(err))
        }
        else {
            console.log("Not enough gold for purchase")
        }
    }

    useEffect(() => {
        getItemShop
            .then((res) => {
                const itemList = (res.data.items)
                setItemShop(itemList)
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <Box>
            <IconButton onClick={handleClickOpen}>
                <StoreIcon />
            </IconButton>

            <Dialog open={open}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center" ,p: 5}}>
                        {itemShop.map(item => character.inventory.some(charItem => charItem._id === item._id) ? <Item item={item} isOwned={true} /> : <Item item={item} isOwned={false} handleBuy={handleBuy}/>) }
                    </Box>
                </ClickAwayListener>
            </Dialog>
        </Box>
    )
}

export default ItemShop