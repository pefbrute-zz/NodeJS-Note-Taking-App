//Declare the installed modules express and body-parser.
const express = require("express");
const bodyParser = require("body-parser");

let notes = [
  { id: 0, body: "We have a text" },
  { id: 1, body: "This is a second text" },
];

//call the express and Body-parser
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//serving static files
app.use(express.static("public"));

//we installed the ejs and created a file inside the views
app.set("view engine", "ejs");

//We set up the route for the App. We first use the app.get option.
app.get("/", function (request, response) {
  // console.log(response);
  console.log("New notes: ", notes);
  response.render("notes", {
    notes: notes,
  });
});

//then, we use app.post option.
app.post("/addNotes", function (request, response) {
  //assigning Note id to the notes using math.random
  const userNote = {};
  let body = request.body,
    newNote = body.newNote;

  userNote.id = Math.random() * 100;
  userNote.body = newNote;

  console.log(userNote);
  console.log(body);
  console.log("Old notes: ", notes);
  console.log();

  notes.push(userNote);

  //then we redirect it to the root route
  response.redirect("/");
});

//Handling the delete request

app.post("/deleteNote/:id", function (request, response) {
  let parameters = request.params,
    idOfDeletedNote = parameters.id;

  console.log(parameters);
  console.log(idOfDeletedNote);
  console.log();

  console.log("Notes before deleting: ", notes);

  const notDeletedNotes = notes.filter((note) => note.id != idOfDeletedNote);
  notes = notDeletedNotes;

  console.log("Notes after deleting: ", notes);

  return response.redirect("/");
});

//then we set our server port. This should always be at bottom.
app.listen(5000, function () {
  console.log("NoteApp server is running at port 5000...");
});
