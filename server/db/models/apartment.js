const Sequelize = require('sequelize');
const db = require('../db');

const Apartment = db.define('apartment', {
  name: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  unit: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  state: { type: Sequelize.STRING },
  zip: { type: Sequelize.INTEGER },
  description: { type: Sequelize.TEXT },
  numBedrooms: { type: Sequelize.INTEGER },
  numBathrooms: { type: Sequelize.INTEGER },
  squareFeet: { type: Sequelize.INTEGER },
  monthlyRent: { type: Sequelize.INTEGER }
  // petFriendly: { type: Sequelize.BOOLEAN },

  // neighborhood: { type: Sequelize.STRING },
  // airConditioning: { type: Sequelize.BOOLEAN },
  // internet: { type: Sequelize.BOOLEAN },
  // laundry: { type: Sequelize.BOOLEAN },
  // parking: { type: Sequelize.BOOLEAN },
  // walkScore: { type: Sequelize.INTEGER },
  // bikeScore: { type: Sequelize.INTEGER },
  // transitScore: { type: Sequelize.INTEGER },
  // nearestMetroStationName: { type: Sequelize.STRING },
  // nearestMetroStationColor: { type: Sequelize.STRING }
});

module.exports = Apartment;