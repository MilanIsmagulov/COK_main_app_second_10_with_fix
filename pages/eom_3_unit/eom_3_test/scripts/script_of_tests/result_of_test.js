document.getElementById('control_button_2').style.display = 'none';
document.getElementById('control_button_3').style.display = 'inline-block';
document.getElementById('control_button_1').classList.add('gray_dis');
document.getElementById('control_button_1').disabled = true;
document.getElementById('control_button_3').onclick = function() {
    window.location.reload();
    localStorage.clear();
}
function createResultContainers(containerIds, content) {
    const contentWrapper = document.querySelector('#contentWrapper');
    containerIds.forEach((id, index) => {
        const container = document.createElement('div');
        container.className = 'result_container';
        container.id = id;
        container.innerHTML = content[index]; // Добавление контента
        contentWrapper.appendChild(container);
    });
}
const tests = [];
for (const key in data) {
    if (data[key].test) {
        tests.push(data[key].test);
    }
}
var scoreTests = tests.length;
// Переменные для хранения результатов
var totalCount = 0;
var questionPlaceTrueCount = 0;
var questionPlaceFalseCount = 0;
// Проходим по всем ключам в localStorage
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    // Проверяем, начинается ли ключ с "answer_"
    if (key.startsWith("answer_")) {
        var value;
        try {
            value = JSON.parse(localStorage.getItem(key)); // Парсим значение в объект
        } catch (e) {
            console.error("Ошибка парсинга JSON для ключа:", key);
            continue; // Пропустить объект, если он не парсится
        }
        // Если объект содержит свойство questionPlace, анализируем его
        if (value && value.questionPlace !== undefined) {
            totalCount++; // Увеличиваем общий счетчик
            if (value.questionPlace) {
                questionPlaceTrueCount++; // Увеличиваем счетчик для questionPlace: true
            } else {
                questionPlaceFalseCount++; // Увеличиваем счетчик для questionPlace: false
            }
        } else {
            console.log("Ключ не содержит questionPlace:", key); // Отладочная информация
        }
    }
}
if(totalCount !== scoreTests){
    console.log("Несовпадение длины localStorage и const data");
}
if ((questionPlaceTrueCount + questionPlaceFalseCount) !== scoreTests) {
    var questionPlaceFalseCount = scoreTests - questionPlaceTrueCount;
} 
// Результаты
var percentOfAnswers =  Math.floor((questionPlaceTrueCount/scoreTests)*100)
// Массив идентификаторов для контейнеров
const containerIds = ['result_container_1', 'result_container_2', 'result_container_3'];
// Массив контента для каждого контейнера
const content = [
    `1. Количество тестовых (оцениваемых) заданий: <span id="place_question_number">${scoreTests}</span>`, //Не правильно
    `2. Ваш результат: <span id="place_question_percent">${Math.floor((questionPlaceTrueCount/scoreTests)*100)} <b>%</b></span>`,
    `<div class="correct_answ"> Количество правильных ответов: <p id="result_place_1">${questionPlaceTrueCount}</p></div> 
    <div id="answer_diagram_1" class="pie animate no-round" style="--p: ${percentOfAnswers}; --c:rgb(0, 114, 192);"></div>
    <div class="correct_answ"> Количество неправильных ответов: <p id="result_place_2">${questionPlaceFalseCount}</p></div>`
];
// Вызов функции для создания контейнеров с контентом
createResultContainers(containerIds, content);
