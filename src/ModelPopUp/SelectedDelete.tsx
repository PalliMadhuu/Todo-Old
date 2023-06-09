import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideSelectedDelete } from '../UsingRedux/PopUpSlice';
import { AppDispatch } from '../UsingRedux/TodosStrore';
import { AllTodos, deleteSelectedTodos, eraseSelectedTodos } from '../UsingRedux/ToDosSlice';


export default function SelectedDelete() {
    const { showCheckedDelete } = useSelector((state: any) => state.popUps)
    const dispatch = useDispatch<AppDispatch>();
    const { selectedTodos } = useSelector((state: any) => state.todos)

    return (
        <div>
            <Modal show={showCheckedDelete} style={{ marginTop: "10%" }}>

                <Modal.Body style={{ textAlign: "center" }}>
                    <h3>Do You Want To Delete</h3>

                    <Button variant='info' onClick={()=>{dispatch(deleteSelectedTodos(selectedTodos));dispatch(hideSelectedDelete());dispatch(AllTodos())}}>Yes</Button>
                    <Button variant='info' onClick={() => {dispatch(hideSelectedDelete());dispatch(eraseSelectedTodos())}}>Nope</Button>

                </Modal.Body>


            </Modal>

        </div>
    )
}