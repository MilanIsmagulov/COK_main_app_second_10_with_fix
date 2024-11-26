let imgPath;
let device = "pc";
if (/iPad/i.test(navigator.userAgent)) device = "iPad";

function createButtonsBox(boxes_counter, items_counter){
    items = []
    current_box_id = 0
    
    for (var i = 0; i < boxes_counter; i++) {

        let buttons_box = document.createElement("div");
        buttons_box.setAttribute("class", "buttons_box");

        let questions_btns = document.createElement("div");
        questions_btns.setAttribute("class", "questions_btns");

        for (var j = 0; j < 5; j++) {
            console.log(boxes_counter)
            if(current_box_id < items_counter){
                questions_btns.appendChild(createQuestionButton(current_box_id));
                current_box_id++;
            }
        }

        buttons_box.appendChild(questions_btns)
        items.push(buttons_box)
    }

    return items
}

function createQuestionButton(id){
    let question = document.createElement("div")
    question.setAttribute("class", `question id${id}`)
    let btn = document.createElement("button")

    let price = allQuestions[id].price

    switch (price){
        case 150:
            btn.setAttribute('style', 'background-color: #3CBA94; color: #F8F8FA;')
            break
        case 200:
            btn.setAttribute('style', 'background-color: #346689; color: #F8F8FA;')
            break
        case 250:
            btn.setAttribute('style', 'background-color:  #025EA1; color: #F8F8FA;')
            break
        case 300:
            btn.setAttribute('style', 'background-color: #283995; color: #F8F8FA;')
            break
    }

    btn.appendChild(document.createTextNode(price))
    question.appendChild(btn)

    return question
}

function createPopUpMain(question){
    if (question.image || question.video) imgPath = `content/quiz-images/type${question.type}`; 

    let el = document.createElement("div");
    el.setAttribute("class", "popup_main");
    el.setAttribute("id", "popup_main");
    let elChB = document.createElement("div");
    elChB.setAttribute("class", "popup_content");
    elChB.setAttribute("id", "popup_content");
    el.appendChild(elChB);

    elChB.appendChild(createHeaderPopUp(question));

    switch(question.type) {
        case 0:
            
            elChB.appendChild(createBodyPopUp_Type0(question));
            break;

        case 1:;
            elChB.appendChild(createBodyPopUp_Type1(question));
            break;

        case 2:
            elChB.appendChild(createBodyPopUp_Type2(question));
            break;

        case 3:
            elChB.appendChild(createBodyPopUp_Type3(question));
            break;

        case 4:
            elChB.appendChild(createBodyPopUp_Type4(question));
            break;

        case 5:
            elChB.appendChild(createBodyPopUp_Type5(question));
            break;

        case 6:
            elChB.appendChild(createBodyPopUp_Type6(question));
            break;

        case 7:
            elChB.appendChild(createBodyPopUp_Type7(question));
            break;
    
        default:
            break
    }

    el.addEventListener('submit', (e) => submitHandler(e));

    return el;
}

function createHeaderPopUp(question){
    let el = document.createElement("div");
    el.setAttribute("class", "header_popup");
    let elChB = document.createElement("div");
    elChB.setAttribute("class", "popup_question");
    let elChBChB = document.createElement("p");
    elChBChB.setAttribute("id", "question_text");
    let elChBChBChA = document.createTextNode(question.text);
    elChBChB.appendChild(elChBChBChA);
    elChB.appendChild(elChBChB);
    el.appendChild(elChB);
    let elChD = document.createElement("div");
    elChD.setAttribute("id", "popup_close");
    elChD.setAttribute("class", "header_popup_close");
    elChD.addEventListener('click', () => popUpQuestionClose());
    let elChDChB = document.createElement("img");
    elChDChB.setAttribute("src", "./content/close.svg");
    elChDChB.setAttribute("alt", "header_popup");
    elChD.appendChild(elChDChB);
    if (questionIsPassed(question)) el.appendChild(elChD);
        
    return el;
}

function createBottomPopUp(question){
    let el = document.createElement("div");
    el.setAttribute("class", "popup_bottom");
    el.setAttribute("id", "popup_bottom");
    let elChB = document.createElement("input");
    elChB.setAttribute("id", "post_answ");
    elChB.setAttribute("type", "submit");
    elChB.setAttribute("value", "Ответить");
    el.appendChild(elChB);
    let elChD = document.createElement("p");
    elChD.setAttribute("id", "question_price");
    // let elChDChA = document.createTextNode(`Правильный ответ даст ${question.price} очков`);
    // elChD.appendChild(elChDChA);
    el.appendChild(elChD);

    return el;
}

function createLoupe(addClasses = "") {
    // Создаем элемент div с классом resize_btn и любыми дополнительными классами
    const el = document.createElement("div");
    el.setAttribute("class", `resize_btn ${addClasses}`);

    // Обработчик клика
    el.addEventListener('click', () => {
        const parentDiv = el.parentElement;

        // Определяем целевой элемент (изображение, видео или текстовый блок)
        const targetEl = findMediaElement(parentDiv);
        
        if (targetEl) {
            const tagName = targetEl.tagName.toLowerCase();
            createFileWindow(targetEl, tagName);
        } else {
            console.log('Контент не найден');
        }
    });

    return el;
}

// Функция для поиска контента (текста, изображения или видео) в родительском элементе
function findMediaElement(parent) {
    // Ищем в родительском элементе img, video или div
    const mediaSelectors = ['img', 'video', 'div'];
    for (let selector of mediaSelectors) {
        const el = parent.querySelector(selector);
        if (el) {
            return el;
        }
    }
    return null;
}

function createFileWindow(targetEl, tagName) {
    const modal = document.getElementById("imageLoupe");

    // Скрываем все возможные контенты в модальном окне
    const modalImage = document.getElementById("modalImage");
    const modalVideo = document.getElementById("modalVideo");
    const modalText = document.getElementById("modalText");

    modalImage.style.display = 'none';
    modalVideo.style.display = 'none';
    modalText.style.display = 'none';

    if (targetEl) {
        // Отображаем модальное окно и нужный контент
        modal.style.display = "flex";
        if (tagName === 'img') {
            modalImage.src = targetEl.src;
            modalImage.style.display = 'flex';
        } else if (tagName === 'video') {
            modalVideo.src = targetEl.src;
            modalVideo.style.display = 'flex';
        } else if (tagName === 'div') {
            modalText.innerHTML = targetEl.innerHTML;
            modalText.style.display = 'flex';
        }
    }

    console.log(targetEl);
}

function deletePopUpMain(){
    if(document.getElementById("popup_main") != null)
        document.getElementById("popup_main").remove();
}









