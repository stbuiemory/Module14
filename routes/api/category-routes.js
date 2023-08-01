const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories and included its associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product, 
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a specific category by ID and included its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      include: Product, 
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found.' });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT update a category by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const [updatedRowsCount, updatedCategory] = await Category.update(
      req.body,
      {
        where: {
          id: categoryId,
        },
      }
    );
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: 'Category not found.' });
    } else {
      res.status(200).json(updatedCategory);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category by its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.destroy({
      where: {
        id: categoryId,
      },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found.' });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
