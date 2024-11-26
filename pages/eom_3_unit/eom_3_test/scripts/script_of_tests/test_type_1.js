function waitForData() {
    if (blockButtonEOM2 === 1){
        backWardBtn.classList.add('gray_dis');
        backWardBtn.disabled = true;
        nextBtn.classList.add('gray_dis');
        nextBtn.disabled = true;
    }
    if (window.dataLoaded) {
        // Функция для создания теста
        function createTest(index) {
            const testData = data[index];
            const test = testData.test;
            const contentDiv = document.getElementById('content');
            let dynamicContainer = document.getElementById('dynamic-content');
            if (!dynamicContainer) {
                dynamicContainer = document.createElement('div');
                dynamicContainer.id = 'dynamic-content';
                contentDiv.appendChild(dynamicContainer);
            } else {
                dynamicContainer.innerHTML = '';
            }
            const description = test.find(item => item.description)?.description;
            const imageInfo = test.find(item => item.image) || null;
            const testWithText = test.find(item => item.test_with_text);
            const testWithText2 = test.find(item => item.test_with_text_2);
            const answers = test.find(item => item.answers)?.answers;
            const correctAnswers = test.find(item => item.correct_answer)?.correct_answer;
            // Отображение описания и элементов ввода
            if (description || testWithText || testWithText2) {
                const descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'description_w_input';
                if (description) {
                    const p = document.createElement('p');
                    p.innerHTML = description;
                    descriptionDiv.appendChild(p);
                }
                if (testWithText) {
                    descriptionDiv.className = 'description_w_input';
                    const label = document.createElement('label');
                    label.htmlFor = 'test_type_2';
                    label.innerHTML = 'Введите ответ:';
                    descriptionDiv.appendChild(label);
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.id = 'test_type_2';
                    input.setAttribute('autocomplete', 'off');
                    input.name = 'test_type_2';
                    input.dataset.correctAnswer = testWithText.test_with_text.replace(/[\{\}=]/g, '').split(';').map(ans => ans.trim()).join(';');
                    descriptionDiv.appendChild(input);
                } else if (testWithText2) {
                    descriptionDiv.className = 'description_w_input_2';
                    const parts = testWithText2.test_with_text_2.split(/\{=.*?\}/);
                    const matches = [...testWithText2.test_with_text_2.matchAll(/\{=(.*?)\}/g)];
                    parts.forEach((part, index) => {
                        const span = document.createElement('span');
                        span.innerHTML = part;
                        descriptionDiv.appendChild(span);
                        if (matches[index]) {
                            const input = document.createElement('input');
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
                const imageDiv = document.createElement('div'); 
                imageDiv.className = 'image_test_type_2'; 
                let img; 
                if(imageInfo){ 
                    if (imageInfo.image_path.includes(".jpg") || imageInfo.image_path.includes(".png")) { 
                        img = document.createElement('img'); 
                    } else if (imageInfo.image_path.includes(".mp4")) { 
                        img = document.createElement('video'); 
                        img.controls = "controls"; 
                    } 
                    // const img = document.createElement('img'); 
                    img.src = imageInfo.image_path; 
                    img.alt = 'Проверьте image_path'; 
                    imageDiv.appendChild(img); 
                    dynamicContainer.appendChild(imageDiv); 
                } 
            }
            // Отображение теста с вариантами ответов
            if (answers && correctAnswers) {
                const answersDiv = document.createElement('div');
                answersDiv.className = 'answers_btn';
                answersDiv.id = `answers_buttons_${index}`;
                const form = document.createElement('form');
                form.className = 'answer_form';
                form.id = `answer_form_${index}`;
                form.dataset.right = correctAnswers.join(',');
                answers.forEach((answer, i) => {
                    const answerDiv = document.createElement('div');
                    answerDiv.className = 'answer_div';
                    const input = document.createElement('input');
                    input.type = correctAnswers.length > 1 ? 'checkbox' : 'radio';
                    input.name = index;
                    input.value = i;
                    const p = document.createElement('p');
                    p.innerHTML = answer;
                    answerDiv.appendChild(input);
                    answerDiv.appendChild(p);
                    form.appendChild(answerDiv);
                });
                answersDiv.appendChild(form);
                dynamicContainer.appendChild(answersDiv);
                // Функция для обновления состояния кнопки
                function updateButtonState() {
                    const inputs = form.querySelectorAll('input');
                    const anyChecked = Array.from(inputs).some(input => input.checked);
                    if (anyChecked) {
                        answerButton.classList.remove('gray_dis');
                        answerButton.disabled = false;
                    } else {
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
                const inputField = document.querySelector('#test_type_2');
                inputField.addEventListener('input', (event) => {
                    if (event.target.value.length > 0) {
                        answerButton.classList.remove('gray_dis');
                        answerButton.disabled = false;
                    }
                });
            }
            if (testWithText2) {
                const gapElements = document.querySelectorAll('.gap');
                gapElements.forEach((element) => {
                    element.addEventListener('input', (event) => {
                        if (event.target.value.length > 0) {
                            answerButton.classList.remove('gray_dis');
                            answerButton.disabled = false;
                        } else {
                            answerButton.classList.add('gray_dis');
                            answerButton.disabled = true;
                        }
                    });
                });
            }
        }
        // Функция для блокировки всех элементов ввода
        function blockInputs() {
            const inputs = document.querySelectorAll('input');
            inputs.forEach((input) => {
                input.disabled = true;
            });
        }
        // Функция для проверки теста с вариантами ответов
        function checkAnswers() {
            const form = document.querySelector('.answer_form');
            const correctAnswers = form.dataset.right.split(',').map(Number);
            const inputs = form.querySelectorAll('input');
            let allCorrect = true;
            inputs.forEach(input => {
                const answerDiv = input.parentElement;
                answerDiv.classList.remove('correct', 'incorrect');
                if (input.checked) {
                    if (correctAnswers.includes(parseInt(input.value))) {
                        blockInputs();
                        answerDiv.classList.add('correct');
                    } else {
                        blockInputs();
                        answerDiv.classList.add('incorrect');
                        allCorrect = false;
                    }
                } else {
                    if (correctAnswers.includes(parseInt(input.value))) {
                        blockInputs();
                        // Проходим по каждому элементу
                        inputs.forEach(input => {
                            // Проверяем тип input
                            if (input.type !== 'radio') {
                                console
                                answerDiv.classList.add('incorrect');
                            };
                        });
                        allCorrect = false;
                    }
                }
            });
            document.getElementById('control_button_2').style.display = 'none';
            document.getElementById('control_button_3').style.display = 'inline-block';
            localStorage.setItem(form.id, JSON.stringify({ questionPlace: allCorrect }));
            answerButton.classList.add('hidden');
            restartButton.classList.remove('hidden');
        }
        // Функция для проверки текстовых тестов
        function checkTextAnswers(index) {
            const content = document.getElementById('dynamic-content');
            const inputs = content.querySelectorAll('input');
            let allCorrect = true;
            inputs.forEach(input => {
                const userAnswer = input.value.trim();
                const correctAnswers = input.dataset.correctAnswer ? input.dataset.correctAnswer.split(',').map(ans => ans.trim()) : [];
                if (correctAnswers.includes(userAnswer)) {
                    input.classList.add('correct');
                    input.classList.remove('incorrect');
                } else {
                    input.classList.add('incorrect');
                    input.classList.remove('correct');
                    allCorrect = false;
                }
            });
            localStorage.setItem('answer_from_' + index, JSON.stringify({ questionPlace: allCorrect }));
            document.getElementById('control_button_2').style.display = 'none';
            document.getElementById('control_button_3').style.display = 'inline-block';
        }
        // Функция для сброса теста
        function resetTest() {
            const dynamicContainer = document.getElementById('dynamic-content');
            if (dynamicContainer) {
                dynamicContainer.innerHTML = '';
            }
            answerButton.classList.add('gray_dis');
            answerButton.disabled = true;
            restartButton.classList.remove('hidden');
            createTest(`index_${currentPageIndex}`);
            answerButton.classList.remove('hidden');
            answerButton.onclick = function(){
                backWardBtn.classList.remove('gray_dis');
                backWardBtn.disabled = false;
                nextBtn.classList.remove('gray_dis');
                nextBtn.disabled = false;
                const index = `index_${currentPageIndex}`;
                if (document.querySelector('.answers_btn')) {
                    checkAnswers();
                } else {
                    checkTextAnswers(index);
                }
            };
            restartButton.addEventListener('click', resetTest);
        }
        // Инициализация первого теста при загрузке страницы
        resetTest();
        // Логика, которая зависит от данных
    } else {
        // Если данные ещё не загружены, ждем и проверяем снова
        setTimeout(waitForData, 50);
    }
}
waitForData();
