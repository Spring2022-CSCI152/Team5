import React, {useEffect, useState} from 'react'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography"

const AddFriend = ({friends, setFriends, numFriends, setNumFriends}) => {
    const profile = JSON.parse(localStorage.getItem('profile'))
    const userId = profile.result._id

    const [userName, setUserName] = useState("")
    const handleChange = (e) => {
        setUserName(e.target.value)
    }
    const handleSubmit = (e) => {
        if (e.keyCode === 13){
            const newFriendObj = {
                user_id: userId,
                friend_user_name: userName
            }
            setFriends(friends.concat())
            axios.post(`http://localhost:5000/api/v1/users/friends`, newFriendObj)
                .then(res => {
                    setFriends(friends.concat(res.data.friend))
                    setNumFriends(numFriends + 1)
                })
                .catch(e => console.log(e.response))
        }
    }

    return (
        <TextField placeholder="Enter Friend" value={userName} onChange={handleChange} onKeyDown={handleSubmit} />
    )
}

const FriendsModal = ({open, handleClose, friends, numFriends, setFriends,setNumFriends, isLoading,deleteFriend,}) => {
    if (isLoading) {
        return (
            <Dialog open={open}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{p: 50}}>
                    </Box>
                </ClickAwayListener>
            </Dialog>
        )
    } else {
        return (
            <Dialog open={open}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{p: 10}}>
                   <h1>Add Friend</h1>
    <div className="container">
      <div className="row d-flex flex-column">
      <AddFriend setFriends={setFriends} friends={friends} numFriends={numFriends} setNumFriends={setNumFriends} />
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Level</th>
              </tr>
            </thead>
            <tbody>
              {numFriends > 0 ? (
                friends.map((friend, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{friend.user_name}</td>
                    <td>{friend.character.stats.level}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>Your Friends List</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Box>
   </ClickAwayListener>
</Dialog>
        )
    }
}


const FriendsList = () => {
    const [open, setOpen] = useState(false);
    const [friends, setFriends] = useState([]);
    const [numFriends, setNumFriends] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const profile = JSON.parse(localStorage.getItem('profile'))
    const userId = profile.result._id

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/users/friends/?userId=${userId}`)
            .then(res => {
                setFriends(res.data.friends)
                setNumFriends(res.data.num_friends)
                setLoading(false);
            })
    }, [])
    return(
        <Box>
            <IconButton onClick={handleClickOpen}>
                <ChildCareIcon />
            </IconButton>
            <FriendsModal open={open} handleClose={handleClose} friends={friends} setNumFriends={setNumFriends} numFriends={numFriends} setFriends={setFriends} isLoading={isLoading} />
        </Box>
    )
}

export default FriendsList;