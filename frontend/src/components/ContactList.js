import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getContacts');
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchContacts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Contact List</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id} className="mb-2 border p-2">
            <p><strong>Name:</strong> {contact.first_name} {contact.last_name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Mobile:</strong> {contact.mobile_number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
