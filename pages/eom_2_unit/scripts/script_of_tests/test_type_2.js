// Access answers array from the data object
document.getElementById('control_button_3').style.display = 'none';
document.getElementById('control_button_2').style.display = 'inline-block';
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
    var anwserArr = testObj.find(item => item.answers).answers;
    var imageObj = testObj.find(item => item.image !== undefined);
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
    var dynamicContainer = document.createElement('div');
    dynamicContainer.className = 'dynamic-content';
    var dragObj = document.createElement('div');
    dragObj.className = 'numbers';
    var mainWrapper = document.createElement('div');
    mainWrapper.classList.add('main_wrapper');
    if (imageObj && imageObj.image){
        var imgElement;
        if (imageObj.image_path.includes(".jpg") || imageObj.image_path.includes(".png")){
            imgElement = document.createElement('img');
        }else if (imageObj.image_path.includes(".mp4")){
            imgElement = document.createElement('video');
            imgElement.controls = "controls";
        }
        imgElement.src = imageObj.image_path
        imgElement.alt = 'Test Image';
        imgElement.className = 'test_image';
        mainWrapper.appendChild(imgElement);
    }
    contentDiv.appendChild(mainWrapper);
    mainWrapper.appendChild(dynamicContainer);
    dynamicContainer.appendChild(dragObj);
    localStorage.removeItem('data_for_list');
    var list = document.createElement('ul');
    list.className = 'list';
    list.id = 'list';
    dynamicContainer.appendChild(list);
    var storeItems = [];
    var listItems = [];
    init();
    function init(){
        localStorage.getItem('data_for_list') ? loadList() : createList();
    }
    function createList(){
        [...anwserArr]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((item, index) =>{
            var listItem = document.createElement('li');
            listItem.draggable = true;
            listItem.setAttribute('id', index);
            listItem.innerHTML = `<div class="item" draggable="true">${item}</div>`;
            var num = document.createElement('span');
            num.setAttribute('class', 'number');
            num.innerHTML = `${index+1}`;
            document.getElementsByClassName("numbers")[0].appendChild(num);
            listItems.push(listItem);
            list.appendChild(listItem);
        });
        for (i in listItems){
            storeItems.push(i);
        }
        localStorage.setItem('data_for_list', JSON.stringify(storeItems));
    }
    function loadList(){
        fromStore();
        [...storeItems]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((item, index) =>{
            var listItem = document.createElement('li');
            listItem.draggable = true;
            listItem.setAttribute('id', index);
            listItem.innerHTML = `<span class="number">${index + 1}</span><div class="item" draggable="true">${item}</div>`;
            listItems.push(listItem);
            list.appendChild(listItem);
        });
        [...storeItems]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((item, index) =>{
            var listItem = document.createElement('li');
            listItem.draggable = true;
            listItem.setAttribute('id', index);
            listItem.innerHTML = `<span class="number">${index + 1}</span><div class="item" draggable="true">${item}</div>`;
            listItems.push(listItem);
            list.appendChild(listItem);
        });
    }
    function fromStore(){
        storeItems = JSON.parse(localStorage.getItem('data_for_list'));
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
    // ЭТО ДЛЯ ОШИБОК
    function checkAnwser(){
        var isCorrect = true;
        var attempts = parseInt(localStorage.getItem(`attempts_${number}`));
        listItems = document.getElementsByClassName("list");
        for (var i = 0; i < listItems[0].children.length; i++){
            var itemText = listItems[0].children[i].getElementsByTagName('div')[0].innerText;
            if (itemText !== anwserArr[i]){
                isCorrect = false;
                listItems[0].children[i].classList.add('incorrect');
                listItems[0].children[i].classList.remove('correct');
                partiallyCorrect = true;
            }else{
                listItems[0].children[i].classList.add('correct');
                listItems[0].children[i].classList.remove('incorrect');
                partiallyCorrect = true;
            }
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
        if (isCorrect){
            backWardBtn.classList.remove('gray_dis');
            backWardBtn.disabled = false;
            nextBtn.classList.remove('gray_dis');
            nextBtn.disabled = false;
        }
        answerButton.classList.add('hidden');
        restartButton.classList.remove('hidden');
        localStorage.setItem('answer_form_' + `index_${currentPageIndex}`, JSON.stringify({questionPlace: isCorrect}));
    }
    answerButton.onclick = function(){
        checkAnwser();
        answerButton.classList.add('hidden');
        restartButton.classList.remove('hidden');
        document.getElementById('control_button_2').style.display = 'none';
        document.getElementById('control_button_3').style.display = 'inline-block';
    }
    var el = document.getElementById('list');
    new Sortable(el,{
        swap: true,
        swapClass: "highlight",
        animation: 150,
    });
}
checkParagraph();
