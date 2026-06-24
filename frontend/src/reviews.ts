import {
    Review,
    ReviewDto
} from "./types";

import {
    getReviews,
    createReview,
    updateReview,
    deleteReview
} from "./apiClient.js";

const form =
    document.querySelector("#reviewForm") as HTMLFormElement;

const body =
    document.querySelector("#reviewsBody") as HTMLTableSectionElement;

const resourceIdInput =
    document.getElementById(
        "resourceIdInput"
    ) as HTMLInputElement;

const userIdInput =
    document.getElementById(
        "userIdInput"
    ) as HTMLInputElement;

const textInput =
    document.getElementById(
        "textInput"
    ) as HTMLTextAreaElement;

const ratingInput =
    document.getElementById(
        "ratingInput"
    ) as HTMLInputElement;
    const params =
    new URLSearchParams(
        window.location.search
    );

const resourceId =
    params.get("resourceId");

if (resourceId) {
    resourceIdInput.value =
        resourceId;
}

let editingId: number | null = null;
let reviews: Review[] = [];


loadReviews();
async function loadReviews() {

    try {

        const response =
    await getReviews();

reviews = response.items;

renderReviews(reviews);

    } catch (error) {

        alert("Не вдалося завантажити відгуки");
    }
}
function renderReviews(
    reviews: Review[]
) {

    body.innerHTML = "";

    reviews.forEach(review => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${review.id}</td>
            <td>${review.resourceId}</td>
            <td>${review.userId}</td>
            <td>${review.text}</td>
            <td>${review.rating}</td>
            <td>
            <button
            data-id="${review.id}"
            class="editBtn">
            Редагувати
        </button>
                <button data-id="${review.id}"
                        class="deleteBtn">
                    Видалити
                </button>
            </td>
        `;

        body.appendChild(row);
    });

    
}
form.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        const dto: ReviewDto = {

            resourceId:
                Number(
                    resourceIdInput.value
                ),

            userId:
                Number(
                    userIdInput.value
                ),

            text:
                textInput.value.trim(),

            rating:
                Number(
                    ratingInput.value
                )
        };

        try {

            if (editingId !== null) {

    await updateReview(
        editingId,
        {
            text: dto.text,
            rating: dto.rating
        }
    );

    editingId = null;

} else {

    await createReview(dto);
}

            form.reset();

            userIdInput.value = "1";

            await loadReviews();

        } catch (error) {

            if (
                error instanceof Error
            ) {
                alert(error.message);
            }
        }
    }
);
body.addEventListener(
    "click",
    async event => {

        const target =
            event.target as HTMLElement;
            if (target.classList.contains("editBtn")) {

    const id =
        Number(target.dataset.id);

    const review =
        reviews.find(r => r.id === id);

    if (!review) {
        return;
    }

    editingId = id;

    resourceIdInput.value =
        review.resourceId.toString();

    userIdInput.value =
        review.userId.toString();

    textInput.value =
        review.text;

    ratingInput.value =
        review.rating.toString();

    return;
}

        if (
            target.classList.contains(
                "deleteBtn"
            )
        ) {

            const id =
                Number(
                    target.dataset.id
                );

            const confirmed =
                confirm(
                    "Видалити відгук?"
                );

            if (!confirmed) {
                return;
            }

            try {

                await deleteReview(id);

                await loadReviews();

            } catch (error) {

                if (
                    error instanceof Error
                ) {
                    alert(error.message);
                }
            }
        }
    }
);