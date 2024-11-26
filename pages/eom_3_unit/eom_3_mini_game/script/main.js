let scoreEl = document.getElementById("score");
let livesEl = document.getElementById("lives");
let score = 0;
let lives = 10;
let countCorrectAnswered = 0;
let countAnswered = 0;

let questionsBtn;

let popUpContent = document.getElementById("popup_content");
let popUpWindow = document.getElementById("popup_window");
let popUpClose = document.getElementById("popup_close");
let popUpBottom;

let dragNdropObject;
let dropTarget;
let dragFrom;

let currentQuestionId = -1;   
let currentQuestionType = 0;
let currentQuestionButton;
let upperTitle = document.querySelector('#main_title_mini_game_1');
let mainHeaderPlc = document.querySelector('#mini_game_header_text_1');
upperTitle.textContent = `${themeOfDEC}`;
mainHeaderPlc.textContent = `${themeOfDEC}`;
// Массив путей для состояния вопроса
const questionsStates = [
    "./content/incorrect.svg",
    "./content/correct.svg"
    ];

// Главный скрипт. Запускается как только полностью загрузится страница
document.addEventListener('DOMContentLoaded', function(){ 

    // lives = allQuestions.length;

    // Сообщение о загрузке скрипта
    console.log('Script is loaded');

    // Генерируем объекты кнопок, для вопросов
    // Количество кнопок определяется количеством вопросов в allQuestions.js
    generateQuestionButtons()

    // Каждой кнопке присваиваем обработчик события handleQuestionClick, 
    // который будет открывать соответствующее модальное окно
    questionsBtn = document.getElementsByClassName('question');
    for (question of questionsBtn){
        question.addEventListener('click', handleQuestionClick);
    }

    imageModalClose = document.getElementsByClassName('imageLoupeClose')[0];
    imageModalClose.onclick = fileModalClose;

    // DEBUGGING
    
    
    
});

function generateQuestionButtons() {
    boxes_counter = Math.ceil(allQuestions.length/5)
    target = document.getElementsByClassName("question_wrap")[0]
    score_wrap = document.getElementsByClassName("score_wrap")[0]
    
    boxex = createButtonsBox(boxes_counter, allQuestions.length)
    for (i in boxex) {
        target.insertBefore(boxex[i], score_wrap)
    }
}

// Обработчик события - клик на кнопку вопроса на главной странице
function handleQuestionClick(e){
    currentQuestionButton = e.srcElement;
    currentQuestionId = this.className.split(" ")[1].replace("id", "");
    popUpQuestionOpen();
}

// Обработчик события, если нажали на кнопку "Ответить". Собираем ответы, проверяем их, записываем
function submitHandler(e){
    e.preventDefault();

    let answers = getUserAnswers(e);

    if (userHasAnswers(answers)){
        console.log("USER ANSWERS: " + `${answers}`);
        userAnswersHandler(answers);
        popUpQuestionOpen();
    }else{
        showErrors(e);
    }
    
}

