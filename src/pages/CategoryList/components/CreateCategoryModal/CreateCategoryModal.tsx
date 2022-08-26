import { useSelector } from "react-redux";
import { categoryCreateStateSelector } from "../../selectors/categoryList";
import { Modal } from "../../../../components/Modal/Modal";
import { CategoryForm } from "../Form/Form";
import { CategoryCreate } from "../../../../types/pages";

type ModalCreateCategoryProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: CategoryCreate) => void;
};

export const CreateCategoryModal = (props: ModalCreateCategoryProps) => {
  const { open, onClose, onSave } = props;
  const { loading } = useSelector(categoryCreateStateSelector);

  return (
    <Modal open={open} onClose={onClose}>
      <CategoryForm
        onSave={onSave}
        name="create"
        loading={loading}
        onCancel={onClose}
      />
    </Modal>
  );
};
