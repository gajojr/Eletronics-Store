const izmene = document.querySelectorAll('.izmena');
izmene.forEach(item => {
    item.style.display = 'none';
})
const btnDodaj = document.getElementById('dodaj');
const btnObrisi = document.getElementById('obrisi');
const btnIzmeni = document.getElementById('izmeni');

const pravljenjeDiv = document.querySelector('#pravljenje');
const brisanjeKomponenteDiv = document.querySelector('#brisanjeKomponente');
const izmenaDiv = document.querySelector('#izmena');

const arr = [pravljenjeDiv, brisanjeKomponenteDiv, izmenaDiv];

btnDodaj.addEventListener('click', () => {
    toggleHelper(pravljenjeDiv);
    const imeDela = pravljenjeDiv.querySelector('#imeDela').value;
    const opis = pravljenjeDiv.querySelector('#opis').value;
    const submit = pravljenjeDiv.querySelector("#napraviDeo");
    const reset = pravljenjeDiv.querySelector("#ponistiDeo");
    submit.addEventListener('click', () => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", `insert.php?imeDela=${imeDela}&opis=${opis}`, false);
        xmlhttp.send(null);
    })
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

const toggleHelper = div => {
    if (div.style.display === 'none') {
        div.style.display = 'flex';
    }
    for (const elem of arr) {
        if (elem !== div && elem.style.display !== 'none') {
            elem.style.display = 'none';
        }
    }
}