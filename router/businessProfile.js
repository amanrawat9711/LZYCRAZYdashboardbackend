import express from 'express'; 
import { createBusiness, deleteBusiness, getBusinesses, getBusinessProfileCount } from '../controller/businnesProfile.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.get('/', getBusinesses);
router.get('/count', getBusinessProfileCount);
router.post('/create',upload.single("logo"), createBusiness);
router.post('/delete/:id', deleteBusiness);

export default router;