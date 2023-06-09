import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllTodos ,DeleteTodo, EditTask} from '../ToDoAxios/TodosCrud';
import { SuccessMessage } from '../ToasterMessages/ToastMsgs';
import axios from 'axios';

 
interface ToDosData
{
    toDoName:string;
    note:string;
    date:string;
    toDoStatus:string;
    id:number
}
type toDosType={
    toDos:ToDosData[],toDoInfo:ToDosData,filteredTodos:ToDosData[],selectedTodos:number[]
}
const initialState:toDosType={
    toDos:[],toDoInfo:{toDoName:'',note:'',date:'',toDoStatus:'',id:0},filteredTodos:[],selectedTodos:[]
}
export const toDoSlice=createSlice(
    {
        name:'ToDos',
        initialState,
        reducers:
        {
            getToDoById:(state,action)=>
            {
               let recievedData=state.toDos.find((toDo:any)=>toDo.id===action.payload)
               if(recievedData)
               {
                state.toDoInfo=recievedData;
                

               }
            },
           deleteToDoById:  (state,action):any=>
            {
                let response= DeleteTodo(action.payload);
                console.log(response)
                

            },
            EditToDoById:(state,action):any=>
            {
                let response=EditTask(action.payload.toDoId,action.payload)
                console.log(response)

            
            },
            filterToDoByStatus:(state,action)=>
            {
                state.filteredTodos=state.toDos.filter((allTodos:any)=>allTodos.toDoStatus===action.payload)
           console.log(state.filteredTodos)
            },
            filterToDoByDate :(state,action)=>
            {

              state.filteredTodos=state.toDos.filter((allTodos:any)=>allTodos.date===action.payload)
              console.log(state.filteredTodos)

            },
            setCheckedTodos:(state,action)=>
            {
                let checkedToDo=action.payload;
                state.selectedTodos.push(checkedToDo);
            },
            removeCheckedTodos:(state,action)=>
            {
               state.selectedTodos=state.selectedTodos.filter((id:any)=>id!==action.payload)
            },
            eraseSelectedTodos:(state)=>
            {
                state.selectedTodos=[];
                window.alert(state.selectedTodos)
            },
          deleteSelectedTodos :  (state,action) => {
            window.alert('calling');
            window.alert(action.payload)
                try {
                  action.payload.forEach(async (itemId:any) => {
                    const response = await axios.delete(`http://localhost:3000/Todos/${itemId}`);
                    if(response)
                    {
                         SuccessMessage("Todos Deleted Successfully")
                    }
               state.selectedTodos=[]
                });
                } catch (error) {
                  // handle error
                }
            }

        },
        extraReducers(builder) {
            builder.addCase(AllTodos.fulfilled,(state,action)=>
            {
                state.toDos=action.payload;
                state.filteredTodos=action.payload;
                
            })
        },

    }
)
export default toDoSlice.reducer;

export const {getToDoById,deleteToDoById,EditToDoById,filterToDoByDate,filterToDoByStatus,setCheckedTodos,removeCheckedTodos,deleteSelectedTodos,eraseSelectedTodos}=toDoSlice.actions;


export const AllTodos=createAsyncThunk(
    'ToDos/AllTodos',
    async ()=>
    {
        let response=    await getAllTodos();
          return response
    }
    
   
)

