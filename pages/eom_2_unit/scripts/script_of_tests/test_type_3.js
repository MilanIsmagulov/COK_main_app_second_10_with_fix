document.getElementById('control_button_3').style.display = 'none';
document.getElementById('control_button_2').style.display = 'inline-block';
answerButton.classList.remove('gray_dis');
answerButton.disabled = false;
restartButton.classList.add('hidden');
restartButton.disabled = false;
function checkParagraph(){
    var testObj = data[`index_${currentPageIndex}`].test;
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
    var element = document.querySelector('.number_of_step');
    var number = parseInt(element.textContent, 10);
    var attempts = localStorage.getItem(`attempts_${number}`);
    if (attempts == 0){
        answerButton.classList.add('gray_dis');
        answerButton.disabled = true;
    }
    var anwserArr4 = testObj.find(item => item.answers).answers;
    var imgPathArr = JSON.parse((testObj.find(item => item.image !== undefined).image).replace(/'/g, '"'));
    function waitForData(){
        if (window.dataLoaded){
            var dragPlc = document.createElement('div');
            dragPlc.classList = 'drag_place';
            dragPlc.id = 'drag_place_t3';
            contentDiv.appendChild(dragPlc);
            var row3 = document.createElement('div');
            row3.classList = 'row';
            row3.id = 'row3';
            row3.index = 'row2';
            var collumnInner = document.createElement('div');
            collumnInner.classList = 'drag4-inner';
            collumnInner.id = 'drag4-inner';
            dragPlc.appendChild(collumnInner);
            dragPlc.appendChild(row3);
            var rowList2 = [];
            var fullList2 = [];
            createRow2();
            createColumnElement();
            addEventListeners4();
            // Создаем и добавляем popup окно
            var popupWindow = document.createElement('div');
            popupWindow.classList.add('popup_window', 'images' , 'disabled'); // Начальное состояние: скрыто
            popupWindow.innerHTML = `<div class="popup_content"><button class="close_popup"><img src="./content/close.svg" alt="close"></button><img class="popup_image" src="" alt="Zoomed Image"></div>`;
            document.body.appendChild(popupWindow);
            // Обработчик закрытия popup
            popupWindow.querySelector('.close_popup').onclick = function(){
                popupWindow.classList.remove('enabled');
                popupWindow.classList.add('disabled');
            };
            function createRow2(){
                [...anwserArr4]
                    .map(a => ({ value: a, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(a => a.value)
                    .forEach((item, index) =>{
                        var rowItem = document.createElement('li');
                        rowItem.setAttribute('id', index);
                        rowItem.classList.add('item4');
                        rowItem.draggable = 'true';
                        rowItem.innerText = item;
                        rowList2.push(rowItem);
                        row3.appendChild(rowItem);
                    });
            }
            function createColumnElement(){
                imgPathArr.forEach((item, index) =>{
                    var field = document.createElement('div');
                    field.classList.add('field-col');
                    field.innerHTML = `
                    <img class="img-col" src="${item}" alt="img">
                    <div class="field" id="${index}"></div>`;
                    fullList2.push(field);
                    collumnInner.appendChild(field);
                    var zoomButton = document.createElement('button');
                    zoomButton.classList.add('zoom_button');
                    zoomButton.id = 'zoom_button_' + `${index}`;
                    zoomButton.innerHTML = '<img class="img-zoom" src="./content/zoom_up.svg">';
                    field.appendChild(zoomButton);
                    // Добавляем обработчик для zoomButton
                    zoomButton.addEventListener('click', function (){
                        popupWindow.classList.remove('disabled');
                        popupWindow.classList.add('enabled');
                        popupWindow.querySelector('.popup_image').src = item;
                    });
                });
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
            function checkAnwser4(){
                var isCorrect = true;
                var attempts = parseInt(localStorage.getItem(`attempts_${number}`));
                fullList2.forEach((item, index) =>{
                    if (item.children[1].querySelector('.item4')?.innerText.trim() === undefined){
                        item.children[1].classList.add('incorrect');
                        isCorrect = false;
                        partiallyCorrect = true;
                    }else{
                        var itemName = item.children[1].querySelector('.item4').innerText.trim();
                        if (itemName !== anwserArr4[index]){
                            item.children[1].classList.add('incorrect');
                            isCorrect = false;
                            partiallyCorrect = true;
                        }else{
                            item.children[1].classList.remove('incorrect');
                            item.children[1].classList.add('correct');
                            partiallyCorrect = true;
                        }
                    }
                });
                if (isCorrect){
                    backWardBtn.classList.remove('gray_dis');
                    backWardBtn.disabled = false;
                    nextBtn.classList.remove('gray_dis');
                    nextBtn.disabled = false;
                }
                if (!isCorrect){
                    // ЭТО ДЛЯ ОШИБОК
                    if (partiallyCorrect){
                        attempts--; // Уменьшаем количество попыток при частично правильном ответе
                        localStorage.setItem(`attempts_${number}`, attempts.toString());
                        if (attempts === 0){
                            disabvarest();
                        }
                    }
                }
                localStorage.setItem('answer_form_index_' + `${currentPageIndex}`, JSON.stringify({questionPlace: isCorrect}));
            }
            function addEventListeners4(){
                var itemElem = document.querySelectorAll('.item4');
                itemElem.forEach((item) =>{
                    item.draggable = true;
                });
            }
            var row = document.getElementById('row3');
            var dropZoneElements = imgPathArr.map((_, index) => document.getElementById(index.toString()));
            new Sortable(row,{
                group:{
                    name: 'shared',
                    put: false
                },
                animation: 150,
                onEnd: function(e){
                    if (e.to.className != "row" ) 
                        e.item.style = "background-color: #f0f9ff00; color: black; border: none; box-shadow: none; overflow-x: hidden; white-space: nowrap; text-overflow: ellipsis;";
                }
            });
            dropZoneElements.forEach(dropZone =>{
                new Sortable(dropZone,{
                    group: 'shared',
                    animation: 150,
                    onAdd: function(e){
                        var itemEl = e.item;
                        var targetList = e.to;
                        if (targetList.children.length > 1){
                            var existingItem;
                            if (targetList.children[0] === itemEl){
                                existingItem = targetList.children[1];
                            }else{
                                existingItem = targetList.children[0];
                            }
                            var sourceList = e.from;
                            sourceList.appendChild(existingItem);
                            targetList.appendChild(itemEl);
                            if (targetList.className != "field") itemEl.style = "";
                            if (sourceList.className == "row") existingItem.style = "";
                        }
                    },
                    onEnd: function(e){
                        if (e.to.className == "row") e.item.style = "";
                    }
                });
            });
            answerButton.onclick = function(){
                checkAnwser4();
                answerButton.classList.add('hidden');
                restartButton.classList.remove('hidden');
                document.getElementById('control_button_2').style.display = 'none';
                document.getElementById('control_button_3').style.display = 'inline-block';
            };
        }else{
            // Если данные ещё не загружены, ждем и проверяем снова
            setTimeout(waitForData, 50);
        }
    }
    waitForData();
}
checkParagraph();