// Получаем ответы пользователя, в нужном нам формате
function getUserAnswers(el){
    let arr = [];
    let textAnsw = [];
    let trueAnsw = allQuestions[currentQuestionId].answers;

    if (currentQuestionType == 5){
        let rawAnsw = document.getElementsByClassName("custom-dropdown-input-placeholder");
        for (el of rawAnsw){
            textAnsw.push(el.innerHTML);
            if (el.innerHTML == "Выберите ответ") textAnsw.push(-1);
        }

        for (let i = 0; i < textAnsw.length; i++) arr.push(trueAnsw.indexOf(textAnsw[i]));
        
    }else if (currentQuestionType == 3 || currentQuestionType == 4) {
        let dropZones = el.target.getElementsByClassName(`question_type_${currentQuestionType}_answer_drop_zone`);
        
        for (el of dropZones){
            for (drop of el.children) textAnsw.push(drop.innerHTML);
        }
        
        for (let i = 0; i < textAnsw.length; i++) arr.push(trueAnsw.indexOf(textAnsw[i]));

        if (currentQuestionType == 4){
            let countItemDropZone = dropZones[0].children.length;
            let leftSide = arr.splice(0,countItemDropZone);
            arr = [leftSide.sort((a, b) => a - b), arr.sort((a, b) => a - b)]; 
        }

        console.log(arr);

    }else if (currentQuestionType == 2){
        let userAnswers = [];
        let textAndPlaceholders = allQuestions[currentQuestionId].textDd.split(/(\||!)/);

        let dropdownIndex = 0;
        let placeholderIndex = 0;

        for (let i = 0; i < textAndPlaceholders.length; i++) {
            if (textAndPlaceholders[i] === '|' || textAndPlaceholders[i] === '!') {
                if (textAndPlaceholders[i] === '|') {
                    let placeholder = document.getElementById(`question_type_2_answer_${dropdownIndex}`).querySelector('.custom-dropdown-input-placeholder');
                    let selectedText = placeholder.innerHTML;
                    if (selectedText == "Выберите ответ") {
                        userAnswers[placeholderIndex] = -1;
                    } else {
                        userAnswers[placeholderIndex] = allQuestions[currentQuestionId].answers[dropdownIndex].indexOf(selectedText);
                    }
                    dropdownIndex++;
                } else if (textAndPlaceholders[i] === '!') {
                    let inputField = document.getElementById(`question_type_2_input_${placeholderIndex}`).querySelector('input');
                    userAnswers[placeholderIndex] = inputField.value.trim().toLowerCase();
                }
                placeholderIndex++;
            }
        }
        arr = userAnswers;
    }else if (currentQuestionType == 6) {
        let circleOccupancy = window.type6Data.circleOccupancy;
        for (let i = 0; i < Object.keys(circleOccupancy).length; i++) {
            let targetFieldId = circleOccupancy[i];
            if (targetFieldId) {
                let targetIndex = parseInt(targetFieldId.replace('targetField', ''));
                arr.push(targetIndex);
            } else {
                arr.push(null); // Если круг не соединен
            }
        }
    }else if (currentQuestionType == 7) {
        let circleOccupancy = window.type7Data.circleOccupancy;
        for (let i = 0; i < Object.keys(circleOccupancy).length; i++) {
            let targetFieldId = circleOccupancy[i];
            if (targetFieldId) {
                let targetIndex = parseInt(targetFieldId.replace('targetField', ''));
                arr.push(targetIndex);
            } else {
                arr.push(null); // Если круг не соединен
            }
        }
    }
    else {
        
        for (el of el.target) if(el.checked) arr.push(parseInt(el.value));
    }
    
    return arr;
}

// Проверка, ответил ли пользователь НА САМОМ ДЕЛЕ
function userHasAnswers(answers){
    //return allQuestions[currentQuestionId].correctAnswer.length === answers.length;

    if (currentQuestionType == 0 || currentQuestionType == 1 ) {
        return answers.length > 0;
    }else if (currentQuestionType == 3 ||currentQuestionType == 5 ){
        return allQuestions[currentQuestionId].correctAnswer.length === answers.length;
    }else if(currentQuestionType == 2){
        // Проверяем, что все ответы заполнены
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] === -1 || answers[i] === "" || answers[i] === null || answers[i] === undefined) {
                return false;
            }
        }
        return true;
    }
    else if(currentQuestionType == 4){
        let sumOfCorrect = 0;
        let sumOfUsers = 0;
        for (let i = 0; i < allQuestions[currentQuestionId].correctAnswer.length; i++)
            for (let j = 0; j < allQuestions[currentQuestionId].correctAnswer[i].length; j++)
                sumOfCorrect++;

        for (let i = 0; i < answers.length; i++)
            for (let j = 0; j < answers[i].length; j++)
                sumOfUsers++;
        console.log(sumOfCorrect);
        console.log(sumOfUsers);
        return sumOfCorrect === sumOfUsers;
    }else if (currentQuestionType == 6) {
        // Получаем данные из глобального объекта, созданного в initializeType6SVG
        let circleOccupancy = window.type6Data.circleOccupancy;

        // Проверяем, что все значения в circleOccupancy не равны null
        for (let index in circleOccupancy) {
            if (circleOccupancy[index] === null) {
                console.log('false')
                return false;
            }
        }
        return true;
    }else if (currentQuestionType == 7) {
        // Получаем данные из глобального объекта, созданного в initializeType6SVG
        let circleOccupancy = window.type7Data.circleOccupancy;

        // Проверяем, что все значения в circleOccupancy не равны null
        for (let index in circleOccupancy) {
            if (circleOccupancy[index] === null) {
                console.log('false')
                return false;
            }
        }
        return true;
    }
}

