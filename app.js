import ItemCtrl from "./itemctrl.js";
import UICtrl from "./uictrl.js";

class App {
  constructor(ItemCtrl, UICtrl) {
    this.ItemCtrl = ItemCtrl;
    this.UICtrl = UICtrl;
  }

  _loadEventListeners() {
    const UISelectors = this.UICtrl.UISelectors;

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", this._itemAddSubmit);
  }

  _itemAddSubmit(e) {
    console.log("Add");
    e.preventDefault();
  }

  init() {
    this._loadEventListeners();
    const items = this.ItemCtrl.getItems();
    this.UICtrl.populateItemList(items);
  }
}

let itemCtrl = new ItemCtrl();
let uiCtrl = new UICtrl();
let app = new App(itemCtrl, uiCtrl);

app.init();
