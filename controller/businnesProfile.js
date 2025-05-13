import BusinessProfile from "../model/businessProfile.js";

export const getBusinesses = async (req, res) => {
  try {
    const businesses = await BusinessProfile.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBusiness = async (req, res) => {
  try {
    const { name, category, contact, location } = req.body;
    const logo = req.file?.path;

    if (!name || !logo) {
      return res.status(400).json({
        success: false,
        message: "Name and logo are required fields",
      });
    }

    const business = new BusinessProfile({
      name,
      category,
      contact,
      location,
      logo,
    });

    await business.save();

    res.status(201).json({ success: true, business });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



export const getBusinessProfileCount = async (req, res) => {
  try {
    const count = await BusinessProfile.countDocuments();
    res.status(200).json({ success: true, totalBusinessProfile: count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteBusiness = async(req,res)=>{
   try {
    const {id} = req.params
    const deletedBusiness = await BusinessProfile.findByIdAndDelete(id)
    res.status(200).json({ success: true, message:"Deleted Succesfully",deletedBusiness });
   } catch (error) {
    res.status(500).json({ success: false, message: error.message });
   }
}