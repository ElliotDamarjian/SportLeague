const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

//set to store player images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));


//include routes
require("./app/routes/team.routes.js")(app);
require("./app/routes/player.routes.js")(app);
require("./app/routes/coach.routes.js")(app);
require("./app/routes/lookup.routes.js")(app);
require("./app/routes/leagues.routes.js")(app);


// route for player imgs
app.post("/players/:id/photo", upload.single('photo'), async (req, res) => {
  try {
    const playerId = req.params.id;
    const filePath = req.file.path;
    
    
    const Person = require("./app/models/person.model.js");
    await Person.updateById(playerId, { logo_path: filePath });
    
    res.json({ message: "Photo uploaded successfully", filePath: filePath });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
