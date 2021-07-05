// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});


// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: modifyDOM,
    });

    // chrome.scripting.executeScript({
    //   target: { tabId: tab.id },
    //   function: setPageBackgroundColor,
    // });
  });

  function modifyDOM() {
      var test = "chrome";
    //You can play with your DOM here or check URL against your regex
    console.log('Tab script:');

    const regex = /ability/gi;

console.log("てせつ");
console.log("ㄱㄷㄴㅅㄷ");

      let notes = "천천히 말해 주세요.	Please speak slowly.\n    다시 한 번 말해 주세요.	Please say it again once more.\n    영어로 뭐예요?	What is it in English?\n    한국어로 뭐예요?	What is it in Korean?\n    한국어 잘 못 해요.	I can’t understand Korean well.\n    안녕하세요.	Hello, Good morning/Good afternoon/Good evening\n    잘 지냈어요?	How have you been? / How are you?\n    오래간만이에요!	Long time no see!\n    안녕히 가세요.	Goodbye (said by the person staying).\n    안녕히 계세요.	Goodbye (said by the person leaving)\n    안녕.	Goodbye / Hello (used with friends only)\n    네.	Yes.\n    아니요.	No.\n    아마도.	Maybe.\n    괜찮아요	It’s okay. / I’m okay.\n    안돼요.	No! (strong) / I can’t!\n    감사합니다.	Thank you.\n    고맙습니다.	Thank you.\n    천만에요.	You’re welcome. (not very commonly used)\n    이번 주 수요일.	This week Wednesday\n    오늘은 월요일입니다	Today is monday\n    고마워.	Thanks. (used only with friends)\n    성함이 어떻게 되세요?	What is your name? (formal)\n    성함이 어떻게 되십니까?	What is your name? (formal)\n    이름이 뭐예요?	What is your name? (when talking to equals or people below you)\n    몸	body\n    입	mouth\n    눈	eye\n    귀	ear\n    코	nose\n    얼굴	face\n    손	hand\n    발	foot\n    팔	arm\n    다리	leg\n    손가락	finger\n    발가락	toes\n    머리	hair/head\n    이	tooth\n    책	book\n    펜	pen\n    잡지	magazine\n    사과	apple\n    바나나	banana\n    고양이	cat\n    개	dog\n    차	car\n    버스	bus\n    친구	friend\n    과일	fruit\n    야채	vegetable\n    고기	meat\n    귤	tangerine/mandarin orange\n    오이	cucumber\n    버섯 (버섣)	mushroom\n    멜론	melon\n    미국	America\n    한국	Korea\n    영국	England\n    일본	Japan\n    네덜란드	Nederland\n    바나나는 과일이에요.	Bananas are fruit.\n    오이는 야채예요.	Cucumbers are vegetables.\n    여자	girl, woman\n    남자	boy, man\n    여자친구	girlfriend\n    남자친구	boyfriend\n    학생	student\n    대학생	college student\n    선생님	teacher\n    아버지	father\n    어머니	mother\n    동생	younger sibling\n    여동생	younger sister\n    남동생	younger brother\n    이 책은 싸요.	This book is cheap.\n    그 사람은 한국 사람이에요.	That person is Korean.\n    이 피자가 짜요.	This pizza is salty.\n    저 과일이 비싸요.	That fruit over there is expensive.\n    이 국은 뭐예요?	What is this soup?\n    이 영화가 재미있어요.	This movie is interesting.\n    저 차는 커요.	That car over there is big.\n    그 요거트는 달아요.	That yogurt is sweet.\n    그 사람은 대학생입니다.	That person is a college student.\n    그 김밥이 맛있어요?	Is that gimbap tasty?\n    이 만화책이 좋아요?	Is this comic book good?\n    이 주스는 써요.	This juice is bitter\n    기사	Article\n    다음 노래	next song\n    이전 노래	previous song\n    음악을 재생	play music\n    맞아요.	That's correct. / That's right\n    가깝다 (가까워요)	to be close, near\n    덥다	to be hot\n    한국은 멀어요 (멀다)	Korea Is far\n    쉽다	to be easy\n    어렵다	to be difficult\n    좁다	to be narrow\n    춥다	to be cold\n    날씨	weather\n    말(하다)	speech, words\n    볼펜	ballpoint pen\n    비행기	airplane\n    연필	pencil\n    자전거	bicycle\n    지하철	subway\n    하루	(one) day\n    한인타운	Koreatown\n    공원	park\n    다음	next, following\n    랩	lab\n    백화점	department store\n    생일	birthday\n    선물(하다)	present, gift\n    쇼핑(하다)	shopping\n    연습(하다)	practice\n    오래간만(=오랜만)	after a long time\n    운동(하다)	exercise\n    일(하다)	work\n    오후 6시에 저녁을 먹었어요	I ate dinner (evening) at 6 pm\n    전화(하다)	phone call\n    점심	lunch\n    커피숍	coffee shop, cafe\n    테니스	tennis\n    햄버거	hamburger\n    대답(하다)	answer\n    때	time\n    수영(하다)	swimming\n    수영장	swimming pool\n    어제	yesterday\n    음악	music\n    주말	weekend\n    중학교	middle school\n    축구(하다)	soccer\n    클래식	classical music\n    태권도	Taekwondo (Korean martial art)\n    테니스장	tennis court\n    파티	party\n    너무	too much\n    못	cannot\n    안	do not\n    왜	why\n    자주	often, frequently\n    지난 주에 학교에 갔어요	last week i went to school\n    바쁘다	to be busy\n    모르다	to not know, be unaware of\n    일어나다	to get up\n    가게	store\n    오전	morning; a.m.\n    오후	afternoon; p.m.\n    옷	clothes\n    이번	this (time)\n    걷다 (걸어요)	to walk\n    듣다 (들으러)	to listen; to take (a course)\n    좋아하다	to like\n    언제	when\n    과목	course, subject\n    분	minute\n    시	hour, o'clock\n    ~(으)러	in order to\n    같이 [가치]	together\n    하고	with\n    하고 같이	together with\n    만나다	to meet\n    보다 (봐요)	to see, look, watch\n    쓰다	to write\n    지내다 (지내요)	to get along\n    하다 (해요)	to do\n    공부(하다)	study\n    내일	tomorrow\n    역사	history\n    오늘	today\n    음식	food\n    주스	juice\n    텔레비전	television\n    시험	test, exam\n    그리고	and\n    재미없다	to be uninteresting\n    요즘	these days\n    잘	well\n    지금	now\n    걸리다 (걸려요)	to take [time]\n    살다 (살아요)	to live\n    보통	usually\n    얼마나/얼마	how long/how much\n    좀	a little (contraction of 조금)\n    쯤	about, around\n    또	again\n    그런데	by the way\n    그럼	(if so) then\n    고등학생	high school student\n    대학원생	graduate student\n    보스턴	Boston\n    부모님	parents\n    오빠	older brother of a female\n    형	older brother of a male\n    홍콩	Hong Kong\n    몇	how many, what (with a counter)\n    계시다	to stay, to be (existence)\n    계절	season\n    극장	theater\n    꽃	flower\n    나라	country\n    내년	next year\n    대학원	graduate school\n    방학	school vacation\n    악기	musical instrument\n    액션 영화	action movie\n    여름	summer\n    여행(하다)	travel\n    영화	movie\n    영화관	movie theater\n    코미디	comedy\n    피아노	piano\n    받다	to receive\n    축하하다	to congratulate\n    아마	probably, perhaps\n    정말	really\n    무슨	what, what kind of\n    어느	which\n    ~(으)ㄹ 거예요	probability\n    봄	spring\n    가을	autumn\n    겨울	winter\n    약속	Appointment\n    마트	supermarket\n    설거지(하다)	dishwashing\n    신문	newspaper\n    심리학	psychology\n    이야기(하다) (=얘기)	talk, chat\n    전공(하다)	major\n    준비(하다)	preparation\n    청소(하다)	cleaning\n    학기말	the end of the semester\n    주	week\n    조용하다	to be quiet\n    흐리다	to be cloudy\n    만들다	to make\n    보내다 (보내세요)	to spend time\n    장(을) 보다	to buy one's groceries\n    가끔	sometimes, occasionally\n    많이	much, many\n    서로	each other\n    특히	particularly\n    ~고	and (clausal connective)";
      // console.log(notes);
      notes = notes.split('\t').map(function(item){
            return item.split("\n")
        });
      let notesEnglish = notes.map(function (item) {
          return item[0];
      });
      let notesKorean = notes.map(function (item) {
          return item[1];
      });

    document.body.querySelectorAll("p").forEach(function(node){
        
        var replacement = ''

        var regex = new RegExp(notesEnglish.join("|"), 'gi');
        node.innerHTML = node.innerHTML.replace(regex, function(match){
            console.log(match);
            replacement = notesKorean[notesEnglish.findIndex(function(item){
                return item === match
            })];
            console.log(replacement);
            return `
            <span id="fluent-id-6836a491-cf26-464e-8930-638662a9d58f" class="fluent-translated ready" fluent-original-full-text="${match}" style="line-height: 17.6px; height: 17.6px; width: 77.3281px;">
            ${match}
            <span id="e88b0216-675b-4755-9c32-a4e80035f853" class="fluent-translation-content fluent-highlight" style="background-color: rgba(96, 173, 255, 0.3); color: rgb(60, 64, 67);" element-id="fluent-id-6836a491-cf26-464e-8930-638662a9d58f" fluent-original-text="ability" fluent-original-full-text="ability" come-work-at-fluent="https://www.notion.so/befluent/Careers-at-Fluent-3ef3047578514129b56bb042906fd10e">
            ${replacement}
            </span></span>`
        });
    })

    return document.body.innerHTML;
}
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }

