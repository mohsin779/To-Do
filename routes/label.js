const express = require("express");

const labelController = require("../controllers/label");
const router = express.Router();

router.post("/add-label", labelController.addLabel);
router.get("/get-labels", labelController.getLabels);
router.delete("/delete-label/:id", labelController.deleteLabel);

module.exports = router;
