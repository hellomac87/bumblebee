import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth';
import * as validator from '../middleware/validator';

const router = express.Router();

// POST /posts
router.post('/signup', validator.validateSignup, authController.signup);
router.post('/login', validator.validateCredential, authController.login);

router.get('/me', (req, res, next) => {
    res.json({});
});

export default router;
