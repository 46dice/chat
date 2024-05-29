export function showElement(elem: HTMLElement) {
    if (elem) {
        elem.classList.remove('hide');
        elem.classList.add('show');
    }
}

export function hideElement(elem: HTMLElement) {
    if (elem) {
        elem.classList.remove('show');
        elem.classList.add('hide');
    }
}

export function openModal(modal: HTMLElement | null) {
    if (modal) {
        showElement(modal);
    }
}

export function closeModal(modal: HTMLElement | null) {
    if (modal) {
        hideElement(modal);
    }
}

export function scrollToMessage(count: number = 1) {
    const text = document.querySelectorAll('.window__message');
    const lastMessage = 1;

    if (count === lastMessage) {
        const last = text.length - count;
        text[last].scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });
    } else {
        text[count].scrollIntoView({
            block: 'start',
            behavior: 'auto',
        });
    }
}
