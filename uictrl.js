export default class UICtrl {
  constructor() {
    this._UISelectors = {
      itemList: "#item-list",
      addBtn: ".add-btn"
    };
  }
  get UISelectors() {
    return this._UISelectors;
  }

  populateItemList(items) {
    let html = "";

    for (let item of items) {
      html += `<li class="collection-item" id="item-${item.id}">
      <strong>${item.name}: </strong> <em>${item.calories}</em>
      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
    </li>`;
    }

    document.querySelector(this.UISelectors.itemList).innerHTML = html;
  }
}
