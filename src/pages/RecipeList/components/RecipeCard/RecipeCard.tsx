
import { Recipe } from '../../../../types/pages';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import {
  Button,
  IconButton,
  CardActions,
  CardHeader,
  CardMedia,
} from '@mui/material';
import { StyledLink, StyledCardHeader} from "./styled"

type RecipeCardProps = {
  recipe: Recipe;
  onDelete: (data: Recipe) => void;
};


export const RecipeCard = (props: RecipeCardProps) => {
  const { recipe, onDelete } = props;
    const { _id: id } = recipe;

  return (
    <>
        <CardMedia
          component="img"
          height="300"
          image={recipe.imageUrl}
          alt="Recipe image"
      />
      <CardHeader
            action={
            <IconButton onClick={() => onDelete(recipe)}>
              <DeleteOutlined />
            </IconButton>
          }
        title={<StyledCardHeader> {recipe.title}</StyledCardHeader>
         }
        />
      <CardActions>
         <Button>
          <StyledLink to={`/recipes/${id}`}>Find more</StyledLink>
        </Button>
      </CardActions>
    </>
  );
};