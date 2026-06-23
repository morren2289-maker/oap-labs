import {
    Resource,
    ResourceDto
} from "./types";
export const API_BASE_URL = "http://localhost:3000/api/v1";
async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout = 10000
): Promise<Response> {

    const controller =
        new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {

        const response = await fetch(
            url,
            {
                ...options,
                signal: controller.signal
            }
        );

        clearTimeout(timeoutId);

        return response;

    } catch (error) {

        clearTimeout(timeoutId);

        if (
            error instanceof DOMException &&
            error.name === "AbortError"
        ) {
            throw new Error(
                "Час очікування минув. Перевірте сервер."
            );
        }

        throw error;
    }
}

 export async function getResources(
    retries = 3
): Promise<{ items: Resource[]; total: number }> {

    try {

        const response = await fetchWithTimeout(
            `${API_BASE_URL}/resources`
        );

        if (
            response.status === 429 ||
            response.status === 503
        ) {throw new Error("RETRY");}
        if (!response.ok) {
    let message = "Помилка завантаження";
    try {const error = await response.json();
        message = error.error.message;
    } catch {}
    throw new Error(message);}
        return await response.json();
    } catch (error) {

        if (
        error instanceof Error &&
        error.message === "RETRY" &&
        retries > 0
    ) {

            await delay(1000);

            return getResources(
                retries - 1
            );
        }

        throw error;
    }
}
function delay(ms: number): Promise<void> {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}
export async function createResource(
    dto: ResourceDto
): Promise<Resource> {

    const response = await fetchWithTimeout(
        `${API_BASE_URL}/resources`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dto)
        }
    );

    if (!response.ok) {

    let message = "Помилка сервера";

    try {
        const error = await response.json();
        message = error.error.message;
    } catch {}

    throw new Error(message);
}


    return await response.json();
   
}


export async function updateResource(
    id: number,
    dto: ResourceDto
): Promise<Resource> {

    const response = await fetchWithTimeout(
        `${API_BASE_URL}/resources/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dto)
        }
    );

    if (!response.ok) {

    let message = "Помилка сервера";

    try {
        const error = await response.json();
        message = error.error.message;
    } catch {}

    throw new Error(message);
}

    return await response.json();
}

export async function deleteResource(
    id: number
): Promise<void> {

    const response = await fetchWithTimeout(
        `${API_BASE_URL}/resources/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {

    let message = "Помилка сервера";

    try {
        const error = await response.json();
        message = error.error.message;
    } catch {}

    throw new Error(message);
}
}
