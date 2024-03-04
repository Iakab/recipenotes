import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';

import { Avatar } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const storageColumns = (
  handleDelete: (id: string) => string,
  handleEdit: (id: string) => string,
): GridColDef[] => [
  {
    field: 'photo',
    headerName: 'Photo',
    width: 80,
    sortable: false,
    headerClassName: 'storage-header',
    renderCell: (params) => (
      <Avatar sx={{ width: 45, height: 45 }} src={params.row.thumbnailUrl} />
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    sortable: true,
    headerClassName: 'storage-header',
    width: 300,
  },
  {
    field: 'credit',
    headerName: 'Author',
    headerClassName: 'storage-header',
    width: 150,
  },
  {
    field: 'tagNames',
    headerName: 'Tags',
    headerClassName: 'storage-header',
    width: 350,
  },
  {
    field: 'lastEdit',
    headerName: 'Last edited',
    headerClassName: 'storage-header',
    width: 150,
  },
  {
    field: 'id',
    headerName: 'ID',
    sortable: false,
    headerClassName: 'storage-header',
    width: 80,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    headerClassName: 'storage-header',
    cellClassName: 'actions',
    getActions: ({ id }) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={() => handleEdit(id.toString())}
        color="inherit"
      />,

      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => handleDelete(id.toString())}
        color="inherit"
      />,
    ],
  },
];

export default storageColumns;
