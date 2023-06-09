import React, { FC, useRef } from 'react';
import { TextField, Button, Select, MenuItem } from '@material-ui/core';
import { postTodo } from '../ToDoAxios/TodosCrud';
interface AddTodoProps
{

}
const AddTodo:FC<AddTodoProps>=()=>
{
    let toDosData={
 toDoName:'',
note:'',
date:'',
toDoStatus:''
    }

const toDoRef=useRef<HTMLFormElement>(null);
function onSubmitToDo(event:any)
{
    event.preventDefault();
    if(toDoRef.current)
    {
        toDosData.toDoName=toDoRef.current.toDoName.value;
        toDosData.note=toDoRef.current.note.value;
        toDosData.date=toDoRef.current.date.value;
        toDosData.toDoStatus=toDoRef.current.status.value;
        toDoRef.current.reset();
       
    
    }
    if(toDosData.toDoName!=='' && toDosData.date!==''&&toDosData.note!==''&& toDosData.toDoStatus!=='')
    {
        postTodo(toDosData);
        window.alert('added Successfully');
    }
}

    return (
        <div>
            <form ref={toDoRef} onSubmit={onSubmitToDo} style={{height:'400px',width:'500px',marginLeft:'400px',marginTop:'50px'}}>
            <h3>Add Task </h3>

      <TextField 
      placeholder='Task Name'
        variant="outlined" 
        margin="normal"
        name="toDoName"
        fullWidth
      />
            <br></br>
            <br></br>
      <TextField 
      placeholder='Note'
        variant="outlined" 
        name="note"
        fullWidth
      />
                  <br></br>
      <br></br>
      <TextField 
        variant="outlined" 
        type="date"
        name="date"
        fullWidth
      />
            <br></br>
            <br></br>
       <Select  defaultValue="Status" name="status" fullWidth>
        <MenuItem value="" disabled >Select an option</MenuItem>
        <MenuItem value="pending">PENDING</MenuItem>
        <MenuItem value="ongoing">ONGOING</MenuItem>
        <MenuItem value="completed">COMPLETED</MenuItem>
      </Select>
      <br></br>
      <br></br>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        style={{ marginTop: '10px' ,width:'200px'}}
      >
        Add
      </Button>
    </form>
        </div>
    )

}
export default AddTodo;

