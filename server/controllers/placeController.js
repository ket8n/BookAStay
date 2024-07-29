import Place from "../models/Place.js";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const createPlace = (req, res) => {
  const { token } = req.cookies;

  const {
    title,
    address,
    type,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;

      Place.create({
        owner: userData.id,
        title,
        address,
        type,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      })
        .then((res) => {
          res.json(res);
        })
        .catch((err) => res.json(err));
    });
  } else {
    res.json(null);
  }
};

export const getUserPlaces = (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    Place.find({ owner: id }).then((response) => {
      res.json(response);
    });
  });
};

export const getPlaceById = (req, res) => {
  const { id } = req.params;

  Place.findById(id).then((response) => {
    res.json(response);
  });
};

export const updatePlace = (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    type,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        type,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });

      await placeDoc.save();
      res.json("ok");
    }
  });
};

export const getAllPlaces = (req, res) => {
  Place.find().then((response) => {
    res.json(response);
  });
};
