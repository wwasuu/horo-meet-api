const { Router } = require("express");
const { calculateByDateTime, calculateByDate, calendar } = require("../controller/calculate");

const router = Router();

router.post("/", calculateByDateTime);
router.post("/date", calculateByDate);
router.get("/calendar", calendar);

module.exports = router;