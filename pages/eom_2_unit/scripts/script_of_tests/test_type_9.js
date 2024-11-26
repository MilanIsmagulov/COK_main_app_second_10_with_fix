document.getElementById('control_button_3').style.display = 'none';
document.getElementById('control_button_2').style.display = 'inline-block';
function checkParagraph(){
    var testObj = data[`index_${currentPageIndex}`].test; //
    if (!testObj){
        return; // Полностью прерываем выполнение функции
    }
    // Если найден ключ paragraph_1, прерываем выполнение
    if (testObj.paragraph_1){
        document.getElementById('control_button_1').classList.remove('gray_dis');
        document.getElementById('control_button_1').disabled = false;
        document.getElementById('control_button_4').classList.remove('gray_dis');
        document.getElementById('control_button_4').disabled = false;
        return; // Прерываем выполнение функции
    }
    var anwserArr3 = testObj.find(item => item.answers).answers;
    var pathImg = testObj.find(item => item.image !== undefined).image; // путь к фотке
    var leftColLength = testObj.find(item => item.leftColumn).leftColumn; //кол-во колонн слева
    var rightColLength = testObj.find(item => item.rightColumn).rightColumn; //кол-во колонн справа
    answerButton.classList.remove('gray_dis');
    answerButton.disabled = false;
    //console.log(anwserArr3)
    var element = document.querySelector('.number_of_step');
    var number = parseInt(element.textContent, 10);
    var attempts = localStorage.getItem(`attempts_${number}`);
    if (attempts == 0){
        answerButton.classList.add('gray_dis');
        answerButton.disabled = true;
    }
    restartButton.classList.add('hidden');
    restartButton.disabled = false;
    var drag39 = document.createElement('div');
    drag39.classList = 'drag39';
    drag39.id = 'drag39';
    var dragInner = document.createElement('div');
    dragInner.classList = 'drag-inner9';
    dragInner.id = 'drag-inner9';
    var row29 = document.createElement('div');
    row29.classList = 'row29';
    row29.id = 'row29';
    var imgPlc = document.createElement('div');
    imgPlc.classList = 'img type_9';
    imgPlc.id = 'img';
    var leftColElem = document.createElement('div');
    leftColElem.classList = 'left-col';
    leftColElem.id = 'left-col';
    var rightColElem = document.createElement('div');
    rightColElem.classList = 'right-col';
    rightColElem.id = 'right-col';
    dragInner.appendChild(drag39);
    dragInner.appendChild(row29);
    contentDiv.appendChild(dragInner);
    drag39.appendChild(leftColElem);
    drag39.appendChild(imgPlc);
    drag39.appendChild(rightColElem);
    var leftCol = [];
    var rightCol = [];
    var fullList = [];
    var realIndex = 0;
    var rowList = [];
    function waitForData(){
        if (window.dataLoaded){
            createRow();
            createFields();
            createImg();
            function createImg(){
                var imgOuter = document.getElementById('img');
                var img = document.createElement('img');
                img.setAttribute('src', pathImg);
                img.setAttribute('alt', 'img');
                imgOuter.appendChild(img);
            }
            function createRow(){
                [...anwserArr3]
                .map(a => ({ value: a, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(a => a.value)
                .forEach((item, index) =>{
                    var rowItem = document.createElement('li');
                    rowItem.setAttribute('id', index);
                    rowItem.classList.add('item39');
                    rowItem.draggable = 'true';
                    rowItem.innerHTML = item;
                    rowList.push(rowItem);
                    row29.appendChild(rowItem);
                })
            }
            function createFields(){
                for (var i = 0; i < leftColLength; i++){
                    var field = document.createElement('div');
                    field.setAttribute('id', realIndex);
                    field.classList.add('field2');
                    leftCol.push(field);
                    leftColElem.appendChild(field);
                    realIndex++;
                }
                for (var i = 0; i < rightColLength; i++){
                    var field = document.createElement('div');
                    field.setAttribute('id', realIndex);
                    field.classList.add('field2');
                    rightCol.push(field);
                    rightColElem.appendChild(field);
                    realIndex++;
                }
                fullList = [...leftCol, ...rightCol];
            }
            // ЭТО ДЛЯ ОШИБОК
            var element = document.querySelector('.number_of_step');
            var number = parseInt(element.textContent, 10);
            function initializeAttempts(){
                var attempts = localStorage.getItem(`attempts_${number}`);
                if (!attempts){
                    localStorage.setItem(`attempts_${number}`, '2'); // Устанавливаем 2 попытки
                }
            }
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
                    }
                }
                return null; // Если не найдено
            }
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
            function checkAnwser10(){
                var isTestCorrect = true; // Общая переменная, которая определяет правильность всего теста
                var attempts = parseInt(localStorage.getItem(`attempts_${number}`));
                var shouldDecreaseAttempts = false; // Флаг для уменьшения попыток
            
                fullList.forEach((item, index) => {
                    var isCorrect = true; // Локальная переменная для проверки каждого элемента
                    var userAnswerElem = item.querySelector('.item39 img'); // Находим изображение в ответе пользователя
                    var correctAnswerElem = anwserArr3[index]; // Получаем правильный ответ из массива
            
                    // Проверяем, что элемент изображения в ответе существует
                    if (userAnswerElem === null) {
                        item.classList.add('incorrect2');
                        isCorrect = false;
                    } else {
                        var userSrc = userAnswerElem.getAttribute('src');
                        var userAlt = userAnswerElem.getAttribute('alt');
            
                        // Создаем временный элемент, чтобы извлечь правильные атрибуты
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = correctAnswerElem;
                        var correctImgElem = tempDiv.querySelector('img');
            
                        var correctSrc = correctImgElem.getAttribute('src');
                        var correctAlt = correctImgElem.getAttribute('alt');
            
                        // Сравниваем src и alt изображений
                        if (userSrc !== correctSrc || userAlt !== correctAlt) {
                            item.classList.add('incorrect2');
                            isCorrect = false;
                        } else {
                            item.classList.remove('incorrect2');
                            item.classList.add('correct2');
                        }
                    }
            
                    // Если ответ неверный, уменьшаем количество попыток
                    if (!isCorrect) {
                        shouldDecreaseAttempts = true;
                        isTestCorrect = false; // Отмечаем, что тест не пройден
                    }
            
                    // Разблокировка кнопок только если есть правильные ответы
                    if (isCorrect) {
                        backWardBtn.classList.remove('gray_dis');
                        backWardBtn.disabled = false;
                        nextBtn.classList.remove('gray_dis');
                        nextBtn.disabled = false;
                    }
            
                    // Сохраняем локально результаты по каждому элементу
                    localStorage.setItem('answer_form_index_' + `${currentPageIndex}`, JSON.stringify({questionPlace: isCorrect}));
                });
            
                // Уменьшаем количество попыток, если хотя бы один ответ неверный
                if (shouldDecreaseAttempts) {
                    attempts--;
                    localStorage.setItem(`attempts_${number}`, attempts.toString());
            
                    // Если попытки закончились, вызываем блокировку
                    if (attempts === 0) {
                        disabvarest();
                    }
                }
            
                // Сохраняем общий результат теста
                localStorage.setItem('answer_form_index_' + `${currentPageIndex}`, JSON.stringify({questionPlace: isTestCorrect}));
            }
            answerButton.onclick = function(){
                checkAnwser10();
                answerButton.classList.add('hidden');
                restartButton.classList.remove('hidden');
                document.getElementById('control_button_2').style.display = 'none';
                document.getElementById('control_button_3').style.display = 'inline-block';
            };
            // Выбор строки, в которую будут добавляться sortable-элементы
            var row = document.getElementById('row29');
            // Выбор всех элементов с классом 'field'
            var fields = document.querySelectorAll('.field2');
            // Преобразование NodeList в массив для удобства работы
            var arr = Array.from(fields);
            new Sortable(row,{
                group:{
                    name: 'shared',
                    put: false // Запретить добавление элементов в этот список
                },
                animation: 150,
                onEnd: function(e){
                    if (e.to.className != "row29"){
                        e.item.style = "color: black; border: none; box-shadow: none;";
                    }
                }
            });
            for (var i of arr){
                new Sortable(i,{
                    group: 'shared',
                    animation: 150,
                    onAdd: function(e){
                        var itemEl = e.item;
                        var targetList = e.to;
                        if (targetList.children.length > 1){
                            var existingItem;
                            if (targetList.children[0] === itemEl){
                                existingItem = targetList.children[1];
                            } else{
                                existingItem = targetList.children[0];
                            }
                            var sourceList = e.from;
                            sourceList.appendChild(existingItem);
                            targetList.appendChild(itemEl);
                            if (targetList.className != "'field2'") itemEl.style = "";
                            if (sourceList.className == "row29") existingItem.style = "";
                        }
                    },
                    onEnd: function(e){
                        if (e.to.className == "row29") e.item.style = "";
                    }
                });
            }
        } else{
            // Если данные ещё не загружены, ждем и проверяем снова
            setTimeout(waitForData, 50);
        }
    }
    waitForData();
}
checkParagraph();