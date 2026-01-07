import multer from "multer";
import path from "path";
export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dateFolder = new Date().toISOString().split("T")[0]; // Use date as the folder name
    const uploadPath = path.join("./public/uploads", dateFolder);

    // Create the folder if it doesn't exist
    require("fs").mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${file.originalname.substring(
        file.originalname.lastIndexOf(".")
      )}`
    );
  },
});

const upload = multer({ storage });

const uploadApi = async (req, res) => {
 console.log('test')
  try {
    await new Promise((resolve, reject) => {
      upload.single("file")(req, res, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });

    // Access the 'file' property after the multer middleware processes the file
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Assuming the uploaded file is saved in the public/uploads folder
    const dateFolder = new Date().toISOString().split("T")[0];
    const fileName = uploadedFile.filename;
    const filePath = path.join("uploads", dateFolder, fileName);

    res.status(200).json({ message: "Image uploaded successfully", filePath });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error uploading image" });
  }
};

export default uploadApi;
