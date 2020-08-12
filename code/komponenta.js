// na pocetku zelimo da sve forme budu sakrivene
const izmene = document.querySelectorAll('.izmena');
izmene.forEach(item => item.style.display = 'none')

// dugmad sa opcijama za komponente
const btnDodaj = document.getElementById('dodaj');
const btnObrisi = document.getElementById('obrisi');
const btnIzmeni = document.getElementById('izmeni');

// divovi za manipulaciju komponentama
const pravljenjeDiv = document.querySelector('#pravljenje');
const brisanjeKomponenteDiv = document.querySelector('#brisanjeKomponente');
const izmenaDiv = document.querySelector('#izmena');

// ovaj niz nam treba kasnije da prodjemo kroz divove u funkciji toggleHelper
const nizDivova = [pravljenjeDiv, brisanjeKomponenteDiv, izmenaDiv];

// u zavisnosti koje je dugme kliknuto prikazuje se odgovarajuci div
btnDodaj.addEventListener('click', () => {
    toggleHelper(pravljenjeDiv);
    const submit = document.getElementById('napraviDeo');
    const reset = document.getElementById('ponistiDeo');
    // na klik se salju podaci u bazu ako je vazeca forma i pravi se novi deo
    submit.addEventListener('click', (e) => {
        const imeDela = document.getElementById('imeDela');
        const opis = document.getElementById('opis');
        if (!imeDela.value && !opis.value) {
            // drmajuca animacija na oba inputa
            drmajucaAnimacija(imeDela, opis)
            e.preventDefault()
        } else if (!imeDela.value) {
            // drmajuca animacija na ime dela input
            drmajucaAnimacija(imeDela)
            e.preventDefault()
        } else if (!opis.value) {
            // drmajuca animacija na opis input
            drmajucaAnimacija(opis)
            e.preventDefault()
        } else {
            // salji podatke u bazu
            console.log(`Ime dela: ${imeDela.value}`)
            console.log(`Opis: ${opis.value}`)

            /*$.ajax({
                url: '../code/server.js',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ ime: imeDela, opis: opis })
            })*/
        }
    })
})
btnObrisi.addEventListener('click', () => {
    toggleHelper(brisanjeKomponenteDiv);
    const submit = document.getElementById('trazi')
    submit.addEventListener('click', (e) => {
        const zaBrisanje = document.getElementById('brisanje')
        if (!zaBrisanje.value) {
            //input se drma
            drmajucaAnimacija(zaBrisanje)
        } else {
            //brisi element iz baze
            console.log(`uspeh ${zaBrisanje.value}`)
            e.preventDefault()

            //napraviti kod koji proverava da li postoji element sa trazenim imenom u bazi
            /*$.ajax({
                url: '../code/server.js',
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ ime: imeDela, opis: opis })
            })*/
        }
    })
})
btnIzmeni.addEventListener('click', () => {
    toggleHelper(izmenaDiv);
    const submit = document.getElementById('primeni')
    submit.addEventListener('click', (e) => {
        const zaIzmenuIme = document.getElementById('menjanjeime');
        const zaIzmenuOpis = document.getElementById('menjanjeopis')
        if (!zaIzmenuIme.value && !zaIzmenuOpis.value) {
            drmajucaAnimacija(zaIzmenuIme, zaIzmenuOpis)
        } else if (!zaIzmenuIme.value) {
            drmajucaAnimacija(zaIzmenuIme)
        } else if (!zaIzmenuOpis.value) {
            drmajucaAnimacija(zaIzmenuOpis)
        } else {
            //proveriti da li postoji deo sa trazenim imenom
            //nadji deo u bazi i izmeni mu opis
            console.log(`Menja se deo ${zaIzmenuIme.value}`)
            e.preventDefault()

            /*$.ajax({
                url: '../code/server.js',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ ime: imeDela, opis: opis })
            })*/
        }
    })
})

// funkcija koja omogucava da se odgovarajuci div prikaze, a ostali sakriju
const toggleHelper = div => {
    div.style.display = (div.style.display === 'none') ? 'flex' : 'none'
    for (const elem of nizDivova) {
        if (elem !== div && elem.style.display !== 'none') {
            elem.style.display = 'none';
        }
    }
}

//funkcija ako je neki od inputa prazan
function drmajucaAnimacija() {
    const args = Array.prototype.slice.call(arguments);

    args.forEach(inputField => {
        //dodaje crvenu boju
        inputField.style.border = `3px solid red`;

        // klasa koja definise animaciju
        inputField.classList.add('error');

        // sklanja klasu i crvenu boju po zavrsetku animacije
        setTimeout(function() {
            inputField.classList.remove('error');
            inputField.style.border = `1px solid #000`;
        }, 1300);
    })
}