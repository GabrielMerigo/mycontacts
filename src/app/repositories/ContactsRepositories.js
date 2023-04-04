const { v4: uuid, v4 } = require("uuid");

let contacts = [
  {
    id: uuid(),
    name: "Gabriel",
    email: "gabriel@merigo.com",
    phone: "83812763123",
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: "Matheus",
    email: "matheus@merigo.com",
    phone: "93812938712",
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => {
      const contact = contacts.find((contact) => contact.id === id);
      resolve(contact);
    });
  }

  findByEmail(email) {
    return new Promise((resolve) =>
      resolve(contacts.find((contact) => contact.email === email))
    );
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve(contacts);
    });
  }

  create({ name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updateContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) =>
        contact.id === id ? updateContact : contact
      );

      resolve(updateContact);
    });
  }
}

module.exports = new ContactsRepository();
