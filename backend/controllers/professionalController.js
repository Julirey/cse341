const mongodb = require("../database/connect");

const getData = async (req, res, next) => {
  const result = await mongodb.getDb().db("test").collection("user").find();

  result.toArray().then((lists) => {
    console.log(lists[0]);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

module.exports = { getData };
