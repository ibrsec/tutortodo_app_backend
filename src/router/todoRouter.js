const todo = require("../controllers/todoController");
const router = require("express").Router();

router.route("/").get(todo.list).post(todo.create);
router
  .route("/:id")
  .get(todo.read)
  .put(todo.update)
  .patch(todo.updatePatch)
  .delete(todo.delete);




module.exports = router;
