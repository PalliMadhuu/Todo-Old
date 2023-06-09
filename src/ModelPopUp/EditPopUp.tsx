import { TextField } from '@material-ui/core';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideEditModal } from '../UsingRedux/PopUpSlice';
import { AllTodos, EditToDoById } from '../UsingRedux/ToDosSlice';
import { AppDispatch } from '../UsingRedux/TodosStrore';


export default function EditPopUp() {
  const { showEdit } = useSelector((state: any) => state.popUps)
  const { toDoInfo } = useSelector((state: any) => state.todos)
  let taskInfo = {
    toDoId: toDoInfo.id,
    toDoName: toDoInfo.toDoName,
    toDoStatus: toDoInfo.toDoStatus,
    note: toDoInfo.note,
    date: toDoInfo.date
  }
  function onEditClick(event: any) {
    event.preventDefault()
    if (taskInfo.toDoName!== '' && taskInfo.date !== '' && taskInfo.note !== '' && taskInfo.toDoStatus !== '') {
      dispatch(AllTodos())
      dispatch(EditToDoById(taskInfo))
      dispatch(hideEditModal());
      dispatch(AllTodos())
    }
  }
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <Modal show={showEdit} style={{ marginTop: "10%" }}>
        <Modal.Body style={{ textAlign: "center" }}>

          <form onSubmit={onEditClick} >
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={taskInfo.toDoName}
              onChange={(event: any) => taskInfo.toDoName = event.target.value}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={taskInfo.note}
              onChange={(event: any) => taskInfo.note = event.target.value}

            />
            <TextField
              label="Due Date"
              variant="outlined"
              type="date"
              fullWidth
              margin="normal"
              defaultValue={taskInfo.date}
              onChange={(event: any) => taskInfo.date = event.target.value}

            />
            <TextField
              label="Priority"
              variant="outlined"
              select
              fullWidth
              margin="normal"
              defaultValue={taskInfo.toDoStatus}
              onChange={(event: any) => taskInfo.toDoStatus = event.target.value}

            >
              <option value="pending">PENDING</option>
              <option value="Ongoing">ONGOING</option>
              <option value="Completed">COMPLETED</option>
            </TextField>
            <Button
              variant="info"
              type="submit"
            >
            Save
            </Button>

          </form>

        </Modal.Body>
        <Modal.Footer>
        <Button variant='info' onClick={() => dispatch(hideEditModal())}>Close</Button>

        </Modal.Footer>

      </Modal>

    </div>
  )
}