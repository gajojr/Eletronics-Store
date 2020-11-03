const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const { urlencoded, json } = require('body-parser');
const favicon = require('serve-favicon');
const pug = require('pug');

app.set('view engine', 'pug');

//Sema se sastoji iz imena, opisa i kolicine
const componentSchema = new mongoose.Schema({
    ime: {
        type: String,
        required: true,
        unique: true
    },
    opis: {
        type: String,
        required: true,
        unique: true
    },
    kolicina: {
        type: Number,
        required: true
    }
})

const Component = mongoose.model('component', componentSchema);

app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(favicon(path.join(__dirname, '../public', 'assets', 'favicon.ico')));

app.use(express.static('public'));

app.get('/pravljenje', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'pravljenjekomponente.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'kontakt.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'home.html'));
});

app.get('/delovi', (req, res) => {
    Component.find({}, (err, docs) => {
        if (err) {
            res.json(err);
        } else {
            res.render('../public/html/delovi.pug', { components: docs, pageTitle: 'Delovi' });
        }
    });
});

app.get('/component', async(req, res) => {
    /* Prima id sa front end preko get metode, koristi findOne metodu da ga 
    pronadje u bazi preko id-a*/
    const deo = Component.findOne({ '_id': req.query.id }, (err, document) => {
        if (err) {
            console.log(err);
        }
    });
    const opisDela = (await deo).opis;
    res.send(opisDela);
});

app.post('/component', async(req, res) => {
    const componentToBeCreated = req.body;
    const component = await Component.create(componentToBeCreated);
    res.status(201).json(component.toJSON());
    console.log(req.body);
});

app.delete('/component', async(req, res) => {
    const componentToBeDeleted = req.body;
    await Component.findOneAndRemove(componentToBeDeleted, (err, deletedRecord) => {
        if (!err) {
            console.log(deletedRecord);
        }
    });
});

app.put('/component', async(req, res) => {
    const componentToBeChanged = req.body;
    if (componentToBeChanged.ime && componentToBeChanged.opis) {
        await Component.updateOne({
            ime: componentToBeChanged.ime
        }, {
            opis: componentToBeChanged.opis,
            kolicina: componentToBeChanged.kolicina
        });
    } else {
        await Component.updateOne({
            ime: componentToBeChanged.ime
        }, {
            kolicina: componentToBeChanged.kolicina
        });
    }
});

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/componentsdb', { useNewUrlParser: true });
}

connect()
    .then(async connection => {
        /*const relej = await Component.create({
            ime: "Relej",
            opis: "Relej (ponekad rele) je naprava koja se koristi za prekidanje ili uspostavljanje strujnog kola putem elektromagneta koji otvara i zatvara strujne kontakte. Ovakva vrsta releja se naziva elektromagnetski relej.",
            kolicina: 1
        });*/
        app.listen(4000);
    })
    .catch(e => console.error(e));