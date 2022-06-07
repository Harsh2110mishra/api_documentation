const express =require('express');

const app = express();

// Swagger stuffs

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileUpload = require("express-fileupload");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
  {
    id: "11",
    name: "Learn Reactjs",
    price: 399,
  },
  {
    id: "22",
    name: "Learn Angular",
    price: 499,
  },
  {
    id: "33",
    name: "Learn Nodejs",
    price: 599,
  },
];


app.get('/',(req,res)=>{
    res.status(200).send("hello world");
})

app.get("/api/v1/course", (req, res) => {
  res.status(200).send("hello course");
});

app.get("/api/v1/courseObj", (req, res) => {
  res.status(200).send({
    id: "11",
    name: "Learn React Native",
    price: 899,
  });
});

app.get("/api/v1/courses", (req, res) => {
  res.status(200).send(courses);
});

app.get("/api/v1/myCourses/:courseId", (req, res) => {
  const mycourse = courses.find((c) => {
   return c.id === req.params.courseId
  })
  res.status(200).send(mycourse);
});

app.get("/api/v1/coursesQuery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;
  res.status(200).send({location,device});
});

app.post("/api/v1/addCourse", (req,res) => {
  console.log(req.body);
  courses.push(req.body);
  res.status(200).send(true)
})

app.post("/api/v1/courseUpload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg"
  console.log(req.headers)
  file.mv(path, (err) => {
    if (!err) {
      res.send(true);
    }
    else {
      console.log(err);
      res.send(false);
    }
  })
});


app.listen(4000,()=>console.log(`running @ 4000...`))