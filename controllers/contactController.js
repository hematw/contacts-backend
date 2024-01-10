const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

// @desc get All Contacts
// @route GET /api/contacts
// @access private
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id});
    res.status(200).json(contacts);
})

// @desc get Contact
// @route GET api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You don't have permission to see this contact")
    }
    res.status(200).json(contact)
})

// @desc create a new Contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required!")
    }

    const newContact = await Contact.create({
        user_id: req.user.id,
        name,
        email,
        phone
    });
    await newContact.save()

    res.status(201).json(newContact);
})

// @desc update a Contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You don't have permission to update this contact")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
    )
    res.status(200).json(updatedContact)
})

// @desc remove a Contact
// @route DELETE /api/contacts/:id
// @access private 
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You don't have permission to delete this contact")
    }
    const deletedContact = await Contact.findByIdAndDelete(
        req.params.id
    )
    res.status(200).json(deletedContact)
})

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};