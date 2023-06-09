import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideProfile } from '../UsingRedux/PopUpSlice';

export default function PopUp() {
    const { details} = useSelector((state: any) => state.userDetails)
    const dispatch = useDispatch();
    const {showProfile}=useSelector((state:any)=>state.popUps)
    return (
        <div>
            <Modal show={showProfile} style={{ marginTop: "10%" }}>

                <Modal.Body style={{ textAlign: "center" }}>


                    <h3 style={{ color: "black" }}>{details.userName} </h3>

                    <h3 style={{ color: "black" }}>{details.emailId}</h3>


                </Modal.Body>

                <Modal.Footer>

                    <Button variant='info' onClick={() => dispatch(hideProfile())}>Close</Button>

                </Modal.Footer>

            </Modal>

        </div>
    )
}