function createBodyPopUp_Type0(question){

    let el = document.createElement("div");
    el.setAttribute("class", "question_type_0_body");
    el.setAttribute("id", "question_type_0");
    let elChB = document.createElement("form");
    elChB.setAttribute("style", "width: 100%;");
    let elChBChB = document.createElement("div");
    elChBChB.setAttribute("class", "question_type_0_radio");
    elChB.appendChild(elChBChB);
    el.appendChild(elChB);

    if (question.image) elChBChB.appendChild(createImgDiv_Type0(question))
    else if(question.video) elChBChB.appendChild(createVidDiv_Type0(question))

    elChBChB.appendChild(createAnswers_Type0(question));

    if (!questionIsPassed(question)) elChB.appendChild(createBottomPopUp(question));

    return el;
}
function createAnswer_Type0(question, i){ let el = document.createElement("div");
    el.setAttribute("id", `question_type_0_answer_${i}`)
    let elChB = document.createElement("input");
    elChB.setAttribute("type", "radio");
    elChB.setAttribute("name", "answ");
    elChB.setAttribute("value", `${i}`);
    el.appendChild(elChB);

    // Проверяем, содержит ли вариант ответа расширение изображения или видео
    let answerText = question.answers[i];
    if (answerText.includes('.png') || answerText.includes('.jpg') || answerText.includes('.jpeg')) {
        // Создаем элемент изображения
        let divImg = document.createElement("div");
        divImg.setAttribute("class", `question_type_0_answer_img`);

        let img = document.createElement("img");
        img.setAttribute("src", `${imgPath}/${allQuestions.indexOf(question)}/${answerText}`);
        img.setAttribute("alt", `Answer Image ${i}`);
        divImg.appendChild(img);

        // Добавляем кнопку увеличения изображения
        divImg.appendChild(createLoupe("resize_btn_type_0_answer"));
        el.appendChild(divImg);
    } else if (answerText.includes('.mp4') || answerText.includes('.webm') || answerText.includes('.ogg')) {
        // Создаем элемент видео
        let divVideo = document.createElement("div");
        divVideo.setAttribute("class", `question_type_0_answer_vid`);

        let video = document.createElement("video");
        video.setAttribute("src", `${imgPath}/${allQuestions.indexOf(question)}/${answerText}`);
        video.setAttribute("muted", "true"); // Отключаем звук
        video.setAttribute("playsinline", "true"); // Для iOS, чтобы предотвратить полноэкранное воспроизведение
        video.setAttribute("disablePictureInPicture", "true"); // Отключаем PIP

        // Отключаем элементы управления и воспроизведение
        video.controls = false;
        video.preload = "metadata"; // Загружаем только метаданные
        video.style.pointerEvents = "none"; // Отключаем возможность взаимодействия с видео

        divVideo.appendChild(video);

        // Добавляем кнопку увеличения видео
        divVideo.appendChild(createLoupe("resize_btn_type_0_answer"));
        el.appendChild(divVideo);
    } else {
        // Создаем текстовый элемент
        let elChD = document.createElement("p");
        elChD.setAttribute("id", `question_type_0_answer_text_${i}`);
        let elChDChA = document.createTextNode(question.answers[i]);
        elChD.appendChild(elChDChA);
        el.appendChild(elChD);
    }

    if (questionIsPassed(question)){
        elChB.setAttribute("class", "disabled_input");
        if(question.answered.includes(i, 0)) {
            elChB.checked = true;

            if (question.correctAnswer.includes(i)){
                el.style = "--bg-color: var(--correct-bg-color);";
            } else {
                el.style = "--bg-color: var(--incorrect-bg-color);";
            }
        }
    } else {
        el.addEventListener('click', () => {
            elChB.checked = !elChB.checked;
        });
    }
    
    return el;
}
function createAnswers_Type0(question){ let el = document.createElement("div");
    el.setAttribute("class", "question_type_0_answers");
    el.setAttribute("id", "question_type_0_answers");

    for (let i = 0; i < question.answers.length; i++) {
        el.appendChild(createAnswer_Type0(question, i));
    }

    return el;
}
function createImgDiv_Type0(question){ let el = document.createElement("div");
    let id = allQuestions.indexOf(question)
    el.setAttribute("class", "question_type_0_img");
    el.setAttribute("id", "question_type_0_img");
    
    let img = document.createElement("img");
    img.setAttribute("src", `${imgPath}/${id}/${id}.png`);
    el.appendChild(img);

    el.appendChild(createLoupe())

    return el;
}
function createVidDiv_Type0(question){ 
    let id = allQuestions.indexOf(question)
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_0_vid");
    el.setAttribute("id", "question_type_0_img");
    
    let img = document.createElement("video");
    img.setAttribute("src", `${imgPath}/${id}/${id}.mp4`);
    img.setAttribute("controls", `true`);
    el.appendChild(img);

    el.appendChild(createLoupe())

    return el;
}


function createBodyPopUp_Type1(question){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_1_body");
    el.setAttribute("id", "question_type_1");
    let elChB = document.createElement("form");
    elChB.setAttribute("style", "width: 100%;");
    let elChBChB = document.createElement("div");
    elChBChB.setAttribute("class", "question_type_1_radio");

    if (question.image) elChBChB.appendChild(createImgDiv_Type1(question));
    else if (question.video) elChBChB.appendChild(createVidDiv_Type1(question));

    elChBChB.appendChild(createAnswers_Type1(question));
    elChB.appendChild(elChBChB);
    el.appendChild(elChB);

    if (!questionIsPassed(question)) elChB.appendChild(createBottomPopUp(question));

    return el;
}
function createAnswer_Type1(question, i){ 
    let el = document.createElement("div");
    el.setAttribute("id", `question_type_1_answer_${i}`);
    let elChB = document.createElement("input");
    elChB.setAttribute("type", "checkbox");
    elChB.setAttribute("value", `${i}`);
    el.appendChild(elChB);

    let answerText = question.answers[i];
    if (answerText.includes('.png') || answerText.includes('.jpg') || answerText.includes('.jpeg')) {
        let divImg = document.createElement("div");
        divImg.setAttribute("class", `question_type_1_answer_img`);

        let img = document.createElement("img");
        img.setAttribute("src", `${imgPath}/${allQuestions.indexOf(question)}/${answerText}`);
        img.setAttribute("alt", `Answer Image ${i}`);
        divImg.appendChild(img);

        divImg.appendChild(createLoupe("resize_btn_type_1_answer"));
        el.appendChild(divImg);
    } else if (answerText.includes('.mp4') || answerText.includes('.webm') || answerText.includes('.ogg')) {
        let divVideo = document.createElement("div");
        divVideo.setAttribute("class", `question_type_1_answer_vid`);

        let video = document.createElement("video");
        video.setAttribute("src", `${imgPath}/${allQuestions.indexOf(question)}/${answerText}`);
        video.setAttribute("muted", "true");
        video.setAttribute("playsinline", "true");
        video.setAttribute("disablePictureInPicture", "true");

        video.controls = false;
        video.preload = "metadata";
        video.style.pointerEvents = "none";

        divVideo.appendChild(video);
        divVideo.appendChild(createLoupe("resize_btn_type_1_answer"));
        el.appendChild(divVideo);
    } else {
        let elChD = document.createElement("div");
        elChD.setAttribute("id", `question_type_1_answer_text_${i}`);
        elChD.setAttribute("class", `question_type_1_answer_text`);
        let elChDChA = document.createTextNode(`${question.answers[i]}`);
        elChD.appendChild(elChDChA);
        el.appendChild(elChD);

        if (answerText.length > 5) el.appendChild(createLoupe("resize_btn_type_1_answer"));
    }

    if (question.answered){
        elChB.setAttribute("class", "disabled_input");
        if(question.answered.includes(i, 0)) {
            elChB.checked = true;

            if (question.correctAnswer.includes(i)){
                el.style = "--bg-color: var(--correct-bg-color);";
            } else {
                el.style = "--bg-color: var(--incorrect-bg-color);";
            }
        }

        
    } else {
        el.addEventListener('click', () => {
            elChB.checked = !elChB.checked;
            console.log('click')
        });
    }

    return el;
}
function createAnswers_Type1(question){ 
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_1_answers");
    el.setAttribute("id", "question_type_1_answers");

    for (let i = 0; i < question.answers.length; i++) {
        el.appendChild(createAnswer_Type1(question, i));
    }

    return el;
}
function createImgDiv_Type1(question){
    let id = allQuestions.indexOf(question)
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_1_img");
    el.setAttribute("id", "question_type_1_img");
    
    let img = document.createElement("img");
    img.setAttribute("src", `${imgPath}/${id}/${id}.png`);
    el.appendChild(img);

    el.appendChild(createLoupe());

    return el;
}
function createVidDiv_Type1(question){ 
    let id = allQuestions.indexOf(question);
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_1_vid");
    el.setAttribute("id", "question_type_1_vid");
    
    let video = document.createElement("video");
    video.setAttribute("src", `${imgPath}/${id}/${id}.mp4`);
    video.setAttribute("controls", `true`);
    el.appendChild(video);

    el.appendChild(createLoupe());

    return el;
}


