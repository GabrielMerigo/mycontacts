const { v4: uuid, v4 } = require("uuid");
const db = require("../../database");

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
  async findAll() {
    const rows = await db.query("SELECT * FROM contacts");
    return rows;
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

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(
      `
      INSERT INTO contacts(name, email, phone, category_id) 
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [name, email, phone, category_id]
    );

    return row;
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
