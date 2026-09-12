async function Login(username, password)
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

async function RegisterNewUser(username, password)
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
        console.log('Adatbázis hiba: ', error);
        throw error;
    }    
}

async function GetPineTypes() 
{
    const response = await fetch("https://localhost:7095/Pinetype");

    if (!response.ok)
    {
        throw new Error("Nem sikerült a fenyőfajtákat betölteni!");
    }

    return await response.json();
}

async function GetPineBatchStates()
{
    const response = await fetch("https://localhost:7095/Pinebatchstate");

    if (!response.ok)
    {
        throw new Error("Nem sikerült a fenyőbála állapotokat betölteni!");
    }

    return await response.json();
}

async function GetPineBatchOrder()
{
    const response = await fetch("https://localhost:7095/PinebatchOrder");

    if (!response.ok)
    {
        throw new Error("Nem sikerült a rendelési adatokat betölteni!");
    }

    return await response.json();
}

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

async function RegisterNewPinebaseOrder(costumerId, pineTypeId, pinebasetype, baseQuantity, baseOrderedDate, baseState)
{
    try
    {
        const response = await fetch(
            'https://localhost:7095/PinebaseOrder',
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    CostumerId : costumerId,
                    PineTypeId : pineTypeId,
                    Pinebasetype : pinebasetype,
                    BaseQuantity : baseQuantity,
                    BaseOrderedDate : baseOrderedDate,
                    BaseState : baseState
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

async function GetAllPinebaseOrders()
{
    try
    {
        const response = await fetch(
            'https://localhost:7095/PinebaseOrder'
        );

        const data = await response.json();

        if (!response.ok)
        {
            throw new Error(
                data.message || data.Message || "A rendelések lekérése sikertelen!"
            );
        }

        return data;
    }
    catch (error)
    {
        console.error("Hiba a rendelések lekérésekor:", error);
        throw error;
    }
}

async function UpdatePinebaseOrderState(baseId, baseState)
{
    try
    {
        const response = await fetch(
            `https://localhost:7095/PinebaseOrder/UpdateState/${baseId}`,
            {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(baseState)
            }
        );

        const data = await response.json();

        if (!response.ok)
        {
            throw new Error(
                data.message ||
                data.Message ||
                "A rendelés állapotának módosítása sikertelen!"
            );
        }

        return data;
    }
    catch (error)
    {
        console.error(
            "Hiba a rendelés állapotának módosításakor:",
            error
        );

        throw error;
    }
}