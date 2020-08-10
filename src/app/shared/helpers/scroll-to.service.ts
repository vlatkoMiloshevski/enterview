export const scrollToService = (elementToScrollToId: string, offset: number = -10): void => {
    const scrollElement = document.querySelector(`[scroll-id=${elementToScrollToId}]`);
    if (scrollElement && scrollElement.getBoundingClientRect() && typeof scrollElement.getBoundingClientRect().top === 'number') {
        const yCoordinate = scrollElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: yCoordinate + offset,
            behavior: 'smooth',
        });
    } else {
        window.scrollTo({
            top: offset,
            behavior: 'smooth',
        });
    }
};
