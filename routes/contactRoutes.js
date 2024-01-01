const { Router } = require("express");
const contactController = require("../controllers/contactController")


const router = Router();

router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getContact);
router.post("/", contactController.createContact);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

module.exports = router;