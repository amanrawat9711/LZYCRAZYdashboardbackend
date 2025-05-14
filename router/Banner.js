import express from 'express'; 
import { createBanner, deleteBanner, getBanners, getBannersCount } from '../controller/banner.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.get('/', getBanners);
router.get('/count', getBannersCount);
router.post('/create',upload.single("image"), createBanner);
router.post('/delete/:id', deleteBanner);

export default router;