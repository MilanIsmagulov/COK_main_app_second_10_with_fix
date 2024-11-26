answerButton.disabled = false;
answerButton.classList.remove('gray_dis');
var element = document.querySelector('.number_of_step');
var number = parseInt(element.textContent, 10);
var attempts = localStorage.getItem(`attempts_${number}`);
if (attempts == 0){
    answerButton.classList.add('gray_dis');
    answerButton.disabled = true;
}
function checkParagraph(){
    function waitForData() {
        if (window.dataLoaded) {
            // Функция для создания теста
            function createTest(index) {
                var testData1 = data[index];
                if (!testData1){
                    return; // Полностью прерываем выполнение функции
                };
                // Если найден ключ paragraph_1, прерываем выполнение
                if (testData1.paragraph_1){
                    document.getElementById('control_button_1').classList.remove('gray_dis');
                    document.getElementById('control_button_1').disabled = false;
                    document.getElementById('control_button_4').classList.remove('gray_dis');
                    document.getElementById('control_button_4').disabled = false;
                    return; // Прерываем выполнение функции
                };
                var test = testData1.test;
                var contentDiv = document.getElementById('content');
                var dynamicContainer = document.getElementById('dynamic-content');
                if (!dynamicContainer) {
                    dynamicContainer = document.createElement('div');
                    dynamicContainer.id = 'dynamic-content';
                    contentDiv.appendChild(dynamicContainer);
                } else {
                    dynamicContainer.innerHTML = '';
                };
                var description = test.find(item => item.description)?.description;
                var testData = test.find(item => item.test_with_text_3)?.test_with_text_3;
                var options = test.find(item => item.options_test_with_text_3)?.options_test_with_text_3;
                var imageInfo = test.find(item => item.image);
                // Отображение описания и элементов ввода
                if (description) { //  || testWithText3
                    var descriptionDiv = document.createElement('div');
                    descriptionDiv.className = 'description_w_input';
                    if (description) {
                        var p = document.createElement('p');
                        p.innerHTML = description;
                        descriptionDiv.appendChild(p);
                    };
                    var text = testData;  
                    Object.keys(options).forEach(key => {
                        var select = `<select id="${key}"><option value="" disabled selected>Выберите вариант</option>${options[key].map(option => `<option value="${option}">${option}</option>`).join('')}</select>`;
                        text = text.replace(`{=${key}}`, select);
                    });
                    var testDiv = document.createElement('div');
                    testDiv.classList = 'test_wrapper';
                    testDiv.innerHTML = `<div class="test_with_text_3">${text}</div>`;
                    dynamicContainer.appendChild(testDiv);
                    testDiv.appendChild(descriptionDiv);
                };
                // Отображение изображения, если имеется
                if (imageInfo) {
                    var imageDiv = document.createElement('div');
                    imageDiv.className = 'image_test_type_2';
                    var img;
                    if (imageInfo.image_path.includes(".jpg") || imageInfo.image_path.includes(".png")) {
                        img = document.createElement('img');
                    } else if (imageInfo.image_path.includes(".mp4")) {
                        img = document.createElement('video');
                        img.controls = "controls";
                    }
                    img.src = imageInfo.image_path;
                    img.alt = 'Проверьте image_path';
                    imageDiv.appendChild(img);
                    dynamicContainer.appendChild(imageDiv);
                }
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
            // Функция для проверки текстовых тестов
            function checkAnswers8(index) {
                var testData1 = data[index];
                var test = testData1.test;
                var correctAnswers =  test.find(item => item.correctAnswers_test_with_text_3)?.correctAnswers_test_with_text_3;
                var allCorrect = true;
                var shouldDecreaseAttempts;
                var attempts = parseInt(localStorage.getItem(`attempts_${number}`));
                Object.keys(correctAnswers).forEach(key => {
                    var selectElement = document.getElementById(key);
                    var selectedValue = selectElement.value;
                    if (selectedValue === correctAnswers[key]) {
                        selectElement.classList.add('correct');
                        selectElement.classList.remove('incorrect');
                        partiallyCorrect = true;
                    } else {
                        selectElement.classList.add('incorrect');
                        selectElement.classList.remove('correct');
                        allCorrect = false;
                        partiallyCorrect = true;
                    };
                    if (!allCorrect && partiallyCorrect){
                        shouldDecreaseAttempts = true; // Устанавливаем флаг для уменьшения попыток
                    };
                });
                if (allCorrect){
                    backWardBtn.classList.remove('gray_dis');
                    backWardBtn.disabled = false;
                    nextBtn.classList.remove('gray_dis');
                    nextBtn.disabled = false;
                }
                localStorage.setItem('answer_from_' + index, JSON.stringify({ questionPlace: allCorrect }));
                if (shouldDecreaseAttempts){
                    attempts--;
                    localStorage.setItem(`attempts_${number}`, attempts.toString());
                    if (attempts === 0){
                        disabvarest();
                    };
                };
                document.getElementById('control_button_2').style.display = 'none';
                document.getElementById('control_button_3').style.display = 'inline-block';
            };
            answerButton.onclick = function(){
                var index = `index_${currentPageIndex}`;
                checkAnswers8(index);
            };
            document.getElementById('control_button_3').onclick = function(){
                document.getElementById('control_button_3').disabled = true;
                document.getElementById('control_button_3').style.display = 'none';
                document.getElementById('control_button_2').classList.remove('gray_dis');
                document.getElementById('control_button_2').disabled = false;
                document.getElementById('control_button_2').style.display = 'inline-block';
            };
            // Функция для сброса теста
            function resetTest() {
                var dynamicContainer = document.getElementById('dynamic-content');
                if (dynamicContainer) {
                    dynamicContainer.innerHTML = '';
                }
                restartButton.classList.remove('hidden');
                createTest(`index_${currentPageIndex}`);
                answerButton.classList.remove('hidden');
                restartButton.addEventListener('click', resetTest);
                
            };
            // Инициализация первого теста при загрузке страницы
            resetTest();
        } else {
            // Если данные ещё не загружены, ждем и проверяем снова
            setTimeout(waitForData, 50);
        }
    }
    waitForData();
};
checkParagraph();
