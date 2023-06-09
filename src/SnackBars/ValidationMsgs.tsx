import { Snackbar } from "@material-ui/core";
import {closeSnackBar} from "../UsingRedux/SnackBarSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../UsingRedux/TodosStrore";
import { Alert } from "react-bootstrap";

export default function SnackBar()
{
const dispatch=useDispatch<AppDispatch>();
 const {showSnack}=useSelector((state:any)=>state.snackBars)


    return(
        <div>
            <Snackbar open={showSnack} autoHideDuration={6000} onClick={()=>dispatch(closeSnackBar())}>
  <Alert onClick={()=>dispatch(closeSnackBar())}  >
    This is a success message!
  </Alert>
</Snackbar>
        </div>
    )
}