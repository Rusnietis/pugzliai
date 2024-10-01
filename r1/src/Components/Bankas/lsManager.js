import { v4 as uuidv4 } from 'uuid';

// ši funkcija nuskaito localStorage ir gražina informacija
function get(key) {
    const data = localStorage.getItem(key);
    return null !== data ? JSON.parse(data) : [];
}

//Funkcijų rinkinys (raktas, duomenys) yra skirtas duomenims saugoti naršyklės vietinėje saugykloje nurodytu raktu
function set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Veiksmai su localStorage

export function lsStore(key, data) {
    const id = uuidv4();
    // I kuriamus duomenis yra idedamas id
    const newData = { ...data, id };
    // Paimami seni duomenys
    const oldData = get(key);
    // Prie senu duomenu pridedami nauji duomenys
    const dataToStore = [...oldData, newData];
    // Irasoma i localeStorage su naujais duomenim (naujas daiktas irašytas)
    set(key, dataToStore);
    return id;
}
// Duomenu atnaujinimas
export function lsUpdate(key, id, data) {
    //Paimami seni duomenys
    const oldData = get(key);
    //Surandame id, kuri norime atnaujinti
    const dataToStore = oldData.map(item => item.id === id ? { ...item, ...data, id } : item);
    set(key, dataToStore);
}
//Duomenu trinimas
export function lsDestroy(key, id) {
    //Paiimami seni duomenys
    const oldData = get(key);
    //Nufiltruojami pagal id, yra istrinamas
    const dataToStore = oldData.filter(item => item.id !== id);
    set(key, dataToStore);
}
//Nuskaitymas pagal key visa masyva ir grazina
export function lsRead(key) {
    return get(key);
}
//Grazina surastus duomenys(item) pagal id
export function lsShow(key, id) {
    const oldData = get(key);
    const dataToShow = oldData.find(item => item.id === id);
    return dataToShow;
}