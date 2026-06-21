const form = document.getElementById("resourceForm");
const tableBody = document.getElementById("tableBody");
const resetBtn = document.getElementById("resetBtn");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const sortAlphabetBtn = document.getElementById("sortAlphabetBtn");
const titleHeader = document.getElementById("titleHeader");
const authorHeader = document.getElementById("authorHeader");
const typeHeader = document.getElementById("typeHeader");
const ratingHeader = document.getElementById("ratingHeader");
const comm = document.getElementById("comm");
const submitBtn =form.querySelector('button[type="submit"]');

let resources = [];
let nextId = 1;
let editingId = null;
let sortDirections = {
  title: true,
  author: true,
  type: true,
  rating: true,
  comment: true
};

loadFromStorage();
if (resources.length > 0) {
    nextId = Math.max(...resources.map(resource => resource.id)) + 1;
}
renderTable();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const dto = readForm();

  if (!validate(dto)) {
    return;
  }

  const resource = {
    id: nextId++,
    title: dto.title,
    author: dto.author,
    type: dto.type,
    rating: dto.rating,
    comment: dto.comment
  };

  if (editingId !== null) {

  resources = resources.map(resource => {

    if (resource.id === editingId) {
      return {
        ...resource,
        ...dto
      };
    }

    return resource;
  });

  editingId = null;

} else {

  resources.push(resource);
}

saveToStorage();

renderTable();

form.reset();
submitBtn.textContent = "Додати";
document.getElementById("titleInput").focus();
});

resetBtn.addEventListener("click", () => {
  form.reset();
  clearErrors();
});

searchInput.addEventListener("input", () => {
  renderTable();
});

sortBtn.addEventListener("click", () => {

  resources.sort(
    (a, b) => b.rating - a.rating
  );

  renderTable();
});

sortAlphabetBtn.addEventListener("click", () => {

  resources.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  renderTable();
});
titleHeader.addEventListener("click", () => {
  resources.sort((a, b) =>
    sortDirections.title
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  sortDirections.title = !sortDirections.title;
  renderTable();
});

authorHeader.addEventListener("click", () => {
  resources.sort((a, b) =>
    sortDirections.author
      ? a.author.localeCompare(b.author)
      : b.author.localeCompare(a.author)
  );

  sortDirections.author = !sortDirections.author;
  renderTable();
});

typeHeader.addEventListener("click", () => {
  resources.sort((a, b) =>
    sortDirections.type
      ? a.type.localeCompare(b.type)
      : b.type.localeCompare(a.type)
  );

  sortDirections.type = !sortDirections.type;
  renderTable();
});
comm.addEventListener("click", () => {
  resources.sort((a, b) =>
    sortDirections.comment
      ? a.comment.localeCompare(b.comment)
      : b.comment.localeCompare(a.comment)
  );

  sortDirections.comment = !sortDirections.comment;
  renderTable();
});

ratingHeader.addEventListener("click", () => {
  resources.sort((a, b) =>
    sortDirections.rating
      ? b.rating - a.rating
      : a.rating - b.rating
  );

  sortDirections.rating = !sortDirections.rating;
  renderTable();
});


function readForm() {
  return {
    title: document.getElementById("titleInput").value.trim(),
    author: document.getElementById("authorInput").value.trim(),
    type: document.getElementById("typeSelect").value,
    rating: document.getElementById("ratingInput").value,
    comment: document.getElementById("commentInput").value.trim()
  };
}

function validate(dto) {

  clearErrors();

  let isValid = true;

  if (dto.title === "") {
    showError("titleInput", "titleError", "Введіть назву");
    isValid = false;
  }

  if (dto.author === "") {
    showError("authorInput", "authorError", "Введіть автора");
    isValid = false;
  }

  if (dto.type === "") {
    showError("typeSelect", "typeError", "Оберіть тип");
    isValid = false;
  }
  const exists = resources.some(resource =>
  resource.title.toLowerCase() ===
  dto.title.toLowerCase()
);

if (exists && editingId === null) {

  showError(
    "titleInput",
    "titleError",
    "Такий ресурс уже існує"
  );

  isValid = false;
}

  const rating = Number(dto.rating);

  if (
    dto.rating === "" ||
    Number.isNaN(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    showError(
      "ratingInput",
      "ratingError",
      "Рейтинг від 1 до 5"
    );

    isValid = false;
  }

  if (dto.comment.length < 5) {
    showError(
      "commentInput",
      "commentError",
      "Мінімум 5 символів"
    );

    isValid = false;
  }

  return isValid;
}

function renderTable() {

  const search =
  searchInput.value.toLowerCase();

const filteredResources =
  resources.filter(resource =>
    resource.title
      .toLowerCase()
      .includes(search)
  );

const rows = filteredResources.map((resource, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${resource.title}</td>
      <td>${resource.author}</td>
      <td>${resource.type}</td>
      <td>${resource.rating}</td>
      <td>${resource.comment}</td>
      <td>
        <button type="button" class="delete-btn" data-id="${resource.id}">
          Видалити
        </button>

         <button type="button" class="edit-btn" data-id="${resource.id}">
          Редагувати
        </button>
      </td>
    </tr>
`).join("");

  tableBody.innerHTML = rows;
}

tableBody.addEventListener("click", (event) => {

  const target = event.target;

  if (target.classList.contains("delete-btn")) {

    const id = Number(target.dataset.id);

    resources = resources.filter(
      resource => resource.id !== id
    );

    saveToStorage();
    renderTable();
  }

  if (target.classList.contains("edit-btn")) {

    const id = Number(target.dataset.id);

    const resource = resources.find(
      resource => resource.id === id
    );

    document.getElementById("titleInput").value =
      resource.title;

    document.getElementById("authorInput").value =
      resource.author;

    document.getElementById("typeSelect").value =
      resource.type;

    document.getElementById("ratingInput").value =
      resource.rating;

    document.getElementById("commentInput").value =
      resource.comment;

    editingId = id;
    submitBtn.textContent = "Редагувати";
  }
});

function saveToStorage() {
  localStorage.setItem(
    "resources",
    JSON.stringify(resources)
  );
}

function loadFromStorage() {
  const data = localStorage.getItem("resources");

  if (!data) {
    resources = [];
    return;
  }

  try {
    resources = JSON.parse(data);

    if (!Array.isArray(resources)) {
      resources = [];
    }
  } catch (error) {
    console.error("Помилка читання localStorage:", error);
    resources = [];
  }
}

function showError(inputId, errorId, message) {

  document
    .getElementById(inputId)
    .classList.add("invalid");

  document
    .getElementById(errorId)
    .textContent = message;
}

function clearError(inputId, errorId) {

  document
    .getElementById(inputId)
    .classList.remove("invalid");

  document
    .getElementById(errorId)
    .textContent = "";
}

function clearErrors() {

  clearError("titleInput", "titleError");
  clearError("authorInput", "authorError");
  clearError("typeSelect", "typeError");
  clearError("ratingInput", "ratingError");
  clearError("commentInput", "commentError");
}
