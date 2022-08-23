
import { Category } from '../../../../types/pages';
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

type CategoryCardProps = {
  category: Category;
  onDelete: (data: Category) => void;
};


export const CategoryCard = (props: CategoryCardProps) => {
  const { category, onDelete } = props;
    const { _id: id } = category;

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={category.image}
          alt="Category image"
        />
        <CardHeader
          title={category.name}
        />
        <CardContent>
          <Typography variant="body2">{category.description}</Typography>
        </CardContent>
         <Button onClick={() => onDelete(category)}>
        <DeleteIcon/>
        </Button>  
         <Button >
          <Link to={`/recipes/${id}`}>Read More</Link>
        </Button>
      </Card>
    </>
  );
};

