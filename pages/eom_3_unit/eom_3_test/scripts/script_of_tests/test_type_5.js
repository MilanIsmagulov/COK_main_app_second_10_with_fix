document.getElementById('control_button_3').style.display = 'none';
document.getElementById('control_button_2').style.display = 'inline-block';
if (blockButtonEOM2 === 1){
    backWardBtn.classList.add('gray_dis');
    backWardBtn.disabled = true;
    nextBtn.classList.add('gray_dis');
    nextBtn.disabled = true;
}
answerButton.classList.remove('gray_dis');
answerButton.disabled = false;
restartButton.classList.add('hidden');
restartButton.disabled = false;
var testObj = data[`index_${currentPageIndex}`].test; // 
var anwserArr2 = testObj.find(item => item.answers).answers; //Ответы в правильном порядке
var text2 = testObj.find(item => item.columns).columns; 
var bodyInner = document.createElement('div');
bodyInner.classList = 'body-inner';
contentDiv.appendChild(bodyInner);
var dragDiv = document.createElement('div');
dragDiv.classList = 'drag1';
bodyInner.appendChild(dragDiv);
var nubersDiv = document.createElement('div');
nubersDiv.classList = 'numbers';
dragDiv.appendChild(nubersDiv);
var list = document.createElement('div');
list.classList = 'list';
list.id = 'list';
dragDiv.appendChild(list);
var listItems = [];
var dragStartIndex;
createList2();
function createList2() {
    var iii = 0;
    [...anwserArr2]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        var div = document.createElement("div");
        div.setAttribute("class", "number");
        div.innerHTML = `${text2[index]}  <img class="markers_of_blue" src="./content/marker_blue.png" alt="1">`;
        document.getElementsByClassName("numbers")[0].appendChild(div);
        var listItem = document.createElement('div');
        listItem.setAttribute("id", `${index}`);
        listItem.classList = `item_dr_drag`;
        listItem.innerHTML = ` <div class="item_dr">${item} </div> `;
        listItems.push(listItem);
        list.appendChild(listItem);
        iii++;
    });
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
    var dragEndIndex = +this.getAttribute('id');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}
function swapItems(fromIndex, toIndex) {
    var itemOne = listItems[fromIndex].querySelector('.item_dr');
    var itemTwo = listItems[toIndex].querySelector('.item_dr');
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}
function checkAnwser6() {
    isCorrect = true;
    listItems.forEach((item, index) => {
        var itemName = item.querySelector('.item_dr').innerText.trim();
        if (itemName !== anwserArr2[index].join(',')) {
            item.classList.add('incorrect');
            isCorrect = false;
        } else {
            item.classList.remove('incorrect');
            item.classList.add('correct');
        }
        localStorage.setItem(`answer_from_index_${currentPageIndex}`, JSON.stringify({questionPlace: isCorrect}));
    });
}
answerButton.onclick = function() {
    backWardBtn.classList.remove('gray_dis');
    backWardBtn.disabled = false;
    nextBtn.classList.remove('gray_dis');
    nextBtn.disabled = false;
    checkAnwser6();
    answerButton.classList.add('hidden');
    restartButton.classList.remove('hidden');
    document.getElementById('control_button_2').style.display = 'none';
    document.getElementById('control_button_3').style.display = 'inline-block';
};
var draggDivForSort = document.querySelectorAll('.item_dr_drag');
var arr = Array.from(draggDivForSort);
for (i of arr){
	new Sortable(i, {
		swap: true,
	    group: 'shared4',
		animation: 150,
	});
}
