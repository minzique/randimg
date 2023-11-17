import { getImages } from "icloud-shared-album";
import { ALBUM_TOKEN, PORT } from "../config.js";
import express from "express";
import request from "request";

const app = express();
app.disable("x-powered-by");

app.get("/", async (req, res) => {
  // download image from url and send as encoded file
  const image = await getImages(ALBUM_TOKEN)
    .then((d) => d.photos)
    .then((photos) => photos[Math.floor(Math.random() * photos.length)]);
  console.log(image);
  const url = image.derivatives[image.height.toString()].url;

  request({
      url: url,
      encoding: null,
    },
    (err, resp, buffer) => {
      if (!err && resp.statusCode === 200) {
        res.set("Content-Type", "image/jpeg");
        res.send(resp.body);
      }
    }
  );
});


app.listen(PORT, () => {
  console.log("started randimg on port " + PORT);
});
