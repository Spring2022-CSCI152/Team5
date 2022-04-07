import React, {useState, useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import StoreIcon from '@mui/icons-material/Store';
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// will hard code an array until i can see how zacks api will return the items (item.img, item.stats, item.cost)
import Card from '@mui/material/Card';
import Axios from "axios"
import axios from "axios";

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
// setCharacter({...character, stats: {...character.stats, gold: updatedGold, current_xp: updatedXp, level: updatedLevel, xp_to_next_level: updatedReqExp}})
// // error when trying to post a 0 to updatedXP stat
// axios.put(`http://localhost:5000/api/v1/users/character`, updatedCharacter)
//     .then(r => console.log(r))
//     .catch(e => console.log(e.response))

const ItemShop = ({character, setCharacter}) => {
    const [itemShop, setItemShop] = useState([])
    const [open, setOpen] = useState(false);
    const profile = JSON.parse(localStorage.getItem('profile'))
    const userId = profile.result._id

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleBuy = (item) => {
        if ((character.stats.gold) >= item.cost){
            // is it best practice to eventually make this its own function with the use of redux?
            const updatedGold = {
                user_id: userId,
                gold: character.stats.gold - item.cost,
            }

            const addedItem = {
                user_id: userId,
                item_id: item._id
            }

            console.log(addedItem)
            // the api should probably be returning the new character for easier and more readable code
            setCharacter({...character, stats: {...character.stats, gold: character.stats.gold - item.cost}, inventory: character.inventory.concat(item)})
            axios.put(`http://localhost:5000/api/v1/users/character`, updatedGold).catch(err => console.log(err))
            axios.post("http://localhost:5000/api/v1/users/inventory", addedItem).catch(err => console.log(err))
        }
        else {
            console.log("not enough gold for purchase")
        }
    }

    useEffect(() => {
        Axios.get("http://localhost:5000/api/v1/itemshop/")
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