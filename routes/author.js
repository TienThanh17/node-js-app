const authorController = require("../controller/authorController");
const router = require("express").Router();

router.post("/", authorController.addAuthor);
router.get("/", authorController.getAllAuthors);
router.get("/:id", authorController.getAuthor);

module.exports = router;
