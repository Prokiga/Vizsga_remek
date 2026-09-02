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
            const result = await login(user, pass);
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
// 1. REGISZTRÁCIÓ (index.html)
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
            const result = await registerNewUser(user, pass);
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
// 2. FENYŐBÁLA OLDAL (PineBatch.html)
// --------------------------------------------------------------------------

//  A fenyőfajták lekérdezése

async function loadPineTypes()
{
    try
    {
        const pinetypes = await getPineTypes();
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

// A fenyőbálák állapotának lekérdezése

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

        const pine_type = Number(
            document.getElementById('pine_type_dropdown').value
        );

        const batch_state = Number(
            document.getElementById('batch_state_dropdown').value
        );

        const quantity = Number(
            document.getElementById('number_of_pieces').value
        );

        try
        {
            // 1. Mentés az adatbázisba
            const result = await RegisterNewPineBatchOrder(
                pine_type,
                batch_state,
                quantity
            );

            console.log("Sikeres mentés:", result);

            // 2. Újra lekérjük az adatbázisból az adatokat
            await loadPineBatchData();

            console.log("A táblázat frissítve!");
        }
        catch (error)
        {
            console.error("Hiba a rendelés mentésekor:", error);
        }

        document.getElementById('pine_type_dropdown').value = null;
        document.getElementById('batch_state_dropdown').value = null;
        document.getElementById('number_of_pieces').value = null;
    });
}

async function loadPineBatchData()
{
    const tableBody = document.getElementById('pineBatchTableBody');

    if (!tableBody) return;

    try
    {
        const pineBatchData = await GetPineBatchOrder();

        tableBody.innerHTML = "";

        const states = {};

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

        const maradtSor = `
            <tr>
                <th>Maradt</th>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
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

//  A koszorúalap fajták lekérdezése

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