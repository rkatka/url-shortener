const Router = require("express").Router,
  router = Router(),
  btoa = require("btoa"),
  atob = require("atob"),
  URL = require("./url/url.model");

// shorten
router.post("/shorten", function(req, res) {
  console.log(req.body.url);
  const urlData = req.body.url;
  URL.findOne({ url: urlData }, function(err, doc) {
    if (doc) {
      console.log("entry found in db");
      res.send({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: "OK"
      });
    } else {
      console.log("entry NOT found in db, saving new");
      var url = new URL({
        url: urlData
      });
      url.save(function(err) {
        if (err) return console.error(err);
        res.send({
          url: urlData,
          hash: btoa(url._id),
          status: 200,
          statusTxt: "OK"
        });
      });
    }
  });
});

// redirect
router.get("/:hash", function(req, res) {
  const baseid = req.params.hash;
  const id = atob(baseid);
  URL.findOne({ _id: id }, function(err, doc) {
    if (doc) {
      res.redirect(doc.url);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