function createBodyPopUp_Type2(question){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_2_body");
    el.setAttribute("id", "question_type_2");
    let elChB = document.createElement("form");
    elChB.setAttribute("style", "width: 100%;");
    let elChBChB = document.createElement("div");
    elChBChB.setAttribute("class", "question_type_2_dropdown");
    let elChBChBChB = document.createElement("div");
    elChBChBChB.setAttribute("class", "question_type_2_answers");
    elChBChBChB.setAttribute("id", "question_type_2_answers");
    let elChBChBChBChB = document.createElement("div");
    elChBChBChBChB.setAttribute("class", "place_of_custom_dropdown");

    // Разбиваем текст по плейсхолдерам '|' и '!'
    let textAndPlaceholders = question.textDd.split(/(\||!)/);

    let dropdownIndex = 0;    // Индекс для выпадающих списков в answers
    let placeholderIndex = 0; // Общий индекс плейсхолдеров

    for (let i = 0; i < textAndPlaceholders.length; i++) {
        if (textAndPlaceholders[i] === '|' || textAndPlaceholders[i] === '!') {
            if (textAndPlaceholders[i] === '|') {
                // Передаем оба индекса
                elChBChBChBChB.appendChild(createDropdown_Type2(question, dropdownIndex, placeholderIndex));
                dropdownIndex++;
            } else if (textAndPlaceholders[i] === '!') {
                // Передаем placeholderIndex
                elChBChBChBChB.appendChild(createInputField_Type2(question, placeholderIndex));
            }
            placeholderIndex++;
        } else {
            // Это текст между плейсхолдерами
            createDivsForText(textAndPlaceholders[i], elChBChBChBChB);
        }
    }

    elChBChBChB.appendChild(elChBChBChBChB);
    elChBChB.appendChild(elChBChBChB);
    elChB.appendChild(elChBChB);
    el.appendChild(elChB);

    if (!questionIsPassed(question)) elChB.appendChild(createBottomPopUp(question));

    return el;
}
function createDivsForText(text, target) {
    var words = text.split(" ");
    
    for (var i = 0; i < words.length; i++) {
        var div = document.createElement("div");
        div.textContent = words[i];
        target.appendChild(div);
    }
}
function createDropdown_Type2(question, dropdownIndex, placeholderIndex){
    let passed = questionIsPassed(question);
    let el = document.createElement("div");
    el.setAttribute("class", "custom-dropdown");
    let elChB = document.createElement("div");
    elChB.setAttribute("class", "custom-dropdown-input");
    elChB.setAttribute("id", `question_type_2_answer_${dropdownIndex}`);
    let elChBChB = document.createElement("div");
    elChBChB.setAttribute("class", "custom-dropdown-input-placeholder");

    let elChBChBChA;
    if (!passed){
        elChBChBChA = document.createTextNode("Выберите ответ");
    } else {
        // Используем placeholderIndex для доступа к answered и correctAnswer
        let userAnswerIndex = question.answered[placeholderIndex];
        let correctAnswerIndex = question.correctAnswer[placeholderIndex];
        elChBChBChA = document.createTextNode(`${question.answers[dropdownIndex][userAnswerIndex]}`);

        if (correctAnswerIndex == userAnswerIndex){
            elChB.style.backgroundColor = "#bdffbd"; // Правильный
        } else {
            elChB.style.backgroundColor = "#ffb9b9"; // Неправильный
        }
    }

    elChBChB.appendChild(elChBChBChA);
    elChB.appendChild(elChBChB);
    if (!passed){
        let elChBChD = document.createElement("div");
        elChBChD.setAttribute("class", "custom-dropdown-input-icon");
        let elChBChDChB = document.createElement("img");
        elChBChDChB.setAttribute("src", "content/check-mark.png");
        elChBChDChB.setAttribute("alt", "");
        elChBChD.appendChild(elChBChDChB);
        elChB.appendChild(elChBChD);
    }

    el.appendChild(elChB);

    let elChD = document.createElement("div");
    elChD.setAttribute("class", "custom-dropdown-select closed");
    elChD.setAttribute("id", `custom-dropdown-select-${placeholderIndex}`);

    if (!passed){

        // Используем dropdownIndex для доступа к question.answers
        for (let j = 0; j < question.answers[dropdownIndex].length; j++) {
            elChD.appendChild(createDropdownSelect_Type2(question.answers[dropdownIndex], j));
        }

        el.addEventListener('click', function(e){
            elChD.classList.toggle("closed");
        });

        elChD.addEventListener('mouseup', function(e){
            let text = e.target.innerHTML;
            elChBChB.innerHTML = text;
        });

    }

    el.appendChild(elChD);

    return el;
}

function createDropdownSelect_Type2(answers, j){
    let elChDChB = document.createElement("div");
    let elChDChBChA = document.createTextNode(`${answers[j]}`);
    elChDChB.appendChild(elChDChBChA);
    return elChDChB;
}
function createInputField_Type2(question, index) {
    let passed = questionIsPassed(question);
    let el = document.createElement("div");
    el.setAttribute("class", "custom-input-keyboard");
    el.setAttribute("id", `question_type_2_input_${index}`);

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Введите ответ");

    if (passed) {
        input.value = question.answered[index];
        input.disabled = true;
        // Применяем стили в зависимости от правильности ответа
        if (question.correctAnswer[index].trim().toLowerCase() === input.value.trim().toLowerCase()) {
            input.style.backgroundColor = "#bdffbd"; // Правильный
        } else {
            input.style.backgroundColor = "#ffb9b9"; // Неправильный
        }
    }

    el.appendChild(input);
    return el;
}




function createBodyPopUp_Type3(question){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_3_body");
    el.setAttribute("id", "question_type_3");

    let elChB = document.createElement("form");
    elChB.setAttribute("style", "width: 100%;");

    let elChBChB = document.createElement("div");
    elChBChB.setAttribute("class", "question_type_3_drag_n_drop_images");

    elChBChB.appendChild(createAnswers_Type3(question));
    if (!questionIsPassed(question)) elChBChB.appendChild(createDrags_Type3(question));

    elChB.appendChild(elChBChB);
    el.appendChild(elChB);

    if (!questionIsPassed(question)) elChB.appendChild(createBottomPopUp(question));  

    return el;
}
function createAnswers_Type3(question){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_3_answers");
    el.setAttribute("id", "question_type_3_answers");

    for (let i = 0; i < question.answers.length ; i++){
        el.appendChild(createAnswer_Type3(question, i));
    }

    return el;
}
function createAnswer_Type3(question, i){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_3_answer");
    el.setAttribute("id", `question_type_3_answer_${i}`);
    let elChB = document.createElement("div");
    elChB.setAttribute("class", "question_type_3_answer_img");
    let elChBChB = document.createElement("img");
    elChBChB.setAttribute("src", `${imgPath}/${allQuestions.indexOf(question)}/${[i]}.png`);
    elChBChB.setAttribute("alt", "");
    elChB.appendChild(elChBChB);
    elChB.appendChild(createLoupe("resize_btn_type_3"))
    el.appendChild(elChB);
    let elChD = document.createElement("div");
    elChD.setAttribute("class", "question_type_3_answer_drop_zone");
    elChD.setAttribute("id", `question_type_3_answer_drop_zone_${i}`);

    if(questionIsPassed(question)){
        elChD.setAttribute("class", "question_type_3_answer_drop_zone question_type_3_dropped");
        let text = document.createTextNode(`${question.answers[question.answered[i]]}`);
        elChD.appendChild(text);
        if (question.correctAnswer[i] == question.answered[i]){
            elChD.style = "background-color: #bdffbd;";
        }else elChD.style = "background-color: #ffb9b9;";
    }

    el.appendChild(elChD);

    return el;
}
function createDrags_Type3(question){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_3_drags");

    for (let i = 0; i < question.answers.length ; i++){
        el.appendChild(createDrag_Type3(question, i));
    }

    return el;
}
function createDrag_Type3(question, i){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_3_drag");
    el.setAttribute("id", `question_type_3_drag_${i}`);
    let elChA = document.createTextNode(`${question.answers[i]}`);
    el.appendChild(elChA);

    // el.addEventListener('mousedown', (e) => dragNdropHandler(e));

    return el;
}

function createBodyPopUp_Type4(question){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_4_body");
    el.setAttribute("id", "question_type_4");

    let elChB = document.createElement("form");
    elChB.setAttribute("style", "width: 100%;");

    let elChBChB = document.createElement("div");
    elChBChB.setAttribute("class", "question_type_4_drag_n_drop_tables");

    elChBChB.appendChild(createTables_Type4(question));
    if (!questionIsPassed(question)) elChBChB.appendChild(createAnswers_Type4(question));

    elChB.appendChild(elChBChB);
    el.appendChild(elChB);

    if (!questionIsPassed(question)) elChB.appendChild(createBottomPopUp(question));

    return el;
}
function createTables_Type4(question){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_4_tables");

    
    for (let i = 0; i < question.tables.length; i++){
        el.appendChild(createTable_Type4(question, i));
        if (i != question.tables.length - 1) el.appendChild(createTableSplit_Type4());
    }
    

    return el;
}
function createTable_Type4(question, i){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_4_table");
    let elChB = document.createElement("div");
    elChB.setAttribute("class", "question_type_4_table_name");
    let elChBChB = document.createElement("div");
    let elChBChBChA = document.createTextNode(`${question.tables[i]}`);
    elChBChB.appendChild(elChBChBChA);
    elChB.appendChild(elChBChB);
    el.appendChild(elChB);
    let elChD = document.createElement("div");
    elChD.setAttribute("class", "question_type_4_answer_drop_zone");

    if(questionIsPassed(question)){
        for (let j = 0; j < question.answered[i].length; j++){
            
            let text = question.answers[question.answered[i][j]];
            console.log(text);

            let answ = createAnswer_Type4(text, true);

            if (question.correctAnswer[i].indexOf(question.answers.indexOf(text)) != -1){
                answ.style = "background-color: #bdffbd;";
            }else answ.style = "background-color: #ffb9b9;";

            elChD.appendChild(answ);
        }
    }

    el.appendChild(elChD);

    return el;
}
function createTableSplit_Type4(){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_4_table_split");
    return el;
}
function createAnswers_Type4(question) {
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_4_answers");

    for (let i = 0; i < question.answers.length; i++){
        el.appendChild(createAnswer_Type4(question.answers[i]));
    } 

    return el;
}
function createAnswer_Type4(text, flag = false) {
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_4_answer");
    let elChA = document.createTextNode(`${text}`);
    el.appendChild(elChA);

    // if (!flag) el.addEventListener('mousedown', (e) => dragNdropHandler(e));

    

    return el;
}


