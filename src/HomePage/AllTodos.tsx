import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../UsingRedux/TodosStrore';
import { AllTodos, getToDoById, filterToDoByDate, filterToDoByStatus, setCheckedTodos, removeCheckedTodos } from '../UsingRedux/ToDosSlice';
import { showDeleteModal, showInfoModal, showEditModal, showSelectedDelete } from '../UsingRedux/PopUpSlice';
import PopUp from '../ModelPopUp/InfoPopUp';
import { useState } from 'react';
import Pagination from 'react-js-pagination';
import EditPopUp from '../ModelPopUp/EditPopUp';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DeletePopUp from '../ModelPopUp/DeletePopUp';
import { Button, makeStyles } from '@material-ui/core';
import SelectedDelete from '../ModelPopUp/SelectedDelete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import 'react-toastify/dist/ReactToastify.css';
import ListAltIcon from '@material-ui/icons/ListAlt';
import GridOnIcon from '@material-ui/icons/GridOn';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import { MyCard } from '../TodoCard/CardView';
import { getAllDetails } from "../HttpInterceptors/ApiCalls";

export default function Alltodos() {
  useEffect( () => { 
    async function fetchData()
    {
    let response= await  getAllDetails();
     console.log(response.data);
    }
    fetchData();
    setTimeout(()=>{})
    dispatch(AllTodos());
  }, [])
  const useStyles = makeStyles({
    table: {
      minWidth: 950,
    },
    tableCell:
    {
      minWidth: 140,
      marginRight: 20,
    },
  });
  const classes = useStyles();
  const [showGridView,setShowGridView]=useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { filteredTodos } = useSelector((state: any) => state.todos)
  const [activePage, setActivePage] = useState(1); // Active page number
  const itemsPerPage = 3; // Number of items to display per page
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
      dispatch(removeCheckedTodos(checkedId));
    }
  }
  return (
    <div style={{width:'1200px'}}>
      <div style={{ float: 'left' ,marginTop:'40px',marginLeft:'30px'}}>
        <GridOnIcon color="primary" onClick={()=>{setShowGridView(true)}}/>
        </div>
        <div style={{ float: 'left' ,marginTop:'40px',marginLeft:'30px'}}>
        <ListAltIcon color="primary" onClick={()=>{setShowGridView(false)}} />
        </div>
        <div style={{ float: 'left' ,marginTop:'40px',marginLeft:'30px'}}>
        <DeleteSweepIcon color="primary"    onClick={() => dispatch(showSelectedDelete())}
 />
        </div>
        <div style={{ float: 'left' }}>
          <h5 style={{ marginRight: '100px' }}>Filter By Date</h5>
          <input
            type="date"
            style={{ width: '300px', height: '50px', marginRight: '50px', marginLeft: '60px' }}
            onChange={(event: any) => dispatch(filterToDoByDate(event.target.value))}
          />
        </div>
        <div style={{ float: 'left' }}>
          <h5 style={{ marginRight: '50px' }}>Filter By Status</h5>
          <select
            style={{ width: '300px', height: '50px'}}
            onChange={(event: any) => {dispatch(filterToDoByStatus(event.target.value)) ;
          }}
          >
            <option value="" disabled>Status</option>
            <option value="pending">PENDING</option>
            <option value="Ongoing">ONGOING</option>
            <option value="Completed">COMPLETED</option>
          </select>
        </div>
        <div >
          <h5 >Clear Filters</h5>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "150px", height: '50px' }}
            onClick={() => dispatch(AllTodos())}
          >
            Clear Filters
          </Button>
        </div>
        {!showGridView ? (
      <div >
        <TableContainer component={Paper}  >
          <Table className={classes.table} aria-label="simple table" style={{marginTop: '300px;'}}>
            <TableHead >
              <TableRow >
                <TableCell className={classes.tableCell} style={{ fontWeight: "bold", fontSize: "20px" ,marginTop:'60px'}}>Select
                 </TableCell>
                <TableCell className={classes.tableCell} style={{ fontWeight: "bold", fontSize: "20px" }}>Task </TableCell>
                <TableCell className={classes.tableCell} style={{ fontWeight: "bold", fontSize: "20px" }}>Status&nbsp;</TableCell>
                <TableCell className={classes.tableCell} style={{ fontWeight: "bold", fontSize: "20px" }}>Note&nbsp;</TableCell>
                <TableCell className={classes.tableCell} style={{ fontWeight: "bold", fontSize: "20px" }}>Date&nbsp;</TableCell>
                <TableCell className={classes.tableCell} style={{ fontWeight: "bold", fontSize: "20px" }}>Info&nbsp;</TableCell>
                <TableCell className={classes.tableCell} style={{ fontWeight: "bold", fontSize: "20px" }}>Delete&nbsp;</TableCell>
                <TableCell className={classes.tableCell} style={{ fontWeight: "bold", fontSize: "20px" }}>Edit&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {currentData.map((row: any) => (
                <TableRow key={row.name} className={classes.tableCell}>
                  <TableCell className={classes.tableCell}>
                    <input
                      type="checkbox"
                      name={row.id}
                      onChange={onCheckBoxChanged}
                      id={row.id}
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>{row.toDoName}</TableCell>
                  <TableCell className={classes.tableCell}>{row.toDoStatus}</TableCell>
                  <TableCell className={classes.tableCell}>{row.note}</TableCell>
                  <TableCell className={classes.tableCell}>{row.date}</TableCell>
                  <TableCell>
                  <DeleteIcon  onClick={() => { dispatch(showDeleteModal(row.id)) }} />
                  </TableCell>
                  <TableCell>
                  <BorderColorIcon  onClick={() => { dispatch(showEditModal(row.id)); dispatch(getToDoById(row.id)) }}/>
                  </TableCell>
                  <TableCell>
                  <RemoveRedEyeIcon  onClick={() =>{ dispatch(showInfoModal()); dispatch(getToDoById(row.id)) }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginLeft: '400px', marginTop: '30px' }}>
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
        ):(
        <div>
        <MyCard ></MyCard>
        </div>
        )
}
      <PopUp></PopUp>
      <EditPopUp></EditPopUp>
      <DeletePopUp></DeletePopUp>
      <SelectedDelete></SelectedDelete>
    </div>
  )
}
