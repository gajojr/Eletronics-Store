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
    const kolicina = document.getElementById('kolicina');
    // na klik se salju podaci u bazu ako je vazeca forma i pravi se novi deo
    submit.addEventListener('click', (e) => {
        const imeDela = document.getElementById('imeDela');
        const opis = document.getElementById('opis');
        if (!imeDela.value && !opis.value) {
            // drmajuca animacija na oba inputa
            drmajucaAnimacija(imeDela, opis);
            e.preventDefault();
        } else if (!imeDela.value) {
            // drmajuca animacija na ime dela input
            drmajucaAnimacija(imeDela);
            e.preventDefault();
        } else if (!opis.value) {
            // drmajuca animacija na opis input
            drmajucaAnimacija(opis);
            e.preventDefault();
        } else {
            $.ajax({
                url: 'http://localhost:4000/component',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ ime: imeDela.value, opis: opis.value, kolicina: kolicina.value })
            })
            alert('Komponenta dodata u bazu.');
        }
    });
})
btnObrisi.addEventListener('click', () => {
    toggleHelper(brisanjeKomponenteDiv);
    const submit = document.getElementById('trazi');
    submit.addEventListener('click', (e) => {
        const zaBrisanje = document.getElementById('brisanje');
        if (!zaBrisanje.value) {
            //input se drma
            drmajucaAnimacija(zaBrisanje);
            e.preventDefault();
        } else {
            //brisi element iz baze

            $.ajax({
                url: 'http://localhost:4000/component',
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ ime: zaBrisanje.value })
            }, alert('Komponenta obrisana iz baze.'));
        }
    })
})
btnIzmeni.addEventListener('click', () => {
    toggleHelper(izmenaDiv);
    const submit = document.getElementById('primeni');
    submit.addEventListener('click', (e) => {
        const zaIzmenuIme = document.getElementById('menjanjeime');
        const zaIzmenuOpis = document.getElementById('menjanjeopis');
        const zaIzmenuKolicina = document.getElementById('menjanjekolicina');
        console.log(zaIzmenuKolicina.value);
        if (!zaIzmenuIme.value && !zaIzmenuOpis.value) {
            drmajucaAnimacija(zaIzmenuIme, zaIzmenuOpis);
            e.preventDefault();
        } else if (!zaIzmenuIme.value) {
            drmajucaAnimacija(zaIzmenuIme);
            e.preventDefault();
        } else if (!zaIzmenuOpis.value) {
            drmajucaAnimacija(zaIzmenuOpis);
            e.preventDefault();
        } else {
            //nadji deo u bazi i izmeni mu opis

            $.ajax({
                url: 'http://localhost:4000/component',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ ime: zaIzmenuIme.value, opis: zaIzmenuOpis.value, kolicina: zaIzmenuKolicina.value })
            }, alert('Deo je updateovan'));
        }
    })
})

// funkcija koja omogucava da se odgovarajuci div prikaze, a ostali sakriju
const toggleHelper = div => {
    div.style.display = (div.style.display === 'none') ? 'flex' : 'none';
    for (const elem of nizDivova) {
        if (elem !== div && elem.style.display !== 'none') {
            elem.style.display = 'none';
        }
    }
}

//funkcija ako je neki od inputa prazan
function drmajucaAnimacija() {
    const inputPolja = Array.prototype.slice.call(arguments);

    inputPolja.forEach(inputField => {
        //dodaje crvenu boju
        inputField.style.border = `3px solid red`;

        // klasa koja definise animaciju
        inputField.classList.add('error');

        // sklanja klasu i crvenu boju po zavrsetku animacije
        setTimeout(function() {
            inputField.classList.remove('error');
            inputField.style.border = '1px solid #000';
        }, 1300);
    })
}