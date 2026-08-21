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
    { id: 1, name: "Kósa P", date: "11.14", pinetype: "Jegenye", size: "Nagy", done: true },
    { id: 2, name: "Anita", date: "11.06", pinetype: "Luc", size: "Kicsi", done: true },
    { id: 3, name: "Zsuzsi", date: "11.07", pinetype: "Normand", size: "Kicsi", done: false },
    { id: 4, name: "Kocsisné", date: "11.10", pinetype: "Luc", size: "Nagy", done: true },
    { id: 5, name: "Tündike", date: "11.07", pinetype: "Nobilis", size: "Kicsi", done: true }
];

const defaultCostumersData = [
    { id: 1, name: "Kósa P", postal_code: "3397", city: 10, address: true, phonenumber: 0, taxnumber: false },
    { id: 2, name: "Anita", postal_code: "1106", city: 2, address: false, phonenumber: 0, taxnumber: true },
    { id: 3, name: "Zsuzsi", postal_code: "1107", city: 0, address: true, phonenumber: 0, taxnumber: true },
    { id: 4, name: "Kocsisné", postal_code: "1110", city: 8, address: true, phonenumber: 0, taxnumber: false },
    { id: 5, name: "Tündike", postal_code: "3398", city: 0, address: false, phonenumber: 0, taxnumber: true }
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

// 3. Vevői adatok lekérése
function apiGetCostumersData() {
    let data = localStorage.getItem('CostumersData');
    if (!data) {
        localStorage.setItem('CostumersData', JSON.stringify(defaultCostumersData));
        data = localStorage.getItem('CostumersData');
    }
    return JSON.parse(data);
}

// Segéd függvény a reseteléshez
function apiResetDatabase() {
    localStorage.clear();
    alert("Az adatbázis sikeresen visszaállt az alapállapotra!");
    window.location.reload();
}
