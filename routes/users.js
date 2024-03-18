const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find().exec();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
  } catch (err) {
      next(err);
  }
});

module.exports = router;
