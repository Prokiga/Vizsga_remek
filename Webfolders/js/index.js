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
            window.location.href = "options.html";
        } else {
            // Ha rossz, megmutatjuk a hibaüzenetet (levesszük a d-none osztályt)
            document.getElementById('loginError').classList.remove('d-none');
        }
    });
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
                <td>${row.small || ""}</td>
                <td>${row.medium || ""}</td>
                <td>${row.large || ""}</td>
                <td>${keszJel}</td>
            </tr>
        `;
        tableBody.innerHTML += htmlSor;
    }
}

// --------------------------------------------------------------------------
// 3. VIRÁG RENDELÉSEK OLDAL (flowerorder.html)
// --------------------------------------------------------------------------

function loadCustomerOrders() {
    const container = document.getElementById('ordersContainer');
    if (!container) return;

    const orders = apiGetFlowerOrders();
    container.innerHTML = ""; // Töröljük a töltés jelet

    for (let i = 0; i < orders.length; i++) {
        const customer = orders[i];
        
        // Generáljuk a belső listát (termékek)
        let itemsHtml = "";
        for (let j = 0; j < customer.items.length; j++) {
            const item = customer.items[j];
            
            // Ha elkészült, rakjunk rá áthúzott stílust és legyen bepipálva
            let checkedAttr = item.completed ? "checked" : "";
            let textClass = item.completed ? "completed-item" : "";

            itemsHtml += `
                <div class="form-check text-start mb-2 ms-4">
                    <input class="form-check-input" type="checkbox" id="item_${item.itemId}" 
                           onchange="updateOrderItem(${customer.id}, ${item.itemId}, this.checked)" ${checkedAttr}>
                    <label class="form-check-label ${textClass}" for="item_${item.itemId}">
                        ${item.name}
                    </label>
                </div>
            `;
        }

        // Egy kártya (accordion szerű lenyíló blokk a Bootstrap segítségével)
        // Kezdő szintű JS: egyszerű div-eket hozunk létre és onckick-el kezeljük
        const cardHtml = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card demobox">
                    <div class="card-body" onclick="toggleOrderDetails('details_${customer.id}')">
                        <h3 class="card-title">${customer.customerName}</h3>
                        <p class="text-muted small mb-0 mt-2">Kattints a részletekért</p>
                    </div>
                    <!-- Ez a rész alapból rejtve van (d-none) -->
                    <div id="details_${customer.id}" class="card-footer bg-white d-none pb-4">
                        <hr>
                        <h6 class="text-start mb-3" style="color: var(--primary-color);">Megrendelt termékek:</h6>
                        ${itemsHtml}
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML += cardHtml;
    }
}

// Lenyitja vagy becsukja a vevő rendeléseit
function toggleOrderDetails(elementId) {
    const div = document.getElementById(elementId);
    if (div.classList.contains('d-none')) {
        div.classList.remove('d-none');
    } else {
        div.classList.add('d-none');
    }
}

// Amikor rákattint a virágos egy checkboxra
function updateOrderItem(customerId, itemId, isChecked) {
    // 1. Frissítjük az "Adatbázist"
    apiToggleOrderItem(customerId, itemId, isChecked);
    
    // 2. Újrarajzoljuk az egész listát, hogy frissüljenek a színek és áthúzások
    // Éles alkalmazásban ez lassú lehet, de egy tanuló projektnél tökéletesen biztosítja,
    // hogy az adat és a felület mindig szinkronban legyen!
    loadCustomerOrders();
}

// --------------------------------------------------------------------------
// 4. BEÁLLÍTÁSOK OLDAL (settings.html)
// --------------------------------------------------------------------------

const addWreathForm = document.getElementById('addWreathForm');
if (addWreathForm) {
    addWreathForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Ne töltsön újra az oldal
        
        // Összegyűjtjük az értékeket
        const newOrder = {
            name: document.getElementById('wreathName').value,
            date: document.getElementById('wreathDate').value,
            small: parseInt(document.getElementById('wreathSmall').value) || 0,
            medium: parseInt(document.getElementById('wreathMedium').value) || 0,
            large: parseInt(document.getElementById('wreathLarge').value) || 0
        };

        // Mentjük az API-n keresztül
        apiAddWreathData(newOrder);

        alert("Sikeresen elmentve az adatbázisba!");
        
        // Kiürítjük az űrlapot
        addWreathForm.reset();
    });
}

const resetDbBtn = document.getElementById('resetDbBtn');
if (resetDbBtn) {
    resetDbBtn.addEventListener('click', function() {
        if (confirm("Biztosan visszaállítod az alap teszt adatokat? Minden módosításod elvész!")) {
            apiResetDatabase();
        }
    });
}
