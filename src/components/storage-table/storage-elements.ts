import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';

import { Avatar } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const storageColumns = (
  handleDelete: (id?: string) => string | undefined,
  handleEdit: (id: string) => string,
): GridColDef[] => [
  {
    field: 'photo',
    headerClassName: 'storage-header',
    headerName: 'Photo',
    renderCell: (params) => (
      <Avatar sx={{ width: 45, height: 45 }} src={params.row.thumbnailUrl} />
    ),
    sortable: false,
    width: 80,
  },
  {
    field: 'name',
    headerClassName: 'storage-header',
    headerName: 'Name',
    sortable: true,
    width: 350,
  },
  {
    field: 'credit',
    headerClassName: 'storage-header',
    headerName: 'Author',
    width: 180,
  },
  {
    field: 'tagNames',
    headerClassName: 'storage-header',
    headerName: 'Tags',
    width: 350,
  },
  {
    field: 'lastEdit',
    headerClassName: 'storage-header',
    headerName: 'Last edited',
    width: 150,
  },
  {
    field: 'id',
    headerClassName: 'storage-header',
    headerName: 'ID',
    sortable: false,
    width: 80,
  },
  {
    cellClassName: 'actions',
    field: 'actions',
    headerClassName: 'storage-header',
    headerName: 'Actions',
    type: 'actions',
    width: 100,
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
