// controllers/collectionsController.js
const db = require("../models");
const { Collection, CollectionRecipe, Recipe } = db;

exports.createCollection = async (req, res) => {
  try {
    const collection = await Collection.create({
      title: req.body.title,
      userId: req.user.id
    });
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addRecipeToCollection = async (req, res) => {
  try {
    await CollectionRecipe.create({
      collectionId: req.params.collectionId,
      recipeId: req.body.recipeId
    });
    res.status(200).json({ message: "Recipe added to collection." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserCollections = async (req, res) => {
  try {
    const collections = await Collection.findAll({
      where: { userId: req.user.id },
      include: {
        model: Recipe,
        through: { attributes: [] } // no extra join data
      }
    });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
