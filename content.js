import tippy from 'tippy.js';

getNotes();

function makeToolTip(definition){
    return "<div class=\"flex flex-col justify-center\">\n" +
        "  <div class=\"relative py-3 sm:max-w-xl sm:mx-auto\">\n" +
        "    <div class=\"relative px-4 py-2 bg-gray-50 shadow-md sm:rounded-md sm:py-2 sm:px-3\">\n" +
        "      <div class=\"max-w-md mx-auto\">\n" +
        "          <div class=\"text-base leading-6 text-gray-700 sm:text-lg sm:leading-7\">\n" +
        "            <p class=\"font-medium\">" + definition + "</p>\n" +
        "          </div>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "</div>"
}

function modifyDOM(notesEnglish, notesKorean) {
    //regex that searches for english words in the page that are also in the list notesEnglish
    var regex = new RegExp(`(?![^<]*>)\\b(${notesEnglish.join("|").replaceAll(',', '|')})\\b`, 'gi');
    //We need to style the word replacement elements so we inject a style element
    let styleElement = document.createElement('style');
    let tippyLink = document.createElement('link')
    tippyLink.innerHTML = "<link href=\"https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css\" rel=\"stylesheet\">"

    styleElement.innerHTML = "span.fluent-translated[fluent-original-full-text]{opacity:0;position:relative !important;color:transparent !important;overflow:hidden;display:inline-flex !important;box-sizing:border-box !important}.fluent-translated.onboarding{color:#777 !important;overflow:visible !important}.fluent-translated.ready{opacity:1 !important}.fluent-translation-content{transition:all .3s !important;white-space:nowrap !important;display:inline-flex !important;align-items:center !important;color:#333;position:absolute !important;left:0 !important;top:0 !important;bottom:0 !important;z-index:2 !important;user-select:none !important;cursor:pointer !important;box-sizing:border-box !important}.fluent-highlight{border-radius:5px !important;padding:0 3px !important}.fluent-underlined{border-bottom:2px solid #5292fc !important}.fluent-dot::after{content:\" \" !important;display:block !important;height:5px !important;width:5px !important;border-radius:50% !important;margin-left:5px !important}.fluent-dot.fluent-practice::after{background-color:#5292fc !important}.fluent-dot.fluent-familiar::after{background-color:#07c19b !important}"
    document.head.append(styleElement, tippyLink)

    document.body.querySelectorAll("p").forEach(function(node){
        let replacement = '';
        node.innerHTML = node.innerHTML.replace(regex, function(match){
            let foundIndex = notesEnglish.findIndex(function(item, index){
                if (typeof item !== typeof 'string'){
                    for (let value of item){
                        if (value.toLowerCase() === match.toLowerCase()) return true
                    }
                }else {
                    return item.toLowerCase() === match.toLowerCase()
                }
            })

            replacement = notesKorean[foundIndex];
            let spanWidth = getTextWidth(replacement, getComputedStyle(node).font) + 6;

            return `<span id="fluent-id-6836a491-cf26-464e-8930-638662a9d58f" class="fluent-translated ready" fluent-original-full-text=\"${match}\" style="line-height: ${getComputedStyle(node).lineHeight.replace("px", '') * 0.7 + "px"}; height: ${getComputedStyle(node).lineHeight.replace("px", '') * 0.7 + "px"}; width: ${spanWidth}px;">${match}<span id="e88b0216-675b-4755-9c32-a4e80035f853" class="fluent-translation-content fluent-highlight" style="background-color: rgba(96, 173, 255, 0.3); color: ${getComputedStyle(node).color};" element-id="fluent-id-6836a491-cf26-464e-8930-638662a9d58f" fluent-original-text="${match}">${replacement}</span></span>`
        });
    });
}



// function getNotesKorean(rawNotes){
//     return rawNotes.map(function (item) {
//         return item.fields.Front.value;
//     });
// }
//
// function getNotesEnglish(rawNotes){
//     return rawNotes.map(function (item) {
//         return item.fields.Back.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//     });
// }

function getNotes(){
    chrome.runtime.sendMessage({request: "getNotes"},
        function(response){
            modifyDOM(response.notes["English"], response.notes["Korean"]);

            tippy('#fluent-id-6836a491-cf26-464e-8930-638662a9d58f', {
                content(reference) {
                    return makeToolTip(reference.getAttribute('fluent-original-full-text'));
                },
                allowHTML: true,
                delay: [100, 0],
            });        })
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);

    return metrics.width;
}

