const router = require('express').Router();
const Restaurant = require('./../models/Restaurant');

router.route('/restaurants').get((req, res) => {
  Restaurant.find()
    .then(restaurants => res.status(200).json(restaurants))
    .catch(err => res.status(404).json(err));
});

router.route('/').get((req, res) => {
  Restaurant.findOne({name: req.body.name})
    .then(restaurant => res.status(200).json(restaurant))
    .catch(err => res.status(404).json(err))
});

router.route('/').post((req, res) => {
  if (req.body == null) {
    res.status(204).json({"status" : "No Content"});
  }
  let name = req.body.name;
  let location = req.body.location;
  let orders = req.body.orders && req.body.orders.split(',').map(order => order.trim());
  let notes = [req.body.note];
  let ratings = [req.body.rating];
  let ratingCount = 1;
  let prices = [req.body.price];
  let priceCount = 1;
  Restaurant.create({
    name,
    location,
    orders,
    notes,
    ratings,
    ratingCount,
    prices,
    priceCount
  })
    .then(restaurant => res.status(201).json(restaurant))
    .catch(err => res.status(400).json(err));
});

router.route('/').put((req, res) => {
  if (req.body == null) {
    res.status(204).json({"status" : "No Content"});
  }
  let query = {name: req.body.name};
  let options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false};
  let update = {
    updatedAt: new Date(),
    $push : {},
    $inc : {}
    };
  req.body.location ? update.location = req.body.location : null
  if (req.body.rating) {
    update.$push.ratings = req.body.rating;
    update.$inc.ratingCount = 1
  }
  if (req.body.price) {
    update.$push.prices = req.body.price;
    update.$inc.priceCount = 1
  }
  req.body.note == undefined ? null : update.$push.notes = req.body.note;
  req.body.orders == undefined ? null : update.$push.orders = {$each : req.body.orders.split(',').map(order => order.trim())};
  Restaurant.findOneAndUpdate(query, update, options)
  .then(restaurant => res.status(201).json(restaurant))
  .catch(err => res.status(400).json(err))
});

router.route('/').delete((req, res) => {
  let query = {"name" : req.body.name};
  let options = {};
  Restaurant.findOneAndDelete(query, options)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(404).json(err))
});

router.route('/:id').get((req, res) => {
  Restaurant.findById(req.params.id)
  .then(restaurant => res.status(200).json(restaurant))
  .catch(err => res.status(404).json(err))
});

router.route('/:id').delete((req, res) => {
  Restaurant.findByIdAndDelete(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(err => res.status(404).json(err))
});

module.exports = router;