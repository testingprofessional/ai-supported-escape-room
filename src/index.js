const escapeRoom = {
    naam: 'De Vergeten Werkkamer',
    beschrijving: 'Je zit opgesloten in een oude werkkamer. Vind een manier om te ontsnappen.',
    voorwerpen: ['Sleutel', 'Zaklamp'],
    puzzels: [{ naam: 'Cijfercode',
            beschrijving: 'Een paneel vraagt om een viercijferige code.',
            oplossing: '2580',
            opgelost: false },
        { naam: 'Verborgen schakelaar',
            beschrijving: 'Er zit ergens in de kamer een verborgen schakelaar.',
            oplossing: 'boekenkast',
            opgelost: false }]
};
const actie = {
    type: 'pak',
    doel: 'Sleutel'
};
console.log('Actie: ', actie);
function verwerkActie(actie) {
    switch (actie.type) {
        case "kijk": return "Je bekijkt de kamer.";
        case "inventaris": return "Je bekijkt je inventaris";
        case "pak": return "Deze actie wordt nog niet ondersteund.";
        case "los-op": return "Deze actie wordt nog niet ondersteund.";
        case "help": return "Deze actie wordt nog niet ondersteund.";
        default: return "Onbekende actie.";
    }
}
console.log(verwerkActie({ type: 'kijk', doel: '' }));
console.log(verwerkActie({ type: 'inventaris', doel: '' }));
console.log(verwerkActie({ type: 'pak', doel: 'Sleutel' }));
export {};
