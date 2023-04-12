class CategoryController {
  index(request, response) {
    response.send("Okay index");
  }

  store(request, response) {
    response.send("Okay store");
  }
}

module.exports = new CategoryController();
