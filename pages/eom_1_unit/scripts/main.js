let titleUpper = document.querySelector('#upper_title');
let blackHeader  = document.querySelector('#header_text');
let miniHead  = document.querySelector('#title_of_eom_1');
let windowWidth  = window.innerWidth;
let originalTitle = title_of_eom;
let mainBody = document.getElementById('main_window_eom_one');
let backgroundColor = document.createElement('div');
let backgroundImage = document.createElement('div');
backgroundColor.classList = 'background_color';
mainBody.appendChild(backgroundColor);
backgroundImage.classList = 'background_image';
mainBody.appendChild(backgroundImage);
blackHeader.innerHTML = originalTitle;
var typeOfDrop = `<img width="100%" src="./content/background_${background_type}.jpg" alt="background">`;
backgroundImage.innerHTML = typeOfDrop;
function waitForData() {
    if (window.dataLoaded){
        miniHead.innerHTML = originalTitle;
    if (window.dataLoaded) {
        window.addEventListener('load',() => {
            let windowWidth  = window.innerWidth;
            if (windowWidth  <=  650){
                shortenTitle(blackHeader, 30);
            } else {
                restoreTitle(blackHeader, originalTitle);
            }
        });
        window.addEventListener('resize',() => {
            let windowWidth  = window.innerWidth;
            if (windowWidth  <=  650) {
                shortenTitle(blackHeader, 30);
            } else {
                restoreTitle(blackHeader, originalTitle);
            }
        });
        function restoreTitle(element, originalTitle) {
            element.innerText = originalTitle;  // Восстанавливаем оригинальный заголовок
        }
        restoreTitle(blackHeader, originalTitle);
        function shortenTitle(element, maxLength) {
            let title = element.innerHTML;  // Получаем заголовок элемента
            if (title.length > maxLength) {
                let shortenedTitle = title.substring(0, maxLength - 3) + '...';  // Обрезаем и добавляем многоточие
                element.innerHTML = shortenedTitle;  // Обновляем заголовок элемента
            }
        }
        function adjustContentWrapper() {
            const headerHeight = document.getElementById('header').offsetHeight;
            const contentWrapper = document.getElementById('contentWrapper');
            contentWrapper.style.paddingTop = headerHeight + 0 + 'px';
        }
        window.addEventListener('load', adjustContentWrapper);
        window.addEventListener('resize', adjustContentWrapper);
        const isMainWindow = document.getElementById('content');
        const contentWindow = document.createElement('div');
        contentWindow.classList.add('content__div');
        isMainWindow.appendChild(contentWindow);
        const contentWindowLeft = document.createElement('div');
        contentWindowLeft.classList.add('content__div_left');
        contentWindowLeft.innerHTML = `${methodRecomendation}`;
        contentWindow.appendChild(contentWindowLeft);
        const literaBtn = document.createElement('button');
        literaBtn.classList.add('content__litera_btn');
        literaBtn.id = 'content__litera_btn_1';
        literaBtn.innerHTML = 'Список использованной литературы';
        contentWindowLeft.appendChild(literaBtn);
        const contentWindowCenter = document.createElement('div');
        contentWindowCenter.classList.add('content__div_center');
        contentWindow.appendChild(contentWindowCenter);
        const contentWindowRight = document.createElement('div');
        contentWindowRight.classList.add('content__div_right');
        contentWindowRight.innerHTML = `<img src="./content/drop_logo_${dropType}.png" alt="drop_logo">`;
        contentWindow.appendChild(contentWindowRight);
        const themesNameArr = themesOfEOM1.split('\n');
        if (typeOfButtons === 'hexagon') {
            var numberOfColumns, numberOfRows;
            function changeRowsAndColumns() {
                if (window.innerWidth > 1175) {
                    if (themesNameArr.length === 12) {
                        numberOfColumns = 4;
                        numberOfRows = 3;
                    } else if (themesNameArr.length <= 9) {
                        numberOfColumns = 3;
                        numberOfRows = Math.ceil(themesNameArr.length / numberOfColumns);
                    } else if (themesNameArr.length <= 15) {
                        numberOfColumns = 5;
                        numberOfRows = 3;
                    } else if (themesNameArr.length <= 20) {
                        numberOfColumns = 5;
                        numberOfRows = 4;
                    } else {
                        numberOfColumns = 4;
                        numberOfRows = Math.ceil(themesNameArr.length / numberOfColumns);
                    }
                } else if (window.innerWidth > 720 && window.innerWidth <= 1175) {
                    numberOfColumns = 3;
                    numberOfRows = Math.ceil(themesNameArr.length / numberOfColumns);
                } else if (window.innerWidth > 565 && window.innerWidth <= 720) {
                    numberOfColumns = 2;
                    numberOfRows = Math.ceil(themesNameArr.length / numberOfColumns);
                } else if (window.innerWidth <= 565) {
                    numberOfColumns = 1;
                    numberOfRows = Math.ceil(themesNameArr.length / numberOfColumns);
                }
                createHexagons();
            }
            function createHexagons() {
                let elem = document.querySelector('.content__div_center');
                if (document.getElementById('content__litera_btn_1')) {
                    elem.innerHTML = '';
                    elem.classList.add('hexagon_center');
                }
                // Создаем сетку гексагонов
                for (let i = 0; i < numberOfColumns; i++) {
                    let columnsOfHexagon = document.createElement('div');
                    columnsOfHexagon.classList.add('columns__hexagon', 'col_' + i);
                    elem.appendChild(columnsOfHexagon);
                    for (let j = 0; j < numberOfRows; j++) {
                        let hexagonBtn = document.createElement('button');
                        hexagonBtn.classList.add('button__hexagon_type', 'themes_button');
                        columnsOfHexagon.appendChild(hexagonBtn);
                    }
                }
                let allHexagoneBtn = document.querySelectorAll('.button__hexagon_type');
                allHexagoneBtn.forEach(function(item, index) {
                    if (index < themesNameArr.length) {
                        item.innerHTML = (index + 1) + '. ' + themesNameArr[index];
                        item.onclick = function() {
                            updatePage(index);
                            let backgroundColorDiv = document.querySelector('.background_color');
                            backgroundColorDiv.classList.add('theme_page_color');
                            let mainContentDiv = document.querySelector('#content');
                            mainContentDiv.classList.add('theme_page_div');
                        };
                    } else {
                        item.classList.add('hidden_block');
                    }
                });
            }
            // Первичная инициализация сетки
            changeRowsAndColumns();
            document.addEventListener('DOMContentLoaded', () => {
                window.addEventListener('resize', () => {
                    changeRowsAndColumns();
                });
            });
        } else if (typeOfButtons === 'lightning') {
            contentWindowCenter.classList.add('lightning');
            let leftColumn = document.createElement('div');
            leftColumn.classList = 'left_column';
            contentWindowCenter.appendChild(leftColumn);
            let rightColumn = document.createElement('div');
            rightColumn.classList = 'right_column';
            contentWindowCenter.appendChild(rightColumn);
            // Подсчитываем количество элементов в массиве
            const totalThemes = themesNameArr.length;
            // Определяем количество элементов, которые должны попасть в левую колонку
            const leftColumnCount = Math.floor(totalThemes / 2);
            // Проходим по массиву и создаем кнопки
            themesNameArr.forEach((theme, index) => {
                // Создаем кнопку
                let button = document.createElement('button');
                button.classList = 'lightning_button themes_button';
                // Добавляем обработчик клика для кнопки
                button.innerHTML = `<p class="themes_lightning">${index + 1}. ${theme}</p>`;
                // Распределяем по колонкам
                if (index < leftColumnCount) {
                    leftColumn.appendChild(button);
                } else {
                    rightColumn.appendChild(button);
                }
            });
            // Если количество элементов нечетное, последний элемент добавляется в правую колонку
            if (totalThemes % 2 !== 0) {
                rightColumn.appendChild(rightColumn.removeChild(rightColumn.lastChild));
            }
            let lightningButton = document.querySelectorAll('.lightning_button');
            console.log(lightningButton.length)
            lightningButton.forEach((item) => {
                if (lightningButton.length <= 10) {
                    item.classList.add('big');
                } else if (lightningButton.length <= 15) {
                    item.classList.add('medium');
                } else if (lightningButton.length <= 20) {
                    item.classList.add('small');
                }
            });
        } else if (typeOfButtons === 'tiles') {
            const themesNameArr = themesOfEOM1.split('\n');
            let numberOfColumns, numberOfRows;
            function changeRowsAndColumns() {
                if (window.innerWidth > 1175) {
                    if (themesNameArr.length === 12) {
                        numberOfColumns = 3;
                        numberOfRows = 4;
                    } else if (themesNameArr.length <= 9) {
                        numberOfColumns = 4;
                        numberOfRows = Math.ceil(themesNameArr.length / numberOfColumns);
                    } else if (themesNameArr.length <= 15) {
                        numberOfColumns = 4;
                        numberOfRows = 4;
                    } else if (themesNameArr.length <= 20) {
                        numberOfColumns = 4;
                        numberOfRows = 5;
                    } else {
                        numberOfColumns = 4;
                        numberOfRows = Math.ceil(themesNameArr.length / numberOfColumns);
                    }
                } else if (window.innerWidth > 800 && window.innerWidth <= 1175) {
                    numberOfColumns = 3;
                    numberOfRows = Math.ceil(themesNameArr.length / numberOfColumns);
                } else if (window.innerWidth > 550 && window.innerWidth <= 800) {
                    numberOfColumns = 2;
                    numberOfRows = Math.ceil(themesNameArr.length / numberOfColumns);
                } else if (window.innerWidth <= 550) {
                    numberOfColumns = 1;
                    numberOfRows = Math.ceil(themesNameArr.length / numberOfColumns);
                }
                createTiles();
            }
            changeRowsAndColumns();
            // Обновление кнопок с темами
            function createTiles() {
                let elem = document.querySelector('.content__div_center');
                if (document.getElementById('content__litera_btn_1')) {
                    elem.innerHTML = '';
                    elem.classList.add('tiles');
                }
                let centralRowIndex = Math.ceil(numberOfRows / 1); // Переместите сюда
                if (themesNameArr.length >= 11) {
                    centralRowIndex = Math.floor(numberOfRows / 1);
                }
                let fragment = document.createDocumentFragment();
                for (let i = 0; i < numberOfRows; i++) {
                    let rowOfTiles = document.createElement('div');
                    rowOfTiles.classList.add('rows__tiles');
                    fragment.appendChild(rowOfTiles);
                    let buttonsInRow = (i === centralRowIndex) ? numberOfColumns + 2 : numberOfColumns;
                    for (let j = 0; j < buttonsInRow; j++) {
                        let tileBtn = document.createElement('button');
                        tileBtn.classList.add('button__tiles_type');
                        if (themesNameArr.length >= 15) {
                            tileBtn.classList.add('small_tile');
                            rowOfTiles.classList.add('small_tile_center');
                        }
                        tileBtn.classList.add('themes_button');
                        rowOfTiles.appendChild(tileBtn);
                    }
                }
                elem.appendChild(fragment);
                var allTilesBtn = document.querySelectorAll('.button__tiles_type');
                allTilesBtn.forEach(function(item, index) {
                    if (index < themesNameArr.length) {
                        item.innerHTML = (index + 1) + '. ' + themesNameArr[index];
                        item.onclick = function() {
                            updatePage(index);
                            let backgroundColorDiv = document.querySelector('.background_color');
                            backgroundColorDiv.classList.add('theme_page_color');
                            let mainContentDiv = document.querySelector('#content');
                            mainContentDiv.classList.add('theme_page_div');
                        };
                    } else {
                        item.classList.add('hidden_block');
                    }
                });
            }
            document.addEventListener('DOMContentLoaded', () => {
                window.addEventListener('resize', () => {
                    changeRowsAndColumns();
                });
            });
        } else if (typeOfButtons === 'video') {
            let videoTitle = document.createElement('div');
            videoTitle.classList = `video_title`
            videoTitle.innerHTML = `<h3 class="video_title_text">${videoTitle2}</h3>`;
            document.querySelector('#contentWrapper').appendChild(videoTitle);
            let contentDiv = document.querySelector('#content');
            contentDiv.innerHTML = '';
            contentDiv.classList.add('video_div');
            let videoDiv = document.createElement('div');
            videoDiv.classList = 'video_content';
            videoDiv.innerHTML = `<video id="video_content_0" src="${pathToVideo}" controls="controls" controlslist="nodownload" poster="./content/page_content/video_cover.png"></video>`;
            contentDiv.appendChild(videoDiv);
            document.querySelector('#contentWrapper').appendChild(literaBtn);
            literaBtn.id = 'content__litera_btn_2';
            let timingDiv = document.createElement('div');
            timingDiv.classList = 'video_timing';
            contentDiv.appendChild(timingDiv);
            let viewportHeight = window.innerHeight;
            let blackHeaderHeight = document.querySelector('#header').clientHeight;
            document.querySelector('#content').style.height = (viewportHeight - blackHeaderHeight*2 + 100) + 'px';
            let buttonsHTML = timings.map((item, index) => 
                `<button class="timing_buttons" value="${item.time}" id="timing0${index+1}">${item.name}</button>`
            ).join('');
            let timingStructure = 
            `<div class="timing_menu">
                <div class="timing_button">
                    <details id="timing_menu" open="">
                        <summary><img src="./content/logo_player.png" alt="Timing"></summary>
                        <div class="content_details">
                            ${buttonsHTML}
                        </div>
                    </details>
                </div>
            </div>`
            timingDiv.innerHTML = timingStructure;
            if(secondVideo){
                let videoTitle4 = document.createElement('div');
                videoTitle4.classList = `video_title second_video_title`
                videoTitle4.innerHTML = `<h3 class="video_title_text">${videoTitle5}</h3>`;
                document.querySelector('#contentWrapper').appendChild(videoTitle4);
                let contentDiv2 = document.createElement('div');
                contentDiv.id = '#content';
                contentDiv2.innerHTML = '';
                contentDiv2.classList.add('video_div');
                let videoDiv2 = document.createElement('div');
                videoDiv2.classList = 'video_content';
                videoDiv2.innerHTML = `<video id="video_content_1" src="${pathToVideo2}" controls="controls" controlslist="nodownload" poster="./content/page_content/video_cover.png"></video>`;
                contentDiv2.appendChild(videoDiv2);
                videoTitle4.appendChild(contentDiv2);
                let timingDiv2 = document.createElement('div');
                timingDiv2.classList = 'video_timing';
                contentDiv2.appendChild(timingDiv2);
                let buttonsHTML2 = timings2.map((item2, index2) => 
                    `<button class="timing_buttons_2" value="${item2.time2}" id="timing02${index2+1}">${item2.name2}</button>`
                ).join('');
                let timingStructure2 = 
                `<div class="timing_menu">
                    <div class="timing_button">
                        <details id="timing_menu" open="">
                            <summary><img src="./content/logo_player.png" alt="Timing"></summary>
                            <div class="content_details">
                                ${buttonsHTML2}
                            </div>
                        </details>
                    </div>
                </div>`
                timingDiv2.innerHTML = timingStructure2;
            }
        }
        let mainDivContent = document.querySelector('#contentWrapper');
        let popUpStructure = 
        `<div id="popup_litera_1" class="popup disabled">
                <div class="popup_body">
                    <div class="popup_content">
                        <div class="popup_header">
                            <h3>Список литературы</h3>
                            <button class="close_popup litera" onclick="document.querySelector('#popup_litera_1').classList.add('disabled')"><img src="./content/close.svg" alt="close"></button>
                        </div>
                    <div class="popup_text" id="popup_text_2">
                        <ol>
                            ${literaListEOM1.split('\n').map(item => `<li>${item}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            </div>
        </div>`;
        mainDivContent.innerHTML += popUpStructure;
        // if (typeOfButtons != 'video'){
        //     let literaBtnOn = document.querySelector('.content__litera_btn');
        //     literaBtnOn.onclick = function() {
        //         let popupWindow = document.querySelector('#popup_litera_1');
        //         popupWindow.classList.remove('disabled');
        //     };
        // }
        let literaBtnOn = document.querySelector('.content__litera_btn');
        literaBtnOn.onclick = function() {
            let popupWindow = document.querySelector('#popup_litera_1');
            popupWindow.classList.remove('disabled');
        };
        const video = document.querySelector('#video_content_0');
        const video2 = document.querySelector('#video_content_1');
        const timingButtons = document.querySelectorAll('.timing_buttons');
        timingButtons.forEach((item) => {
            item.onclick = () => {
                const offset = parseFloat(item.value); // Получаем значение тайминга из атрибута value кнопки
                const videoDuration = video.duration; // Получаем общую длину видео в секундах
                const newTime = videoDuration * (offset / 100); // Рассчитываем новое время видео
                video.pause(); // Останавливаем видео
                video.currentTime = newTime; // Устанавливаем новое время
            };
        });
        const timingButtons2 = document.querySelectorAll('.timing_buttons_2');
        timingButtons2.forEach((item) => {
            item.onclick = () => {
                const offset = parseFloat(item.value); // Получаем значение тайминга из атрибута value кнопки
                const videoDuration = video2.duration; // Получаем общую длину видео в секундах
                const newTime = videoDuration * (offset / 100); // Рассчитываем новое время видео
                video2.pause(); // Останавливаем видео
                video2.currentTime = newTime; // Устанавливаем новое время
            };
        });
    } else {
        // Если данные ещё не загружены, ждем и проверяем снова
        setTimeout(waitForData, location.reload(),  50);
    }
    function changeLightHeight(){
        if (window.innerWidth == 1650){
            const lightningElement = document.querySelector('.lightning');
            lightningElement.style.height = `${lightningElement.clientHeight * 1.2}px`;
        }
    }
    changeLightHeight();
    // Флаг, чтобы отслеживать, срабатывал ли обработчик
    window.addEventListener('resize', function(){
        if (window.innerWidth <= 565){
            var lightningHeight = document.querySelector('.lightning');
            lightningHeight.style.setProperty('height', 'initial', 'important'); // Устанавливаем важное свойство стиля
        }
        changeLightHeight();
    });
    window.addEventListener('resize', function(){
        if (typeOfButtons === 'video') { // Проверьте правильность переменной
            if (window.innerWidth <= 1100){
                let videoContentDiv = document.querySelector('.video_div');
                videoContentDiv.style.setProperty('height', 'initial', 'important'); // Устанавливаем важное свойство стиля
            }
        }
    });
    }
}
let toMenuBtn = document.querySelector('#backward_button');
toMenuBtn.onclick = () => {
    if (document.getElementById('content__litera_btn_1') || document.querySelector('#video_content_0')) {
        // Элемент с id 'content__litera_btn_1' или 'video_content_0' существует
        location.href='../../index.html';
    } else {
        // Элемент с id 'content__litera_btn_1' или 'video_content_0' не существует
        window.location.reload();
    }
    //
};
waitForData();
