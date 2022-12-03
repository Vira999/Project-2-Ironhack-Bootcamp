const express = require('express');
const User = require('../models/User.model');
const isSameChef = require('../middleware/isSameChef');
const router = express.Router();

router.get("/chefs/", (req, res) => {
    User.find()
    .then (allChefs => res.render('../views/chefs.hbs', { chefs: allChefs}))
    .catch(err => res.send(err))
});

router.get("/chefs/:id", (req, res) => {
    const chefId = req.params.id;
  
    User
    .findById(chefId)
    .populate({
      path: 'userRecipes',
      populate: {path: 'recipes'}})
    .then((response) => {
      res.render("../views/user-profile.hbs", { user: response.data });
    })
    .catch(error => console.log(error));
  });

  module.exports = router;