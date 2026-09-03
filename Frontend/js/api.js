// --- ADATBÁZIS FÜGGVÉNYEK (Valódi lekérések) ---

// --------------------------------------------------------------------------
// 1. BEJELENTKEZÉS OLDAL (index.html)
// --------------------------------------------------------------------------

async function login(username, password)
{
    try
    {
        const response = await fetch(
            'https://localhost:7095/User/Login',
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    userName: username,
                    passWord: password
                })
        });

        const data = await response.json();
        if (!response.ok) 
        {
            throw new Error(
                data.message || "Hibás felhasználónév vagy jelszó!"
            );
        }

        return data;
    } 
    catch (error)
    {
        console.log('Bejelentkezési hiba: ', error);
        throw error;
    }    
}

// --------------------------------------------------------------------------
// 1. REGISZTRÁCIÓ (index.html)
// --------------------------------------------------------------------------

async function registerNewUser(username, password)
{
    try
    {
        const response = await fetch(
            'https://localhost:7095/User',
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    userName: username,
                    passWord: password
                })
        });

        const data = await response.json();
        if (!response.ok) 
        {
            throw new Error(
                data.message || "A regisztráció sikertelen!"
            );
        }
        return data;
    } 
    catch (error)
    {
        console.log('Regisztrációs hiba: ', error);
        throw error;
    }    
}

// --------------------------------------------------------------------------
// A fenyőtípusok neveinek és betöltése a dropdownlist-be.
// --------------------------------------------------------------------------

async function getPineTypes() 
{
    const response = await fetch("https://localhost:7095/Pinetype");

    if (!response.ok)
    {
        throw new Error("Nem sikerült a fenyőfajtákat betölteni!");
    }

    return await response.json();
}

// --------------------------------------------------------------------------
// A fenyőbálák állapotainak betöltése a dropdownlist-be.
// --------------------------------------------------------------------------

async function GetPineBatchStates()
{
    const response = await fetch("https://localhost:7095/Pinebatchstate");

    if (!response.ok)
    {
        throw new Error("Nem sikerült a fenyőbála állapotokat betölteni!");
    }

    return await response.json();
}

// --------------------------------------------------------------------------
// A bálarendelés adatainak letöltése
// --------------------------------------------------------------------------

async function GetPineBatchOrder()
{
    const response = await fetch("https://localhost:7095/PinebatchOrder");

    if (!response.ok)
    {
        throw new Error("Nem sikerült a rendelési adatokat betölteni!");
    }

    return await response.json();
}

// --------------------------------------------------------------------------
// A bálarendelés mentése az adatbázisba
// --------------------------------------------------------------------------

async function RegisterNewPineBatchOrder(pine_type, batch_state, quantity)
{
    try
    {
        const response = await fetch(
            'https://localhost:7095/PinebatchOrder',
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    PineTypeId: pine_type,
                    PinebatchStateId: batch_state,
                    PineBatchQuantity: quantity
                })
        });

        const data = await response.json();

        if (!response.ok) 
        {
            throw new Error(
                data.message || data.Message || "A rendelés rögzítése sikertelen!"
            );
        }
        return data;
    } 
    catch (error)
    {
        console.log('Adatbázis hiba: ', error);
        throw error;
    }
}

// --------------------------------------------------------------------------
// A fenyőalap méretek betöltése a dropdownlist-be.
// --------------------------------------------------------------------------

async function getPineBaseTypes() 
{
    const response = await fetch("https://localhost:7095/Pinebasetype");

    if (!response.ok)
    {
        throw new Error("Nem sikerült a koszorúalap méreteket betölteni!");
    }

    return await response.json();
}

async function RegisterNewCostumer(costumer_name, costumer_postal_code, costumer_city, costumer_address, costumer_phonenumber, costumer_taxnumber)
{
    try
    {
        const response = await fetch(
            'https://localhost:7095/Costumer',
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    CostumerName: costumer_name,
                    CostumerTaxnumber: costumer_taxnumber,
                    CostumerPhonenumber: costumer_phonenumber,
                    CostumerPostalCode: costumer_postal_code,
                    CostumerCity: costumer_city,
                    CostumerAddress: costumer_address
                })
        });

        const data = await response.json();

        if (!response.ok) 
        {
            throw new Error(
                data.message || data.Message || "A rendelés rögzítése sikertelen!"
            );
        }
        return data;
    } 
    catch (error)
    {
        console.log('Adatbázis hiba: ', error);
        throw error;
    }
}

async function GetAllCostumers()
{
    const response = await fetch("https://localhost:7095/Costumer");

    if (!response.ok)
    {
        throw new Error("Nem sikerült a vevői adatokat betölteni!");
    }

    return await response.json();
}

async function GetCostumersList()
{
    const response = await fetch('https://localhost:7095/Costumer/List');

    if (!response.ok)
    {
        throw new Error("Nem sikerült a vevői adatokat betölteni!");
    }

    return await response.json();
}