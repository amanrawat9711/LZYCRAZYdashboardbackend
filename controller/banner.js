import Banner from "../model/banner.js";

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBanner = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file?.path;

    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: "Title and image are required fields",
      });
    }

    const banner = new Banner({ title, image });
    await banner.save();

    res.status(201).json({ success: true, banner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getBannersCount = async (req, res) => {
  try {
    const count = await Banner.countDocuments();
    res.status(200).json({ success: true, totalBanners: count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBanner = async(req,res)=>{
   try {
    const {id} = req.params
    const deletedBanner = await Banner.findByIdAndDelete(id)
    res.status(200).json({ success: true, message:"Deleted Succesfully",deletedBanner });
   } catch (error) {
    res.status(500).json({ success: false, message: error.message });
   }
}