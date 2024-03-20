import { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageContext } from 'context/storage.context';

import {
  DataGrid,
  GridRowParams,
  GridRowSelectionModel,
  GridToolbar,
} from '@mui/x-data-grid';

import CustomNoRowsOverlay from 'components/storage-table/no-content-overlay';
import CustomFooter from 'components/storage-table/custom-table-footer';
import StorageColumns from 'components/storage-table/storage-elements';

import { Box, Button, LinearProgress, Stack } from '@mui/material';

import './storage.scss';

const Storage = () => {
  const [selectedRecipesId, setSelectedRecipesId] = useState<string[]>([]);
  const { isLoading, removeItemFromStorage, setIsLoading, storedRecipes } =
    useContext(StorageContext);
  const navigate = useNavigate();

  const handleDelete = (id?: string) => {
    setIsLoading(true);
    if (id) {
      try {
        removeItemFromStorage(id);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(selectedRecipesId);
      try {
        if (selectedRecipesId) {
          removeItemFromStorage('', selectedRecipesId);
        }
      } catch (error) {
        console.error(error);
      }
    }

    return id;
  };

  // TODO: handle edit after creating the component for creating new recipes
  const handleEdit = (id: string) => {
    console.log('edit', id);
    return id;
  };

  // TODO: handle clicks/hover on different elements from the rows
  const handleRowClick = (event: GridRowParams<any>) => {
    console.log(event);
  };

  const columns = StorageColumns(handleDelete, handleEdit);

  type Row = {
    credit: string;
    id: string;
    name: string;
    tagNames: (string | undefined)[];
    thumbnailUrl: string;
  };
  type Rows = Row[];

  // TODO: Remove to string after recreating the categories
  const rows: Rows = useMemo(() => {
    if (storedRecipes) {
      return storedRecipes.map((item) => {
        const {
          credits,
          lastEdit,
          name,
          tags,
          thumbnail_url: thumbnailUrl,
        } = item;
        const id = item.id.toString();
        const credit = credits[0].name;
        const tagNames = tags.slice(0, 3).map((tag) => ` ${tag.display_name}`);
        return {
          credit,
          id,
          lastEdit,
          name,
          tagNames,
          thumbnailUrl,
        };
      });
    }
    return [];
  }, [storedRecipes]);

  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    setSelectedRecipesId(rowSelectionModel as string[]);
  };

  const handleNavigateToUpload = () => {
    navigate('/upload')
  }

  return (
    <div className="storage">
      <Stack gap={2} height="100vh">
        <Box flexDirection="row">
          <h2>STORAGE</h2>
        </Box>
        <Button
          fullWidth={false}
          size="large"
          sx={{ width: '30%', margin: 'auto' }}
          variant="outlined"
          onClick={handleNavigateToUpload}
        >
          + Add new Recipe
        </Button>

        <DataGrid
          checkboxSelection
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          onRowClick={handleRowClick}
          onRowSelectionModelChange={handleSelectionChange}
          pageSizeOptions={[5, 10]}
          rowHeight={50}
          rows={rows}
          loading={isLoading}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
            footer: () => CustomFooter({ selectedRecipesId, handleDelete }),
            loadingOverlay: LinearProgress,
          }}
        />
      </Stack>
    </div>
  );
};

export default Storage;