function createBodyPopUp_Type5(question){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_5_body");
    el.setAttribute("id", "question_type_5");
    let elChB = document.createElement("form");
    elChB.setAttribute("style", "width: 100%;");
    el.appendChild(elChB);

    elChB.appendChild(createDropDownImage_Type5(question));
    if (!questionIsPassed(question)) elChB.appendChild(createBottomPopUp(question));


    return el;
}
function createDropDownImage_Type5(question){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_5_dropdown_image");
    let elChB = document.createElement("div");
    

    
    if (question.image) {
        elChB.setAttribute("class", "question_type_5_image");
        let elChBChB = document.createElement("img");
        elChBChB.setAttribute("src", `${imgPath}/${allQuestions.indexOf(question)}.png`);
        elChBChB.setAttribute("alt", "");
        elChB.appendChild(elChBChB);
        elChB.appendChild(createLoupe("resize_btn_type_5"))
        el.appendChild(elChB)
    }else if(question.video){
        elChB.setAttribute("class", "question_type_5_video");
        let elChBChB = document.createElement("video");
        elChBChB.controls = true;
        elChBChB.setAttribute("src", `${imgPath}/${allQuestions.indexOf(question)}.mp4`);
        elChBChB.setAttribute("alt", "");
        elChB.appendChild(elChBChB);
        elChB.appendChild(createLoupe("resize_btn_type_5 resize_btn_type_5_video"))
        el.appendChild(elChB)
    }

    el.appendChild(createAnswers_Type5(question));

    return el;
}
function createAnswers_Type5(question){
    let el = document.createElement("div");
    el.setAttribute("class", "question_type_5_answers");

    for (let i = 0; i < question.answers.length; i++) {
        el.appendChild(createDropdownBlock_Type5(question, i));
    }
    
    return el;
}
function createDropdownBlock_Type5(question, i){
    let passed = questionIsPassed(question);

    let el = document.createElement("div");
    el.setAttribute("class", "question_type_5_dropdown_block");

    let elChB = document.createElement("div");
    elChB.setAttribute("class", "question_type_5_dropdown_text");
    let elChBChA = document.createTextNode(`${i+1}`);
    elChB.appendChild(elChBChA);
    el.appendChild(elChB);

    let elChD = document.createElement("div");
    elChD.setAttribute("class", "question_type_5_dropdown_answer");
    elChD.setAttribute("id", `question_type_5_answer_${i}`);

    let elChDChB = document.createElement("div");
    elChDChB.setAttribute("class", "custom-dropdown-input-placeholder");
    let elChDChBChA;
    if (!passed) elChDChBChA = document.createTextNode("Выберите ответ");
    else {
        let text = `${question.answers[question.answered[i]]}`;
        elChDChBChA = document.createTextNode(text);
        if (question.correctAnswer[i] == question.answered[i]){
            elChD.style = "background-color: #bdffbd;";
        }else elChD.style = "background-color: #ffb9b9;";
    }

    elChDChB.appendChild(elChDChBChA);

    elChD.appendChild(elChDChB);

    let elChDChD = document.createElement("div");
    elChDChD.setAttribute("class", "custom-dropdown-input-icon");
    let elChDChDChA = document.createElement("img");
    elChDChDChA.setAttribute("src", "content/check-mark.png");
    elChDChDChA.setAttribute("alt", "");
    elChDChD.appendChild(elChDChDChA);
    
    elChD.appendChild(elChDChD);

    let elChDChF = document.createElement("div");
    elChDChF.setAttribute("class", "custom-dropdown-image-select closed");

    for (let j = 0; j < question.answers.length; j++) {
        let elChDChFChB = document.createElement("div");
        let elChDChFChBChA = document.createTextNode(`${question.answers[j]}`);
        
        if (!passed){
            elChDChFChB.addEventListener('mouseup', function(e){
                text = e.target.innerHTML;
                elChDChB.innerHTML = text;
                elChD.classList.remove("un_answered");
            });
        }

        elChDChFChB.appendChild(elChDChFChBChA);
        elChDChF.appendChild(elChDChFChB);
    }

    if (!passed){
        elChD.addEventListener('click', function(e){
            elChDChF.classList.toggle("closed");
        });
    }
    
    
    elChD.appendChild(elChDChF);
    el.appendChild(elChD);

    return el;
}

function createResult(){

    let precentageCorrect = Math.round((countCorrectAnswered / countAnswered) * 100);
    let precentageWrong = Math.round(((countAnswered - countCorrectAnswered) / countAnswered) * 100);
    let countQuestions = allQuestions.length;


    let el = document.createElement("div");
    el.setAttribute("class", "popup_main");
    el.setAttribute("id", "popup_main");
    let elChB = document.createElement("div");
    elChB.setAttribute("class", "popup_content");
    elChB.setAttribute("id", "popup_content");
    let elChBChB = document.createElement("div");
    elChBChB.setAttribute("class", "header_popup");
    let elChBChBChB = document.createElement("div");
    elChBChBChB.setAttribute("class", "popup_result");
    let elChBChBChBChB = document.createElement("p");
    elChBChBChBChB.setAttribute("class", "result_theme");
    let elChBChBChBChBChA = document.createTextNode(`${themeName}`);
    elChBChBChBChB.appendChild(elChBChBChBChBChA);
    elChBChBChB.appendChild(elChBChBChBChB);
    // let elChBChBChBChD = document.createElement("p");
    // elChBChBChBChD.setAttribute("class", "result_theme_short");
    // let elChBChBChBChDChA = document.createTextNode("Краткое название темы");
    // elChBChBChBChD.appendChild(elChBChBChBChDChA);
    // elChBChBChB.appendChild(elChBChBChBChD);
    elChBChB.appendChild(elChBChBChB);
    let elChBChBChD = document.createElement("div");
    elChBChBChD.setAttribute("id", "popup_close");
    elChBChBChD.setAttribute("class", "header_popup_close");

    elChBChBChD.addEventListener('click', () => popUpQuestionClose());

    let elChBChBChDChB = document.createElement("img");
    elChBChBChDChB.setAttribute("src", "./content/close.svg");
    elChBChBChDChB.setAttribute("alt", "header_popup");
    elChBChBChD.appendChild(elChBChBChDChB);
    elChBChB.appendChild(elChBChBChD);
    elChB.appendChild(elChBChB);
    let elChBChD = document.createElement("div");
    elChBChD.setAttribute("class", "questions_result");
    let elChBChDChB = document.createElement("div");
    elChBChDChB.setAttribute("class", "questions_result_all");
    let elChBChDChBChB = document.createElement("div");
    let elChBChDChBChBChA = document.createTextNode("Количество тестовых (оцениваемых) заданий:");
    elChBChDChBChB.appendChild(elChBChDChBChBChA);
    elChBChDChB.appendChild(elChBChDChBChB);
    let elChBChDChBChD = document.createElement("div");
    elChBChDChBChD.setAttribute("id", "result_count_questions");

    let elChBChDChBChDChA = document.createTextNode(`${countAnswered}`);

    elChBChDChBChD.appendChild(elChBChDChBChDChA);
    elChBChDChB.appendChild(elChBChDChBChD);
    elChBChD.appendChild(elChBChDChB);

    // Подсчет очков. Нет надобности в обычных тестах
    let elChBChDChD = document.createElement("div");
    elChBChDChD.setAttribute("class", "questions_result_correct");
    let elChBChDChDChB = document.createElement("div");
    let elChBChDChDChBChA = document.createTextNode("Ваш результат:");
    elChBChDChDChB.appendChild(elChBChDChDChBChA);
    elChBChDChD.appendChild(elChBChDChDChB);
    let elChBChDChDChD = document.createElement("div");
    elChBChDChDChD.setAttribute("id", "result_users_correct_answered");
    let elChBChDChDChDChA = document.createTextNode(`${score} очков`);
    // let elChBChDChDChDChA = document.createTextNode(`${precentageCorrect} %`);
    elChBChDChDChD.appendChild(elChBChDChDChDChA);
    elChBChDChD.appendChild(elChBChDChDChD);
    elChBChD.appendChild(elChBChDChD);
    
    let elChBChDChF = document.createElement("div");
    elChBChDChF.setAttribute("class", "questions_result_stats");
    let elChBChDChFChB = document.createElement("div");
    elChBChDChFChB.setAttribute("class", "result_correct_wrong");
    let elChBChDChFChBChB = document.createElement("div");
    elChBChDChFChBChB.setAttribute("class", "result_corrects");
    let elChBChDChFChBChBChB = document.createElement("div");
    let elChBChDChFChBChBChBChA = document.createTextNode("Количество правильных ответов:");
    elChBChDChFChBChBChB.appendChild(elChBChDChFChBChBChBChA);
    elChBChDChFChBChB.appendChild(elChBChDChFChBChBChB);
    let elChBChDChFChBChBChD = document.createElement("div");
    elChBChDChFChBChBChD.setAttribute("id", "result_corrects_num");
    let elChBChDChFChBChBChDChA = document.createTextNode(`${countCorrectAnswered}`);
    elChBChDChFChBChBChD.appendChild(elChBChDChFChBChBChDChA);
    elChBChDChFChBChB.appendChild(elChBChDChFChBChBChD);
    elChBChDChFChB.appendChild(elChBChDChFChBChB);
    
    elChBChDChF.appendChild(elChBChDChFChB);
    let elChBChDChFChD = document.createElement("div");
    elChBChDChFChD.setAttribute("class", "result_diagram");

    elChBChDChFChD.setAttribute("style", `--pCorr:${precentageCorrect};--b:10px;;`);
    // elChBChDChFChD.setAttribute("style", `--pCorr:${precentageCorrect};--pUnCorr:${precentageWrong};--b:10px;;`);

    elChBChDChF.appendChild(elChBChDChFChD);
    let elChBChDChFChF = document.createElement("div");
    elChBChDChFChF.setAttribute("class", "result_corrects");
    let elChBChDChFChFChB = document.createElement("div");
    let elChBChDChFChFChBChA = document.createTextNode("Количество неправильных ответов:");
    elChBChDChFChFChB.appendChild(elChBChDChFChFChBChA);
    elChBChDChFChF.appendChild(elChBChDChFChFChB);
    let elChBChDChFChFChD = document.createElement("div");
    elChBChDChFChFChD.setAttribute("id", "result_corrects_num");
    let elChBChDChFChFChDChA = document.createTextNode(`${countAnswered - countCorrectAnswered}`);
    elChBChDChFChFChD.appendChild(elChBChDChFChFChDChA);
    elChBChDChFChF.appendChild(elChBChDChFChFChD);
    elChBChDChF.appendChild(elChBChDChFChF);
    elChBChD.appendChild(elChBChDChF);
    elChB.appendChild(elChBChD);
    el.appendChild(elChB);

    return el;
}
function createDragNDropHandlers(question) {
    let idq = question.type;
    
    switch (idq){
        case 3:
            DnDHandlers_Type_3();
            break;
        case 4:
            DnDHandlers_Type_4();
            break;
    }
}
function DnDHandlers_Type_3(argument) {
    var row = document.getElementsByClassName('question_type_3_drags')[0];
    var countDrops = row.children.length;
    // console.log(countDrops);

    for (let i = 0; i < countDrops; i++){

        var dropZone = document.getElementById(`question_type_3_answer_drop_zone_${i}`)

        new Sortable(dropZone, {

            group: 'shared',
            animation: 150,
            onAdd: function(e){
                var itemEl = e.item;
                var targetList = e.to;
                if (targetList.children.length > 1) {

                    var existingItem;
                    if (targetList.children[0] === itemEl) {
                        existingItem = targetList.children[1];
                    } else {
                        existingItem = targetList.children[0];
                    }
                    
                    var sourceList = e.from;
                    sourceList.appendChild(existingItem);
                    targetList.appendChild(itemEl);

                    if (targetList.className != "question_type_3_answer_drop_zone") itemEl.style = "";
                    if (sourceList.className == "question_type_3_drags") existingItem.style = "";
                    
                }
            },
            onEnd: function(e) {
                if (e.to.className == "question_type_3_drags") e.item.style = "";
            }

        });
    }

    new Sortable(row, {
            
            group: {
                name: 'shared',
                put: false // Do not allow items to be put into this list
            },
            
            animation: 150,
            onEnd: function(e) {

                if (e.to.className != "question_type_3_drags" ) e.item.style = "background-color: white; color: black";
                
            }
        });
}
function DnDHandlers_Type_4(argument) {
    // body... question_type_4_answer_drop_zone
    var row = document.getElementsByClassName('question_type_4_answers')[0];
    var drops = document.getElementsByClassName('question_type_4_answer_drop_zone');
    

    for (let i = 0; i < drops.length; i++){
        var dropZone = drops[i];
        new Sortable(dropZone, {
            group: 'shared',
            animation: 150,
        });
    }

    new Sortable(row, {
        group: 'shared',
        swap: true,
        swapClass: "highlight",
        animation: 150,
    });
}



