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
// 1. BEJELENTKEZÉS (index.html)
// --------------------------------------------------------------------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(event) {
        // Megakadályozzuk, hogy az oldal újratöltődjön
        event.preventDefault();

        // Kiolvassuk a beírt adatokat
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        const loginError = document.getElementById('loginError');
        loginError.classList.add('d-done');

        try
        {
            const result = await Login(user, pass);
            console.log('Sikeres bejelentkezés: ', result);
            window.location.href = "Options.html";
        } catch (error)
        {
            console.log(error);
            loginError.classList.remove('d-none');
        }
    });
}

// --------------------------------------------------------------------------
// 2. REGISZTRÁCIÓ (index.html)
// --------------------------------------------------------------------------
const registryButton = document.getElementById('registryButton');
if (registryButton) {
    registryButton.addEventListener('click', async function(event) {
        // Megakadályozzuk, hogy az oldal újratöltődjön
        event.preventDefault();

        // Kiolvassuk a beírt adatokat
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        // Ha rossz, megmutatjuk a hibaüzenetet (levesszük a d-none osztályt)
        document.getElementById('loginError').classList.remove('d-none');

        try
        {
            const result = await RegisterNewUser(user, pass);
            document.getElementById('loginError').textContent = "Sikeres regisztráció.";
        }
        catch (error)
        {
            console.log('Regisztrációs hiba: ', error);
            document.getElementById('loginError').textContent = error.message;
            document.getElementById('loginError').classList.remove('d-none');
        }
    });
}

// --------------------------------------------------------------------------
// 3. FENYŐBÁLA (PineBatch.html)
// --------------------------------------------------------------------------

//  A fenyőfajták lekérdezése a legördülő listához. Ezt még a PineBase oldal is használja
async function loadPineTypes()
{
    try
    {
        const pinetypes = await GetPineTypes();
        const dropdown = document.getElementById("pine_type_dropdown");

        pinetypes.forEach(pinetype => 
        {
            const option = document.createElement("option");
            option.value = pinetype.pineId;
            option.textContent = pinetype.pineType;
            dropdown.appendChild(option);
        });
    }
    catch (error)
    {
        console.log("Hiba a fenyőalapok betöltésekor: ", error);
    }
}

// A fenyőbálák állapotának lekérdezése a legördülő listához
async function loadPineBatchState()
{
    try
    {
        const batchstates = await GetPineBatchStates();
        const dropdown = document.getElementById("batch_state_dropdown");

        batchstates.forEach(batchstate => 
        {
            const option = document.createElement("option");
            option.value = batchstate.batchStateId;
            option.textContent = batchstate.batchState;
            dropdown.appendChild(option);
        });
    }
    catch (error)
    {
        console.log("Hiba az állapotok betöltésekor: ", error);
    }
}

// A bálarendelés mentése gomb eseménykezelője
const save_BatchOrderButton = document.getElementById("save_BatchOrderButton");
if (save_BatchOrderButton)
{
    save_BatchOrderButton.addEventListener('click', async function (event)
    {
        event.preventDefault();

        const pine_type = Number(document.getElementById('pine_type_dropdown').value);
        const batch_state = Number(document.getElementById('batch_state_dropdown').value);
        const quantity = Number(document.getElementById('number_of_pieces').value);

        try
        {
            // 1. Mentés az adatbázisba
            const result = await RegisterNewPineBatchOrder(pine_type, batch_state, quantity);
            console.log("Sikeres mentés:", result);

            // 2. Újra lekérjük az adatbázisból az adatokat
            await loadPineBatchData();

            console.log("A táblázat frissítve!");
        }
        catch (error)
        {
            console.error("Hiba a rendelés mentésekor:", error);
        }

        document.getElementById('pine_type_dropdown').value = "";
        document.getElementById('batch_state_dropdown').value = "";
        document.getElementById('number_of_pieces').value = "";
    });
}

