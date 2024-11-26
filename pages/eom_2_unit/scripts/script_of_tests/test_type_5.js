document.getElementById('control_button_3').style.display = 'none';
document.getElementById('control_button_2').style.display = 'inline-block';
answerButton.classList.remove('gray_dis');
answerButton.disabled = false;
var element = document.querySelector('.number_of_step');
var number = parseInt(element.textContent, 10);
var attempts = localStorage.getItem(`attempts_${number}`);
if (attempts == 0){
    answerButton.classList.add('gray_dis');
    answerButton.disabled = true;
}
restartButton.classList.add('hidden');
restartButton.disabled = false;
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
    var anwserArr2 = testObj.find(item => item.answers).answers; //Ответы в правильном порядке
    var text2 = testObj.find(item => item.columns).columns; 
    var bodyInner = document.createElement('div');
    bodyInner.classList = 'body-inner';
    contentDiv.appendChild(bodyInner);
    var dragDiv = document.createElement('div');
    dragDiv.classList = 'drag1';
    bodyInner.appendChild(dragDiv);
    var nubersDiv = document.createElement('div');
    nubersDiv.classList = 'numbers';
    dragDiv.appendChild(nubersDiv);
    var list = document.createElement('div');
    list.classList = 'list';
    list.id = 'list';
    dragDiv.appendChild(list);
    var listItems = [];
    createList2();
    function createList2() {
        var iii = 0;
        [...anwserArr2]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((item, index) => {
            var div = document.createElement("div");
            div.setAttribute("class", "number");
            div.innerHTML = `${text2[index]}  <img class="markers_of_blue" src="./content/marker_blue.png" alt="1">`;
            document.getElementsByClassName("numbers")[0].appendChild(div);
            var listItem = document.createElement('div');
            listItem.setAttribute("id", `${index}`);
            listItem.classList = `item_dr_drag`;
            listItem.innerHTML = ` <div class="item_dr">${item} </div> `;
            listItems.push(listItem);
            list.appendChild(listItem);
            iii++;
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
        window.alert("Вы потратили все попытки для прохождения задания, кнопка 'Ответить' заблокирована!!!");
    }
    // ЭТО ДЛЯ ОШИБОК
    function disabvarest(){
        document.getElementById('control_button_2').style.display = 'none';
        document.getElementById('control_button_3').style.display = 'none';
        setTimeout(() => toTheoryPage(), 1);
    }
    function checkAnwser6() {
        isCorrect = true;
        var attempts = parseInt(localStorage.getItem(`attempts_${number}`));
        listItems.forEach((item, index) => {
            var itemName = item.querySelector('.item_dr').innerText.trim();
            if (itemName !== anwserArr2[index].join(',')) {
                item.classList.add('incorrect');
                isCorrect = false;
                partiallyCorrect = true;
            } else {
                item.classList.remove('incorrect');
                item.classList.add('correct');
                partiallyCorrect = true;
            };
            if (!isCorrect && partiallyCorrect){
                shouldDecreaseAttempts = true; // Устанавливаем флаг для уменьшения попыток
            };
            localStorage.setItem(`answer_from_index_${currentPageIndex}`, JSON.stringify({questionPlace: isCorrect}));
        });
        if (isCorrect){
            backWardBtn.classList.remove('gray_dis');
            backWardBtn.disabled = false;
            nextBtn.classList.remove('gray_dis');
            nextBtn.disabled = false;
        }
        // Уменьшаем количество попыток, если необходимо
        if (shouldDecreaseAttempts){
            attempts--;
            localStorage.setItem(`attempts_${number}`, attempts.toString());
            if (attempts === 0){
                disabvarest();
            };
        };
    };
    answerButton.onclick = function() {
        checkAnwser6();
        answerButton.classList.add('hidden');
        restartButton.classList.remove('hidden');
        document.getElementById('control_button_2').style.display = 'none';
        document.getElementById('control_button_3').style.display = 'inline-block';
    };
    var draggDivForSort = document.querySelectorAll('.item_dr_drag');
    var arr = Array.from(draggDivForSort);
    for (i of arr){
        new Sortable(i, {
            swap: true,
            group: 'shared4',
            animation: 150,
        });
    };
};
checkParagraph();
