const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags and include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product,
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a specific tag by ID and include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId, {
      include: Product,
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found.' });
    } else {
      res.status(200).json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT update a tag's name by its ID
router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const [updatedRowsCount, updatedTag] = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: {
          id: tagId,
        },
      }
    );
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: 'Tag not found.' });
    } else {
      res.status(200).json(updatedTag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a tag by its ID
router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const deletedTag = await Tag.destroy({
      where: {
        id: tagId,
      },
    });
    if (!deletedTag) {
      res.status(404).json({ message: 'Tag not found.' });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
