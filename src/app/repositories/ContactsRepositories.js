const { v4: uuid } = require("uuid");

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
      console.log(contacts);
      contacts.find((contact) => contact.id === id);
      resolve(contacts);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
