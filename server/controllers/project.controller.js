import Project from "../models/project.model.js";

// Obtener todos los proyectos
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener proyecto por ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear nuevo proyecto
export const createProject = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;
    const newProject = new Project({ title, firstname, lastname, email, completion, description });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar proyecto por ID
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar proyecto por ID
export const deleteProjectById = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar todos los proyectos
export const deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany();
    res.json({ message: "All projects deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
