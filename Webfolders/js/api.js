/* 
=============================================================================
ADATBÁZIS SZIMULÁCIÓ (Lokális futtatáshoz)

Mivel ezt a webappot egyelőre csak lokálisan, a saját gépemen fogom futtatni, 
nem kötöttem be még a valódi MySQL adatbázist (amit a suliban PHPMyAdmin-nal tanultunk).

Ez a fájl egy "MOCK" (kamu) adatbázist hoz létre a böngésző memóriájában (LocalStorage). 
Így tökéletesen le tudom tesztelni a funkciókat (pl. pipálás, új rendelés) anélkül, 
hogy külön szervert kéne indítanom a teszteléshez.

Amikor majd élesítem és összekötöm a PHP-val, csak ezeket a függvényeket kell 
átírnom, hogy a valódi MySQL adatbázisomhoz csatlakozzanak!
=============================================================================
*/

// Alapértelmezett kezdő adatok
const defaultPineData = [
    { type: "Érkezett", luc: 80, jegenye: 25, normand: 41, nobilis: 8 },
    { type: "Elvitt", luc: 16, jegenye: 14, normand: 36, nobilis: 3 },
    { type: "Eladva", luc: 3, jegenye: 1, normand: 4, nobilis: 0 },
    { type: "Lekötve", luc: 10, jegenye: 2, normand: 4, nobilis: 8 },
    { type: "Eltéve", luc: 5, jegenye: 5, normand: 1, nobilis: 18 },
    { type: "Maradt", luc: 46, jegenye: 3, normand: -4, nobilis: -21 } // matek most csak példa
];

const defaultWreathData = [
    { id: 1, name: "Kósa P", date: "11.14", small: 10, medium: 0, large: 0, done: false },
    { id: 2, name: "Anita", date: "11.06", small: 2, medium: 2, large: 0, done: true },
    { id: 3, name: "Zsuzsi", date: "11.07", small: 0, medium: 10, large: 0, done: true },
    { id: 4, name: "Kocsisné", date: "11.10", small: 8, medium: 0, large: 0, done: false },
    { id: 5, name: "Tündike", date: "11.07", small: 0, medium: 1, large: 0, done: true }
];

const defaultFlowerOrders = [
    {
        id: 1,
        customerName: "Szántó Anita",
        items: [
            { itemId: 101, name: "Nagy koszorú (Piros)", completed: false },
            { itemId: 102, name: "Kis asztaldísz", completed: false }
        ]
    },
    {
        id: 2,
        customerName: "Moncsi Ózd",
        items: [
            { itemId: 201, name: "Sírcsokor (Fehér)", completed: true },
            { itemId: 202, name: "Közepes koszorú", completed: false }
        ]
    },
    {
        id: 3,
        customerName: "Extra Józsi",
        items: [
            { itemId: 301, name: "Extra nagy fenyőbála", completed: false }
        ]
    }
];

// --- ADATBÁZIS FÜGGVÉNYEK (Local Storage szimuláció) ---

// 1. Fenyőbála adatok lekérése
function apiGetPineData() {
    let data = localStorage.getItem('pineData');
    if (!data) {
        // Ha még nincs, beállítjuk az alapértelmezettet
        localStorage.setItem('pineData', JSON.stringify(defaultPineData));
        data = localStorage.getItem('pineData');
    }
    return JSON.parse(data);
}

// 2. Koszorúalap adatok lekérése
function apiGetWreathData() {
    let data = localStorage.getItem('wreathData');
    if (!data) {
        localStorage.setItem('wreathData', JSON.stringify(defaultWreathData));
        data = localStorage.getItem('wreathData');
    }
    return JSON.parse(data);
}

// Új koszorú rendelés hozzáadása
function apiAddWreathData(newOrder) {
    let data = apiGetWreathData();
    // Generálunk egy egyedi azonosítót (ID-t)
    newOrder.id = Date.now();
    newOrder.done = false;
    data.push(newOrder);
    localStorage.setItem('wreathData', JSON.stringify(data));
}

// 3. Virág rendelések lekérése
function apiGetFlowerOrders() {
    let data = localStorage.getItem('flowerOrders');
    if (!data) {
        localStorage.setItem('flowerOrders', JSON.stringify(defaultFlowerOrders));
        data = localStorage.getItem('flowerOrders');
    }
    return JSON.parse(data);
}

// Tétel állapotának (pipa) frissítése
function apiToggleOrderItem(customerId, itemId, isCompleted) {
    let orders = apiGetFlowerOrders();
    // Végigmegyünk a rendeléseken
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === customerId) {
            // Megtaláltuk a vevőt, most végigmegyünk a tételein
            for (let j = 0; j < orders[i].items.length; j++) {
                if (orders[i].items[j].itemId === itemId) {
                    orders[i].items[j].completed = isCompleted;
                }
            }
        }
    }
    // Elmentjük a módosított tömböt
    localStorage.setItem('flowerOrders', JSON.stringify(orders));
}

// Segéd függvény a reseteléshez
function apiResetDatabase() {
    localStorage.clear();
    alert("Az adatbázis sikeresen visszaállt az alapállapotra!");
    window.location.reload();
}
