document.getElementById('control_button_3').style.display = 'none';
document.getElementById('control_button_2').style.display = 'inline-block';
if (blockButtonEOM2 === 1){
    backWardBtn.classList.add('gray_dis');
    backWardBtn.disabled = true;
    nextBtn.classList.add('gray_dis');
    nextBtn.disabled = true;
}
answerButton.classList.remove('gray_dis');
answerButton.disabled = false;
restartButton.classList.add('hidden');
restartButton.disabled = false;
var testObj = data[`index_${currentPageIndex}`].test;
var anwserArr4 = testObj.find(item => item.answers).answers;
var imgPathArr = JSON.parse((testObj.find(item => item.image !== undefined).image).replace(/'/g, '"'));
function waitForData() {
    if (window.dataLoaded) {
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
        let rowList2 = [];
        let fieldsList = [];
        let fullList2 = [];
        let dragElem3;
        let startIndx2;
        let endIndx2;
        createRow2();
        createColumnElement();
        addEventListeners4();
        // Создаем и добавляем popup окно
        var popupWindow = document.createElement('div');
        popupWindow.classList.add('popup_window', 'images' , 'disabled'); // Начальное состояние: скрыто
        popupWindow.innerHTML = `<div class="popup_content"><button class="close_popup"><img src="./content/close.svg" alt="close"></button><img class="popup_image" src="" alt="Zoomed Image"></div>`;
        document.body.appendChild(popupWindow);
        // Обработчик закрытия popup
        popupWindow.querySelector('.close_popup').onclick = function() {
            popupWindow.classList.remove('enabled');
            popupWindow.classList.add('disabled');
        };
        function createRow2() {
            [...anwserArr4]
                .map(a => ({ value: a, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(a => a.value)
                .forEach((item, index) => {
                    var rowItem = document.createElement('li');
                    rowItem.setAttribute('id', index);
                    rowItem.classList.add('item4');
                    rowItem.draggable = 'true';
                    rowItem.innerText = item;
                    rowList2.push(rowItem);
                    row3.appendChild(rowItem);
                });
        }
        function createColumnElement() {
            imgPathArr.forEach((item, index) => {
                var field = document.createElement('div');
                field.classList.add('field-col');
                field.innerHTML = `
                <img class="img-col" src="${item}" alt="img">
                <div class="field" id="${index}"></div>
                `;
                fullList2.push(field);
                collumnInner.appendChild(field);
                let zoomButton = document.createElement('button');
                zoomButton.classList.add('zoom_button');
                zoomButton.id = 'zoom_button_' + `${index}`;
                zoomButton.innerHTML = '<img class="img-zoom" src="./content/zoom_up.svg">';
                field.appendChild(zoomButton);
                // Добавляем обработчик для zoomButton
                zoomButton.addEventListener('click', function () {
                    popupWindow.classList.remove('disabled');
                    popupWindow.classList.add('enabled');
                    popupWindow.querySelector('.popup_image').src = item;
                });
            });
        }
        function dragStart3() {
            dragElem3 = this;
            if (this.parentNode.getAttribute('index') === 'row2') {
                startIndx2 = this.parentNode.getAttribute('index');
            } else {
                startIndx2 = +this.closest('.field').getAttribute('index');
            }
        }
        function dragEnd3() {
            dragElem3 = null;
        }
        function dragEnter3() {
            this.classList.add('over');
        }
        function dragLeave3() {
            this.classList.remove('over');
        }
        function dragOver3(e) {
            e.preventDefault();
        }
        function dragDrop3() {
            if (this.getAttribute('index') === 'row2') {
                endIndx2 = this.getAttribute('index');
            } else {
                endIndx2 = +this.getAttribute('index');
            }
            var indexDragElem = +dragElem3.getAttribute('id');
            if (startIndx2 === 'row2' && this.childNodes.length === 0) {
                this.append(dragElem3);
                dragElem3.classList.add('none-border');
            } else if (startIndx2 !== undefined && this.childNodes.length === 0) {
                this.append(dragElem3);
            } else if (startIndx2 === 'row2' && this.childNodes.length !== 0) {
                swap2(endIndx2, indexDragElem);
            } else if (startIndx2 !== undefined && endIndx2 === 'row2') {
                this.append(dragElem3);
                dragElem3.classList.remove('none-border');
            } else if (startIndx2 !== undefined && endIndx2 !== undefined && endIndx2 !== 'row2') {
                swapItems3(startIndx2, endIndx2);
            }
            this.classList.remove('over');
        }
        function swap2(end, start) {
            var itemOne = rowList2[start];
            var itemTwo = fullList2[end].querySelector('.item4');
            itemOne.classList.add('none-border');
            itemTwo.classList.remove('none-border');
            rowList2[start].replaceWith(itemTwo);
            fullList2[end].children[1].append(itemOne);
        }
        function swapItems3(fromIndex, toIndex) {
            var itemOne = fullList2[fromIndex].querySelector('.item4');
            var itemTwo = fullList2[toIndex].querySelector('.item4');
            fullList2[fromIndex].children[1].appendChild(itemTwo);
            fullList2[toIndex].children[1].appendChild(itemOne);
        }
        function checkAnwser4() {
            let isCorrect = true;
            fullList2.forEach((item, index) => {
                if (item.children[1].querySelector('.item4')?.innerText.trim() === undefined) {
                    item.children[1].classList.add('incorrect');
                    isCorrect = false;
                } else {
                    var itemName = item.children[1].querySelector('.item4').innerText.trim();
                    if (itemName !== anwserArr4[index]) {
                        item.children[1].classList.add('incorrect');
                        isCorrect = false;
                    } else {
                        item.children[1].classList.remove('incorrect');
                        item.children[1].classList.add('correct');
                    }
                }
            });
            localStorage.setItem('answer_form_index_' + `${currentPageIndex}`, JSON.stringify({questionPlace: isCorrect}));
        }
        function addEventListeners4() {
            var itemElem = document.querySelectorAll('.item4');
            var fieldsElem = document.querySelectorAll('.field');
            var rowElem = document.querySelectorAll('.row');
            itemElem.forEach((item) => {
                item.draggable = true;
            });
            fieldsElem.forEach((elem) => {
            });
            rowElem.forEach((elem) => {
            });
        }
        var row = document.getElementById('row3');
        var dropZoneElements = imgPathArr.map((_, index) => document.getElementById(index.toString()));
        new Sortable(row, {
            group: {
                name: 'shared',
                put: false // Do not allow items to be put into this list
            },
            animation: 150,
            onEnd: function(e) {
                if (e.to.className != "row" ) 
                    e.item.style = "background-color: #f0f9ff00; color: black; border: none; box-shadow: none";
            }
        });
        dropZoneElements.forEach(dropZone => {
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
                        if (targetList.className != "field") itemEl.style = "";
                        if (sourceList.className == "row") existingItem.style = "";
                    }
                },
                onEnd: function(e) {
                    if (e.to.className == "row") e.item.style = "";
                }
            });
        });
        answerButton.onclick = function() {
            backWardBtn.classList.remove('gray_dis');
            backWardBtn.disabled = false;
            nextBtn.classList.remove('gray_dis');
            nextBtn.disabled = false;
            checkAnwser4();
            answerButton.classList.add('hidden');
            restartButton.classList.remove('hidden');
            document.getElementById('control_button_2').style.display = 'none';
            document.getElementById('control_button_3').style.display = 'inline-block';
        };
    } else {
        // Если данные ещё не загружены, ждем и проверяем снова
        setTimeout(waitForData, 50);
    }
}
waitForData();
