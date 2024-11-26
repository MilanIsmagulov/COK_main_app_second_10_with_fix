if (blockButtonEOM2 === 1){
    backWardBtn.classList.add('gray_dis');
    backWardBtn.disabled = true;
    nextBtn.classList.add('gray_dis');
    nextBtn.disabled = true;
}
answerButton.classList.remove('gray_dis');
answerButton.disabled = false;
var element = document.querySelector('.number_of_step');
var number = parseInt(element.textContent, 10);
var attempts = localStorage.getItem(`attempts_${number}`);

document.getElementById('control_button_3').style.display = 'none';
document.getElementById('control_button_2').style.display = 'inline-block';
function checkParagraph(){
    var testObj = data[`index_${currentPageIndex}`].test;
    if (!testObj){
        return; // Полностью прерываем выполнение функции
    };
    // Если найден ключ paragraph_1, прерываем выполнение
    if (testObj.paragraph_1){
        document.getElementById('control_button_1').classList.remove('gray_dis');
        document.getElementById('control_button_1').disabled = false;
        document.getElementById('control_button_4').classList.remove('gray_dis');
        document.getElementById('control_button_4').disabled = false;
        return; // Прерываем выполнение функции
    };
    var anwserArr2 = testObj.find(item => item.anwserArr2).anwserArr2; // Ответы в правильном порядке
    var correctAnswers = testObj.find(item => item.answersInCol).answersInCol; // Ответы в правильном порядке
    // Объект для хранения правильных ответов
    var answerToColumn = {};
    correctAnswers.forEach((answers, columnIndex) => {
        answers.forEach(answer => {
            answerToColumn[answer] = columnIndex + 1;
        });
    });
    var mainDiv = document.querySelector('#content');
    var columnsContainer = document.createElement('div');
    columnsContainer.id = 'colmuns';
    var rowContainer = document.createElement('div');
    rowContainer.id = 'rows';
    var mainTestDiv = document.createElement('div');
    mainTestDiv.classList = 'test_div';
    mainDiv.appendChild(mainTestDiv);
    mainTestDiv.appendChild(columnsContainer);
    mainTestDiv.appendChild(rowContainer);
    var data2 = {};
    init();
    function init() {
        createColumns(testObj.find(item => item.columns).columns); // Создание колонок
        loadOrCreateList(); // Загрузка или создание списка
        initializeSortable(); // Инициализация Sortable.js
    };
    function createColumns(headers) {
        headers.forEach((header, index) => {
            var col = document.createElement('div');
            col.classList.add('col');
            var colHeader = document.createElement('h3');
            if (index % 2 !== 0) {
                colHeader.classList.add('odd_header');  // Добавляем класс, если индекс нечетный
            };
            colHeader.textContent = header;
            col.appendChild(colHeader);
            var colList = document.createElement('ul');
            colList.classList.add('col-ul');
            colList.id = `col${index + 1}`;
            colList.setAttribute('index', index);
            col.appendChild(colList);
            columnsContainer.appendChild(col);
            data2[index] = [];
        });
    };
    function loadOrCreateList() {
        if (localStorage.getItem('data2')) {
            loadList();
        } else {
            createList();
        };
    };
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];  // Меняем местами элементы
        };
    };
    function createList() {
        shuffleArray(anwserArr2);  // Перемешиваем ответы
        anwserArr2.forEach((item, index) => {
            var listItem = document.createElement('li');  // Создаем элемент списка
            listItem.id = index;  // Задаем ID элементу
            listItem.classList.add('item7');  // Добавляем класс
            listItem.draggable = true;  // Делаем элемент перетаскиваемым
            listItem.textContent = item;  // Устанавливаем текстовое содержимое
            rowContainer.appendChild(listItem);  // Добавляем элемент в контейнер для строк
            data2['row'] = data2['row'] || [];  // Создаем массив строк, если его еще нет
            data2['row'].push(item);  // Добавляем элемент в массив строк
        });
    };
    function loadList() {
        data2 = JSON.parse(localStorage.getItem('data2'));
        anwserArr2.forEach((item, index) => {
            var listItem = document.createElement('li');
            listItem.id = index;
            listItem.classList.add('item7');
            listItem.draggable = true;
            listItem.textContent = item;
            if (data2['row'].includes(item)) {
                rowContainer.appendChild(listItem);
            } else {
                var colIndex = answerToColumn[item] - 1;
                document.getElementById(`col${colIndex + 1}`).appendChild(listItem);
            };
        });
    };
    function initializeSortable() {
        new Sortable(rowContainer, {
            group: 'shared',
            swap: true,
            swapClass: "highlight",
            animation: 150,
            onEnd: function(evt) {
                evt.item.draggable = true;  // Восстанавливаем draggable после перемещения
            }
        });
        var columns = document.querySelectorAll('.col-ul');
        columns.forEach((col) => {
            new Sortable(col, {
                group: 'shared',
                animation: 150,
                onAdd: function(evt) {
                    evt.item.draggable = true;  // Восстанавливаем draggable после добавления
                },
                onUpdate: function(evt) {
                    evt.item.draggable = true;  // Восстанавливаем draggable после обновления
                }
            });
        });
    };
    // ЭТО ДЛЯ ОШИБОК
    var element = document.querySelector('.number_of_step');
    var number = parseInt(element.textContent, 10);
    function initializeAttempts(){
        var attempts = localStorage.getItem(`attempts_${number}`);
        if (!attempts){
            localStorage.setItem(`attempts_${number}`, '2'); // Устанавливаем 2 попытки
        };
    };
    // ЭТО ДЛЯ ОШИБОК
    initializeAttempts();
    function findPreviousParagraph1(currentIndex){
        var keys = Object.keys(data);
        var currentIndexPosition = keys.indexOf(currentIndex);
        // Ищем ближайший предыдущий paragraph_1
        for (var i = currentIndexPosition - 1; i >= 0; i--){
            var key = keys[i];
            if (data[key].paragraph_1){
                return key; // Возвращаем индекс с найденным paragraph_1
            };
        };
        return null; // Если не найдено
    };
    // ЭТО ДЛЯ ОШИБОК
    // Пример использования
    function toTheoryPage(){
        var element = document.querySelector('.number_of_step');
        var number = parseInt(element.textContent, 10);
        var attempts = localStorage.getItem(`attempts_${number}`);
        if (attempts === 0){
            document.getElementById('control_button_2').style.display = 'none';
            document.getElementById('control_button_3').style.display = 'none';
        }
        document.getElementById('control_button_2').style.display = 'none';
        document.getElementById('control_button_3').style.display = 'none';
        nextBtn.classList.remove('gray_dis');
        nextBtn.disabled = false;
        window.alert("Вы потратили все попытки для прохождения задания, кнопка 'Ответить' заблокированна!!!");
    }
    // ЭТО ДЛЯ ОШИБОК
    function disabvarest(){
        document.getElementById('control_button_2').style.display = 'none';
        document.getElementById('control_button_3').style.display = 'none';
        setTimeout(() => toTheoryPage(), 1);
    }
    // Функция для проверки правильности ответов
    function checkAnswer7() {
        var incorrectCount = 0;
        var isCorrect = true;
        var shouldDecreaseAttempts;
        // Проверка элементов в колонках
        var attempts = parseInt(localStorage.getItem(`attempts_${number}`));
        for (var i = 1; i <= correctAnswers.length; i++) {
            var column = document.getElementById(`col${i}`);
            var items = column.querySelectorAll('.item7');
            items.forEach(item => {
                var itemValue = item.textContent || item.innerText;
                if (answerToColumn[itemValue] === i) {
                    item.style.backgroundColor = 'rgb(189, 255, 189)';  // Зеленый цвет для правильных ответов
                    partiallyCorrect = true;
                    backWardBtn.classList.remove('gray_dis');
                    backWardBtn.disabled = false;
                } else {
                    isCorrect = false;
                    item.style.backgroundColor = 'rgb(255, 185, 185)';  // Красный цвет для неправильных ответов
                    incorrectCount++;
                    partiallyCorrect = true;
                    backWardBtn.classList.remove('gray_dis');
                    backWardBtn.disabled = false;
                };
                if (!isCorrect && partiallyCorrect){
                    shouldDecreaseAttempts = true; // Устанавливаем флаг для уменьшения попыток
                };
            });
        };
        // Проверка элементов, оставшихся вне колонок
        var remainingItems = rowContainer.querySelectorAll('.item7');
        remainingItems.forEach(item => {
            isCorrect = false;
            item.style.backgroundColor = 'rgb(255, 185, 185)';  // Красный цвет для элементов вне колонок
            incorrectCount++;
            partiallyCorrect = true;
            if (!isCorrect && partiallyCorrect){
                shouldDecreaseAttempts = true; // Устанавливаем флаг для уменьшения попыток
            };
        });
        if (isCorrect || !isCorrect){
            nextBtn.classList.remove('gray_dis');
            nextBtn.disabled = false;
        }
        // Уменьшаем количество попыток, если необходимо
        if (shouldDecreaseAttempts){
            attempts--;
            localStorage.setItem(`attempts_${number}`, attempts.toString());
        };
        localStorage.setItem(`answer_from_index_${currentPageIndex}`, JSON.stringify({questionPlace: isCorrect}));
    };
    answerButton.onclick = function() {
        checkAnswer7();
        answerButton.classList.add('hidden');
        restartButton.classList.remove('hidden');
        document.getElementById('control_button_2').style.display = 'none';
        document.getElementById('control_button_3').style.display = 'inline-block';
    };
};
checkParagraph();