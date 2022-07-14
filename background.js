chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        getNotes().then(value => {
            sendResponse({notes: value});
        })
        return true;
    }
)

async function getSelectedDeck(){
    return new Promise(resolve => {
        chrome.storage.sync.get("selectedDeck", function (result) {
            resolve(result.selectedDeck)
        })
    })
}

async function getTranslateFromField() {
    return new Promise(resolve => {
        chrome.storage.sync.get("selectedTranslateFromField", function (result) {
            resolve(result.selectedTranslateFromField)
        })
    })
}

async function getTranslateToField() {
    return new Promise(resolve => {
        chrome.storage.sync.get("selectedTranslateToField", function (result) {
            resolve(result.selectedTranslateToField)
        })
    })
}

async function getNotes() {
    let deckName = await getSelectedDeck();
    return await fetch('http://127.0.0.1:8765/', {
        method: 'POST',
        body: JSON.stringify({
            action: "findNotes",
            version: 6,
            params: {
                query: `deck:${deckName}`
            }
        })
    })
    .then(response => response.json())
    .then(response =>
        fetch('http://127.0.0.1:8765/', {
            method: 'POST',
            body: JSON.stringify({
                action: "notesInfo",
                version: 6,
                params: {
                    notes: response.result
                }
            })
        })
        .then(response => {
            return response.json().then(value => {
                return simplifyResults(value.result).then(simplifiedNotes => {
                    chrome.storage.local.set({notes: simplifiedNotes});
                    return simplifiedNotes
                })
            })
        })
    )
    .catch(error => {
        console.log(error)
        return new Promise(resolve => {
            chrome.storage.local.get(['notes'], function (result) {
                resolve(result.notes)
            })
        })
    });
}

// function handleCommaSeparatedWords(rawNotes, translateFromField, translateToField) {
//     rawNotes.map(function (item, index){
//         console.log(item.fields)
//         console.log(item.fields[translateFromField])
//         if (item.fields[translateFromField].value.includes(',')){
//             let indexOfItem = index;
//             let newItems = item.fields[translateFromField].value.split(',');
//             newItems.forEach(value => {
//                 rawNotes.splice(indexOfItem, index === indexOfItem /*als dit de eerste insert is delete 1*/, value)
//                 indexOfItem++
//             })
//         }
//     })
//     return rawNotes;
// }

async function simplifyResults(result){
    let translateFromField = await getTranslateFromField();
    let translateToField = await getTranslateToField();
    return {English : getNotesFrom(result, translateFromField), Korean: getNotesTo(result, translateToField)}
}


function getNotesTo(rawNotes, translateToField){
    return rawNotes.map(function (item) {
        return item.fields[translateToField].value;
    })
}

function getNotesFrom(rawNotes, translateFromField){
    return rawNotes.map(function (item) {
        item = item.fields[translateFromField].value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); //This regex is used to escape special characters
        if (item.includes(', ')){
            item = item.split(', ');
        }

        return item;
    });
}


// return chrome.storage.local.get(['notes'], function(result) {
//     console.log("catch" + result.notes.result)
//     return result.notes.result
// });

// .then(data => {
//     return fetch('http://127.0.0.1:8765/', {
//         method: 'POST',
//         body: JSON.stringify({
//             action: "notesInfo",
//             version: 6,
//             params: {
//                 notes: data.result
//             }
//         })
//     })
//     .then(response => response.json())
// })