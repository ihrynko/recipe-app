import { useSelector } from "react-redux";
import { Modal } from "../../../../components/Modal/Modal";
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import {categoryDeleteStateSelector} from '../../selectors/categoryList'


type ModalDeleteCategoryProps = {
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
};

export const DeleteCategoryModal = (props: ModalDeleteCategoryProps) => {
  const { open, onClose,   onDelete } = props;
const { loading, data } = useSelector(categoryDeleteStateSelector);
    
  return (
    <Modal open={open} onClose={onClose}>
      <Typography mb={1} textAlign="center" variant="h5" component="h1">
        Delete category
      </Typography>
      <Typography mb={3} textAlign="center" variant="body1" component="p">
        Do you really want to delete{' '}
        <span>{data.name}</span> category?
      </Typography>
      <Box display="flex" gap="4px" justifyContent="flex-end">
        <LoadingButton
          disabled={loading}
          variant="contained"
          onClick={onClose}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          color="error"
          disabled={loading}
          loading={loading}
          onClick={() => onDelete(data._id)}
        >
          Delete
        </LoadingButton>
      </Box>
    </Modal>
  );
};