let selectElement = document.getElementById("selectAnkiDeck");
let selectTranslateFrom = document.getElementById("selectTranslateFrom");
let selectTranslateTo = document.getElementById("selectTranslateTo");


async function fetchAnkiDecks() {
  let data = await fetch('http://127.0.0.1:8765/', {
    method: 'POST',
    body: JSON.stringify({
      action: "deckNames",
      version: 6
    })
  }).then(response => response.json())
  return data.result
}

async function getFields(deckName) {
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
      .then(response => {
            return fetch('http://127.0.0.1:8765/', {
              method: 'POST',
              body: JSON.stringify({
                action: "notesInfo",
                version: 6,
                params: {
                  notes: [response.result[0]]
                }
              })
            })
                .then(response => {
                  return response.json().then(value => {
                    console.log(value.result[0].fields)
                    return Object.keys(value.result[0].fields)
                  })
                });
          }
      )
}

function handleDeckSelectionChange(event) {
  let ankiDeck = event.target.value;
  chrome.storage.sync.set({ selectedDeck: ankiDeck });

  getFields(ankiDeck).then(response => {
    addOptionsToSelects(response);
  })
}

async function addOptionsToSelects(fields) {
  //We need to make sure the selects are clear before adding options
  selectTranslateFrom.innerHTML = selectTranslateTo.innerHTML = '';
  let selectedTranslateFromField = await getTranslateFromField()
  let selectedTranslateToField = await getTranslateToField()

  for (let field of fields) {
    let option = document.createElement("option");
    option.innerHTML = field
    option.value = field
    let optionClone = option.cloneNode(true);

    if (field === selectedTranslateFromField){
      option.selected = true
    }

    if (field === selectedTranslateToField){
      optionClone.selected = true
    }

    selectTranslateFrom.appendChild(option);
    selectTranslateTo.appendChild(optionClone)
  }

  let event = new Event('change');
  selectTranslateFrom.dispatchEvent(event)
  selectTranslateTo.dispatchEvent(event)

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

function translateToSelectChangeHandler(ev) {
  console.log(ev)
  return chrome.storage.sync.set({selectedTranslateToField: ev.target.value});
}

function translateFromSelectChangeHandler(ev) {
  console.log(ev)
  return chrome.storage.sync.set({selectedTranslateFromField: ev.target.value});
}

async function constructOptions() {
  let ankiDecks = await fetchAnkiDecks()

  chrome.storage.sync.get("selectedDeck", (data) => {
    let currentDeck = data.selectedDeck;

    selectElement.addEventListener("change", handleDeckSelectionChange);
    selectTranslateFrom.addEventListener("change", translateFromSelectChangeHandler);
    selectTranslateTo.addEventListener("change", translateToSelectChangeHandler);




    for (let deck of ankiDecks) {
      let option = document.createElement("option");
      option.innerHTML = deck;
      option.value = deck.replaceAll(' ', '_');

      if (deck.replaceAll(' ', '_') === currentDeck.replaceAll(' ', '_')) {
        option.selected = true
      }

      selectElement.appendChild(option);
    }

    getFields(currentDeck).then(response => {
      addOptionsToSelects(response)
    })
  });
}

constructOptions();