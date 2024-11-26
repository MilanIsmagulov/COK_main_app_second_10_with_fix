function waitForData() {
    if (window.dataLoaded) {
        // Функция для создания теста
        function createTest(index) {
            var testData = data[index];
            // Проверяем наличие testData
            if (!testData) {
                console.error('Invalid test data for index:', index);
                return; // Полностью прерываем выполнение функции
            }
            // Если найден ключ paragraph_1, прерываем выполнение
            if (testData.paragraph_1) {
                document.getElementById('control_button_1').classList.remove('gray_dis');
                document.getElementById('control_button_1').disabled = false;
                document.getElementById('control_button_4').classList.remove('gray_dis');
                document.getElementById('control_button_4').disabled = false;
                return; // Прерываем выполнение функции
            }
            var test = testData.test;
            var contentDiv = document.getElementById('content');
            var dynamicContainer = document.getElementById('dynamic-content');
            if (!dynamicContainer) {
                dynamicContainer = document.createElement('div');
                dynamicContainer.id = 'dynamic-content';
                contentDiv.appendChild(dynamicContainer);
            } else {
                dynamicContainer.innerHTML = '';
            }
            // Проверяем каждый элемент на наличие перед использованием
            var description = test.find(item => item.description)?.description || null;
            var imageInfo = test.find(item => item.image) || null;
            var testWithText = test.find(item => item.test_with_text) || null;
            var testWithText2 = test.find(item => item.test_with_text_2) || null;
            var answers = test.find(item => item.answers)?.answers || null;
            var correctAnswers = test.find(item => item.correct_answer)?.correct_answer || null;
            // Отображение описания и элементов ввода
            if (description || testWithText || testWithText2) {
                var descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'description_w_input';
                if (description) {
                    var p = document.createElement('p');
                    p.innerHTML = description;
                    descriptionDiv.appendChild(p);
                }
                if (testWithText) {
                    descriptionDiv.className = 'description_w_input';
                    var label = document.createElement('label');
                    label.htmlFor = 'test_type_2';
                    label.innerHTML = 'Введите ответ:';
                    descriptionDiv.appendChild(label);
                    var input = document.createElement('input');
                    input.type = 'text';
                    input.id = 'test_type_2';
                    input.setAttribute('autocomplete', 'off');
                    input.name = 'test_type_2';
                    input.dataset.correctAnswer = testWithText.test_with_text.replace(/[\{\}=]/g, '').split(';').map(ans => ans.trim()).join(';');
                    descriptionDiv.appendChild(input);
                } else if (testWithText2) {
                    descriptionDiv.className = 'description_w_input_2';
                    var parts = testWithText2.test_with_text_2.split(/\{=.*?\}/);
                    var matches = [...testWithText2.test_with_text_2.matchAll(/\{=(.*?)\}/g)];
                    parts.forEach((part, index) => {
                        var span = document.createElement('span');
                        span.innerHTML = part;
                        descriptionDiv.appendChild(span);
                        if (matches[index]) {
                            var input = document.createElement('input');
                            input.type = 'text';
                            input.className = 'gap';
                            input.setAttribute('autocomplete', 'off');
                            input.dataset.correctAnswer = matches[index][1];
                            descriptionDiv.appendChild(input);
                        }
                    });
                }
                dynamicContainer.appendChild(descriptionDiv);
            }
            // Отображение изображения, если имеется
            if (imageInfo && test.find(item => item.type === 1) || test.find(item => item.type === 2)) {
                if(imageInfo){
                    var imageDiv = document.createElement('div');
                    imageDiv.className = 'image_test_type_2';
                    var img;
                    if (imageInfo.image_path.includes(".jpg") || imageInfo.image_path.includes(".png")) {
                        img = document.createElement('img');
                        img.src = imageInfo.image_path;
                        img.alt = 'Проверьте image_path';
                        imageDiv.appendChild(img);
                    } else if (imageInfo.image_path.includes(".mp4")) {
                        img = document.createElement('video');
                        img.controls = "controls";
                        img.src = imageInfo.image_path;
                        img.alt = 'Проверьте image_path';
                        imageDiv.appendChild(img);
                    }
                    dynamicContainer.appendChild(imageDiv);
                }
            }
            // Отображение теста с вариантами ответов
            if (answers && correctAnswers) {
                var answersDiv = document.createElement('div');
                answersDiv.className = 'answers_btn';
                answersDiv.id = `answers_buttons_${index}`;
                var form = document.createElement('form');
                form.className = 'answer_form';
                form.id = `answer_form_${index}`;
                form.dataset.right = correctAnswers.join(',');
                answers.forEach((answer, i) => {
                    var answerDiv = document.createElement('div');
                    answerDiv.className = 'answer_div';
                    var input = document.createElement('input');
                    input.type = correctAnswers.length > 1 ? 'checkbox' : 'radio';
                    input.name = index;
                    input.value = i;
                    var p = document.createElement('p');
                    p.innerHTML = answer;
                    answerDiv.appendChild(input);
                    answerDiv.appendChild(p);
                    form.appendChild(answerDiv);
                });
                answersDiv.appendChild(form);
                dynamicContainer.appendChild(answersDiv);
                // Функция для обновления состояния кнопки
                function updateButtonState() {
                    var inputs = form.querySelectorAll('input');
                    var anyChecked = Array.from(inputs).some(input => input.checked);
                    if (anyChecked) {
                        answerButton.classList.remove('gray_dis');
                        answerButton.disabled = false;
                    } else {
                        answerButton.classList.add('gray_dis');
                        answerButton.disabled = true;
                    }
                    var element = document.querySelector('.number_of_step');
                    var number = parseInt(element.textContent, 10);
                    var attempts = localStorage.getItem(`attempts_${number}`);
                    if (attempts == 0){
                        answerButton.classList.add('gray_dis');
                        answerButton.disabled = true;
                    }
                }
                // Функция для установки обработчиков кликов на div элементы
                function initializeDivClickHandlers() {
                    document.querySelectorAll('.answer_div').forEach(div => {
                        div.addEventListener('click', function(event) {
                            // Проверяем, что клик был не на input элементе
                            if (event.target.tagName !== 'INPUT') {
                                var input = this.querySelector('input[type="radio"], input[type="checkbox"]');
                                if (input) {
                                    // Для радиокнопок устанавливаем значение в true
                                    if (input.type === 'radio') {
                                        input.checked = true;
                                    }
                                    // Для чекбоксов инвертируем текущее состояние
                                    else if (input.type === 'checkbox') {
                                        input.checked = !input.checked;
                                    }
                                    // Обновляем состояние кнопки после выбора
                                    updateButtonState();
                                }
                            }
                        });
                    });
                }
                // Инициализация состояния кнопки при загрузке страницы
                updateButtonState();
                // Инициализация обработчиков кликов на div элементы при загрузке страницы
                initializeDivClickHandlers();
                // Добавление слушателей событий для input элементов
                form.querySelectorAll('input').forEach((input) => {
                    input.addEventListener('change', updateButtonState);
                });
            }
            document.getElementById('control_button_2').style.display = 'inline-block';
            document.getElementById('control_button_3').style.display = 'none';
            if (testWithText) {
                var inputField = document.querySelector('#test_type_2');
                inputField.addEventListener('input', (event) => {
                    if (event.target.value.length > 0) {
                        answerButton.classList.remove('gray_dis');
                        answerButton.disabled = false;
                    };
                    var element = document.querySelector('.number_of_step');
                    var number = parseInt(element.textContent, 10);
                    var attempts = localStorage.getItem(`attempts_${number}`);
                    if (attempts == 0){
                        answerButton.classList.add('gray_dis');
                        answerButton.disabled = true;
                    }
                });
            };
            if (testWithText2) {
                var gapElements = document.querySelectorAll('.gap');
                gapElements.forEach((element) => {
                    element.addEventListener('input', (event) => {
                        if (event.target.value.length > 0) {
                            answerButton.classList.remove('gray_dis');
                            answerButton.disabled = false;
                        } else {
                            answerButton.classList.add('gray_dis');
                            answerButton.disabled = true;
                        };
                        var element2 = document.querySelector('.number_of_step');
                        var number = parseInt(element2.textContent, 10);
                        var attempts = localStorage.getItem(`attempts_${number}`);
                        if (attempts == 0){
                            answerButton.classList.add('gray_dis');
                            answerButton.disabled = true;
                        }
                    });
                });
            };
        }
        // Функция для блокировки всех элементов ввода
        function blockInputs() {
            var inputs = document.querySelectorAll('input');
            inputs.forEach((input) => {
                input.disabled = true;
            });
            // Блокируем div и добавляем класс для визуальной индикации
            document.querySelectorAll('.answer_div').forEach(div => {
                div.classList.add('disabled_div');
                div.style.pointerEvents = 'none'; // Отключаем взаимодействие с div
            });
        }
        // ЭТО ДЛЯ ОШИБОК
        var element = document.querySelector('.number_of_step');
        var number = parseInt(element.textContent, 10);
        function initializeAttempts() {
            var attempts = localStorage.getItem(`attempts_${number}`);
            if (!attempts) {
                localStorage.setItem(`attempts_${number}`, '2'); // Устанавливаем 2 попытки
            };
        };
        // ЭТО ДЛЯ ОШИБОК
        initializeAttempts();
        // ЭТО ДЛЯ ОШИБОК
        // Пример использования
        function toTheoryPage() {
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
        };
        // ЭТО ДЛЯ ОШИБОК
        function disabvarest() {
            document.getElementById('control_button_2').style.display = 'none';
            document.getElementById('control_button_3').style.display = 'none';
            setTimeout(() => toTheoryPage(), 1);
        };
        // ЭТО ДЛЯ ОШИБОК
        // Функция для проверки теста с вариантами ответов
        function checkAnswers() {
            var form = document.querySelector('.answer_form');
            var correctAnswers = form.dataset.right.split(',').map(Number);
            var inputs = form.querySelectorAll('input');
            var attempts = parseInt(localStorage.getItem(`attempts_${number}`));
            var allCorrect = true;
            var partiallyCorrect = false;
            if (attempts > 0) {
                inputs.forEach(input => {
                    var answerDiv = input.parentElement;
                    answerDiv.classList.remove('correct', 'incorrect');
                    if (input.checked) {
                        if (correctAnswers.includes(parseInt(input.value))) {
                            answerDiv.classList.add('correct');
                            blockInputs();
                        } else {
                            answerDiv.classList.add('incorrect');
                            allCorrect = false;
                            partiallyCorrect = true;
                        }
                    } else {
                        if (correctAnswers.includes(parseInt(input.value))) {
                            // Проходим по каждому элементу
                            inputs.forEach(input => {
                                // Проверяем тип input
                                if (input.type !== 'radio') {
                                    answerDiv.classList.add('incorrect');
                                };
                            });
                            allCorrect = false;
                            partiallyCorrect = true;
                        }
                    }
                });
                if (!allCorrect) {
                    blockInputs();
                    // ЭТО ДЛЯ ОШИБОК
                    if (partiallyCorrect) {
                        attempts--; // Уменьшаем количество попыток при частично правильном ответе
                        localStorage.setItem(`attempts_${number}`, attempts.toString());
                        if (attempts === 0) {
                            disabvarest();
                        }
                    }
                }
                if (allCorrect) {
                    // Разблокируем кнопки только если все ответы правильные
                    backWardBtn.classList.remove('gray_dis');
                    backWardBtn.disabled = false;
                    nextBtn.classList.remove('gray_dis');
                    nextBtn.disabled = false;
                } else {
                    // Если есть ошибки, блокируем кнопки
                    backWardBtn.classList.add('gray_dis');
                    backWardBtn.disabled = true;
                    nextBtn.classList.add('gray_dis');
                    nextBtn.disabled = true;
                }
                // Переключаем видимость кнопок в зависимости от количества попыток
                if (attempts != 0) {
                    document.getElementById('control_button_2').style.display = 'none';
                    document.getElementById('control_button_3').style.display = 'inline-block';
                }
                localStorage.setItem(form.id, JSON.stringify({ questionPlace: allCorrect }));
                answerButton.classList.add('hidden');
                restartButton.classList.remove('hidden');
            }
        };
        // Функция для проверки текстовых тестов
        function checkTextAnswers(index) {
            var attempts = parseInt(localStorage.getItem(`attempts_${number}`));
            var content = document.getElementById('dynamic-content');
            var inputs = content.querySelectorAll('input');
            var allCorrect = true;
            var anyIncorrect = false; // Флаг для отслеживания наличия неправильного ответа
            inputs.forEach(input => {
                var userAnswer = input.value.trim();
                var correctAnswers = input.dataset.correctAnswer ? input.dataset.correctAnswer.split(',').map(ans => ans.trim()) : [];
                if (correctAnswers.includes(userAnswer)) {
                    input.classList.add('correct');
                    input.classList.remove('incorrect');
                    backWardBtn.classList.remove('gray_dis');
                    backWardBtn.disabled = false;
                    nextBtn.classList.remove('gray_dis');
                    nextBtn.disabled = false;
                } else {
                    input.classList.add('incorrect');
                    input.classList.remove('correct');
                    allCorrect = false;
                    anyIncorrect = true; // Устанавливаем флаг, если есть неправильный ответ
                }
            });
            if (anyIncorrect) {
                attempts--; // Уменьшаем количество попыток на 1 только один раз
                localStorage.setItem(`attempts_${number}`, attempts.toString());
                if (attempts === 0) {
                    disabvarest();
                }
            };
            localStorage.setItem('answer_from_' + index, JSON.stringify({ questionPlace: allCorrect }));
            if (attempts != 0){
                document.getElementById('control_button_2').style.display = 'none';
                document.getElementById('control_button_3').style.display = 'inline-block';
            };
        };
        // Функция для сброса теста
        function resetTest() {
            var dynamicContainer = document.getElementById('dynamic-content');
            if (dynamicContainer) {
                dynamicContainer.innerHTML = '';
            };
            answerButton.classList.add('gray_dis');
            answerButton.disabled = true;
            restartButton.classList.remove('hidden');
            createTest(`index_${currentPageIndex}`);
            answerButton.classList.remove('hidden');
            answerButton.onclick = function(){
                var index = `index_${currentPageIndex}`;
                if (document.querySelector('.answers_btn')) {
                    checkAnswers();
                } else {
                    checkTextAnswers(index);
                };
            };
            restartButton.addEventListener('click', resetTest);
        };
        // Инициализация первого теста при загрузке страницы
        resetTest();
        // Логика, которая зависит от данных
    } else {
        // Если данные ещё не загружены, ждем и проверяем снова
        setTimeout(waitForData, 50);
    };
};
waitForData();