function createBodyPopUp_Type6(question) {
    let el = document.createElement("div");
    el.className = "question_type_6_body";

    let elChB = document.createElement("form");
    elChB.style.width = "100%";

    // Контейнер для интерактивной области
    let mappingContainer = document.createElement("div");
    mappingContainer.className = "question_type_6_mapping";

    // Индекс текущего вопроса
    let questionId = allQuestions.indexOf(question);
    let currentQuestionId = questionId;

    // Проверяем, был ли вопрос отвечен
    let isQuestionAnswered = !!allQuestions[currentQuestionId].answered;

    let userAnswers = question.answered; // Ответы пользователя

    // Создаем пары элементов
    for (let i = 0; i < question.leftContents.length; i++) {
        // Создаем пару
        let pairContainer = createPairBlock_Type6(question, i, questionId, isQuestionAnswered, userAnswers);
        // Добавляем пару в контейнер
        mappingContainer.appendChild(pairContainer);
    }

    elChB.appendChild(mappingContainer);
    el.appendChild(elChB);

    if (!questionIsPassed(question)) {
        elChB.appendChild(createBottomPopUp(question));
    }

    // Инициализируем SVG и интерактивность после добавления элементов в DOM
    setTimeout(() => {
        createSVG_Type6(question.leftContents.length, question.answered);
    }, 0);

    return el;
}
function createPairBlock_Type6(question, index, questionId, isQuestionAnswered, userAnswers) {
    // Контейнер для пары
    let pairContainer = document.createElement("div");
    pairContainer.className = "question_type_6_pair";

    // Левый блок
    let leftBlock = createLeftBlock_Type6(question.leftContents[index], index, questionId);

    // Правый блок
    let rightBlock = createRightBlock_Type6(question.rightContents[index], index, questionId, isQuestionAnswered, userAnswers);

    // Добавляем левый и правый блоки в контейнер пары
    pairContainer.appendChild(leftBlock);
    pairContainer.appendChild(rightBlock);

    return pairContainer;
}
function createLeftBlock_Type6(contentData, index, questionId) {
    // Левый блок
    let leftBlock = document.createElement("div");
    leftBlock.className = "question_type_6_left_block";

    // Левый контент
    let leftContent = createContentElement_Type6(contentData, 'left', index, questionId);
    leftContent.classList.add('question_type_6_left_content');

    // Стартовая точка
    let startPoint = document.createElement("div");
    startPoint.className = "question_type_6_start_point";
    startPoint.id = `startField${index}`;

    // Добавляем левый контент и стартовую точку в левый блок
    leftBlock.appendChild(leftContent);
    leftBlock.appendChild(startPoint);

    return leftBlock;
}
function createRightBlock_Type6(contentData, index, questionId, isQuestionAnswered, userAnswers) {
    // Правый блок
    let rightBlock = document.createElement("div");
    rightBlock.className = "question_type_6_right_block";

    // Таргетная точка
    let endPoint = document.createElement("div");
    endPoint.className = "question_type_6_end_point";
    endPoint.id = `targetField${index}`;

    // Правый контент
    let rightContent = createContentElement_Type6(contentData, 'right', index, questionId);
    rightContent.classList.add('question_type_6_right_content');

    // Добавляем классы правильного или неправильного ответа
    if (isQuestionAnswered) {
        addAnswerClass_Type6(rightContent, questionId, index, userAnswers);
    }

    // Добавляем таргетную точку и правый контент в правый блок
    rightBlock.appendChild(endPoint);
    rightBlock.appendChild(rightContent);

    return rightBlock;
}
function addAnswerClass_Type6(endPoint, questionId, index, userAnswers) {
    let question = allQuestions[questionId];
    let correctAnswers = question.correctAnswer; // Предполагаем, что правильные ответы хранятся в correctAnswer
    let userAnswer = userAnswers[index];

    if (userAnswer !== null && userAnswer !== undefined) {
        if (correctAnswers[index] === userAnswer) {
            endPoint.classList.add('correct-answer');
        } else {
            endPoint.classList.add('wrong-answer');
        }
    } else {
        // Пользователь не дал ответ для этого элемента
        endPoint.classList.add('wrong-answer');
    }
}



