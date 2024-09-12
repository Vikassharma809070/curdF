const axios = require('axios');
const Contact = require('../models/contact');

// Create Contact
exports.createContact = async (req, res) => {
  const { first_name, last_name, email, mobile_number, data_store } = req.body;

  if (data_store === 'CRM') {
    try {
      const response = await axios.post('"https://domain.myfreshworks.com/crm/sales/api/contacts/', {
        first_name,
        last_name,
        email,
        mobile_number,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.FRESHSALES_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      res.status(201).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error creating contact in CRM' });
    }
  } else if (data_store === 'DATABASE') {
    try {
      const newContact = new Contact({ first_name, last_name, email, mobile_number });
      await newContact.save();
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ error: 'Error creating contact in database' });
    }
  } else {
    res.status(400).json({ error: 'Invalid data_store value' });
  }
};

// Get Contact
exports.getContact = async (req, res) => {
  const { contact_id, data_store } = req.body;

  if (data_store === 'CRM') {
    try {
      const response = await axios.get(`https://domain.myfreshworks.com/crm/sales/api/contacts/${contact_id}`, {
        headers: {
          'Authorization': `Bearer ${process.env.FRESHSALES_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving contact from CRM' });
    }
  } else if (data_store === 'DATABASE') {
    try {
      const contact = await Contact.findById(contact_id);
      if (!contact) return res.status(404).json({ error: 'Contact not found' });
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving contact from database' });
    }
  } else {
    res.status(400).json({ error: 'Invalid data_store value' });
  }
};

// Update Contact
exports.updateContact = async (req, res) => {
  const { contact_id, new_email, new_mobile_number, data_store } = req.body;

  if (data_store === 'CRM') {
    try {
      const response = await axios.put(`https://domain.myfreshworks.com/crm/sales/api/contacts/${contact_id}`, {
        email: new_email,
        mobile_number: new_mobile_number,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.FRESHSALES_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error updating contact in CRM' });
    }
  } else if (data_store === 'DATABASE') {
    try {
      const contact = await Contact.findByIdAndUpdate(contact_id, {
        email: new_email,
        mobile_number: new_mobile_number,
      }, { new: true });
      if (!contact) return res.status(404).json({ error: 'Contact not found' });
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: 'Error updating contact in database' });
    }
  } else {
    res.status(400).json({ error: 'Invalid data_store value' });
  }
};

// Delete Contact
exports.deleteContact = async (req, res) => {
  const { contact_id, data_store } = req.body;

  if (data_store === 'CRM') {
    try {
      const response = await axios.delete(`https://domain.myfreshworks.com/crm/sales/api/contacts/${contact_id}`, {
        headers: {
          'Authorization': `Bearer ${process.env.FRESHSALES_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting contact from CRM' });
    }
  } else if (data_store === 'DATABASE') {
    try {
      const contact = await Contact.findByIdAndDelete(contact_id);
      if (!contact) return res.status(404).json({ error: 'Contact not found' });
      res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting contact from database' });
    }
  } else {
    res.status(400).json({ error: 'Invalid data_store value' });
  }
};
