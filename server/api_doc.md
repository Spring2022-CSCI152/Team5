# Pomo Kingdom Database API

The parameters of a request can either be through a query or in the body of the request.<br><br>

If the parameters are by query, then the parameters are added on to theend of the URL extension. After the URL extension, the following syntax should be used: `?<paramter>=<entry>`. This can also be followed by an `&` symbol and another `<parameter>=<entry>` to add on another query. Example of a URL extension containing a query: `/api/v1/users?usersPerPage=10&page=1`.<br><br>

If the parameters are in the body of the request, they must be included in the json object passed through in the request.<br>

## User
### Get User(s)
Accessable via **GET** request to `/api/v1/users/`<br>
To show list of users, query by `usersPerPage` and/or `page` (default values are 20 and 0).<br>
To access specific user, query by `userName` or `id`.<br>
The response back to the client will consist of a list of returned users in the `users` field as well as the fields `page`, `filters`, `entries_per_page`, and `total_results`.

### Authenticate User
Accessable via **PUT** request to `/api/v1/users/`<br>
To authenticate a user, set `auth` to 1 in the body of the request. Include `user_name` and `password` in the body of the request as well to authenticate the user.<br>
The response back to the client will include the user's info sent in the field `result` as well as the authentication token sent in the field `token`.

### Add User
Accessable via **POST** request to `/api/v1/users/`<br>
In the body of the request, include `user_name`, `password`, and `char_name`.
The password will be encrypted before being entered into the database, and a token will be returned to the client to keep the user signed in.<br>
The response back to the client will include the user's info sent in the field `result` as well as the authentication token sent in the field `token`.

### Update User
Accessable via **PUT** request to `/api/v1/users/`<br>
In the body of the request, include `id` to identify the user to modify, as well as `user_name` and/or `password`. One or both may be updated in a single request.<br>
The response back to the client will include a `status` field which contains the string "success" if the request was successful, otherwise the response will be an error message.

### Delete User
Accessable via **DELETE** request to `/api/v1/users/`<br>
In the body of the request, include `id` to identify the user for deletion.
The response back to the client will include a `status` field which contains the string "success" if the request was successful, otherwise the response will be an error message.

## Character
### Get Character
Accessable via **GET** request to `/api/v1/users/character/`<br>
To show the character of a specific user, query by `userId` to identify the user.
The response back to the client will consist of only the `character` object belonging to the requested user.

### Update Character
Accessable via **PUT** request to `/api/v1/users/character/`<br>
In the body of the request, include `user_id` to identify the user.<br>
Include any of the following fields to update the corresponding field in the user's character: `char_name`, `level`, `xp_to_next_level`, `max_hp`, `current_hp`, and/or `gold`.
The response back to the client will include a `status` field which contains the string "success" if the request was successful along with the updated characte info in the `character` field, otherwise the response will be an error message.

## Friends
### Get Friends
Accessable via **GET** request to `/api/v1/users/friends/`<br>
To show the friends list of a given user, query by `userId` to identify the user.<br>
The response will include an array of friends in the `friends` field as well as a total number of friends in the `num_friends` field.<br>
To search for a specific friend in the friends list, also query by `friendUserName`.<br>
The response will include a single friend in the `friend` field.

### Add Friend
Accessable via **POST** request to `/api/v1/users/friends/`<br>
In the body of the request, include `user_id` and `friend_user_name`.<br>
If the request is successful, the response should include a `status` field showing "success", as well as the response from the MongoDB api in the `response` field and the newly added friend object in the `friend` field.

### Update Friend
Accessable via **PUT** request to `/api/v1/users/friends/`<br>
In the body of the request, include `user_id` and `friend_user_name`.<br>
This will update the target user's entry for the target friend to their currect profile info.<br>
If the request is successful, the response should include a `status` field showing "success", as well as the response from the MongoDB api in the `response` field and the newly updated friend object in the `friend` field.

### Delete Friend
Accessable via **DELETE** request to `/api/v1/users/friends/`<br>
In the body of the request, include `user_id` and `friend_user_name`.<br>
If the request is successful, the response should include a `status` field showing "success", as well as the response from the MongoDB api in the `response` field.

## Tasks
### Get Tasks
Accessable via **GET** request to `/api/v1/users/tasks/`<br>
To show the tasks list of a given user, query by `userId` to identify the user.<br>
The response will include an array of tasks in the `tasks` field as well as a total number of tasks in the `num_tasks` field.<br>
To search for a specific task in the tasks list, also query by `taskId` or `taskName`.<br>
The response will include a single task in the `task` field.

### Add Task
Accessable via **POST** request to `/api/v1/users/tasks/`<br>
In the body of the request, include `user_id` and `task_name`.<br>
If the request is successful, the response should include a `status` field showing "success", as well as the response from the MongoDB api in the `response` field and the newly added task in the `task` field.

### Update Task
Accessable via **PUT** request to `/api/v1/users/tasks/`<br>
In the body of the request, include `user_id`, either `task_id` or `old_task_name`, and `new_task_name`.<br>
This will update the target user's name for the target task.<br>
If the request is successful, the response should include a `status` field showing "success", as well as the response from the MongoDB api in the `response` field and the newly updated task in the `task` field.

### Delete Task
Accessable via **DELETE** request to `/api/v1/users/tasks/`<br>
In the body of the request, include `user_id` and either `task_id` or `task_name`.<br>
If the request is successful, the response should include a `status` field showing "success", as well as the response from the MongoDB api in the `response` field.

## Inventory
### Get Inventory
Accessable via **GET** request to `/api/v1/users/inventory/`<br>
To show the inventory of a given user, query by `userId` to identify the user.<br>
The response will include an array of items in the `items` field as well as a total number of items in the `num_items` field.<br>
To search for a specific item in the inventory, also query by `name`.<br>
The response will include a single item in the `item` field.

### Add Item
Accessable via **POST** request to `/api/v1/users/inventory/`<br>
In the body of the request, include `user_id` and `item_id`.<br>
This will add the target item in the `itemshop` collection to the target user's inventory.<br>
If the request is successful, the response should include a `status` field showing "success", as well as the response from the MongoDB api in the `response` field and the newly added item in the `item` field.

### Delete Item
Accessable via **DELETE** request to `/api/v1/users/friends/`<br>
In the body of the request, include `user_id` and `item_id`.<br>
If the request is successful, the response should include a `status` field showing "success", as well as the response from the MongoDB api in the `response` field.

## Item Shop
### Get Item(s)
Accessable via **GET** request to `/api/v1/itemshop/`<br>
To show list of items, query by `itemsPerPage` and/or `page` (default values are 20 and 0).<br>
To filter to specific items, query by `name` or `type`.<br>
The response back to the client will consist of a list of returned items in the `items` field as well as the fields `page`, `filters`, `entries_per_page`, and `total_results`.

### Add Item
Accessable via **POST** request to `/api/v1/itemshop/`<br>
In the body of the request, include `name`, `type`, and `cost`.
The response back to the client will include the item's info sent in the field `result`.<br>

### Update Item
Accessable via **PUT** request to `/api/v1/itemshop/`<br>
In the body of the request, include `id` to identify the item to modify, as well as `name`, `type`, and/or `cost`. One or both may be updated in a single request.<br>
The response back to the client will include a `status` field which contains the string "success" if the request was successful along with the updated item in the `item` field, otherwise the response will be an error message.

### Delete Item
Accessable via **DELETE** request to `/api/v1/itemshop/`<br>
In the body of the request, include `id` to identify the item for deletion.
The response back to the client will include a `status` field which contains the string "success" if the request was successful, otherwise the response will be an error message.
