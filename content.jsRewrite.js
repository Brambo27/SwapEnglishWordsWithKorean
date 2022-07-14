//Initialize dictionary of available words and their translations
let words = {
    "original": "translation",
    "girl": "여자"
};

let exampleText = "Loona (commonly stylized as LOONA or LOOΠΔ; Korean: 이달의 소녀; RR: Idarui Sonyeo; Japanese: 今月の少女, romanized: Kongetsu no Shōjo, lit. 'Girl of the Month') is a South Korean girl group formed by Blockberry Creative. The girl group was introduced to the public through a pre-debut project that began in October 2016, where each of the 12 members were revealed in a periodic fashion by releasing a promotional single over the following 18 months.[2] They debuted as a full ensemble with the extended play, [+ +] (2018), supported by the lead single \"Favorite\" and the title track \"Hi High\".";

// console.log(exampleText.match(/\w+/g))
//
// function generateWordsToSwapList(words, exampleText){
//     //get all words in the example text also in the dictionary as keys case insensitive
//     let wordsToSwap = exampleText.match(/\w+/g).filter(word => Object.keys(words).includes(word.toLowerCase()));
//     console.log(wordsToSwap);
// }

// generateWordsToSwapList(words, exampleText);

function swapWords(original, translation) {
    //Replace all instances of original word with translation case insensitive
    return exampleText = exampleText.replace(new RegExp(original, 'gi'), translation);
}

for (let word in words) {
    swapWords(word, words[word]);
}

console.log(exampleText);