import Qualification from "../models/qualification.model.js";

// Obtener todas las qualifications
export const getAllQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener qualification por ID
export const getQualificationById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) return res.status(404).json({ message: "Qualification not found" });
    res.json(qualification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear nueva qualification
export const createQualification = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;
    const newQualification = new Qualification({ title, firstname, lastname, email, completion, description });
    await newQualification.save();
    res.status(201).json(newQualification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar qualification por ID
export const updateQualification = async (req, res) => {
  try {
    const updated = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Qualification not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar qualification por ID
export const deleteQualificationById = async (req, res) => {
  try {
    const deleted = await Qualification.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Qualification not found" });
    res.json({ message: "Qualification deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar todas las qualifications
export const deleteAllQualifications = async (req, res) => {
  try {
    await Qualification.deleteMany();
    res.json({ message: "All qualifications deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
