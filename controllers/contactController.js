const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required!")
    }

    const newContact = await Contact.create({
        name,
        email,
        phone
    });
    await newContact.save()

    res.status(201).json(newContact);
})

const updateContact = asyncHandler(async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
    )
    if (!updatedContact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {
    const deletedContact = await Contact.findByIdAndDelete(
        req.params.id, req.body, { new: true }
    )
    if (!deletedContact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    res.status(200).json(deletedContact)
})

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};