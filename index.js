let addItems;
let itemsList;
let removeAllItems;
let checkAllItems;
let uncheckAllItems;
let items = JSON.parse(localStorage.getItem("items")) || [];
window.onload = function () {
  addItems = document.querySelector(".add-items");
  itemsList = document.querySelector(".plates");
  removeAllItems = document.querySelector(".btn-clear");
  checkAllItems=document.querySelector(".btn-check");
  uncheckAllItems=document.querySelector(".btn-uncheck");

  addItems.addEventListener("submit", addItem);
  populateList(items, itemsList);
  itemsList.addEventListener("click", toggleDone);
  removeAllItems.addEventListener("click", clearLocalStorage);
  checkAllItems.addEventListener("click",checkAll);
  uncheckAllItems.addEventListener("click",uncheckAll);
};
function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };
  this.reset(); //method available on form element
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
}
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
        <li>
        <input type="checkbox" data-index="${i}" id="item-${i}" ${
        plate.done ? "checked" : ""
      } />
           <label for="item-${i}"> ${plate.text}</label>
        </li>
        `;
    })
    .join(" ");
}
function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}
function clearLocalStorage() {
  localStorage.clear();
  items = [];
  populateList(items, itemsList);
}
function checkAll(){
  if(!items) return;
  items.map(item=>{
    item.done=true;
  });
  localStorage.setItem("items",JSON.stringify(items));
  populateList(items,itemsList);
}
function uncheckAll(){
  if(!items) return;
  items.map(item=>{
    item.done=false;
  });
  localStorage.setItem("items",JSON.stringify(items));
  populateList(items,itemsList);
}
