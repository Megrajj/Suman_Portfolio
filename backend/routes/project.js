// backend/routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Error fetching projects.' });
    }
});

// POST a new project
router.post('/projects', async (req, res) => {
    const { title, description, githubLink, demoLink, image, tags } = req.body;

    try {
        const newProject = new Project({ title, description, githubLink, demoLink, image, tags });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Error creating project.' });
    }
});

// PUT (edit) a project
router.put('/projects/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, githubLink, demoLink, image, tags } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { title, description, githubLink, demoLink, image, tags },
            { new: true }
        );
        if (!updatedProject) return res.status(404).json({ message: 'Project not found.' });
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Error updating project.' });
    }
});

// DELETE a project
router.delete('/projects/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) return res.status(404).json({ message: 'Project not found.' });
        res.status(200).json({ message: 'Project deleted successfully.' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Error deleting project.' });
    }
});

module.exports = router;
