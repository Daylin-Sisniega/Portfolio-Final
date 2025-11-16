import Contact from "../models/contact.model.js";

// Obtener todos los contactos
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener contacto por ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear nuevo contacto
export const createContact = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;
    const newContact = new Contact({ firstname, lastname, email });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar contacto por ID
export const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar contacto por ID
export const deleteContactById = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar todos los contactos
export const deleteAllContacts = async (req, res) => {
  try {
    await Contact.deleteMany();
    res.json({ message: "All contacts deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
