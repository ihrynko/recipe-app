import { useSelector } from "react-redux";
import { Modal } from "../../../../components/Modal/Modal";
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import {recipeDeleteStateSelector} from '../../selectors/recipeList'


type ModalDeleteRecipeProps = {
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
};

export const DeleteRecipeModal = (props: ModalDeleteRecipeProps) => {
  const { open, onClose,   onDelete } = props;
const { loading, data } = useSelector(recipeDeleteStateSelector);
    
  return (
    <Modal open={open} onClose={onClose}>
      <Typography mb={1} textAlign="center" variant="h5" component="h1">
        Delete recipe
      </Typography>
      <Typography mb={3} textAlign="center" variant="body1" component="p">
        Do you really want to delete{' '}
        <span>{data.title}</span> recipe?
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