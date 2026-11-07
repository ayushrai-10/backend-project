import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


cloudinary.config({ 
  cloud_name: 'process.env.CLOUD_NAME', 
  api_key: 'process.env.CLOUD_API_KEY', 
  api_secret: 'process.env.CLOUD_API_SECRET' 
});

cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function(error, result) {console.log(result); });
  const uploadOnCloudinary = async(localFilePath) => {
    try {
      if(!localFilePath) return null;
      //upload file on cloudinary
      const response = await cloudinary.v2.uploader.upload(localFilePath, { public_id: localFilePath.split("/").pop().split(".")[0] });
      return response;
    } catch (error) {
      fs.unlinkSync(localFilePath);// remove the locally saved temporary file as the upload operation got failed
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  }
  export default  uploadOnCloudinary;