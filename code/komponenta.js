// na pocetku zelimo da sve forme NE budu prikazane
const izmene = document.querySelectorAll('.izmena');
izmene.forEach(item => {
    item.style.display = 'none';
})

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
    const imeDela = pravljenjeDiv.querySelector('#imeDela').value;
    const opis = pravljenjeDiv.querySelector('#opis').value;
    const submit = pravljenjeDiv.querySelector("#napraviDeo");
    const reset = pravljenjeDiv.querySelector("#ponistiDeo");
    // na klik se salju podaci u bazu ako je vazeca forma i pravi se novi deo
    submit.addEventListener('click', () => {
        if (!imeDela && !opis) {
            // drmajuca animacija na oba inputa
        } else if (!imeDela) {
            // drmajuca animacija na ime dela input
        } else if (!opis) {
            // drmajuca animacija na opis input
        } else {
            // salji podatke u bazu
        }
    })

    // resetuje se forma u slucaju da admin ne zeli da doda komponentu
    reset.addEventListener('click', () => {
        pravljenjeDiv.reset();
    })
})
btnObrisi.addEventListener('click', () => {
    toggleHelper(brisanjeKomponenteDiv);
})
btnIzmeni.addEventListener('click', () => {
    toggleHelper(izmenaDiv);
})

// funkcija koja omogucava da se odgovarajuci div prikaze, a ostali sklone
const toggleHelper = div => {
    if (div.style.display === 'none') {
        div.style.display = 'flex';
    }
    for (const elem of nizDivova) {
        if (elem !== div && elem.style.display !== 'none') {
            elem.style.display = 'none';
        }
    }
}