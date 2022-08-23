
import { Recipe } from '../../../../types/pages';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';

type RecipeCardProps = {
  recipe: Recipe;
  onDelete: (data: Recipe) => void;
};


export const RecipeCard = (props: RecipeCardProps) => {
  const { recipe, onDelete } = props;
    const { _id: id } = recipe;

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={recipe.imageUrl}
          alt="Recipe image"
        />
        <CardHeader
          title={recipe.title}
        />
         <Button onClick={() => onDelete(recipe)}>
        <DeleteIcon/>
        </Button>  
         <Button >
          <Link to={`/recipes/${id}`}>Find More</Link>
        </Button>
      </Card>
    </>
  );
};