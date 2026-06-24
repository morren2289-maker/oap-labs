import {
    Resource,
    ResourceDto,
    
} from "./types.js";
import {
    getResources,
    createResource,
    updateResource,
    deleteResource
} from "./apiClient.js";
const form = document.getElementById( "resourceForm") as HTMLFormElement;
const tableBody = document.getElementById("tableBody") as HTMLElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const sortBtn =document.getElementById("sortBtn") as HTMLButtonElement;
const sortAlphabetBtn = document.getElementById("sortAlphabetBtn") as HTMLButtonElement;
const titleHeader = document.getElementById("titleHeader") as HTMLTableCellElement;
const authorHeader = document.getElementById("authorHeader") as HTMLTableCellElement;
const typeHeader = document.getElementById("typeHeader") as HTMLTableCellElement;
const ratingHeader = document.getElementById("ratingHeader") as HTMLTableCellElement;
const comm = document.getElementById("comm") as HTMLTableCellElement;
const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
const cancelBtn = document.getElementById("cancelBtn") as HTMLButtonElement;


let resources: Resource[] = [];
let cache: Resource[] | null = null;
let editingId: number | null = null;
let sortDirections: {
    title: boolean;
    author: boolean;
    type: boolean;
    rating: boolean;
    comment: boolean;
} = {
    title: true,
    author: true,
    type: true,
    rating: true,
    comment: true
};
loadResources();
form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const dto = readForm();

  if (!validate(dto)) {
    return;
  }

  try {

    if (editingId !== null) {

      await updateResource(
        editingId,
        dto
      );

      editingId = null;

    } else {

      await createResource(dto);
    }

    cache = null;
await loadResources(true);

    form.reset();

    submitBtn.textContent = "Додати";
    cancelBtn.style.display = "none";

    (
    document.getElementById("titleInput") as HTMLInputElement).focus();

  } catch (error) {
    if (error instanceof Error) {
        alert(error.message);
    }
}
});
resetBtn.addEventListener("click", () => {
  form.reset();
  clearErrors();
});

cancelBtn.addEventListener("click", () => {

    form.reset();

    clearErrors();

    editingId = null;

    submitBtn.textContent = "Додати";
    cancelBtn.style.display = "none";

    (document.getElementById("titleInput") as HTMLInputElement).focus();
        
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

function readForm(): ResourceDto {
  return {
    title: (document.getElementById("titleInput") as HTMLInputElement).value.trim(),
    author: (document.getElementById("authorInput") as HTMLInputElement).value.trim(),
    type: (document.getElementById("typeSelect") as HTMLInputElement).value,
    rating: Number(
  (document.getElementById("ratingInput") as HTMLInputElement).value),
    comment: (document.getElementById("commentInput") as HTMLInputElement).value.trim()
  };
}

function validate(dto: ResourceDto): boolean {

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
    dto.title.toLowerCase() &&
    resource.id !== editingId
);

if (exists) {

  showError(
    "titleInput",
    "titleError",
    "Такий ресурс уже існує"
  );

  isValid = false;
}

  const rating = Number(dto.rating);

  if (
    
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

async function loadResources(force = false) {
if (cache && !force) {
        resources = cache;
        renderTable();
        return;
    }
    tableBody.innerHTML =
        `<tr>
            <td colspan="7">
                Завантаження...
            </td>
        </tr>`;

    try {
      

        const data = await getResources();

resources = data.items;
cache = [...resources];

if (resources.length === 0) {

            tableBody.innerHTML =
                `<tr>
                    <td colspan="7">
                        Немає даних
                    </td>
                </tr>`;

            return;
        }

        renderTable();

    } catch (error) {

    if (error instanceof Error) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    ${error.message}
                </td>
            </tr>`;
    }
}
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
      <button
    type="button"
    class="reviewsBtn"
    data-id="${resource.id}">
    Відгуки
</button>
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

tableBody.addEventListener(
  "click",
  async (event) => {

    const target =
      event.target as HTMLElement;

    // Перехід на сторінку відгуків
    if (
      target.classList.contains(
        "reviewsBtn"
      )
    ) {

      const id =
        Number(target.dataset.id);

      window.location.href =
        `reviews.html?resourceId=${id}`;

      return;
    }

    // Видалення ресурсу
    if (
      target.classList.contains(
        "delete-btn"
      )
    ) {

      const id =
        Number(target.dataset.id);

      const confirmed =
        confirm(
          "Видалити ресурс?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await deleteResource(id);

        cache = null;

        await loadResources(true);

      } catch (error) {

        if (
          error instanceof Error
        ) {
          alert(error.message);
        }
      }

      return;
    }

    // Редагування ресурсу
    if (
      target.classList.contains(
        "edit-btn"
      )
    ) {

      const id =
        Number(target.dataset.id);

      const resource =
        resources.find(
          resource => resource.id === id
        );

      if (!resource) {
        return;
      }

      (
        document.getElementById(
          "titleInput"
        ) as HTMLInputElement
      ).value = resource.title;

      (
        document.getElementById(
          "authorInput"
        ) as HTMLInputElement
      ).value = resource.author;

      (
        document.getElementById(
          "typeSelect"
        ) as HTMLSelectElement
      ).value = resource.type;

      (
        document.getElementById(
          "ratingInput"
        ) as HTMLInputElement
      ).value = String(
        resource.rating
      );

      (
        document.getElementById(
          "commentInput"
        ) as HTMLInputElement
      ).value = resource.comment;

      editingId = id;

      submitBtn.textContent =
        "Редагувати";

      cancelBtn.style.display =
        "inline-block";
    }
  }
);





function showError(
  inputId: string,
  errorId: string,
  message: string
): void {

   document
    .getElementById(inputId)!
    .classList.add("invalid");

  document
    .getElementById(errorId)!
    .textContent = message;
}

function clearError(
  inputId: string,
  errorId: string
): void {

  document
    .getElementById(inputId)!
    .classList.remove("invalid");

  document
    .getElementById(errorId)!
    .textContent = "";
}

function clearErrors() {

  clearError("titleInput", "titleError");
  clearError("authorInput", "authorError");
  clearError("typeSelect", "typeError");
  clearError("ratingInput", "ratingError");
  clearError("commentInput", "commentError");
}
