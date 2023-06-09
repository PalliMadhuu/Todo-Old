import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {  useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Grid } from '@material-ui/core';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Checkbox from '@mui/material/Checkbox';


import { showDeleteModal, showEditModal, showInfoModal } from '../UsingRedux/PopUpSlice';
import { getToDoById, removeCheckedTodos, setCheckedTodos } from '../UsingRedux/ToDosSlice';



const useStyles = makeStyles({
    card: {
      maxWidth:500,
      float:'left',
      marginTop:'50px',
      marginRight:'50px',
      minWidth:400,
    },
    media: {
      height: 140,
    },
    icons:
    {
         marginRight:'40px'
    },
    delIcon:{
        marginRight:'40px',

        marginLeft:'50px'
    },
    grid:
    {
            maxWidth: '96.666667%',
    }
  });


  export const MyCard = () => {
    const dispatch=useDispatch();

    //pagination Logic

    const { filteredTodos } = useSelector((state: any) => state.todos)
    const [activePage, setActivePage] = useState(1); // Active page number
    const itemsPerPage = 2; // Number of items to display per page
    const totalItemsCount = filteredTodos.length; // Total number of items
  
    // Calculate start and end index of the items to display on the current page
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Slice the data array to display only the items on the current page
    const currentData = filteredTodos.slice(startIndex, endIndex);
  
    // Handle page change
    const handlePageChange = (pageNumber: any) => {
      setActivePage(pageNumber);
    };
    function onCheckBoxChanged(event: any) {
        const checkedId = event.target.id;
        if (event.target.checked) {
          dispatch(setCheckedTodos(checkedId));
        }
        else {
          window.alert(checkedId)
          dispatch(removeCheckedTodos(checkedId));
        }
      }
    const classes = useStyles();
    return (
        <div>
            <div style={{float:'left',marginLeft:'130px'}}>
        {currentData.map((items:any,index:any)=>
            <Card className={classes.card}  >
            <CardContent>
              <Typography gutterBottom  component="h2">
                 {items.toDoName}
              </Typography>
              <Typography gutterBottom  component="h2">
                 {items.toDoStatus}
              </Typography>
              <Typography gutterBottom component="h2">
                 {items.note}
              </Typography>
              <Typography gutterBottom  component="h2">
                 {items.date}
              </Typography>
              <Typography>                                         
              <Grid item xs={8} className={classes.grid}>
              <Checkbox  
                onChange={onCheckBoxChanged}
                id={items.id}
              />
             <DeleteIcon className={classes.delIcon} onClick={() => { dispatch(showDeleteModal(items.id)) }} />
             <BorderColorIcon className={classes.icons} onClick={() => { dispatch(showEditModal(items.id)); dispatch(getToDoById(items.id)) }}/>
             <RemoveRedEyeIcon className={classes.icons} onClick={() =>{ dispatch(showInfoModal()); dispatch(getToDoById(items.id)) }} />
          </Grid>
              </Typography>
            </CardContent>
          </Card>
    )}
        </div>
        <div style={{ marginLeft: '400px', marginTop: '300px' , float:'left',position:'fixed' }}>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalItemsCount}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>

    </div>
    );

  };
 