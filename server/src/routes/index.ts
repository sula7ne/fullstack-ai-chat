import aiRoutes from '@/routes/ai.route';
import express from 'express';

const router = express.Router();

router.use('/ai', aiRoutes);

export default router;