import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("upload.ejs");
});

app.post(
  "/upload",
  upload.fields([{ name: "first" }, { name: "second" }]),
  (req, res) => {
    // Convert file buffers to base64 strings for embedding directly in the HTML
    console.log(`Username: ${req.body["username"]}`);
    const images = {
      first: `data:${req.files["first"][0].mimetype};base64,${req.files[
        "first"
      ][0].buffer.toString("base64")}`,
      second: `data:${req.files["second"][0].mimetype};base64,${req.files[
        "second"
      ][0].buffer.toString("base64")}`,
      name: req.body["username"],
    };

    res.render("main.ejs", { faces: images });
  }
);
