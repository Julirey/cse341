const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const getContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db("test").collection("contacts").find();

  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getContactsById = async (req, res, next) => {
  const contactId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb.getDb().db("test").collection("contacts").find({ _id: contactId });

  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

module.exports = { getContacts, getContactsById };
