import { Button } from '@mui/material';
import { GridPagination } from '@mui/x-data-grid';

type CustomFooterProps = {
  handleDelete: (id?: string) => string | undefined;
  selectedRecipesId: string[] | undefined;
};

const CustomFooter: React.FC<CustomFooterProps> = ({
  selectedRecipesId,
  handleDelete,
}) => (
  <div className="table-footer">
    <div className="selected">
      <Button variant="contained" size="small" onClick={() => handleDelete()}>
        Delete
      </Button>

      {selectedRecipesId?.length &&
        (selectedRecipesId?.length === 1 ? (
          <span>{selectedRecipesId?.length} row selected</span>
        ) : (
          <span>{selectedRecipesId?.length} rows selected</span>
        ))}
    </div>

    <GridPagination />
  </div>
);

export default CustomFooter;
