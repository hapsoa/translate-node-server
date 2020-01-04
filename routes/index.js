var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/translate", function(req, res, next) {
  // res.send("respond with a resourceasdf");

  console.log("!", req.body.text);

  const projectId = "compute-engine-test-237807";
  const location = "global";
  const text = "안녕하세요. 만나서 반갑습니다.";

  // Imports the Google Cloud Translation library
  const {
    TranslationServiceClient
  } = require("@google-cloud/translate").v3beta1;

  // Instantiates a client
  const translationClient = new TranslationServiceClient();
  async function translateText() {
    // Construct request
    const request = {
      parent: translationClient.locationPath(projectId, location),
      contents: [req.body.text],
      mimeType: "text/plain", // mime types: text/plain, text/html
      sourceLanguageCode: "ko",
      targetLanguageCode: "en-US"
    };

    // Run request
    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
      console.log(`Translation: ${translation.translatedText}`);
      res.send(`${translation.translatedText}`);
    }
  }

  translateText();
});

module.exports = router;
