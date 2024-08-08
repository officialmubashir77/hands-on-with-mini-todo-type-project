const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;

// middleware for parsing JSON requests
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname , "public")));

app.get('/', (req, res) => {
  fs.readdir('./files' , (err, files) => {
    res.render('index' , {files : files});
  })
});

//post form data route 
app.post('/create', (req, res) => {
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt` , req.body.details , (err) => {
        if(err) throw err;
        console.log('File created');
        res.redirect('/');
    })
});
app.get('/files/:filename', (req, res) => {
   fs.readFile(`./files/${req.params.filename}` , "utf-8" , (err , fileData) => {
    res.render("show" , {filename : req.params.filename , fileData : fileData});
    
   })
});

// listen server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});