function showErrors(e){

    let elToErrors = [];

    if (currentQuestionType == 0 || currentQuestionType == 1 ) {
        for (let i = 0; i < allQuestions[currentQuestionId].answers.length; i++)
                elToErrors.push(document.getElementById(`question_type_${currentQuestionType}_answer_${i}`));
    }else if (currentQuestionType == 5){
        for (let i = 0; i < allQuestions[currentQuestionId].answers.length; i++){
            txtAnswer = document.getElementById(`question_type_${currentQuestionType}_answer_${i}`).childNodes[0].innerHTML
            if (txtAnswer == "Выберите ответ")
                elToErrors.push(document.getElementById(`question_type_${currentQuestionType}_answer_${i}`));
        }
    } else if (currentQuestionType == 2) {
        let textAndPlaceholders = allQuestions[currentQuestionId].textDd.split(/(\||!)/);
        let dropdownIndex = 0;
        let placeholderIndex = 0;

        for (let i = 0; i < textAndPlaceholders.length; i++) {
            if (textAndPlaceholders[i] === '|' || textAndPlaceholders[i] === '!') {
                if (textAndPlaceholders[i] === '|') {
                    let placeholder = document.getElementById(`question_type_2_answer_${dropdownIndex}`).querySelector('.custom-dropdown-input-placeholder');
                    if (placeholder.innerHTML == "Выберите ответ") {
                        elToErrors.push(document.getElementById(`question_type_2_answer_${dropdownIndex}`));
                    }
                    dropdownIndex++;
                } else if (textAndPlaceholders[i] === '!') {
                    let inputField = document.getElementById(`question_type_2_input_${placeholderIndex}`).querySelector('input');
                    if (inputField.value.trim() === "") {
                        elToErrors.push(document.getElementById(`question_type_2_input_${placeholderIndex}`));
                    }
                }
                placeholderIndex++;
            }
        }
    }else if(currentQuestionType == 3){
        let dragZones = e.target.getElementsByClassName(`question_type_${currentQuestionType}_answer_drop_zone`);
        for (el of dragZones) {
            if (el.children.length == 0) elToErrors.push(el);
        }
    } else if(currentQuestionType == 4){
        console.log(e.target);
        let dragItems = e.target.getElementsByClassName(`question_type_4_answers`)[0].children;
        for (el of dragItems) elToErrors.push(el);
    }else if (currentQuestionType == 6) {
        // Получаем данные из глобального объекта
        let occupiedTargets = window.type6Data.occupiedTargets;

        // Проходим по всем таргетам
        for (let i = 0; i < allQuestions[currentQuestionId].rightContents.length; i++) {
            let targetFieldId = 'targetField' + i;
            let targetElement = document.getElementById(targetFieldId);

            if (targetElement) {
                if (!occupiedTargets.hasOwnProperty(targetFieldId)) {
                    // Таргет не занят, добавляем обводку
                    targetElement.classList.add('error-type6');
                } else {
                    // Убираем обводку, если она была
                    targetElement.classList.remove('error-type6');
                }
            }
        }
    }else if (currentQuestionType == 7) {
        // Получаем данные из глобального объекта
        let occupiedTargets = window.type7Data.occupiedTargets;

        // Проходим по всем таргетам
        for (let i = 0; i < allQuestions[currentQuestionId].rightContents.length; i++) {
            let targetFieldId = 'targetField' + i;
            let targetElement = document.getElementById(targetFieldId);

            if (targetElement) {
                if (!occupiedTargets.hasOwnProperty(targetFieldId)) {
                    // Таргет не занят, добавляем обводку
                    targetElement.classList.add('error-type6');
                } else {
                    // Убираем обводку, если она была
                    targetElement.classList.remove('error-type6');
                }
            }
        }
    }

    for (el of elToErrors){
        el.setAttribute("class",`${el.className} un_answered`);
    }

    document.getElementById("question_text").innerHTML = 
        allQuestions[currentQuestionId].text +" Выберите ответ!";
}

