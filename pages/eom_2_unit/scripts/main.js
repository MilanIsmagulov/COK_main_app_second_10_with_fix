let stepMarkerPlace = document.querySelector('.step_marker');
let backButton  = document.querySelector('#control_button_1');
let ansverButton  = document.querySelector('#control_button_2');
let reloadButton  = document.querySelector('#control_button_3');
let forwardButton  = document.querySelector('#control_button_4');
let titleUpper = document.querySelector('#upper_title');
let blackHeader  = document.querySelector('#header_text');
let numberOfQuestion = 1;
let numberOfQuestionSum = Object.keys(data).length;
let windowWidth  = window.innerWidth;
let originalTitle = title_of_eom;
for (let i = 0; i < numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button_blue.svg";
    markers.classList.add('radio_button_blue');
    stepMarkerPlace.appendChild(markers);
}
for (let i = 0; i < numberOfQuestionSum-numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button.svg";
    markers.classList.add('radio_button_gray');
    stepMarkerPlace.appendChild(markers);
}
function waitForData() {
    if (window.dataLoaded) {
        window.addEventListener('load',(e) => {
            let windowWidth  = window.innerWidth;
            if (windowWidth  <=  1200)  {
                forwardButton.innerHTML  =  '<img src="./content/arrow_forward.svg" alt=">">';
                backButton.innerHTML  =  '<img src="./content/arrow_back.svg" alt="<">';
            } else {
                backButton.textContent  =  'Назад';
                forwardButton.textContent  =  'Далее';
            }
        });
        window.addEventListener('resize',(e) => {
            let windowWidth  = window.innerWidth;
            if (windowWidth  <=  1200)  {
                forwardButton.innerHTML  =  '<img src="./content/arrow_forward.svg" alt=">">';
                backButton.innerHTML  =  '<img src="./content/arrow_back.svg" alt="<">';
            } else {
                backButton.textContent  =  'Назад';
                forwardButton.textContent  =  'Далее';
            }
        });
        window.addEventListener('load',(e) => {
            let windowWidth  = window.innerWidth;
            if (windowWidth  <=  650)  {
                shortenTitle(blackHeader, 30);  // Сокращаем заголовок до 20 символов
                ansverButton.innerHTML  =  '<img src="./content/check_circle.svg" alt=">">';
                reloadButton.innerHTML  =  '<img src="./content/refresh.svg" alt="<">';
            } else {
                restoreTitle(blackHeader, originalTitle);
                ansverButton.textContent  =  'Ответить';
                reloadButton.textContent  =  'Повторить';
            }
        });
        window.addEventListener('resize',(e) => {
            let windowWidth  = window.innerWidth;
            if (windowWidth  <=  650)  {
                shortenTitle(blackHeader, 30);  // Сокращаем заголовок до 20 символов
                ansverButton.innerHTML  =  '<img src="./content/check_circle.svg" alt=">">';
                reloadButton.innerHTML  =  '<img src="./content/refresh.svg" alt="<">';
            } else {
                restoreTitle(blackHeader, originalTitle);
                ansverButton.textContent  =  'Ответить';
                reloadButton.textContent  =  'Повторить';
            }
        });
        function restoreTitle(element, originalTitle) {
            element.innerText = originalTitle;  // Восстанавливаем оригинальный заголовок
        }
        function shortenTitle(element, maxLength) {
            let title = element.innerHTML;  // Получаем заголовок элемента
            if (title.length > maxLength) {
                let shortenedTitle = title.substring(0, maxLength - 3) + '...';  // Обрезаем и добавляем многоточие
                element.innerHTML = shortenedTitle;  // Обновляем заголовок элемента
            }
        }
        async function waitTitle(){
            try{
                await title_of_eom;
                titleUpper.innerHTML = title_of_eom;
                blackHeader.innerHTML = title_of_eom;
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }
        function adjustContentWrapper() {
            const headerHeight = document.getElementById('header').offsetHeight;
            const footerHeight = document.getElementById('footer').offsetHeight;
            const contentWrapper = document.getElementById('contentWrapper');
            contentWrapper.style.paddingTop = headerHeight + 25 + 'px';
            contentWrapper.style.paddingBottom = footerHeight + 50 + 'px';
        }
        window.addEventListener('load', adjustContentWrapper);
        window.addEventListener('resize', adjustContentWrapper);
        waitTitle();
    } else {
        // Если данные ещё не загружены, ждем и проверяем снова
        setTimeout(waitForData, 50);
    }
}
waitForData();