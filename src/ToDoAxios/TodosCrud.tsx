import axios from "axios";
import { SuccessMessage } from "../ToasterMessages/ToastMsgs";

export async  function postTodo(data:any){
    let response = await axios.post('http://localhost:3000/Todos',data)
    if(response)
    {
      SuccessMessage("Todo Added Succesfully");
    }
}


  export async function getAllTodos()
  {
 let response= await axios.get('http://localhost:3000/Todos')
   return response.data;

  }

export async function DeleteTodo(toDoId:any)
{
  let response=await axios.delete(`http://localhost:3000/Todos/${toDoId}`)
  if(response)
  {
      SuccessMessage("Todo Deleted Successfully");
  }
  return response;
}
  
export async function EditTask(taskId: any, updatedTask: any) {
 let response= await axios.put(`http://localhost:3000/Todos/${taskId}`, updatedTask)
 if(response)
 {
  SuccessMessage("Todo Updated");

 }
  return response;
  }