import axios from 'axios'
const profile = JSON.parse(localStorage.getItem('profile'))
const userId = profile.result._id
const baseUrl = `http://localhost:5000/api/v1/users/character?userId=${userId}`;

export const getUser = () => {
    return axios.get(baseUrl)
}

export const getItemShop = () => {
    return axios.get("http://localhost:5000/api/v1/itemshop/")
}

export const addFriend = (friendUsername) => {
    const newFriendObj = {
        user_id: userId,
        friend_user_name: friendUsername
    }
   return axios.post(`http://localhost:5000/api/v1/users/friends`, newFriendObj)
}

export const buyItem = (item) => {
    const addedItem = {
        user_id: userId,
        item_id: item._id
    }
    return axios.post("http://localhost:5000/api/v1/users/inventory", addedItem)
}

export const updateGold = (newAmount) => {
    const updatedGold = {
        user_id: userId,
        gold: newAmount
    }
    return axios.put(`http://localhost:5000/api/v1/users/character`, updatedGold)
}
