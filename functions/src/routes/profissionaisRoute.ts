'use strict'

const express = require("express");
const controller =require('../controllers/profissionaisController');

const router = new express.Router();

/* find all */
router.get('/:id?', controller.index)

/* create */
router.post('/', controller.store)

/* update */
router.put('/', controller.update)

/* delete */
router.delete('/', controller.delete)

module.exports = router

export{};
