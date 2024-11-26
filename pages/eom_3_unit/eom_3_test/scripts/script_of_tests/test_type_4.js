document.getElementById('control_button_3').style.display = 'none';
document.getElementById('control_button_2').style.display = 'inline-block';
if (blockButtonEOM2 === 1){
    backWardBtn.classList.add('gray_dis');
    backWardBtn.disabled = true;
    nextBtn.classList.add('gray_dis');
    nextBtn.disabled = true;
}
var testObj = data[`index_${currentPageIndex}`].test; // 
var anwserArr3 = testObj.find(item => item.answers).answers; // 
// anwserArr3 - элементы соотвествуют ячейке. Слево направо, сверху вниз
// some1 - 1 кол 1 ячейка, some2 - 1 кол 2 ячейка, some5 - 2 кол 1 ячейка и т. д.
var pathImg = testObj.find(item => item.image !== undefined).image; // путь к фотке
var leftColLength = testObj.find(item => item.leftColumn).leftColumn; //кол-во колонн слева
var rightColLength = testObj.find(item => item.rightColumn).rightColumn; //кол-во колонн справа
answerButton.classList.remove('gray_dis');
answerButton.disabled = false;
restartButton.classList.add('hidden');
restartButton.disabled = false;
var drag3 = document.createElement('div');
drag3.classList = 'drag3';
drag3.id = 'drag3';
var dragInner = document.createElement('div');
dragInner.classList = 'drag-inner';
dragInner.id = 'drag-inner';
var row2 = document.createElement('div');
row2.classList = 'row2';
row2.id = 'row2';
var imgPlc = document.createElement('div');
imgPlc.classList = 'img'
imgPlc.id = 'img'
var leftColElem = document.createElement('div');
leftColElem.classList = 'left-col';
leftColElem.id = 'left-col';
var rightColElem = document.createElement('div');
rightColElem.classList = 'right-col';
rightColElem.id = 'right-col';
dragInner.appendChild(drag3);
dragInner.appendChild(row2);
contentDiv.appendChild(dragInner);
drag3.appendChild(leftColElem);
drag3.appendChild(imgPlc)
drag3.appendChild(rightColElem);
var leftCol = [];
var rightCol = [];
var fullList = [];
var realIndex = 0;
var rowList = [];
function waitForData() {
    if (window.dataLoaded) {
        createRow();
        createFields();
        createImg();
        function createImg() {
            var imgOuter = document.getElementById('img');
            var img = document.createElement('img');
            img.setAttribute('src', pathImg);
            img.setAttribute('alt', 'img');
            imgOuter.appendChild(img);
        }
        function createRow() {
            [...anwserArr3]
            .map(a => ({ value: a, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(a => a.value)
            .forEach((item, index) => {
                var rowItem = document.createElement('li')
                rowItem.setAttribute('id', index)
                rowItem.classList.add('item3')
                rowItem.draggable = 'true'
                rowItem.innerText = item
                rowList.push(rowItem)
                row2.appendChild(rowItem)
            })
        }
        function createFields() {
            for (var i = 0; i < leftColLength; i++) {
                var field = document.createElement('div')
                field.setAttribute('id', realIndex)
                field.classList.add('field')
                leftCol.push(field)
                leftColElem.appendChild(field)
                realIndex++
            }
            for (var i = 0; i < rightColLength; i++) {
                var field = document.createElement('div')
                field.setAttribute('id', realIndex)
                field.classList.add('field')
                rightCol.push(field)
                rightColElem.appendChild(field)
                realIndex++
            }
            fullList = [...leftCol, ...rightCol]
        }
        function dragStart2() {
            dragElem2 = this;
            if (this.parentNode.getAttribute('index') === 'row') {
                startIndx = this.parentNode.getAttribute('index')
            } else {
                startIndx = +this.closest('.field').getAttribute('index')
            }
        }
        function dragEnd2() {
            dragElem2 = null
        }
        function dragEnter2() {
            this.classList.add('over');
        }
        function dragLeave2() {
            this.classList.remove('over');
        }
        function dragOver2(e) {
            e.preventDefault();
        }
        function dragDrop2() {
            if (this.getAttribute('index') === 'row') {
                endIndx = this.getAttribute('index');
            } else {
                endIndx = +this.getAttribute('index');
            }
            var indexDragElem = +dragElem2.getAttribute('id')
            if (startIndx === 'row' && this.childNodes.length === 0) {
                this.append(dragElem2)
            } else if (startIndx !== undefined && this.childNodes.length === 0) {
                this.append(dragElem2)
            } else if (startIndx === 'row' && this.childNodes.length !== 0) {
                swap(endIndx, indexDragElem)
            } else if (startIndx !== undefined && endIndx === 'row') {
                this.append(dragElem2)
            } else if (startIndx !== undefined && endIndx !== undefined) {
                swapItems2(startIndx, endIndx);
            }
            this.classList.remove('over');
        }
        function swap(end, start) {
            var itemOne = rowList[start]
            var itemTwo = fullList[end].querySelector('.item3')
            rowList[start].replaceWith(itemTwo)
            fullList[end].appendChild(itemOne)
        }
        function swapItems2(fromIndex, toIndex) {
            var itemOne = fullList[fromIndex].querySelector('.item3');
            var itemTwo = fullList[toIndex].querySelector('.item3');
            fullList[fromIndex].appendChild(itemTwo);
            fullList[toIndex].appendChild(itemOne);
        }
        function checkAnwser5() {
            let isTestCorrect = true; // Общая переменная, которая определяет правильность всего теста
            fullList.forEach((item, index) => {
                let isCorrect = true; // Локальная переменная для проверки каждого элемента
                if (item.querySelector('.item3')?.innerText.trim() === undefined) {
                    item.classList.add('incorrect');
                    isCorrect = false;
                } else {
                    let itemName = item.querySelector('.item3').innerText.trim();
                    if (itemName !== anwserArr3[index]) {
                        item.classList.add('incorrect');
                        isCorrect = false;
                    } else {
                        item.classList.remove('incorrect');
                        item.classList.add('correct');
                    }
                }
                // Если хотя бы один элемент неправильный, общий результат теста - неверный
                if (!isCorrect) {
                    isTestCorrect = false;
                }
                localStorage.setItem('answer_form_index_' + `${currentPageIndex}`, JSON.stringify({questionPlace: isCorrect}));
            });
            // Сохраняем общий результат теста
            localStorage.setItem('answer_form_index_' + `${currentPageIndex}`, JSON.stringify({questionPlace: isTestCorrect}));
        }
        answerButton.onclick = function() {
            backWardBtn.classList.remove('gray_dis');
            backWardBtn.disabled = false;
            nextBtn.classList.remove('gray_dis');
            nextBtn.disabled = false;
            checkAnwser5();
            answerButton.classList.add('hidden');
            restartButton.classList.remove('hidden');
            document.getElementById('control_button_2').style.display = 'none';
            document.getElementById('control_button_3').style.display = 'inline-block';
        };
        // Выбор строки, в которую будут добавляться sortable-элементы
        var row = document.getElementById('row2');
        // Выбор всех элементов с классом 'field'
        var fields = document.querySelectorAll('.field');
        // Преобразование NodeList в массив для удобства работы
        var arr = Array.from(fields);
        new Sortable(row, {
            group: {
                name: 'shared',
                put: false // Запретить добавление элементов в этот список
            },
            animation: 150,
            onEnd: function(e) {
                if (e.to.className != "row2") {
                    e.item.style = "background-color: #00000000; color: black; border: none; box-shadow: none";
                }
            }
        });
        for (var i of arr) {
            new Sortable(i, {
                group: 'shared',
                animation: 150,
                onAdd: function(e) {
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
                        if (sourceList.className == "row2") existingItem.style = "";
                    }
                },
                onEnd: function(e) {
                    if (e.to.className == "row2") e.item.style = "";
                }
            });
        }
    } else {
        // Если данные ещё не загружены, ждем и проверяем снова
        setTimeout(waitForData, 50);
    }
}
waitForData();