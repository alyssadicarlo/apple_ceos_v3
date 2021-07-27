'use strict';

const express = require('express');
const slugify = require('slugify');
const router = express.Router();
const ExecutiveModel = require('../models/ExecutiveModel');

router.get('/', async (req, res) => {
    const executiveData = await ExecutiveModel.getAll();

    res.json(executiveData);
});

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    const theCEO = await ExecutiveModel.getBySlug(slug);

    res.json(theCEO);
});

router.post('/', async (req, res) => {
    const { ceo_name, ceo_year } = req.body;

    const slug = slugify(ceo_name, {
        replacement: '_',
        lower: true,
        strict: true
    });

    const newExecutive = new ExecutiveModel(null, ceo_name, slug, ceo_year);
    
    const response = await newExecutive.addEntry();

    res.sendStatus(200);
});

router.post('/delete', async (req, res) => {
    const { id, ceo_name, slug, ceo_year } = req.body;

    const executiveToDelete = new ExecutiveModel(id, ceo_name, slug, ceo_year);
    
    const response = await executiveToDelete.deleteEntry();
    
    res.sendStatus(200);
});

module.exports = router;