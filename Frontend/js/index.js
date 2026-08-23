// ==========================================================================
// FŐ LOGIKAI FÁJL (UI kezelése, Kattintások, Kirajzolások)
// ==========================================================================

// Kijelentkezés gomb kezelése minden oldalon, ahol van
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        // Visszadobjuk az embert a bejelentkezőre
        window.location.href = 'index.html';
    });
}

// --------------------------------------------------------------------------
// 1. BEJELENTKEZÉS OLDAL (index.html)
// --------------------------------------------------------------------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        // Megakadályozzuk, hogy az oldal újratöltődjön
        event.preventDefault();

        // Kiolvassuk a beírt adatokat
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        // Egy egyszerű (amatőr de vizsgára jó) ellenőrzés
        if (user === "admin" && pass === "1234") {
            // Ha jó, átirányítjuk a főmenübe
            window.location.href = "Options.html"
        } else {
            // Ha rossz, megmutatjuk a hibaüzenetet (levesszük a d-none osztályt)
            document.getElementById('loginError').classList.remove('d-none');
        }
    });
}

// --------------------------------------------------------------------------
// 1. REGISZTRÁCIÓ OLDAL (index.html)
// --------------------------------------------------------------------------
/*const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('registry', function(event) {
        // Megakadályozzuk, hogy az oldal újratöltődjön
        event.preventDefault();

        // Kiolvassuk a beírt adatokat
        var user = document.getElementById('username').value;
        var pass = document.getElementById('password').value;

        // Itt kellene elmenteni az új adatokat az adatbázisba
        if (user === "admin" && pass === "1234") {
            // Ha jó, átirányítjuk a főmenübe
            window.location.href = "options.html";
        } else {
            // Ha rossz, megmutatjuk a hibaüzenetet (levesszük a d-none osztályt)
            document.getElementById('loginError').classList.remove('d-none');
        }
    });
}*/

// --------------------------------------------------------------------------
// 2. FENYŐBÁLA OLDAL (PineBatch.html)
// --------------------------------------------------------------------------

function loadPineType()
{
    
}

// --------------------------------------------------------------------------
// 2. FENYŐBÁLA ÉS KOSZORÚALAP OLDAL (Pinebase.html)
// --------------------------------------------------------------------------

// Ezt a függvényt a Pinebase.html hívja meg a betöltéskor
function loadPineData() {
    const tableBody = document.getElementById('pineTableBody');
    if (!tableBody) return; // Ha nem ezen az oldalon vagyunk, kilépünk

    // Elkérjük az adatokat a szimulált adatbázisból (később majd a valódi MySQL-ből)
    const pineData = apiGetPineData();
    
    // Töröljük a "Betöltés..." szöveget
    tableBody.innerHTML = "";

    // Végigmegyünk a tömbön, és minden sornál generálunk egy HTML <tr> sort
    for (let i = 0; i < pineData.length; i++) {
        const row = pineData[i];
        const htmlSor = `
            <tr>
                <th class="text-start">${row.type}</th>
                <td>${row.luc}</td>
                <td>${row.jegenye}</td>
                <td>${row.normand}</td>
                <td>${row.nobilis}</td>
            </tr>
        `;
        tableBody.innerHTML += htmlSor;
    }
}


// Ezt a függvényt a Costumers.html hívja meg a betöltéskor
function loadCostumersData() {
    const tableBody = document.getElementById('CostumersTableBody');
    if (!tableBody) return; // Ha nem ezen az oldalon vagyunk, kilépünk

    // Elkérjük az adatokat a szimulált adatbázisból (később majd a valódi MySQL-ből)
    const CostumersData = apiGetCostumersData();
    
    // Töröljük a "Betöltés..." szöveget
    tableBody.innerHTML = "";

    // Végigmegyünk a tömbön, és minden sornál generálunk egy HTML <tr> sort
    for (let i = 0; i < CostumersData.length; i++) {
        const row = CostumersData[i];
        const htmlSor = `
            <tr>
                <th class="text-start">${row.type}</th>
                <td>${row.luc}</td>
                <td>${row.jegenye}</td>
                <td>${row.normand}</td>
                <td>${row.nobilis}</td>
            </tr>
        `;
        tableBody.innerHTML += htmlSor;
    }
}



function loadWreathData() {
    const tableBody = document.getElementById('wreathTableBody');
    if (!tableBody) return;

    const wreathData = apiGetWreathData();
    tableBody.innerHTML = "";

    for (let i = 0; i < wreathData.length; i++) {
        const row = wreathData[i];
        
        // Ha kész van (done == true), teszünk ki egy pipát, amúgy egy X-et
        let keszJel = row.done ? "✅" : "❌";

        const htmlSor = `
            <tr>
                <td class="text-start fw-bold">${row.name}</td>
                <td>${row.date}</td>
                <td>${row.pinetype}</td>
                <td>${row.size}</td>
                <td>${keszJel}</td>
            </tr>
        `;
        tableBody.innerHTML += htmlSor;
    }
}

const resetDbBtn = document.getElementById('resetDbBtn');
if (resetDbBtn) {
    resetDbBtn.addEventListener('click', function() {
        if (confirm("Biztosan visszaállítod az alap teszt adatokat? Minden módosításod elvész!")) {
            apiResetDatabase();
        }
    });
}
