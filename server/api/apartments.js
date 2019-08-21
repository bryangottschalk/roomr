const router = require('express').Router();
const { Apartment } = require('../db/models/');

router.get('/', async (req, res, next) => {
  try {
    const apartments = await Apartment.findAll({ include: [{ all: true }] });
    res.json(apartments);
  } catch (err) {
    next(err);
  }
});

router.get('/:apartmentId', async (req, res, next) => {
  try {
    const apartment = await Apartment.findByPk(req.params.apartmentId);
    res.json(apartment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
