import { useContext, useMemo } from 'react';

import { StorageContext } from 'context/storage.context';

import { DataGrid, GridRowParams, GridToolbar } from '@mui/x-data-grid';

import CustomNoRowsOverlay from 'utils/material-ui/no-content-overlay';

import { Button, createTheme, ThemeProvider } from '@mui/material';
import { Box, Stack } from '@mui/system';

import storageColumns from 'utils/material-ui/storage-elements';

import './storage.scss';

const Storage = () => {
  const { storedRecipes, removeItemFromStorage } = useContext(StorageContext);

  const handleDelete = (id: string) => {
    try {
      removeItemFromStorage(id);
    } catch (error) {
      console.error(error);
    }
    return id;
  };

  // handle edit after creating the component for creating new recipes
  const handleEdit = (id: string) => {
    console.log('edit', id);
    return id;
  };

  // TODO: handle clicks/hover on different elements from the rows
  const handleRowClick = (event: GridRowParams<any>) => {
    console.log(event);
  };

  const columns = storageColumns(handleDelete, handleEdit);

  type Row = {
    credit: string;
    id: string;
    name: string;
    tagNames: (string | undefined)[];
    thumbnailUrl: string;
  };
  type Rows = Row[];

  const rows: Rows = useMemo(() => {
    if (storedRecipes) {
      return storedRecipes.map((item) => {
        const { credits, id, name, tags, thumbnail_url: thumbnailUrl } = item;
        const credit = credits[0].name;
        const tagNames = tags.slice(0, 3).map((tag) => ` ${tag.display_name}`);
        return {
          credit,
          id,
          name,
          tagNames,
          thumbnailUrl,
        };
      });
    }
    return [];
  }, [storedRecipes]);

  const theme = createTheme({
    typography: {
      fontSize: 24,
    },
  });

  return (
    <div className="storage">
      <ThemeProvider theme={theme}>
        <Stack gap={2} height="80vh">
          <Box flexDirection="row">
            <h2>STORAGE</h2>
          </Box>
          <Button
            variant="outlined"
            fullWidth={false}
            size="large"
            sx={{ width: '30%', margin: 'auto' }}
          >
            + Add new Recipe
          </Button>

          <DataGrid
            slots={{
              toolbar: GridToolbar,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            rows={rows}
            rowHeight={50}
            columns={columns}
            onRowClick={handleRowClick}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Stack>
      </ThemeProvider>
    </div>
  );
};

export default Storage;
