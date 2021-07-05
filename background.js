chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        getNotes().then(value => {
            sendResponse({notes: value});
        })
        return true;
    }
)

async function getNotes() {
    return await fetch('http://127.0.0.1:8765/', {
        method: 'POST',
        body: JSON.stringify({
            action: "findNotes",
            version: 6,
            params: {
                query: "deck:Korean"
            }
        })
    }).then(response => response.json()).then(data => {
        return fetch('http://127.0.0.1:8765/', {
            method: 'POST',
            body: JSON.stringify({
                action: "notesInfo",
                version: 6,
                params: {
                    notes: data.result
                }
            })
        }).then(response => response.json())
            .then(data => {
                return data
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}

