const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const getUsers = async (req, res, next) => {
  //#swagger.tags=["Users"]

  try {
    const result = await mongodb
      .getDb()
      .db("test")
      .collection("users")
      .find();

    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error("Error fetching Users:", err);
    res.status(400).json({ message: err.message });
  }
};

const getUserById = async (req, res, next) => {
  //#swagger.tags=["Users"]

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user id to find a user.");
  }
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb
      .getDb()
      .db("test")
      .collection("users")
      .find({ _id: userId })
      .toArray();

      if(!result[0]) {
        return res.status(404).json("user not found.");
      }
      
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching user by id:", err);
    res.status(400).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=["Users"]

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDb()
    .db("test")
    .collection("users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured whilst creating the user");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=["Users"]

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user id");
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db("test")
    .collection("users")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured whilst updating the user");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=["Users"]

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user id to find a user.");
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDb()
    .db("test")
    .collection("users")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured whilst deleting the user");
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
