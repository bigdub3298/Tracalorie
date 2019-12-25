class Item {
  constructor(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
}

export default class ItemCtrl {
  constructor() {
    this.data = {
      items: [
        { id: 0, name: "Steak Dinner", calories: 1200 },
        { id: 1, name: "Pizza", calories: 700 }
      ],
      currentItem: null,
      totalCalories: 0
    };
  }

  getItems() {
    return this.data.items;
  }
}
