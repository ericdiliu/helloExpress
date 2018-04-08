const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} - ${req.url}`;

    console.log(log)
    fs.appendFile('server.log', log + "\n", (err)=>{
        if (err) {
            console.log(err);
        }
    });
    next();
});

// app.use((req,res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: "Under Maintenance"
//     });
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res)=>{
    // res.send('<h1>Hello express.</h1>');
    res.render('home.hbs',{
       pageTitle:"Home page",
       welcomeMessage:"Welcome to my website"
    });
});

app.get('/about', (req, res)=>{
    // res.send('<h1>Hello express.</h1>');
    res.render('about.hbs', {
        pageTitle: "About page"
    })
});

app.get('/bad', (req, res)=>{
    // res.send('<h1>Hello express.</h1>');
    res.send({
        errorMessage:"Bad request!"
    });
});

app.listen(port, ()=>{
    console.log(`Server up at port ${port}.`);
});