function createContentElement_Type6(content, side, index, questionId) {
    // Создаем контейнер для контента
    let contentContainer = document.createElement('div');
    
    // Базовые классы
    contentContainer.classList.add('question_type_6_content_container');
    contentContainer.classList.add(`question_type_6_${side}_content`);
    
    // Определяем дополнительный класс на основе типа контента
    if (content.type === 'text') {
        contentContainer.classList.add(`question_type_6_${side}_content_text`);
    } else if (content.type === 'image') {
        contentContainer.classList.add(`question_type_6_${side}_content_image`);
    } else if (content.type === 'video') {
        contentContainer.classList.add(`question_type_6_${side}_content_video`);
    }
    
    let contentEl;
    let contentIsNeedLoupe = false
    let loupeClasses = "resize_btn_type_6"

    if (content.type === 'text') {
        contentEl = document.createElement("div");
        contentEl.innerText = content.value;
        contentEl.classList.add('question_type_6_text_content');
        if (content.value.length > 10) {
            contentIsNeedLoupe = true
            loupeClasses = loupeClasses + " resize_btn_type_6_text"
        }

    } else if (content.type === 'image') {
        contentEl = document.createElement("img");
        let imgSrc = `content/quiz-images/type6/img/${questionId}-${side === 'left' ? '0' : '1'}-${index}.png`;
        contentEl.setAttribute("src", imgSrc);
        contentEl.setAttribute("alt", "image content");
        contentEl.classList.add('image-content');
        contentIsNeedLoupe = true
    } else if (content.type === 'video') {
        contentEl = document.createElement("video");
        
        let vidSrc = `content/quiz-images/type6/vid/${questionId}-${side === 'left' ? '0' : '1'}-${index}.mp4`;
        contentEl.setAttribute("src", vidSrc);
        contentEl.classList.add('video-content');
        contentIsNeedLoupe = true
    }

    contentContainer.appendChild(contentEl);

    if (contentIsNeedLoupe) contentContainer.appendChild(createLoupe(loupeClasses));

    return contentContainer;
}



function createSVG_Type6(itemCount, userAnswers) {
    // Create global SVG
    var globalDraw = SVG().addTo('.question_type_6_mapping').size('100%', '100%').attr({ style: 'position: absolute; top: 0; left: 0;' });

    // Initialize data object
    var type6Data = {
        globalDraw: globalDraw,
        circles: {},
        smallCircles: {}, // Add small circles storage
        lines: {},
        startPositions: {},
        occupiedTargets: {},
        circleOccupancy: {},
        mappingRect: document.querySelector('.question_type_6_mapping').getBoundingClientRect(),
        draggableEnabled: !allQuestions[currentQuestionId].answered,
        itemCount: itemCount
    };

    for (let i = 0; i < itemCount; i++) {
        createSVGElements_Type6(i, userAnswers, type6Data);
    }

    // Add event listener for window resize
    window.addEventListener('resize', updateSVG_Type6);

    // Save data for access from other functions
    window.type6Data = type6Data;
}

function createSVGElements_Type6(index, userAnswers, type6Data) {
    // Извлекаем переменные из type6Data
    var {globalDraw, mappingRect, circles, lines, startPositions, occupiedTargets, circleOccupancy, draggableEnabled, itemCount} = type6Data;

    let startField = document.getElementById('startField' + index);
    let endField = document.getElementById('targetField' + index);

    let startRect = startField.getBoundingClientRect();

    // Координаты центра стартовой точки
    let startX = startRect.left - mappingRect.left + startRect.width / 2;
    let startY = startRect.top - mappingRect.top + startRect.height / 2;
    startPositions[index] = { x: startX, y: startY };

    // Создаем линию
    let line = globalDraw.line().plot(startX, startY, startX, startY).stroke({ width: 3, color: '#476dd5' });
    lines[index] = line;

    // Создаем и инициализируем круг
    createSVGCircle_Type6(index, userAnswers, type6Data);
}
function createSVGCircle_Type6(index, userAnswers, type6Data) {
    var {globalDraw, mappingRect, circles, smallCircles, lines, startPositions, occupiedTargets, circleOccupancy, draggableEnabled, itemCount} = type6Data;
    let startX = startPositions[index].x;
    let startY = startPositions[index].y;

    // Create small circle
    let circleAdd = globalDraw.circle(15).fill('#476dd5').center(startX, startY);

    // Store the small circle
    smallCircles[index] = circleAdd;

    // Create main circle
    let circle = globalDraw.circle(30).fill('#476dd5').center(startX, startY).attr('id', 'draggableCircle' + index);

    circles[index] = circle;
    circleOccupancy[index] = null;

    // Проверяем, есть ли предыдущий ответ для данного круга
    if (userAnswers && userAnswers[index] !== null && userAnswers[index] !== undefined) {
        let targetIndex = userAnswers[index];
        let targetFieldId = 'targetField' + targetIndex;
        let targetField = document.getElementById(targetFieldId);

        if (targetField) {
            let targetRect = targetField.getBoundingClientRect();
            let targetCenterX = targetRect.left - mappingRect.left + targetRect.width / 2;
            let targetCenterY = targetRect.top - mappingRect.top + targetRect.height / 2;

            // Перемещаем круг в центр таргета
            circle.center(targetCenterX, targetCenterY);

            // Обновляем линию
            lines[index].plot(startX, startY, targetCenterX, targetCenterY);

            // Обновляем информацию о занятости
            occupiedTargets[targetFieldId] = index;
            circleOccupancy[index] = targetFieldId;
        }
    }

    if (draggableEnabled) {
        // Делаем круг перетаскиваемым
        circle.draggable().on('dragmove', function (e) {
            onCircleDrag_Type6(e, this, index, type6Data);
        });

        // Обработка окончания перетаскивания
        circle.on('dragend', function (e) {
            onCircleDragEnd_Type6(e, this, index, type6Data);
        });
    } else {
        circle.css({ cursor: 'default' });
    }
}
function onCircleDrag_Type6(e, circleElement, index, type6Data) {
    var { lines, startPositions } = type6Data;
    let newX = circleElement.cx();
    let newY = circleElement.cy();
    lines[index].plot(startPositions[index].x, startPositions[index].y, newX, newY);
}
function onCircleDragEnd_Type6(e, circleElement, index, type6Data) {
    var { mappingRect, itemCount, circles, lines, startPositions, occupiedTargets, circleOccupancy } = type6Data;
    let newX = circleElement.cx();
    let newY = circleElement.cy();

    let circleRect = circleElement.node.getBoundingClientRect();
    let circleCenterX = circleRect.left - mappingRect.left + circleRect.width / 2;
    let circleCenterY = circleRect.top - mappingRect.top + circleRect.height / 2;

    let overTarget = false;
    let targetFieldId = null;

    // Проверяем, находится ли круг над каким-либо таргет-полем
    for (let j = 0; j < itemCount; j++) {
        let targetField = document.getElementById('targetField' + j);
        let targetRect = targetField.getBoundingClientRect();
        let targetLeft = targetRect.left - mappingRect.left;
        let targetRight = targetRect.right - mappingRect.left;
        let targetTop = targetRect.top - mappingRect.top;
        let targetBottom = targetRect.bottom - mappingRect.top;

        if (circleCenterX > targetLeft && circleCenterX < targetRight &&
            circleCenterY > targetTop && circleCenterY < targetBottom) {
            overTarget = true;
            targetFieldId = 'targetField' + j;
            break;
        }
    }

    if (overTarget) {
        // Проверяем, не занят ли таргет другим кружком
        if (occupiedTargets[targetFieldId] !== undefined && occupiedTargets[targetFieldId] !== index) {
            // Таргет уже занят другим кружком, выполняем замену
            let previousCircleIndex = occupiedTargets[targetFieldId];
            let previousCircle = circles[previousCircleIndex];

            // Возвращаем предыдущий кружок на стартовую позицию
            previousCircle.animate(300).center(startPositions[previousCircleIndex].x, startPositions[previousCircleIndex].y);
            lines[previousCircleIndex].plot(startPositions[previousCircleIndex].x, startPositions[previousCircleIndex].y, startPositions[previousCircleIndex].x, startPositions[previousCircleIndex].y);

            // Обновляем информацию о занятости
            circleOccupancy[previousCircleIndex] = null;
        } else if (occupiedTargets[targetFieldId] === index) {
            // Если таргет уже занят этим же кружком, ничего не делаем
        }

        // Обновляем информацию о предыдущем таргете
        if (circleOccupancy[index] && circleOccupancy[index] !== targetFieldId) {
            delete occupiedTargets[circleOccupancy[index]];
        }

        // Обновляем информацию о занятости
        occupiedTargets[targetFieldId] = index;
        circleOccupancy[index] = targetFieldId;

        // Перемещаем текущий кружок в центр таргета
        let targetRect = document.getElementById(targetFieldId).getBoundingClientRect();
        let targetCenterX = targetRect.left - mappingRect.left + targetRect.width / 2;
        let targetCenterY = targetRect.top - mappingRect.top + targetRect.height / 2;
        circleElement.animate(300).center(targetCenterX, targetCenterY);

        // Обновляем линию
        lines[index].plot(startPositions[index].x, startPositions[index].y, targetCenterX, targetCenterY);

        // Убираем обводку с таргета, если она была
        document.getElementById(targetFieldId).classList.remove('error-type6');
    } else {
        // Возвращаем кружок на стартовую позицию
        circleElement.animate(300).center(startPositions[index].x, startPositions[index].y);
        lines[index].plot(startPositions[index].x, startPositions[index].y, startPositions[index].x, startPositions[index].y);

        // Обновляем информацию о занятости
        if (circleOccupancy[index]) {
            delete occupiedTargets[circleOccupancy[index]];
            circleOccupancy[index] = null;
        }
    }
}
function updateSVG_Type6() {
    var type6Data = window.type6Data;
    if (!type6Data) return; // Exit if type6Data is not initialized

    // Update mappingRect
    type6Data.mappingRect = document.querySelector('.question_type_6_mapping').getBoundingClientRect();

    var { itemCount, circles, smallCircles, lines, startPositions, occupiedTargets, circleOccupancy } = type6Data;

    // Recalculate start positions
    for (let i = 0; i < itemCount; i++) {
        let startField = document.getElementById('startField' + i);
        let startRect = startField.getBoundingClientRect();

        // Update startPositions
        let startX = startRect.left - type6Data.mappingRect.left + startRect.width / 2;
        let startY = startRect.top - type6Data.mappingRect.top + startRect.height / 2;
        startPositions[i] = { x: startX, y: startY };
    }

    // Update positions of circles, small circles, and lines
    for (let i = 0; i < itemCount; i++) {
        let circle = circles[i];
        let smallCircle = smallCircles[i];
        let line = lines[i];

        let isOnTarget = circleOccupancy[i] !== null;

        if (isOnTarget) {
            // Circle is on a target; update its position
            let targetFieldId = circleOccupancy[i];
            let targetField = document.getElementById(targetFieldId);
            let targetRect = targetField.getBoundingClientRect();

            let targetCenterX = targetRect.left - type6Data.mappingRect.left + targetRect.width / 2;
            let targetCenterY = targetRect.top - type6Data.mappingRect.top + targetRect.height / 2;

            // Move main circle to new target center
            circle.center(targetCenterX, targetCenterY);

            // Update line
            line.plot(startPositions[i].x, startPositions[i].y, targetCenterX, targetCenterY);

            // Keep small circle at the start position
            smallCircle.center(startPositions[i].x, startPositions[i].y);
        } else {
            // Circle is at its initial position; update position
            let startX = startPositions[i].x;
            let startY = startPositions[i].y;

            circle.center(startX, startY);

            // Update line
            line.plot(startX, startY, startX, startY);

            // Move small circle to the start position
            smallCircle.center(startX, startY);
        }
    }
}








