getNotes();

function modifyDOM(notesEnglish, notesKorean) {
    var regex = new RegExp(`(?![^<]*>)\\b(${notesEnglish.join("|")})\\b`, 'gi');

    let styleElement = document.createElement('style');
    styleElement.innerHTML = "span.fluent-translated[fluent-original-full-text]{opacity:0;position:relative !important;color:transparent !important;overflow:hidden;display:inline-flex !important;box-sizing:border-box !important}.fluent-translated.onboarding{color:#777 !important;overflow:visible !important}.fluent-translated.ready{opacity:1 !important}.fluent-translation-content{transition:all .3s !important;white-space:nowrap !important;display:inline-flex !important;align-items:center !important;color:#333;position:absolute !important;left:0 !important;top:0 !important;bottom:0 !important;z-index:2 !important;user-select:none !important;cursor:pointer !important;box-sizing:border-box !important}.fluent-highlight{border-radius:5px !important;padding:0 3px !important}.fluent-underlined{border-bottom:2px solid #5292fc !important}.fluent-dot::after{content:\" \" !important;display:block !important;height:5px !important;width:5px !important;border-radius:50% !important;margin-left:5px !important}.fluent-dot.fluent-practice::after{background-color:#5292fc !important}.fluent-dot.fluent-familiar::after{background-color:#07c19b !important}"
    document.head.appendChild(styleElement)

    document.body.querySelectorAll("p").forEach(function(node){
        var replacement = '';

        node.innerHTML = node.innerHTML.replace(regex, function(match){
            replacement = notesKorean[notesEnglish.findIndex(function(item){
                return item.toLowerCase() === match.toLowerCase();
            })];

            let spanWidth = getTextWidth(replacement, getComputedStyle(node).font) + 6;
            return `<span id="fluent-id-6836a491-cf26-464e-8930-638662a9d58f" class="fluent-translated ready" fluent-original-full-text="${match}" style="line-height: ${getComputedStyle(node).lineHeight.replace("px", '') * 0.7 + "px"}; height: ${getComputedStyle(node).lineHeight.replace("px", '') * 0.7 + "px"}; width: ${spanWidth}px;">${match}<span id="e88b0216-675b-4755-9c32-a4e80035f853" class="fluent-translation-content fluent-highlight" style="background-color: rgba(96, 173, 255, 0.3); color: ${getComputedStyle(node).color};" element-id="fluent-id-6836a491-cf26-464e-8930-638662a9d58f" fluent-original-text="${match}" fluent-original-full-text="${match}" come-work-at-fluent="https://www.notion.so/befluent/Careers-at-Fluent-3ef3047578514129b56bb042906fd10e">${replacement}</span></span>`
        });
    });

    return document.body.innerHTML;
}

function getNotesKorean(rawNotes){
    return rawNotes.map(function (item) {
        return item.fields.Front.value;
    });
}

function getNotesEnglish(rawNotes){
    return rawNotes.map(function (item) {
        return item.fields.Back.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
}

function getNotes(){
    chrome.runtime.sendMessage({request: "getNotes"},
        function(response){
            modifyDOM(getNotesEnglish(response.notes.result), getNotesKorean(response.notes.result))
        })
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);

    return metrics.width;
}

