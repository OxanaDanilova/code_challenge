import React, { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axiosConfig from "../../util/AxiosConfig";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = React.useState('');

  const handleChange = (event) => {
    setCurrentUser(event.target.value);
  };

  async function getUsers() {
    try {
      const apiData = await axiosConfig.get("/users");
      const userList = await apiData.data;
      setUsers(userList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Current user</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentUser}
        label="Current user"
        onChange={handleChange}
      >
        {users.map((user)=> {
            return <MenuItem key={user._id} value={user._id}>{`${user.name} ${user.surname}`}</MenuItem>
        })}
      
      </Select>
    </FormControl>
  </Box>
  );
}