// A fenyőbálák adatainak letöltése az adatbázisból, hogy a táblázatban megjelenjen.
async function loadPineBatchData()
{
    const tableBody = document.getElementById('pineBatchTableBody');

    if (!tableBody) return;

    try
    {
        const pineBatchData = await GetPineBatchOrder();

        tableBody.innerHTML = "";

        const states = {};

        // Adatok csoportosítása állapot és fenyőtípus alapján
        for (const order of pineBatchData)
        {
            const stateId = order.pinebatchStateId;

            if (!states[stateId])
            {
                states[stateId] = {
                    name: order.pinebatchState,
                    luc: 0,
                    jegenye: 0,
                    normand: 0,
                    nobilis: 0
                };
            }

            const quantity = order.batchQuantity || 0;

            switch (order.pineTypeId)
            {
                case 1:
                    states[stateId].luc += quantity;
                    break;

                case 2:
                    states[stateId].jegenye += quantity;
                    break;

                case 3:
                    states[stateId].normand += quantity;
                    break;

                case 4:
                    states[stateId].nobilis += quantity;
                    break;
            }
        }

        // Az "Érkezett" állapot ID-ja
        const erkezettStateId = 1;

        // Érkezett mennyiségek lekérése
        const erkezett = states[erkezettStateId];

        let maradekLuc = erkezett ? erkezett.luc : 0;
        let maradekJegenye = erkezett ? erkezett.jegenye : 0;
        let maradekNormand = erkezett ? erkezett.normand : 0;
        let maradekNobilis = erkezett ? erkezett.nobilis : 0;

        // Az összes többi állapot kivonása
        for (const stateId in states)
        {
            if (Number(stateId) !== erkezettStateId)
            {
                maradekLuc -= states[stateId].luc;
                maradekJegenye -= states[stateId].jegenye;
                maradekNormand -= states[stateId].normand;
                maradekNobilis -= states[stateId].nobilis;
            }
        }

        // Állapotok megjelenítése a táblázatban
        for (const stateId in states)
        {
            const state = states[stateId];

            const htmlSor = `
                <tr>
                    <th>${state.name}</th>
                    <td>${state.luc}</td>
                    <td>${state.jegenye}</td>
                    <td>${state.normand}</td>
                    <td>${state.nobilis}</td>
                </tr>
            `;

            tableBody.innerHTML += htmlSor;
        }

        // Maradt sor megjelenítése
        const maradtSor = `
            <tr>
                <th>Maradt</th>
                <td>${maradekLuc}</td>
                <td>${maradekJegenye}</td>
                <td>${maradekNormand}</td>
                <td>${maradekNobilis}</td>
            </tr>
        `;

        tableBody.innerHTML += maradtSor;
    }
    catch (error)
    {
        console.error("Hiba az adatok betöltésekor:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">Hiba történt az adatok betöltésekor.</td>
            </tr>
        `;
    }
}

// --------------------------------------------------------------------------
// 4. Koszorúalap (PineBase.html)
// --------------------------------------------------------------------------

//  A koszorúalap fajták lekérdezése a legördülő listához
async function loadPineBaseTypes()
{
    try
    {
        const pineBasetypes = await getPineBaseTypes();
        console.log(pineBasetypes);

        const dropdown = document.getElementById("base_type_dropdown");

        pineBasetypes.forEach(pinebasetype => 
        {
            const option = document.createElement("option");
            option.value = pinebasetype.baseId;
            option.textContent = pinebasetype.baseType;
            dropdown.appendChild(option);
        });
    }
    catch (error)
    {
        console.log("Hiba a fenyőalapok betöltésekor: ", error);
    }
}

async function loadCostumersList()
{
    try {
        const response = await fetch("https://localhost:7095/Costumer/List");

        if (!response.ok) {
            throw new Error("Nem sikerült lekérni a vevőket.");
        }

        const costumers = await response.json();

        const dropdown = document.getElementById("costumer_select_dropdown");

        costumers.forEach(costumer => {
            const option = document.createElement("option");

            option.value = costumer.costumerId;
            option.textContent = costumer.costumerName;

            dropdown.appendChild(option);
        });
    }
    catch (error) {
        console.error("Hiba a vevők betöltésekor:", error);
    }
}

// Új koszorúalap rendelés hozzáadása az adatbázishoz
const save_NewPineBaseButton = document.getElementById('save_NewPineBaseButton');
if (save_NewPineBaseButton)
{
    save_NewPineBaseButton.addEventListener('click', async function (event)
    {
        event.preventDefault();

        const costumerId = Number(document.getElementById('costumer_select_dropdown').value);
        const pineTypeId = Number(document.getElementById('pine_type_dropdown').value);
        const pinebasetype = document.getElementById('base_type_dropdown').value;
        const baseQuantity = Number(document.getElementById('number_of_pieces').value);
        const baseOrderedDate = document.getElementById('deadline').value;
        const baseState = false;

        try
        {
            // 1. Mentés az adatbázisba
            const result = await RegisterNewPinebaseOrder(costumerId, pineTypeId, pinebasetype, baseQuantity, baseOrderedDate, baseState);
            console.log("Sikeres mentés:", result);
            
            // 2. Újra lekérjük az adatbázisból az adatokat
            await loadPinebaseOrders();
            console.log("A táblázat frissítve!");
        }

        catch (error)
        {
            console.error("Hiba a rendelés mentésekor:", error);
        }
    })
}

// A koszorúalap rendelések listájának megjelenítése
async function loadPinebaseOrders()
{
    try
    {
        const pineBaseOrders = await GetAllPinebaseOrders();

        const tableBody = document.getElementById('pineBaseTableBody');

        tableBody.innerHTML = '';

        pineBaseOrders.forEach(order =>
        {
            const row = document.createElement('tr');

            const orderedDate = order.baseOrderedDate
                ? new Date(order.baseOrderedDate).toLocaleDateString('hu-HU')
                : '-';

            row.innerHTML = `
                <td>${order.costumerName ?? '-'}</td>

                <td>${orderedDate}</td>

                <td>${order.pineType ?? '-'}</td>

                <td>${order.baseType ?? '-'}</td>

                <td>${order.baseQuantity ?? '-'}</td>

                <td>
                    <input 
                        type="checkbox"
                        ${order.baseState ? 'checked' : ''}
                    >
                </td>
            `;

            const checkbox = row.querySelector('input[type="checkbox"]');

            // Ha készen van, akkor legyen szürke és áthúzott
            if (checkbox.checked)
            {
                row.classList.add('order-completed');
            }

            // Checkbox állapotának megváltozása
            checkbox.addEventListener('change', async function()
            {
                const newState = this.checked;

                // Azonnal változtatjuk a sor kinézetét
                row.classList.toggle('order-completed', newState);

                try
                {
                    await UpdatePinebaseOrderState(
                        order.baseId,
                        newState
                    );

                    console.log(
                        `A ${order.baseId} azonosítójú rendelés állapota frissítve: ${newState}`
                    );
                }
                catch (error)
                {
                    console.error(
                        "Nem sikerült frissíteni a rendelés állapotát:",
                        error
                    );

                    // Ha az adatbázis frissítése sikertelen,
                    // visszaállítjuk az eredeti állapotot
                    this.checked = !newState;

                    row.classList.toggle(
                        'order-completed',
                        this.checked
                    );
                }
            });

            tableBody.appendChild(row);
        });
    }
    catch (error)
    {
        console.error("Hiba a táblázat betöltésekor:", error);

        const tableBody = document.getElementById('pineBaseTableBody');

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    Hiba történt az adatok betöltésekor.
                </td>
            </tr>
        `;
    }
}

// --------------------------------------------------------------------------
// 4. Vásárlók (Costumers.html)
// --------------------------------------------------------------------------

// Új vevő hozzáadása az adatbázishoz
const save_NewCostumerButton = document.getElementById("save_NewCostumerButton");
if (save_NewCostumerButton)
{
    save_NewCostumerButton.addEventListener('click', async function (event)
    {
        event.preventDefault();
        
        const costumer_name = document.getElementById('costumer_name').value;
        const costumer_postal_code = document.getElementById('costumer_postal_code').value;
        const costumer_city = document.getElementById('costumer_city').value;
        const costumer_address = document.getElementById('costumer_address').value;
        const costumer_phonenumber = document.getElementById('costumer_phonenumber').value;
        const costumer_taxnumber = document.getElementById('costumer_taxnumber').value;
        
        try
        {
            // 1. Mentés az adatbázisba
            const result = await RegisterNewCostumer(costumer_name, costumer_postal_code, costumer_city, costumer_address, costumer_phonenumber, costumer_taxnumber);
            console.log("Sikeres mentés:", result);
            
            // 2. Újra lekérjük az adatbázisból az adatokat
            await loadCostumersData();
            console.log("A táblázat frissítve!");
        }
        catch (error)
        {
            console.error("Hiba a rendelés mentésekor:", error);
        }

        document.getElementById('costumer_name').value = "";
        document.getElementById('costumer_postal_code').value = "";
        document.getElementById('costumer_city').value = "";
        document.getElementById('costumer_address').value = "";
        document.getElementById('costumer_phonenumber').value = "";
        document.getElementById('costumer_taxnumber').value = "";
    });
}
// A vevők listájának megjelenítése
async function loadCostumersData()
{
    const costumerstableBody = document.getElementById('costumersTableBody');
    
    if (!costumerstableBody) return;

    try
    {
        const costumersData = await GetAllCostumers();

        costumerstableBody.innerHTML = "";

        for (const data of costumersData.data)
        {
            const htmlSor = `
                <tr>
                    <td>${data.costumerName}</td>
                    <td>${data.costumerPostalCode}</td>
                    <td>${data.costumerCity}</td>
                    <td>${data.costumerAddress}</td>
                    <td>${data.costumerPhonenumber}</td>
                    <td>${data.costumerTaxnumber}</td>
                </tr>
            `;

            costumerstableBody.innerHTML += htmlSor;
        }
    }
    catch (error)
    {
        console.error("Hiba az adatok betöltésekor:", error);

        costumerstableBody.innerHTML = `
            <tr>
                <td colspan="6">Hiba történt az adatok betöltésekor.</td>
            </tr>
        `;
    }
}