function createBodyPopUp_Type7(question) {
    let el = document.createElement("div");
    el.className = "question_type_7_body";

    let elChB = document.createElement("form");
    elChB.style.width = "100%";

    // Контейнер для интерактивной области
    let mappingContainer = document.createElement("div");
    mappingContainer.className = "question_type_7_mapping";

    // Индекс текущего вопроса
    let questionId = allQuestions.indexOf(question);
    currentQuestionId = questionId; // Убедитесь, что переменная объявлена глобально или используйте let/var

    // Проверяем, был ли вопрос отвечен
    let isQuestionAnswered = !!allQuestions[currentQuestionId].answered;

    let userAnswers = question.answered; // Ответы пользователя

    // Создаём колонки
    question.leftContents.forEach((leftContent, index) => {
        let column = document.createElement("div");
        column.className = "question_type_7_column";

        // Верхний Контент
        let topContentContainer = createContentElement_Type7(leftContent, 'top', index, questionId);
        column.appendChild(topContentContainer);

        // Круг Старт
        let startPoint = document.createElement("div");
        startPoint.className = "question_type_7_start_point";
        startPoint.id = `startField${index}`;
        column.appendChild(startPoint);

        // Круг Таргет
        let targetPoint = document.createElement("div");
        targetPoint.className = "question_type_7_target_point";
        targetPoint.id = `targetField${index}`;
        column.appendChild(targetPoint);

        

        // Нижний Контент (может быть из rightContents или другой логики)
        let bottomContent = question.rightContents[index];
        if (bottomContent) {
            let bottomContentContainer = createContentElement_Type7(bottomContent, 'bottom', index, questionId);

            // Добавляем классы правильного или неправильного ответа
            if (allQuestions[currentQuestionId].answered) {
                addAnswerClass_Type7(bottomContentContainer, index);
            }

            column.appendChild(bottomContentContainer);
        }



        // Добавляем колонку в контейнер интерактивной области
        mappingContainer.appendChild(column);
    });

    elChB.appendChild(mappingContainer);
    el.appendChild(elChB);

    if (!questionIsPassed(question)) {
        elChB.appendChild(createBottomPopUp(question));
    }

    // Инициализируем SVG и интерактивность после добавления элементов в DOM
    setTimeout(() => {
        createSVG_Type7(question.leftContents.length, question.answered);
    }, 0);

    return el;
}

function createContentElement_Type7(content, position, index, questionId) {
    // Создаем контейнер для контента
    let contentContainer = document.createElement('div');

    // Базовые классы
    contentContainer.classList.add('question_type_7_content_container');
    contentContainer.classList.add(`question_type_7_${position}_content`);

    let contentEl;
    let contentIsNeedLoupe = false;
    let loupeClasses = "resize_btn_type_6"

    if (content.type === 'text') {
        contentEl = document.createElement("div");
        contentEl.innerText = content.value;
        contentEl.classList.add('question_type_7_text_content');
        // Если текст длинный, добавляем кнопку лупы
        if (content.value.length > 10) {
            contentIsNeedLoupe = true
            loupeClasses = loupeClasses + " resize_btn_type_6_text"
        }
    } else if (content.type === 'image') {
        contentEl = document.createElement("img");
        let imgSrc = `content/quiz-images/type7/img/${questionId}-${position === 'top' ? '0' : '1'}-${index}.png`;
        contentEl.setAttribute("src", imgSrc);
        contentEl.setAttribute("alt", "image content");
        contentEl.classList.add('image-content', 'type7-image');
        contentIsNeedLoupe = true;
    } else if (content.type === 'video') {
        contentEl = document.createElement("video");
        let vidSrc = `content/quiz-images/type7/vid/${questionId}-${position === 'top' ? '0' : '1'}-${index}.mp4`;
        contentEl.setAttribute("src", vidSrc);
        contentEl.classList.add('video-content', 'type7-video');
        contentIsNeedLoupe = true;
    }

    contentContainer.appendChild(contentEl);

    // Добавляем кнопку лупы, если необходимо
    if (contentIsNeedLoupe) contentContainer.appendChild(createLoupe(loupeClasses));

    return contentContainer;
}

function createSVG_Type7(itemCount, userAnswers) {
    // Создаем глобальный SVG
    var globalDraw = SVG().addTo('.question_type_7_mapping').size('100%', '100%').attr({ style: 'position: absolute; top: 0; left: 0; z-index: 10;' });

    // Инициализируем объект данных
    var type7Data = {
        globalDraw: globalDraw,
        circles: {},
        smallCircles: {}, // Добавляем для хранения маленьких кругов
        lines: {},
        startPositions: {},
        occupiedTargets: {},
        circleOccupancy: {},
        mappingRect: document.querySelector('.question_type_7_mapping').getBoundingClientRect(),
        draggableEnabled: !allQuestions[currentQuestionId].answered,
        itemCount: itemCount
    };

    for (let i = 0; i < itemCount; i++) {
        createSVGElements_Type7(i, userAnswers, type7Data);
    }

    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', updateSVG_Type7);

    // Сохраняем данные для доступа из других функций
    window.type7Data = type7Data;
}

function createSVGElements_Type7(index, userAnswers, type7Data) {
    // Извлекаем переменные из type7Data
    var { globalDraw, mappingRect, circles, smallCircles, lines, startPositions, occupiedTargets, circleOccupancy, draggableEnabled, itemCount } = type7Data;

    let startField = document.getElementById('startField' + index);
    let endField = document.getElementById('targetField' + index);

    let startRect = startField.getBoundingClientRect();

    // Координаты центра стартовой точки
    let startX = startRect.left - mappingRect.left + startRect.width / 2;
    let startY = startRect.top - mappingRect.top + startRect.height / 2;
    startPositions[index] = { x: startX, y: startY };

    // Создаем линию
    let line = globalDraw.line().plot(startX, startY, startX, startY).stroke({ width: 3, color: '#476dd5' });
    lines[index] = line;

    // Создаем и инициализируем круг
    createSVGCircle_Type7(index, userAnswers, type7Data);
}

