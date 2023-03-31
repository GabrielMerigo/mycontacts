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

  store(request, response) {}

  update() {}

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
