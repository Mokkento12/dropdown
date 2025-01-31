// Полифилл для метода forEach для NodeList
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

document.querySelectorAll(".dropdown").forEach((dropDownWrapper) => {
  const dropDownButton = dropDownWrapper.querySelector(".dropdown__button");
  const dropDownList = dropDownWrapper.querySelector(".dropdown__list");
  const dropDownListItems = dropDownList.querySelectorAll(
    ".dropdown__list-item"
  );
  const dropDownIntput = dropDownWrapper.querySelector(
    ".dropdown__input-hidden"
  );

  // Клик по кнопке. Открыть/закрыть дропдаун
  dropDownButton.addEventListener("click", function () {
    dropDownList.classList.toggle("dropdown__list--visible");
    this.classList.toggle("dropdown__button--active"); // Исправлено add -> toggle
  });

  // Выбор элемента списка
  dropDownListItems.forEach(function (listItem) {
    listItem.addEventListener("click", function (e) {
      e.stopPropagation();
      dropDownButton.innerText = this.innerText;
      dropDownButton.focus();
      dropDownIntput.value = this.dataset.value;

      dropDownList.classList.remove("dropdown__list--visible");
      dropDownButton.classList.remove("dropdown__button--active"); // Закрываем активное состояние кнопки
    });
  });

  // Клик снаружи дропдауна. Закрыть дропдаун
  document.addEventListener("click", function (e) {
    if (
      !dropDownButton.contains(e.target) &&
      !dropDownList.contains(e.target)
    ) {
      dropDownButton.classList.remove("dropdown__button--active");
      dropDownList.classList.remove("dropdown__list--visible");
    }
  });

  // Нажатие на Tab или Esc. Закрыть дропдаун
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" || e.key === "Escape") {
      dropDownButton.classList.remove("dropdown__button--active");
      dropDownList.classList.remove("dropdown__list--visible");
    }
  });
});
