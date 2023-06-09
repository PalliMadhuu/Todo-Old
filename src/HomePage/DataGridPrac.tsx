import * as React from 'react';
import { DataGrid, GridRowsProp, GridRowSelectionModel } from '@mui/x-data-grid';
import { GridDemoData, useDemoData } from '@mui/x-data-grid-generator';

function loadServerRows(page: number, data: GridDemoData): Promise<any> {
  return new Promise((resolve) => {
      resolve(data.rows.slice(page * 5, (page + 1) * 5));
  });
}
export default function ControlledSelectionServerPaginationGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });
  const [paginationModel,  setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowSelectionModel,  setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  React.useEffect(() => {
    let active = true;
    (async () => {
      const newRows = await loadServerRows(paginationModel.page, data);
      if (!active) {
        return;
      }
      setRows(newRows);
    })();
    return () => {
      active = false;
    };
  }, [paginationModel.page, data]);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        {...data}
        rows={rows}
        pagination
        checkboxSelection
        paginationModel={paginationModel}
        pageSizeOptions={[5]}
        rowCount={100}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        keepNonExistentRowsSelected
      />
    </div>
  );
}