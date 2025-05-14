import Ad from "../model/ad.js";

export const createAd = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.path;

    if (!title || !description || !image) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and image are required fields',
      });
    }

    const ad = new Ad({ title, description, image });
    await ad.save();

    res.status(201).json({ success: true, ad });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdsCount = async (req, res) => {
  try {
    const count = await Ad.countDocuments();
    res.status(200).json({ success: true, totalAds: count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAds = async(req,res)=>{
   try {
    const {id} = req.params
    const deletedAds = await Ad.findByIdAndDelete(id)
    res.status(200).json({ success: true, message:"Deleted Succesfully",deletedAds });
   } catch (error) {
    res.status(500).json({ success: false, message: error.message });
   }
}