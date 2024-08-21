// biblio tmakena bch ta3mil copy w tsajil 
const multer = require("multer");

// biblio bch tsajil tsawer 
const path = require('path')
const fs = require('fs')

// storage instance min multer.diskStorage 

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    const uploadPath = 'public';
    const originalName = file.originalname;
    console.log(file.originalname)
    const fileExtension = path.extname(originalName);
    let fileName = originalName;

    // Vérifier si le fichier existe déjà
    let fileIndex = 1;
    while (fs.existsSync(path.join(uploadPath, fileName))) {
      const baseName = path.basename(originalName, fileExtension);
      fileName = `${baseName}_${fileIndex}${fileExtension}`;
      fileIndex++;
    }

    cb(null, fileName);
  }
})

var uploadImagesUsers = multer({ storage: storage });
module.exports = uploadImagesUsers;