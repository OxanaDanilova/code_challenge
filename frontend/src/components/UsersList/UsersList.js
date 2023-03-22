import React, { useState, useEffect, useContext } from "react";

import axiosConfig from "../../util/AxiosConfig";
import { myContext } from '../../App';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function UsersList() {
  const context = useContext(myContext);
  const {currentUser, setCurrentUser} = context;

  const [users, setUsers] = useState([]); 

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
    <Box sx={{ minWidth: 120, width: "300px", margin:"1rem auto" }}>
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
