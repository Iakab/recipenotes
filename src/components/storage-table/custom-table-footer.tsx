import { Fragment } from 'react';

import { Button } from '@mui/material';
import { GridPagination } from '@mui/x-data-grid';

type CustomFooterProps = {
  handleDelete: (id?: string) => string | undefined;
  selectedRecipesId: string[];
};

const CustomFooter: React.FC<CustomFooterProps> = ({
  selectedRecipesId,
  handleDelete,
}) => {
  const selectedRecipesLength = selectedRecipesId?.length ?? 0;

  return (
    <div className="table-footer">
      <div className="selected">
        {selectedRecipesLength ? (
          <Fragment>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleDelete()}
            >
              Delete
            </Button>

            {selectedRecipesLength === 1 ? (
              <span>{selectedRecipesLength} row selected</span>
            ) : (
              <span>{selectedRecipesLength} rows selected</span>
            )}
          </Fragment>
        ) : (
          <Button
            variant="contained"
            disabled
            size="small"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        )}
      </div>

      <GridPagination />
    </div>
  );
};

export default CustomFooter;
