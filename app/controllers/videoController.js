var client = require("../repo/mongodbConnection");

exports.playVideo = (req, res) => {
  //const videosCollection = client.db("").collection("Video");
  // check if the email and password are right
  videosCollection
    .find()
    .toArray()
    .then(
      (data) => {
        if (!data) {
          res.json({
            msg: "No Videos for now",
          });
        } else {
          res.json({
            dataArr: data,
            msg: 1,
          });
        }
      },
      (err) => {
        console.log("err" + err);
      }
    );
};
