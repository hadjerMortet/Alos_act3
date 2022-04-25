const express = require("express");
const joi = require("joi");
const route = express.Router();
const Restaurants = require("../../Restaurants.json");
const validatee = require("../routes/middlewares/validate");

route.get("/", (req, res) => {
  res.json(Restaurants);
});
route.get("/:id", (req, res) => {
  const index = Restaurants.find((e) => e.id === req.params.id);
  index ? res.status(200).json(index) : res.status(404).send("NOT FOUND");
});
route.post("/", validatee, (req, res) => {
  const id = Restaurants[Restaurants.length - 1].id + 1;
  Restaurants.push({ id, ...req.body });
  //throw error to test error handling
  res.status(200).send("added succefuly");
});
route.put("/:id", validatee, (req, res) => {
  const index = Restaurants.find((e) => e.id === req.params.id);
  Restaurants[index] = req.body;
  res.status(200).send("Updated  succefuly");
});
route.delete("/:id", (req, res) => {
  const newrestaurant = Restaurants.filter((e) => e.id != req.params.id);
  Restaurants = newrestaurant;
  res.status(200).send("deleted   succefuly");
});

module.exports = route;
