// Storage Controller
const StorageCtrl = (function() {
  // Public methods
  return {
    storeItem: function(item) {
      let items = [];
      if (localStorage.getItem("items") === null) {
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem("items"));
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    loadItemsFromStorage: function() {
      let items = [];
      if (localStorage.getItem("items") === null) {
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },
    removeItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem("items"));

      items = items.filter(item => item.id !== id);

      localStorage.setItem("items", JSON.stringify(items));
    },
    updateItemInStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem("items"));

      items = items.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      );

      localStorage.setItem("items", JSON.stringify(items));
    },
    clearItemsFromStorage: function() {
      let items = [];
      localStorage.setItem("items", JSON.stringify(items));
    }
  };
})();
// Item Controller
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: StorageCtrl.loadItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: function() {
      return data.items;
    },
    getItemById: function(id) {
      for (let item of data.items) {
        if (item.id === id) {
          return item;
        }
      }
      return null;
    },
    addItem: function(name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    clearCurrentItem: function() {
      data.currentItem = null;
    },
    deleteCurrentItem: function() {
      data.items = data.items.filter(item => item.id !== data.currentItem.id);
      return data.currentItem;
    },
    updateCurrentItem(input) {
      data.totalCalories =
        data.totalCalories + (input.calories - data.currentItem.calories);
      data.currentItem.name = input.name;
      data.currentItem.calories = input.calories;

      return {
        newItem: data.currentItem,
        totalCalories: data.totalCalories
      };
    },
    getTotalCalories: function() {
      data.totalCalories = data.items.reduce((a, b) => a + b.calories, 0);
      return data.totalCalories;
    },
    updateTotalCalories: function(calories) {
      data.totalCalories += calories;
      return data.totalCalories;
    },
    clearTotalCalories: function() {
      data.totalCalories = 0;
    },
    clearItems: function() {
      data.items = StorageCtrl.loadItemsFromStorage();
    },
    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    deleteBtn: ".delete-btn",
    editBtn: ".edit-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories"
  };

  // Public methods
  return {
    populateItemList: function(items) {
      let html = "";

      for (let item of items) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      }

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    addListItem: function(item) {
      UICtrl.showList();
      // Create li element
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;

      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

      // Insert into item list
      document.querySelector(UISelectors.itemList).appendChild(li);
    },
    updateCalories: function(calories) {
      document.querySelector(UISelectors.totalCalories).innerText = calories;
    },
    clearInputs: function() {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    AddItemToForm: function(item) {
      document.querySelector(UISelectors.itemNameInput).value = item.name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        item.calories;
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showList: function() {
      document.querySelector(UISelectors.itemList).style.display = "block";
    },
    clearList: function() {
      const ul = document.querySelector(UISelectors.itemList);
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
    },
    updateItemList: function(item) {
      const li = document.querySelector(`#item-${item.id}`);

      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
    },
    toggleEditMode: function() {
      const editBtn = document.querySelector(UISelectors.editBtn);
      const deleteBtn = document.querySelector(UISelectors.deleteBtn);
      const addBtn = document.querySelector(UISelectors.addBtn);
      const backBtn = document.querySelector(UISelectors.backBtn);
      const itemList = document.querySelector(UISelectors.itemList);

      editBtn.style.display =
        editBtn.style.display === "inline-block" ? "none" : "inline-block";
      deleteBtn.style.display =
        deleteBtn.style.display === "inline-block" ? "none" : "inline-block";
      addBtn.style.display =
        addBtn.style.display === "inline-block" ? "none" : "inline-block";
      backBtn.style.display =
        backBtn.style.display === "inline-block" ? "none" : "inline-block";
      itemList.style.pointerEvents =
        itemList.style.pointerEvents === "none" ? "auto" : "none";
    },
    hideEditMode: function() {
      document.querySelector(UISelectors.addBtn).style.display = "inline-block";
      document.querySelector(UISelectors.editBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
    },
    getSelectors: function() {
      return UISelectors;
    }
  };
})();

// App Controller
const App = (function(ItemCtrl, UICtrl, StorageCtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // hide edit buttons
    document.addEventListener("DOMContentLoaded", UICtrl.hideEditMode);

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Edit item event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    // Back event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", editModeBackClick);

    // Delete event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // Update item event
    document
      .querySelector(UISelectors.editBtn)
      .addEventListener("click", itemUpdateSubmit);

    // Clear all event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", itemClearAllSubmit);
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);
      // Update Calories
      UICtrl.updateCalories(ItemCtrl.updateTotalCalories(newItem.calories));

      // Store in local storage
      StorageCtrl.storeItem(newItem);
      // Clear Fields
      UICtrl.clearInputs();
    }

    e.preventDefault();
  };

  const itemEditClick = function(e) {
    if (e.target.classList.contains("edit-item")) {
      const id = parseInt(
        e.target.parentElement.parentElement.id.split("-")[1]
      );

      const itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrentItem(itemToEdit);
      UICtrl.toggleEditMode();
      UICtrl.AddItemToForm(itemToEdit);
    }
  };

  const editModeBackClick = function() {
    UICtrl.toggleEditMode();
    UICtrl.clearInputs();
    ItemCtrl.clearCurrentItem();
  };

  const itemDeleteSubmit = function() {
    const itemToDelete = ItemCtrl.deleteCurrentItem();
    StorageCtrl.removeItemFromStorage(itemToDelete.id);
    ItemCtrl.clearCurrentItem();

    const liToDelete = document.querySelector(`#item-${itemToDelete.id}`);
    liToDelete.remove();

    UICtrl.updateCalories(ItemCtrl.updateTotalCalories(-itemToDelete.calories));
    UICtrl.clearInputs();
    UICtrl.toggleEditMode();
  };

  const itemUpdateSubmit = function() {
    const input = UICtrl.getItemInput();

    // update item
    let { newItem, totalCalories } = ItemCtrl.updateCurrentItem(input);
    // Clear current item
    ItemCtrl.clearCurrentItem();

    StorageCtrl.updateItemInStorage(newItem);

    UICtrl.clearInputs();
    UICtrl.toggleEditMode();
    // update item list
    UICtrl.updateItemList(newItem);
    // update total calories
    UICtrl.updateCalories(totalCalories);
  };

  const itemClearAllSubmit = function() {
    StorageCtrl.clearItemsFromStorage();

    ItemCtrl.clearItems();
    ItemCtrl.clearTotalCalories();
    ItemCtrl.clearCurrentItem();

    UICtrl.updateCalories(0);
    UICtrl.clearInputs();
    UICtrl.clearList();
  };

  // Public methods
  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
        UICtrl.updateCalories(ItemCtrl.getTotalCalories());
      }

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl, StorageCtrl);

// Initialize App
App.init();
