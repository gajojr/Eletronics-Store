$(function() {
            /*vanilla js kod popravljen ali koristim jquery jer selektuje samo td elemente
            dok js selektuje i poslednji th element jer njegov roditelj ima trazenu klasu,
            po zelji dodati drugaciju klasu prvom tr elementu sa istim cssom kao .table_head_row*/

            /*const lastTdElementList = document.querySelectorAll('.table_head_row');
            lastTdElementList.forEach(elem => elem.lastElementChild.textContent = '5')*/

            //kod u jquery za odabir td-a
            const lastTdElement = $("td:last-child");
            [...lastTdElement].forEach((element, index) => element.innerHTML = `<span id='komp${index + 1}' class='broj'>0</span><br><div><button type='button' class='btn btn-light green'><ion-icon name='add-circle-outline'></ion-icon></button><button type='button' class='btn btn-light red'><ion-icon name='remove-circle-outline'></ion-icon></button></div>`);

            //ucitavanje kolicine delova iz lokalne memorije browsera
            if (localStorage.length) {
                [...lastTdElement].forEach((element, index) => {
                            if (`komp${index + 1}` in localStorage) {
                                element.innerHTML = `<span id='komp${index + 1}' class='broj'>${localStorage.getItem(`${element.firstChild.id}`)}</span><br><div><button type='button' class='btn btn-light green'><ion-icon name='add-circle-outline'></ion-icon></button><button type='button' class='btn btn-light red'><ion-icon name='remove-circle-outline'></ion-icon></button></div>`;
                    } else {
                        element.innerHTML = `<span id='komp${index + 1}' class='broj'>0</span><br><div><button type='button' class='btn btn-light green'><ion-icon name='add-circle-outline'></ion-icon></button><button type='button' class='btn btn-light red'><ion-icon name='remove-circle-outline'></ion-icon></button></div>`;
                    }
                }); 
            }
    //dodavanje funkcionalnosti dugmadima
    [...lastTdElement].forEach(element => {
        const zelenoDugme = element.querySelector('.green');
        const crvenoDugme = element.querySelector('.red');
        let broj = element.querySelector('.broj').textContent;
        zelenoDugme.addEventListener('click', () => {
            broj = `${parseInt(broj) + 1}`;
            localStorage.setItem(element.firstChild.id, broj);
            element.querySelector('.broj').textContent = broj;
        });
        crvenoDugme.addEventListener('click', () => {
            if (broj > 0) {
                broj = `${parseInt(broj) - 1}`;
                localStorage.setItem(element.firstChild.id, broj);
                element.querySelector('.broj').textContent = broj;
            }
        });
    });

    //uzimamo da zamenimo linkovima
    const collapsibleTdElement = $("td:nth-child(2)");
    //niz opisa delova
    const opisi = ["Tranzistor je aktivni poluprovodnički element sa tri izvoda (dva pristupa) koji se koristi kao pojačanje (najznačajnija primena), prekidanje struje, u kolima za stabilizaciju napona, modulaciju signala i mnoge druge operacije.",
        "Tiristor je poluprovodnički elemenat koji se u elektroenergetici koristi u funkciji snažnog elektronskog prekidača. Naziv tiristor sadrži grčku reč thy - prekidač, dok ostatak reči označava pripadnost familiji tranzistora. Tiristor se još sreće pod nazivom SCR (Silicon Controlled Rectifier - silikonski upravljivi ispravljač).",
        "Dioda je elektronska komponenta koja dozvoljava protok električne struje u jednom smeru bez otpora (ili uz veoma mali otpor), dok u suprotnom smeru predstavlja beskonačan (ili bar veoma veliki) otpor. Zato se za diodu kaže da postoji provodni i neprovodni smer. Može se smatrati da za proticanje struje u provodnom smeru dioda ima otpornost koliko i žica provodnika (nula), a za neprovodni smer se može posmatrati kao prekid provodnika (beskonačno).",
        "Grecov spoj, Grecov most ili diodni most je predstavlja povezivanje četiri (ili više kod višefaznih sistema) dioda ili tiristora u kolo na čijem se izlazu dobija napon jednosmjernog polariteta bez obzira kakav je polaritet na ulazu. Grecov spoj se koristi kod ispravljača za pretvaranje naizmenične struje u istosmjernu struju. Grecov spoj omogućava punotalasno ispravljanje naizmeničnog napona.",
        "Otpornik (engl. resistor) je pasivna elektronska komponenta sa dva izvoda (jednim pristupom) koja pruža otpor struji, stvarajući pritom pad napona između priključaka. Pružanje otpora struji kao osnovna osobina otpornika opisuje se električnim otporom. Prema Omovom zakonu električni otpor jednak je padu napona na otporniku podeljenom sa jačinom struje koja protiče kroz otpornik. Drugim rečima, otpor je konstanta srazmere između napona i struje otpornika. Otpornik se koristi kao element električnih mreža i elektronskih uređaja.",
        "U nauci i tehnologiji, baterija je elektrohemijski uređaj u kome je uskladištena hemijska energija (u vidu potencijalne energije), koja se može pretvoriti u električnu energiju kada se krajevi baterije, elektrode, spoje provodnikom.",
        "Prekidač je jednostavni elektromehanički uređaj koji zatvara ili otvara strujno kolo. Sa time omogućuje ili onemogućuje tok struje, i kod jednostavnih sklopova, uključuje ili isključuje uređaj. Za razliku od tastera, ostvaruje trajan, a ne trenutan električni spoj.",
        "Relej (ponekad rele) je naprava koja se koristi za prekidanje ili uspostavljanje strujnog kola putem elektromagneta koji otvara i zatvara strujne kontakte. Ovakva vrsta releja se naziva elektromagnetski relej."
    ];
    //niz id-eva
    const idList = $("td:nth-child(1)");
    //tekst linka
    const tekst1 = "prikazi vise...";
    const tekst2 = "prikazi manje";
    //na klik prikazi vise da se pojavi odgovarajuci opis
    [...collapsibleTdElement].forEach((element, index) => {
        element.innerHTML = `<a href="#${idList[index].id}">${tekst1}</a>`;
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
                element.innerHTML = `<a href="#"><b>${tekst2}</b></a><br>${opisi[index]}`;
            } else {
                e.preventDefault();
                element.innerHTML = `<a href="#"><b>${tekst1}</b></a>`;
            }
        });
    });

    //uzimamo id iz kompletne adrese
    const anchorlinks = document.querySelectorAll('a[href^="#"]');
    let anchorlinksArray = [];
    for (let i = 0; i < anchorlinks.length; i += 1) {
        if (typeof anchorlinksArray.push(anchorlinks[i].href.substring(anchorlinks[i].href.indexOf('#'), anchorlinks[i].href.length)) === String) {
            anchorlinksArray.push(anchorlinksArray.push(anchorlinks[i].href.substring(anchorlinks[i].href.indexOf('#'), anchorlinks[i].href.length)));
        }
    }

    //animacija za skrolovanje kroz tabelu
    //nepotrebna sada jer bocni meni ima drugu svrhu
    /*for (let item of anchorlinks) {
        item.addEventListener('click', (e) => {
            let hashval = item.getAttribute('href');
            const target = document.querySelector(hashval);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // izbacivanje opisa na klik sa side-navbara
            const index = anchorlinksArray.indexOf(hashval);
            target.nextElementSibling.innerHTML = `<a href="#"><b>${tekst2}</b></a><br>${opisi[index]}`;

            // potrebno, jer bez preventa link odmah salje na zadati deo bez animacije
            e.preventDefault();
        });
    }*/
});