import { Router } from 'express';
import { authController, logoutController, registerController } from '../../controllers/auth/auth.controller';

const router = Router();

/* Register */
router.post('/register', registerController);

/* Login */
router.post('/login', authController);

router.get('/logout', logoutController);

export default router;
