const notFound = (req, res, next) => {
  res.status(404).send("<b>Not Found...</b>");
};
module.exports = notFound;
