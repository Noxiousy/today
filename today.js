const { argv, exit, env, stdin, stdout } = require("process");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

stdin.setEncoding("utf-8");
app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));

// check for a port number
if (argv.length != 3)
{
    stdout.write("Usage: node summerCampServer.js PORT_NUMBER_HERE");
    exit(0);
}

const port = argv[2];
 
//  render index.ejs
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/today", (req, res) => {
    const variables = {
        name: req.body.name,
        birthday: req.body.birthday,
        today: new Date()
    };
    res.render("todayIs", variables);
});

app.listen(port);
stdout.write(`Web server started and running at http://localhost:${port}\n`);

//  command-line interpreter (just for stopping the server)
const prompt = "Stop to shut down the server: ";
stdout.write(prompt);
stdin.on("readable", function () {
    let input = stdin.read();
    if (input !== null) {
        let command = input.trim();
        if (command === "stop") {
            process.stdout.write("Shutting down the server");
            process.exit(0);
        } else {
            process.stdout.write(`Invalid Command: ${input}`);
        }
        process.stdout.write(prompt);
        process.stdin.resume();
    }
});