function createSVGCircle_Type7(index, userAnswers, type7Data) {
    var { globalDraw, mappingRect, circles, smallCircles, lines, startPositions, occupiedTargets, circleOccupancy, draggableEnabled, itemCount } = type7Data;
    let startX = startPositions[index].x;
    let startY = startPositions[index].y;

    // Создаем доп круг
    let circleAdd = globalDraw.circle(15).fill('#476dd5').center(startX, startY);
    smallCircles[index] = circleAdd; // Сохраняем маленький круг

    // Создаем круг
    let circle = globalDraw.circle(30).fill('#476dd5').center(startX, startY).attr('id', 'draggableCircle7_' + index);

    circles[index] = circle;
    circleOccupancy[index] = null;

    // Проверяем, есть ли предыдущий ответ для данного круга
    if (userAnswers && userAnswers[index] !== null && userAnswers[index] !== undefined) {
        let targetIndex = userAnswers[index];
        let targetFieldId = 'targetField' + targetIndex;
        let targetField = document.getElementById(targetFieldId);

        if (targetField) {
            let targetRect = targetField.getBoundingClientRect();
            let targetCenterX = targetRect.left - mappingRect.left + targetRect.width / 2;
            let targetCenterY = targetRect.top - mappingRect.top + targetRect.height / 2;

            // Перемещаем круг в центр таргета
            circle.center(targetCenterX, targetCenterY);

            // Обновляем линию
            lines[index].plot(startX, startY, targetCenterX, targetCenterY);

            // Обновляем информацию о занятости
            occupiedTargets[targetFieldId] = index;
            circleOccupancy[index] = targetFieldId;
        }
    }

    if (draggableEnabled) {
        // Делаем круг перетаскиваемым
        circle.draggable().on('dragmove', function (e) {
            onCircleDrag_Type7(e, this, index, type7Data);
        });

        // Обработка окончания перетаскивания
        circle.on('dragend', function (e) {
            onCircleDragEnd_Type7(e, this, index, type7Data);
        });
    } else {
        circle.css({ cursor: 'default' });
    }
}

function onCircleDrag_Type7(e, circleElement, index, type7Data) {
    var { lines, startPositions } = type7Data;
    let newX = circleElement.cx();
    let newY = circleElement.cy();
    lines[index].plot(startPositions[index].x, startPositions[index].y, newX, newY);
}

function onCircleDragEnd_Type7(e, circleElement, index, type7Data) {
    var { mappingRect, itemCount, circles, lines, startPositions, occupiedTargets, circleOccupancy } = type7Data;
    let newX = circleElement.cx();
    let newY = circleElement.cy();

    let circleRect = circleElement.node.getBoundingClientRect();
    let circleCenterX = circleRect.left - mappingRect.left + circleRect.width / 2;
    let circleCenterY = circleRect.top - mappingRect.top + circleRect.height / 2;

    let overTarget = false;
    let targetFieldId = null;

    // Проверяем, находится ли круг над каким-либо таргет-полем
    for (let j = 0; j < itemCount; j++) {
        let targetField = document.getElementById('targetField' + j);
        let targetRect = targetField.getBoundingClientRect();
        let targetLeft = targetRect.left - mappingRect.left;
        let targetRight = targetRect.right - mappingRect.left;
        let targetTop = targetRect.top - mappingRect.top;
        let targetBottom = targetRect.bottom - mappingRect.top;

        if (circleCenterX > targetLeft && circleCenterX < targetRight &&
            circleCenterY > targetTop && circleCenterY < targetBottom) {
            overTarget = true;
            targetFieldId = 'targetField' + j;
            break;
        }
    }

    if (overTarget) {
        // Проверяем, не занят ли таргет другим кружком
        if (occupiedTargets[targetFieldId] !== undefined && occupiedTargets[targetFieldId] !== index) {
            // Таргет уже занят другим кружком, выполняем замену
            let previousCircleIndex = occupiedTargets[targetFieldId];
            let previousCircle = circles[previousCircleIndex];

            // Возвращаем предыдущий кружок на стартовую позицию
            previousCircle.animate(300).center(startPositions[previousCircleIndex].x, startPositions[previousCircleIndex].y);
            lines[previousCircleIndex].plot(startPositions[previousCircleIndex].x, startPositions[previousCircleIndex].y, startPositions[previousCircleIndex].x, startPositions[previousCircleIndex].y);

            // Обновляем информацию о занятости
            circleOccupancy[previousCircleIndex] = null;
        } else if (occupiedTargets[targetFieldId] === index) {
            // Если таргет уже занят этим же кружком, ничего не делаем
        }

        // Обновляем информацию о предыдущем таргете
        if (circleOccupancy[index] && circleOccupancy[index] !== targetFieldId) {
            delete occupiedTargets[circleOccupancy[index]];
        }

        // Обновляем информацию о занятости
        occupiedTargets[targetFieldId] = index;
        circleOccupancy[index] = targetFieldId;

        // Перемещаем текущий кружок в центр таргета
        let targetRect = document.getElementById(targetFieldId).getBoundingClientRect();
        let targetCenterX = targetRect.left - mappingRect.left + targetRect.width / 2;
        let targetCenterY = targetRect.top - mappingRect.top + targetRect.height / 2;
        circleElement.animate(300).center(targetCenterX, targetCenterY);

        // Обновляем линию
        lines[index].plot(startPositions[index].x, startPositions[index].y, targetCenterX, targetCenterY);

        // Убираем обводку с таргета, если она была
        document.getElementById(targetFieldId).classList.remove('error-border');
    } else {
        // Возвращаем кружок на стартовую позицию
        circleElement.animate(300).center(startPositions[index].x, startPositions[index].y);
        lines[index].plot(startPositions[index].x, startPositions[index].y, startPositions[index].x, startPositions[index].y);

        // Обновляем информацию о занятости
        if (circleOccupancy[index]) {
            delete occupiedTargets[circleOccupancy[index]];
            circleOccupancy[index] = null;
        }
    }
}

function addAnswerClass_Type7(endPoint, index) {
    let userAnswers = allQuestions[currentQuestionId].answered;
    let question = allQuestions[currentQuestionId];
    let correctAnswers = question.correctAnswer; // Предполагаем, что правильные ответы хранятся в correctAnswer
    let userAnswer = userAnswers[index];

    if (userAnswer !== null && userAnswer !== undefined) {
        if (correctAnswers[index] === userAnswer) {
            endPoint.classList.add('correct-answer');
        } else {
            endPoint.classList.add('wrong-answer');
        }
    } else {
        // Пользователь не дал ответ для этого элемента
        endPoint.classList.add('wrong-answer');
    }
}

function updateSVG_Type7() {
    var type7Data = window.type7Data;
    if (!type7Data) return; // Если данные не инициализированы, выходим из функции

    // Обновляем mappingRect
    type7Data.mappingRect = document.querySelector('.question_type_7_mapping').getBoundingClientRect();

    var { itemCount, circles, lines, startPositions, occupiedTargets, circleOccupancy } = type7Data;

    // Пересчитываем стартовые позиции
    for (let i = 0; i < itemCount; i++) {
        let startField = document.getElementById('startField' + i);
        let startRect = startField.getBoundingClientRect();

        // Обновляем стартовые позиции
        let startX = startRect.left - type7Data.mappingRect.left + startRect.width / 2;
        let startY = startRect.top - type7Data.mappingRect.top + startRect.height / 2;
        startPositions[i] = { x: startX, y: startY };
    }

    // Обновляем позиции кругов и линий
    for (let i = 0; i < itemCount; i++) {
        let circle = circles[i];
        let line = lines[i];

        let isOnTarget = circleOccupancy[i] !== null;

        if (isOnTarget) {
            // Круг находится на таргете; обновляем его позицию
            let targetFieldId = circleOccupancy[i];
            let targetField = document.getElementById(targetFieldId);
            let targetRect = targetField.getBoundingClientRect();

            let targetCenterX = targetRect.left - type7Data.mappingRect.left + targetRect.width / 2;
            let targetCenterY = targetRect.top - type7Data.mappingRect.top + targetRect.height / 2;

            // Перемещаем круг на новую позицию таргета
            circle.center(targetCenterX, targetCenterY);

            // Обновляем линию
            line.plot(startPositions[i].x, startPositions[i].y, targetCenterX, targetCenterY);
        } else {
            // Круг находится на стартовой позиции; обновляем позицию
            let startX = startPositions[i].x;
            let startY = startPositions[i].y;

            circle.center(startX, startY);

            // Обновляем линию
            line.plot(startX, startY, startX, startY);
        }

        // Обновляем дополнительный круг (circleAdd)
        let circleAdd = type7Data.smallCircles[i];
        if (circleAdd) {
            let startX = startPositions[i].x;
            let startY = startPositions[i].y;
            circleAdd.center(startX, startY);
        }
    }
}








