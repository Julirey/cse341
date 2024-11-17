const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const getContacts = async (req, res, next) => {
  //#swagger.tags=["Contacts"]

  const result = await mongodb.getDb().db("test").collection("contacts").find();

  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getContactsById = async (req, res, next) => {
  //#swagger.tags=["Contacts"]

  const contactId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb.getDb().db("test").collection("contacts").find({ _id: contactId });

  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  //#swagger.tags=["Contacts"]

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDb()
    .db("test")
    .collection("contacts")
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured whilst creating the contact");
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=["Contacts"]

  const contactId = ObjectId.createFromHexString(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db("test")
    .collection("contacts")
    .replaceOne({ _id: contactId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured whilst updating the contact");
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=["Contacts"]

  const contactId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDb()
    .db("test")
    .collection("contacts")
    .deleteOne({ _id: contactId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured whilst deleting the contact");
  }
};

module.exports = { getContacts, getContactsById, createContact, updateContact, deleteContact };
