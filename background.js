chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        getNotes().then(value => {
            sendResponse({notes: value});
        })
        return true;
    }
)

async function getNotes() {
    let rawNotes = await fetch('http://127.0.0.1:8765/', {
        method: 'POST',
        body: JSON.stringify({
            action: "findNotes",
            version: 6,
            params: {
                query: "deck:Korean"
            }
        })
    }).then(response => {
        return response.json();
        // if (response.ok){
        //     return response.json();
        // }else{
        //     throw new Error('Something went wrong')
        // }
    }).then((response) => {
        return fetch('http://127.0.0.1:8765/', {
        method: 'POST',
        body: JSON.stringify({
            action: "notesInfo",
            version: 6,
            params: {
                notes: response.result
            }
        })
    }).then(response => {
        return response.json().then(value => {
            chrome.storage.local.set({notes: value});
            return value;
        })
    })
    }).catch(error => {
        console.log(error)
        return new Promise(resolve => {
            chrome.storage.local.get(['notes'], function(result) {
                resolve(result.notes)
            })
        })
    });
    console.log(rawNotes)

    return rawNotes;
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