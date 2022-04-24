const error = (err, req, res, next) => {
  res.status(500).send("somthig failed.....");
};

module.exports = error;
