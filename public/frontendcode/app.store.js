//kod u jquery za odabir td-a
const lastTdElement = $('td:last-child');
const firstTdElement = $('td:first-child');

[...lastTdElement].forEach((element, i) => {
    const zelenoDugme = element.querySelector('.green');
    const crvenoDugme = element.querySelector('.red');
    const ime = firstTdElement[i].textContent;
    let kolicina = element.querySelector('.broj').innerHTML;
    zelenoDugme.addEventListener('click', () => {
        kolicina = `${parseInt(kolicina) + 1}`;
        element.querySelector('.broj').textContent = kolicina;
        putAction(ime, kolicina);
    });
    crvenoDugme.addEventListener('click', () => {
        if (kolicina > 0) {
            kolicina = `${parseInt(kolicina) - 1}`;
            element.querySelector('.broj').textContent = kolicina;
            putAction(ime, kolicina);
        }
    });
});

//uzimamo da zamenimo linkovima
const collapsibleTdElement = $('td:nth-child(2)');
//niz opisa delova

//tekst linka
const tekst1 = 'prikazi vise...';
const tekst2 = 'prikazi manje';
//na klik prikazi vise da se pojavi odgovarajuci opis

[...collapsibleTdElement].forEach((element, index) => {
    element.innerHTML = `<a href="#${element.id}">${tekst1}</a>`;
    element.textContent = tekst1;
    element.addEventListener('mouseover', e => {
        if (element.textContent === tekst1) {
            e.target.style.cursor = 'pointer';
        }
    })

    // na klik na prikazi vise... se pojavljuje opis odgovoran za taj deo
    element.addEventListener('click', (e) => {
        if (element.textContent.includes(tekst1)) {
            e.preventDefault();
            let opisDela;
            element.innerHTML = `<a href="#"><b>${tekst2}</b></a><br>${
                $.get('http://localhost:4000/component', {id: element.id}, (data, status) => {
                    class Opis {
                        constructor(data) {
                            this.name = data;
                        }

                        toString() {
                            return this.name;
                        }
                    }
                    opisDela = new Opis(data);
                    opisDela = opisDela.toString();
                    
                    element.innerHTML += opisDela;

                    //Oktklanja se [object Object] iz opisa
                    element.innerHTML = element.innerHTML.replace('[object Object]', opisDela);
                })
            }`;
        } else {
            e.preventDefault();
            element.innerHTML = `<a href="#"><b>${tekst1}</b></a>`;
        }
    });
});

const putAction = (ime, kolicina) => {
    const method = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ ime: ime, kolicina: kolicina })
    };
    fetch(
            'http://localhost:4000/component', method
        )
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('error:', error));
};