import express from 'express';
import { createValidator } from 'express-joi-validation';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getAutoSuggestUsers,
  getUser,
  updateUser,
} from './controllers/users';
import { userValidationSchema } from '../entities/crud';

const router = express.Router();
const validator = createValidator();

router
  .route('/')
  .get(getAllUsers)
  .post(validator.body(userValidationSchema), createUser);
router.route('/getAutoSuggestUsers').get(getAutoSuggestUsers);
router
  .route('/:user_id')
  .get(getUser)
  .put(validator.body(userValidationSchema), updateUser)
  .delete(deleteUser);

export default router;
