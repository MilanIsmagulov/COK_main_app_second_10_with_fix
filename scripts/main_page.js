const fgosPlc = document.querySelector('#fgos_number');
const fgosTxtPlc = document.querySelector('#fgos_text_place');
const mdkPlc = document.querySelector('#mdk_number');
const mdkTxtPlc = document.querySelector('#mdk_text_place');
const titlePlc = document.querySelector('#title_text_place');
const mainContentName = document.querySelector('.main_content_name');
const popupContentInfo = document.querySelectorAll('.popup_tex_content');
const popupKeyWords = document.querySelector('#popup_text_2');
fgosPlc.innerHTML = numFgos
fgosTxtPlc.innerHTML = numFgosTxt
mdkPlc.innerHTML = numMDK
mdkTxtPlc.innerHTML = numMDKTxt
mainContentName.innerHTML = themeOfDEC
titlePlc.innerHTML = themeOfDEC
const popupMethodsWindow = document.querySelectorAll('.methods');
// Проходим по каждому окну и добавляем соответствующий текст
popupMethodsWindow.forEach((popup, index) => {
    let popUpTextArr = textOfMethodMaterials[index].split('\n');
    let popUpElemUl = document.createElement('ul');
    popUpElemUl.classList.add('popup_method_list');
    popUpTextArr.forEach(item => {
        let popUpElemLi = document.createElement('li');
        popUpElemLi.innerHTML = item.trim(); // убираем лишние пробелы в строках
        popUpElemUl.appendChild(popUpElemLi);
    });
    popup.appendChild(popUpElemUl);
});
let infoPopUpPlc = document.querySelectorAll('.popup_tex_content');
let infoContentText = infoContent.split('\n');
infoContentText.forEach(function(item, index){
    if(infoPopUpPlc[index]) { // Проверяем, существует ли элемент с данным индексом
        infoPopUpPlc[index].innerHTML = item.trim(); // Удаляем лишние пробелы и записываем текст
    }
});
let popUpKeyWordsArr = keyWords.split('\n');
// Разделяем массив на четные и нечетные индексы
let a = popUpKeyWordsArr.filter((_, index) => index % 2 === 0);
let b = popUpKeyWordsArr.filter((_, index) => index % 2 !== 0);
// Проходим по самому длинному массиву
let maxLength = Math.max(a.length, b.length);
for (let i = 0; i < maxLength; i++) {
    let paragraph = document.createElement('p');
    // Получаем элементы с проверкой на undefined
    let aElement = a[i] !== undefined ? `<span>${a[i]}</span><br>` : '';
    let bElement = b[i] !== undefined ? b[i] : '';
    // Заполняем абзац
    paragraph.innerHTML = `${aElement} ${bElement}`;
    // Добавляем классы
    paragraph.classList.add('popup_tex_content', 'key_word_text');
    // Добавляем абзац в контейнер
    popupKeyWords.appendChild(paragraph);
};
let eom3ref = document.querySelector('#eom_3_ref');
if (typeOfEOM3 == 1) {
    document.querySelector('#card_eom_3').textContent = 'Интерактивный тренажер по выполнению заданий';
    localStorage.clear();
    eom3ref.href = `./pages/eom_3_unit/eom_3_test/index.html`;
} else {
    document.querySelector('#card_eom_3').textContent = 'Интерактивная мини-игра';
    localStorage.clear();
    eom3ref.href = `./pages/eom_3_unit/eom_3_mini_game/index.html`;
}
if (typeOfEOM1 == 1) {
    document.querySelector('#card_eom_1').textContent = 'Видеолекция';
} else {
    document.querySelector('#card_eom_1').textContent = 'Динамическая инфографика';
}
