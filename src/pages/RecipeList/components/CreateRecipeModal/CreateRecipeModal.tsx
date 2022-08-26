import { useSelector } from "react-redux";
import { recipeCreateStateSelector } from "../../selectors/recipeList";
import { Modal } from "../../../../components/Modal/Modal";
import { RecipeForm } from "../Form/Form";
import { RecipeCreate } from '../../../../types/pages';


type ModalCreateCategoryProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: RecipeCreate) => void;
};

export const CreateRecipeModal = (props: ModalCreateCategoryProps) => {
  const { open, onClose, onSave } = props;
    const { loading } = useSelector(recipeCreateStateSelector);

  return (
    <Modal open={open} onClose={onClose}>
      <RecipeForm onSave={onSave} name="create" loading={loading} onCancel={onClose}/>
    </Modal>
  );
};


