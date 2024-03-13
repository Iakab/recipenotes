import Ingredients from './ingredients/ingredients';
import NameAndDescription from './nameAndDescription/nameAndDescription';
import Nutrition from './nutrition/nutrition';
import Tags from './tags/tags';
import UploadImage from './uploadImage/uploadImage';

import './steps.scss';

export const steps = [
  { label: 'Upload image', content: <UploadImage />, id: '1' },
  { label: 'Name and description', content: <NameAndDescription />, id: '2' },
  { label: 'Ingredients', content: <Ingredients />, id: '3' },
  { label: 'Select tags', content: <Tags />, id: '4' },
  { label: 'Nutrition(optional)', content: <Nutrition />, id: '5' },
];

export default steps;
