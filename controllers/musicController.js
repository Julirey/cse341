const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const getMusic = async (req, res, next) => {
  //#swagger.tags=["Music"]

  try {
    const result = await mongodb
      .getDb()
      .db("test")
      .collection("music")
      .find();

    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error("Error fetching music:", err);
    res.status(400).json({ message: err.message });
  }
};

const getMusicById = async (req, res, next) => {
  //#swagger.tags=["Music"]

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid music id to find a music.");
  }
  try {
    const musicId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb
      .getDb()
      .db("test")
      .collection("music")
      .find({ _id: musicId })
      .toArray();

      if(!result[0]) {
        return res.status(404).json("music not found.");
      }
      
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching music by id:", err);
    res.status(400).json({ message: err.message });
  }
};

const createMusic = async (req, res) => {
  //#swagger.tags=["Music"]

  const music = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    workTitle: req.body.workTitle,
    key: req.body.key,
    year: req.body.year,
    averageDuration: req.body.averageDuration,
    instrumentation: req.body.instrumentation,
  };

  const response = await mongodb
    .getDb()
    .db("test")
    .collection("music")
    .insertOne(music);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured whilst creating the music");
  }
};

const updateMusic = async (req, res) => {
  //#swagger.tags=["Music"]

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid music id");
  }
  const musicId = ObjectId.createFromHexString(req.params.id);
  const music = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    workTitle: req.body.workTitle,
    key: req.body.key,
    year: req.body.year,
    averageDuration: req.body.averageDuration,
    instrumentation: req.body.instrumentation,
  };
  const response = await mongodb
    .getDb()
    .db("test")
    .collection("music")
    .replaceOne({ _id: musicId }, music);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured whilst updating the music");
  }
};

const deleteMusic = async (req, res) => {
  //#swagger.tags=["Music"]

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid music id to find a music.");
  }
  const musicId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDb()
    .db("test")
    .collection("music")
    .deleteOne({ _id: musicId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured whilst deleting the music");
  }
};

module.exports = { getMusic, getMusicById, createMusic, updateMusic, deleteMusic };
