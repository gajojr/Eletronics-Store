const mongoose = require('mongoose')
const express = require('express')
const app = express()
const morgan = require('morgan')
const { urlencoded, json } = require('body-parser')


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
    }
})

const Component = mongoose.model('component', componentSchema)

app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())

app.get('/component', async(req, res) => {
    //find nalazi sve dokumente
    //lean opcija kaze mongoosu da preskoci prilagodjavanje celog mongoose dokumenta i samo da nam da POJO
    //POJO - Plain old JavaScript object
    //exec se koristi umesto callback funkcije da se izbegne ugnezdjavanje
    //exec vraca promise ako nema callbacka
    const components = await Component.find({}).lean().exec()
    res.status(200).json(components)
})

app.post('/component', async(req, res) => {
    const componentToBeCreated = req.body
    const component = await Component.create(componentToBeCreated)
    res.status(201).json(component.toJSON())
})

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/componentsdb', { useNewUrlParser: true })
}

connect()
    .then(async connection => {
        /*const tranzistor = await Component.create({
            ime: "Tranzistor",
            opis: "Tranzistor je aktivni poluprovodnički element sa tri izvoda (dva pristupa) koji se koristi kao pojačanje (najznačajnija primena), prekidanje struje, u kolima za stabilizaciju napona, modulaciju signala i mnoge druge operacije."
        })
        const tiristor = await Component.create({
            ime: "Tiristor",
            opis: "Tiristor je poluprovodnički elemenat koji se u elektroenergetici koristi u funkciji snažnog elektronskog prekidača. Naziv tiristor sadrži grčku reč thy - prekidač, dok ostatak reči označava pripadnost familiji tranzistora. Tiristor se još sreće pod nazivom SCR (Silicon Controlled Rectifier - silikonski upravljivi ispravljač).",
        })
        const dioda = await Component.create({
            ime: "Dioda",
            opis: "Dioda je elektronska komponenta koja dozvoljava protok električne struje u jednom smeru bez otpora (ili uz veoma mali otpor), dok u suprotnom smeru predstavlja beskonačan (ili bar veoma veliki) otpor. Zato se za diodu kaže da postoji provodni i neprovodni smer. Može se smatrati da za proticanje struje u provodnom smeru dioda ima otpornost koliko i žica provodnika (nula), a za neprovodni smer se može posmatrati kao prekid provodnika (beskonačno).",
        })
        const grecovIspravljac = await Component.create({
            ime: "Grecov ispravljac",
            opis: "Grecov spoj, Grecov most ili diodni most je predstavlja povezivanje četiri (ili više kod višefaznih sistema) dioda ili tiristora u kolo na čijem se izlazu dobija napon jednosmjernog polariteta bez obzira kakav je polaritet na ulazu. Grecov spoj se koristi kod ispravljača za pretvaranje naizmenične struje u istosmjernu struju. Grecov spoj omogućava punotalasno ispravljanje naizmeničnog napona.",
        })
        const otpornik = await Component.create({
            ime: "Otpornik",
            opis: "Otpornik (engl. resistor) je pasivna elektronska komponenta sa dva izvoda (jednim pristupom) koja pruža otpor struji, stvarajući pritom pad napona između priključaka. Pružanje otpora struji kao osnovna osobina otpornika opisuje se električnim otporom. Prema Omovom zakonu električni otpor jednak je padu napona na otporniku podeljenom sa jačinom struje koja protiče kroz otpornik. Drugim rečima, otpor je konstanta srazmere između napona i struje otpornika. Otpornik se koristi kao element električnih mreža i elektronskih uređaja.",
        })
        const baterija = await Component.create({
            ime: "Baterija",
            opis: "U nauci i tehnologiji, baterija je elektrohemijski uređaj u kome je uskladištena hemijska energija (u vidu potencijalne energije), koja se može pretvoriti u električnu energiju kada se krajevi baterije, elektrode, spoje provodnikom.",
        })
        const prekidac = await Component.create({
            ime: "Prekidac",
            opis: "Prekidač je jednostavni elektromehanički uređaj koji zatvara ili otvara strujno kolo. Sa time omogućuje ili onemogućuje tok struje, i kod jednostavnih sklopova, uključuje ili isključuje uređaj. Za razliku od tastera, ostvaruje trajan, a ne trenutan električni spoj.",
        })
        const relej = await Component.create({
            ime: "Relej",
            opis: "Relej (ponekad rele) je naprava koja se koristi za prekidanje ili uspostavljanje strujnog kola putem elektromagneta koji otvara i zatvara strujne kontakte. Ovakva vrsta releja se naziva elektromagnetski relej.",
        })
        app.listen(5000)
        console.log(tranzistor)
        console.log(tiristor)
        console.log(dioda)
        console.log(grecovIspravljac)
        console.log(otpornik)
        console.log(baterija)
        console.log(prekidac)
        console.log(relej)*/
    })
    .catch(e => console.error(e))