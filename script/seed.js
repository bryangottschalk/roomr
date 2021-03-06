'use strict';

const db = require('../server/db');
const {
  User,
  Apartment,
  Photo,
  Chatroom,
  UserApartment
} = require('../server/db/models');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const apartments = [];

const apartmentData = path.join(__dirname, 'apartment_data.csv');
fs.createReadStream(apartmentData)
  .pipe(csv())
  .on('data', data => apartments.push(data))
  .on('end', () => {
    console.log(apartments);
  });
const chatroom = [];
const chatroomData = path.join(__dirname, 'chatroom_data.csv');
fs.createReadStream(chatroomData)
  .pipe(csv())
  .on('data', data => chatroom.push(data))
  .on('end', () => {
    console.log(chatroom);
  });
const photos = [];
const photoData = path.join(__dirname, 'photo_data.csv');
fs.createReadStream(photoData)
  .pipe(csv())
  .on('data', data => photos.push(data))
  .on('end', () => {
    console.log(photos);
  });

// const users = [];
// const userData = path.join(__dirname, 'user_data.csv');
// fs.createReadStream(userData)
//   .pipe(csv())
//   .on('data', data => users.push(data))
//   .on('end', () => {
//     console.log(users);
//   });

const userApartments = [];
const userApartmentData = path.join(__dirname, 'user_apartment_data.csv');
fs.createReadStream(userApartmentData)
  .pipe(csv())
  .on('data', data => userApartments.push(data))
  .on('end', () => {
    console.log(userApartments);
  });

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Codes',
      password: '123',
      phone: 2488724135,
      email: 'cody@email.com',
      photo: 'https://robohash.org/cody',
      bio: 'i love to code',
      age: '18',
      gender: 'MALE',
      job: 'fullstack developer',
      hasCat: true,
      hasDog: true,
      allergicToCat: false,
      allergicToDog: false,
    }),
    User.create({
      firstName: 'Joey',
      lastName: 'Doe',
      phone: 9147086765,
      password: '123',
      email: 'joey@email.com',
      photo: 'https://robohash.org/joey',
      bio: 'cool dog looking for a nice place to live',
      age: '21',
      gender: 'MALE',
      job: 'sprinter',
      hasCat: true,
      hasDog: false,
      allergicToCat: false,
      allergicToDog: true
    }),
    User.create({
      firstName: 'Rocky',
      lastName: 'Smith',
      phone: 1112222,
      password: '123',
      email: 'rockyrocks@email.com',
      photo: 'https://robohash.org/rocky',
      bio: 'rock enthusiast',
      age: '24',
      gender: 'MALE',
      job: 'mailman',
      hasCat: false,
      hasDog: false,
      allergicToCat: true,
      allergicToDog: false
    }),
    User.create({
      firstName: 'Baxter',
      lastName: 'Harris',
      phone: 1232222,
      password: '123',
      email: 'baxter@email.com',
      photo: 'https://robohash.org/baxter',
      bio: 'a good boy',
      age: '24',
      gender: 'MALE',
      job: 'mall cop',
      hasCat: false,
      hasDog: false,
      allergicToCat: false,
      allergicToDog: false
    }),
    User.create({
      firstName: 'Felix',
      lastName: 'Martin',
      phone: 1389798,
      password: '123',
      email: 'jack@email.com',
      photo: 'https://robohash.org/jack',
      bio: 'cool cat',
      age: '24',
      gender: 'MALE',
      job: 'chef',
      hasCat: false,
      hasDog: false,
      allergicToCat: true,
      allergicToDog: true

    }),
    User.create({
      firstName: 'Jody',
      lastName: 'Brown',
      phone: 888,
      password: '123',
      email: 'jody@email.com',
      photo: 'https://robohash.org/jody',
      bio: 'i like birds',
      age: '40',
      gender: 'FEMALE',
      job: 'bird watcher',
      hasCat: false,
      hasDog: false,
      allergicToCat: true,
      allergicToDog: true
    }),
    User.create({
      firstName: 'Sue',
      lastName: 'Jones',
      phone: 999,
      password: '123',
      email: 'suejones@email.com',
      photo: 'https://robohash.org/sue',
      bio: 'ask me about my tempurpedic',
      age: '25',
      gender: 'FEMALE',
      job: 'bank teller',
      hasCat: false,
      hasDog: false,
      allergicToCat: true,
      allergicToDog: true
    }),
    User.create({
      firstName: 'Pat',
      lastName: 'Stewart',
      phone: 111,
      password: '123',
      email: 'patty@email.com',
      photo: 'https://robohash.org/pat',
      bio: 'i like long walks on the beach',
      age: '20',
      gender: 'OTHER',
      job: 'food taster',
      hasCat: false,
      hasDog: false,
      allergicToCat: true,
      allergicToDog: true
    }),
    User.create({
      firstName: 'Linda',
      lastName: 'Baker',
      phone: 100,
      password: '123',
      email: 'lindaaaaaa@email.com',
      photo: 'https://robohash.org/linda',
      bio: 'i have 20 cats',
      age: '20',
      gender: 'OTHER',
      job: 'youtuber',
      hasCat: true,
      hasDog: false,
      allergicToCat: false,
      allergicToDog: true
    }),
    User.create({
      firstName: 'Bryan',
      lastName: 'Howard',
      phone: 248,
      password: '123',
      email: 'mysteryband@email.com',
      photo: 'https://robohash.org/bryan',
      bio: 'find me on band camp',
      age: '25',
      gender: 'MALE',
      job: 'band manager and lead vocalist and drummer',
      hasCat: true,
      hasDog: false,
      allergicToCat: false,
      allergicToDog: true
    })

  ]);
  const createApartments = [];
  apartments.forEach(apt => createApartments.push(Apartment.create(apt)));
  await Promise.all(createApartments);

  const createPhotos = [];
  photos.forEach(photo => createPhotos.push(Photo.create(photo)));
  await Promise.all(createPhotos);

  // const createUsers = [];
  // users.forEach(user => createUsers.push(User.create(user)));
  // await Promise.all(createUsers);

  const createUserApartments = [];
  userApartments.forEach(ua =>
    createUserApartments.push(UserApartment.create(ua))
  );
  await Promise.all(createUserApartments);

  const chats = await Promise.all([
    Chatroom.create({
      chatId: '1-2',
      user1Id: 1,
      user2Id: 2
    })
  ]);

  // const createChatroom = [];
  // chatroom.forEach(chatroom => createChatroom.push(Chatroom.create(chatroom)));
  // Promise.all(createChatroom);
  // const apartments = await Promise.all([
  //   Apartment.create({
  //     name: 'The Maynard at 2545 W Fitch',
  //     address: '2545 W Fitch Ave',
  //     latitude: 42.010998,
  //     longitude: -87.694581,
  //     unit: '108',
  //     city: 'Chicago',
  //     state: 'IL',
  //     zip: 606045,
  //     description:
  //       "Lorem ipsum dolor amet beard tousled glossier hella cred PBR&B next level pitchfork crucifix schlitz yr you probably haven't heard of them meditation lo-fi lyft. Edison bulb echo park snackwave venmo food truck tofu mlkshk XOXO PBR&B gluten-free letterpress schlitz salvia.",
  //     numBedrooms: 1,
  //     numBathrooms: 1,
  //     squareFeet: 500,
  //     monthlyRent: 950,
  //     image: 'https://images1.apartments.com/i2/jYTnEHm0266ZQnXPtfrzf6cgcprnpb2ptt2h7JgpVFs/116/the-maynard-at-2545-w-fitch-chicago-il-primary-photo.jpg'
  //   }),
  //   Apartment.create({
  //     name: '415 Premier',
  //     address: '415 W Howard St',
  //     latitude: 42.019565,
  //     longitude: -87.674722,
  //     unit: 'B2',
  //     city: 'Evanston',
  //     state: 'IL',
  //     zip: 60202,
  //     description:
  //       'Poutine enamel pin selvage DIY waistcoat readymade shaman chartreuse. Godard +1 selvage chartreuse gochujang unicorn cornhole tumeric vape live-edge synth pitchfork affogato edison bulb.',
  //     numBedrooms: 2,
  //     numBathrooms: 2,
  //     squareFeet: 1149,
  //     monthlyRent: 1848,
  //     image: 'https://images1.apartments.com/i2/TZ_IfIVeeXHLH2SRJMh_imTM_DXFq6t3mJQ22XoRglk/116/415-premier-evanston-il-building-photo.jpg'
  //   }),
  //   Apartment.create({
  //     name: 'MILA',
  //     address: '201 N Garland Ct',
  //     latitude: 41.886093,
  //     longitude: -87.624904,
  //     unit: '07',
  //     city: 'Chicago',
  //     state: 'IL',
  //     zip: 60601,
  //     description:
  //       'Unicorn tote bag disrupt salvia locavore pabst biodiesel vaporware beard. Mustache offal tbh succulents, man braid hoodie snackwave synth tumblr.',
  //     numBedrooms: 2,
  //     numBathrooms: 2,
  //     squareFeet: 1107,
  //     monthlyRent: 3284,
  //     image: 'https://images1.apartments.com/i2/Feqx7UDZjFJjNrncTHZT1Qnh02GDaZEPCcaEmc_oOFc/116/mila-chicago-il-building-photo.jpg'

  // const createUserApartments = [];
  // userApartments.forEach(ua =>
  //   createUserApartments.push(UserApartment.create(ua))
  // );
  // await Promise.all(createUserApartments);

  console.log(`seeded ${apartments.length} apartments`);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${chats.length} chats`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
