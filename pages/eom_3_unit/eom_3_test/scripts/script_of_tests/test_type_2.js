// Access answers array from the data object
document.getElementById('control_button_3').style.display = 'none';
document.getElementById('control_button_2').style.display = 'inline-block';
if (blockButtonEOM2 === 1){
    backWardBtn.classList.add('gray_dis');
    backWardBtn.disabled = true;
    nextBtn.classList.add('gray_dis');
    nextBtn.disabled = true;
}
var testObj = data[`index_${currentPageIndex}`].test;
var anwserArr = testObj.find(item => item.answers).answers;
var imageObj = testObj.find(item => item.image !== undefined);
answerButton.classList.remove('gray_dis');
answerButton.disabled = false;
restartButton.classList.add('hidden');
restartButton.disabled = false;
var dynamicContainer = document.createElement('div');
dynamicContainer.className = 'dynamic-content';
var dragObj = document.createElement('div');
dragObj.className = 'numbers';
var mainWrapper = document.createElement('div');
mainWrapper.classList.add('main_wrapper');
// Check if an image should be displayed
if (imageObj && imageObj.image) {
    let imgElement;
    if (imageObj.image_path.includes(".jpg") || imageObj.image_path.includes(".png")) {
        imgElement = document.createElement('img');
    } else if (imageObj.image_path.includes(".mp4")) {
        imgElement = document.createElement('video');
        imgElement.controls = "controls";
    }
    // var imgElement = document.createElement('img');
    imgElement.src = imageObj.image_path
    imgElement.alt = 'Test Image';
    imgElement.className = 'test-image';
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
var dragStartIndex;
init();
function init() {
    localStorage.getItem('data_for_list') ? loadList() : createList();
}
function createList() {
    [...anwserArr]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        const listItem = document.createElement('li');
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
    for (i in listItems) {
        storeItems.push(i);
    }
    localStorage.setItem('data_for_list', JSON.stringify(storeItems));
}
function loadList() {
    fromStore();
    [...storeItems]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        const listItem = document.createElement('li');
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
    .forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.draggable = true;
        listItem.setAttribute('id', index);
        listItem.innerHTML = `<span class="number">${index + 1}</span><div class="item" draggable="true">${item}</div>`;
        listItems.push(listItem);
        list.appendChild(listItem);
    });
}
function toStore() {
    localStorage.setItem('data_for_list', JSON.stringify(storeItems));
}
function fromStore() {
    storeItems = JSON.parse(localStorage.getItem('data_for_list'));
}
function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('id');
}
function dragEnter() {
    this.classList.add('over');
}
function dragLeave() {
    this.classList.remove('over');
}
function dragOver(e) {
    e.preventDefault();
}
function dragDrop() {
    const dragEndIndex = +this.getAttribute('id');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.item');
    const itemTwo = listItems[toIndex].querySelector('.item');
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
    storeItems = [];
    for (i of listItems) {
        storeItems.push(i.children[1].innerText);
    }
    localStorage.setItem('data_for_list', JSON.stringify(storeItems));
}
function checkAnwser() {
    let isCorrect = true;
    listItems = document.getElementsByClassName("list");
    for (let i = 0; i < listItems[0].children.length; i++) {
        const itemText = listItems[0].children[i].getElementsByTagName('div')[0].innerText;
        if (itemText !== anwserArr[i]) {
            isCorrect = false;
            listItems[0].children[i].classList.add('incorrect');
            listItems[0].children[i].classList.remove('correct');
        } else {
            listItems[0].children[i].classList.add('correct');
            listItems[0].children[i].classList.remove('incorrect');
        }
    }
    answerButton.classList.add('hidden');
    restartButton.classList.remove('hidden');
    localStorage.setItem('answer_form_' + `index_${currentPageIndex}`, JSON.stringify({questionPlace: isCorrect}));
}
answerButton.onclick = function() {
    backWardBtn.classList.remove('gray_dis');
    backWardBtn.disabled = false;
    nextBtn.classList.remove('gray_dis');
    nextBtn.disabled = false;
    checkAnwser();
    answerButton.classList.add('hidden');
    restartButton.classList.remove('hidden');
    document.getElementById('control_button_2').style.display = 'none';
    document.getElementById('control_button_3').style.display = 'inline-block';
}
var el = document.getElementById('list');
var sortable = new Sortable(el, {
    swap: true,
    swapClass: "highlight",
    animation: 150,
});
