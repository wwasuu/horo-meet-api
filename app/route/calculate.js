const { Router } = require("express");
const { calculateByDateTime, calculateByDate } = require("../controller/calculate");

const router = Router();

router.post("/", calculateByDateTime);
router.post("/date", calculateByDate);

module.exports = router;