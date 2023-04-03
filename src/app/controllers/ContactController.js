const ContactsRepositories = require("../repositories/ContactsRepositories");

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepositories.findAll();

    return response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepositories.findById(id);

    if (!contact) return response.status(404).json({ error: "User not found" });

    response.json(contact);
  }

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) return response.status(400).json({ error: "Name is required" });

    const contactExists = await ContactsRepositories.findByEmail(email);

    if (contactExists) {
      return response
        .status(400)
        .json({ error: "This email is already been taken" });
    }

    const contact = await ContactsRepositories.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;
    const contactExists = await ContactsRepositories.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: "User not found" });
    }

    if (!name) return response.status(400).json({ error: "Name is required" });

    const contactByEmail = await ContactsRepositories.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: "This e-mail is already in use" });
    }

    const contact = await ContactsRepositories.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepositories.findById(id);

    // 404: Not Found
    if (!contact) return response.status(404).json({ error: "User not found" });

    await ContactsRepositories.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
