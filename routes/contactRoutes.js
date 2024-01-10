const { Router } = require("express");
const {
    getContact,
    getAllContacts,
    createContact,
    updateContact,
    deleteContact
} = require("../controllers/contactController");
const validateToken = require("../middlewares/validateTokenHandler");


const router = Router();

router.use(validateToken);
router.route("/").get(getAllContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);




module.exports = router;