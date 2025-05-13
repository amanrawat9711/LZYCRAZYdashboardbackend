import express from 'express'; 
import { createAd, deleteAds, getAds, getAdsCount } from '../controller/ad.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.get('/', getAds);
router.get('/count', getAdsCount);
router.post('/create',upload.single("image"), createAd);
router.post('/delete/:id', deleteAds);

export default router;