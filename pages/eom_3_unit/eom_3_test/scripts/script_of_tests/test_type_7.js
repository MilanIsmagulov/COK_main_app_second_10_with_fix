answerButton.disabled = false;
answerButton.classList.remove('gray_dis');
document.getElementById('control_button_2').style.display = 'inline-block';
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
            const testData1 = data[index];
            const test = testData1.test;
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
            const testData = test.find(item => item.test_with_text_3)?.test_with_text_3;
            const options = test.find(item => item.options_test_with_text_3)?.options_test_with_text_3;
            const imageInfo = test.find(item => item.image);
            // Отображение описания и элементов ввода
            if (description) { //  || testWithText3
                const descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'description_w_input';
                if (description) {
                    const p = document.createElement('p');
                    p.innerHTML = description;
                    descriptionDiv.appendChild(p);
                }
                let text = testData;
                Object.keys(options).forEach(key => {
                    const select = `<select id="${key}"><option value="" disabled selected>Выберите вариант</option>${options[key].map(option => `<option value="${option}">${option}</option>`).join('')}</select>`;
                    text = text.replace(`{=${key}}`, select);
                });
                let testDiv = document.createElement('div');
                testDiv.classList = 'test_wrapper';
                testDiv.innerHTML = `<div class="test_with_text_3">${text}</div>`;
                dynamicContainer.appendChild(testDiv);
                testDiv.appendChild(descriptionDiv);
            }
            // Отображение изображения, если имеется
            if (imageInfo) {
                const imageDiv = document.createElement('div');
                imageDiv.className = 'image_test_type_2';
                let img;
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
        }
        // Функция для проверки текстовых тестов
        function checkAnswers8(index) {
            const testData1 = data[index];
            const test = testData1.test;
            const correctAnswers =  test.find(item => item.correctAnswers_test_with_text_3)?.correctAnswers_test_with_text_3;
            let allCorrect = true;
            Object.keys(correctAnswers).forEach(key => {
                const selectElement = document.getElementById(key);
                const selectedValue = selectElement.value;
                if (selectedValue === correctAnswers[key]) {
                    selectElement.classList.add('correct');
                    selectElement.classList.remove('incorrect');
                } else {
                    selectElement.classList.add('incorrect');
                    selectElement.classList.remove('correct');
                    allCorrect = false;
                }
            });
            localStorage.setItem('answer_from_' + index, JSON.stringify({ questionPlace: allCorrect }));
            document.getElementById('control_button_2').style.display = 'none';
            document.getElementById('control_button_3').style.display = 'inline-block';
        }
        answerButton.onclick = function(){
            backWardBtn.classList.remove('gray_dis');
            backWardBtn.disabled = false;
            nextBtn.classList.remove('gray_dis');
            nextBtn.disabled = false;
            const index = `index_${currentPageIndex}`;
            checkAnswers8(index);
        };
        // Функция для сброса теста
        function resetTest() {
            const dynamicContainer = document.getElementById('dynamic-content');
            if (dynamicContainer) {
                dynamicContainer.innerHTML = '';
            }
            restartButton.classList.remove('hidden');
            createTest(`index_${currentPageIndex}`);
            answerButton.classList.remove('hidden');
            restartButton.addEventListener('click', resetTest);
        }
        // Инициализация первого теста при загрузке страницы
        resetTest();
    } else {
        // Если данные ещё не загружены, ждем и проверяем снова
        setTimeout(waitForData, 50);
    }
}
waitForData();
