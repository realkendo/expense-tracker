//ensuring the window loads before we run the JavaScript
window.addEventListener("load", () => {
  //capuring elements on the web page and storing as variables
  const form = document.querySelector("#la-form");
  const itemName = document.querySelector(".item-name");
  const itemPrice = document.querySelector(".item-price");
  const expenseList = document.querySelector(".expense-list");
  const amount = document.querySelector(".amount");
  const priceArray = [];
  const itemArray = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValue = itemName.value;
    const priceValue = parseFloat(itemPrice.value);

    if (!nameValue && !priceValue) {
      alert("Input fields are empty!!!");
    } else if (typeof nameValue !== "string") {
      alert("Please input only text");
      // console.log(typeof nameValue !== "number");
    } else if (typeof priceValue !== "number") {
      alert("Please input a number");
      // console.log(typeof priceValue !== "number");
    } else if (!nameValue) {
      alert("Please input Item name!");
    } else if (!priceValue) {
      alert("Please input Item price!");
      return;
    } else {
      //incrementing the current id value
      // currentId++;
      // console.log(totalObject);

      const innerCard = document.createElement("div");
      innerCard.classList.add("inner-card");

      // creates a new input element - for item & price
      const item = document.createElement("input");
      const price = document.createElement("input");
      //creates a new button input elements - for edit & delete
      const editBtn = document.createElement("input");
      const deleteBtn = document.createElement("input");
      //create a horizontal rule element
      const hr = document.createElement("hr");

      //add a class to the input element
      item.classList.add("item");
      price.classList.add("price");
      editBtn.classList.add("edit-btn");
      deleteBtn.classList.add("delete-btn");

      // set attributes for the item input element
      item.type = "text";
      item.className = "item";
      item.value = nameValue;
      item.readOnly = true;
      //set attributes for the price input element
      price.type = "text";
      price.className = "price";
      price.value = `$ ${priceValue}`;
      price.readOnly = true;

      //set attributes for the button input elements
      editBtn.type = "button";
      deleteBtn.type = "button";
      editBtn.value = "\u270F";
      deleteBtn.value = "\uD83D\uDDD1";

      //append the new item element to the inner-card div
      innerCard.appendChild(item);
      innerCard.appendChild(price);
      innerCard.appendChild(editBtn);
      innerCard.appendChild(deleteBtn);

      //toaling function
      const totalFunction = () => {
        //adding all the values in the array with the reduce method
        let total = priceArray.reduce(
          (accumulatedValue, currentValue) => accumulatedValue + currentValue,
          0
        );

        //assigning total amount
        amount.readOnly = true;
        amount.value = `$ ${parseFloat(total.toFixed(2))}`;
      };

      const inputPrice = () => {
        //pushing to the array so we can calculate the total
        priceArray.push(Number(priceValue));
        console.log(priceArray);

        //pushing to the array for total items
        itemArray.push(nameValue);
        console.log(itemArray);
        totalFunction();
      };

      inputPrice();

      //append the elements to the expense-list div
      expenseList.appendChild(innerCard);
      expenseList.appendChild(hr);

      //function to clear the input fields
      const clearInput = () => {
        itemName.value = "";
        itemPrice.value = "";
      };

      clearInput();

      //edit and save entry function
      const editFunction = () => {
        editBtn.addEventListener("click", (e) => {
          e.preventDefault();

          if (editBtn.className === "edit-btn") {
            //console.log("class name for edit button is on edit mode");
            //change class and attributes
            price.removeAttribute("readonly");
            price.focus();
            item.removeAttribute("readonly");
            item.focus();
            editBtn.value = "SAVE";
            editBtn.className = "save-btn";

            //new edited value
            let priceFormat = price.value.split(" ");
            let newPriceValue = priceFormat[1];
            // console.log(parseFloat(newPriceValue));

            // console.log(priceValue);
            let oldValue = priceArray.indexOf(priceValue);
            priceArray[oldValue] = parseFloat(newPriceValue);
            // console.log(priceArray);
            // console.log(oldValue);

            totalFunction();
          } else {
            //if class name for edit button is on save mode
            let saveBtn = document.querySelector(".save-btn");
            //change class and attributes
            saveBtn.value = "\u270F";
            saveBtn.className = "edit-btn";
            price.readOnly = true;
            item.readOnly = true;

            //new edited value
            let priceFormat = price.value.split(" ");
            let newPriceValue = priceFormat[1];
            // console.log(parseFloat(newPriceValue));

            // updating the array
            let oldValue = priceArray.indexOf(priceValue);
            priceArray[oldValue] = parseFloat(newPriceValue);
            console.log(priceArray);

            totalFunction();
          }
        });
      };

      editFunction();

      //delete entry function
      const deleteFunction = () => {
        deleteBtn.addEventListener("click", (e) => {
          e.preventDefault();

          //removing the particular price from the javascript array
          let oldValue = priceArray.indexOf(priceValue);
          priceArray.splice(oldValue, 1);
          console.log(priceArray);

          //removing the particular item from the javascript array
          let oldItem = itemArray.indexOf(itemName);
          itemArray.splice(oldItem, 1);
          console.log(itemArray);
          console.log("index is : " + oldItem);

          totalFunction();

          //removing the html
          expenseList.removeChild(innerCard);
          expenseList.removeChild(hr);
        });
      };

      deleteFunction();
    }
  });
});
