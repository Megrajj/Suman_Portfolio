// backend/models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    githubLink: { type: String, required: true },
    demoLink: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: String, required: false },
});

module.exports = mongoose.model('Project', ProjectSchema);
