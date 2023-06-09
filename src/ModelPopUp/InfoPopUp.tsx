import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideInfoModal } from '../UsingRedux/PopUpSlice';

export default function PopUp() {
    const { showInfo } = useSelector((state: any) => state.popUps)
    const dispatch = useDispatch();
    const { toDoInfo } = useSelector((state: any) => state.todos)

    return (
        <div>
            <Modal show={showInfo} style={{ marginTop: "10%" }}>

                <Modal.Body style={{ textAlign: "center" }}>


                    <h3 style={{ color: "black" }}>{toDoInfo.toDoName} </h3>

                    <h3 style={{ color: "black" }}>{toDoInfo.date}</h3>

                    <h3 style={{ color: "black" }}>{toDoInfo.note} </h3>

                    <h3 style={{ color: "black" }}>{toDoInfo.toDoStatus} </h3>

                </Modal.Body>

                <Modal.Footer>

                    <Button variant='info' onClick={() => dispatch(hideInfoModal())}>Close</Button>

                </Modal.Footer>

            </Modal>

        </div>
    )
}