// Функция установки состояния вопроса: Пройден(1), Не пройден(0).
function setStateToQuestion(el, state) {

    let stateImgDiv = document.createElement("div");
    stateImgDiv.setAttribute("class", "state_marker")

    let stateImg = document.createElement("img");
    stateImg.setAttribute("src", questionsStates[state]);
    stateImgDiv.appendChild(stateImg);

    el.appendChild(stateImgDiv);
}

// Функция открытия модального окна
function popUpQuestionOpen(result = false){

    // Подготовка к созданию окна. Удаляем тело прошлого модального окна, если есть
    deletePopUpMain()

    currentQuestionType = allQuestions[currentQuestionId].type;

    constuctPopUp(result);

    popUpWindow.setAttribute("class", "popup unclosed");
}

// Функция закрытия модального окна
function popUpQuestionClose(){
    popUpWindow.setAttribute("class", "popup closed");  
}

// Функция конструирования блока с вопросом/результатом
function constuctPopUp(result){
    let question = allQuestions[currentQuestionId];

    console.log(`CONSTRUCT QUESTION TYPE ${question.type} AND ID ${currentQuestionId}`);

    // Создаем тело модального окна
    if (!result) popUpWindow.appendChild(createPopUpMain(question));
        else popUpWindow.appendChild(createResult());

    popUpBottom = document.getElementById("popup_bottom");

    if (question.answered == null) createDragNDropHandlers(question);
}

// Функция, указывающая пройден ли конкретный вопрос
function questionIsPassed(question){

    if(question.answered != null) return true;
    return false;
    
}

// Функция, обрабатывающая ответ пользователя
function userAnswersHandler(userAnswers){
    let currentQuestion = allQuestions[currentQuestionId];

    // Записываем ответ пользователя в соответствующее поле объекта вопроса
    currentQuestion.answered = userAnswers;
    // Проверяем, верный ли был ответ, ставим соответсвующее изображение на кнопку
    isCorrect = answerIsCorrect(currentQuestion, userAnswers);
    console.log(`IS CORRECT? ${isCorrect}`);

    if (isCorrect) {
        setStateToQuestion(currentQuestionButton, 1);
        score += currentQuestion.price;
        countCorrectAnswered++;
    }
    else {
        setStateToQuestion(currentQuestionButton, 0);
    }

    scoreEl.innerHTML = `${score}`;
    lives--;
    livesEl.innerHTML = `${lives}`;
    countAnswered++;

    // Если кончились жизни ИЛИ на все вопросы ответили
    if (lives <= 0 || countAnswered == allQuestions.length){
        // Отключаем клик на неотвеченных вопросах
        // Создаем кнопку результатов
        setTestCompleted();
    }
}

// Функция, возвращающее, верный ли был ответ
function answerIsCorrect(question, userAnswers){
    console.log(question)
    console.log(userAnswers)
    corrects = question.correctAnswer;
    userAnswers = userAnswers;
    if (currentQuestionType == 4){
        for (let i = 0; i < corrects.length; i++)
            if (corrects[i].toString() != userAnswers[i].toString())
                return false;
        return true;
    }
    else if (corrects.toString() === userAnswers.toString()) 
        return true;

    return false;
}


function setTestCompleted(){
    for (question of questionsBtn){
        console.log(question.children[0].children.length);
        if(question.children[0].children.length != 1){
            question.removeEventListener('click', handleQuestionClick);
        }

    }
    let btn_res = document.getElementById("button_results");
    btn_res.classList.toggle("btn_closed");
    btn_res.addEventListener('click', function (e) {
        popUpQuestionOpen(true);
    });
}


function fileModalClose() {
    imageLoupe = document.getElementById('imageLoupe');
    modalImage = document.getElementById('modalImage');
    modalVideo = document.getElementById('modalVideo');

    imageLoupe.style.display = "none";
    modalImage.style.display = "none";
    modalVideo.style.display = "none";
    modalVideo.pause()
}




