import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/resumes')
    },
    filename: function (req, file, cb) {
      const fielName = Date.now() + '-' + file.originalname;
      cb(null, fielName)
    }
  })
  
  export const fileUpload = multer({ storage: storageConfig })