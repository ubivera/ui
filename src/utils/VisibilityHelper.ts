export function ensureElementVisibility(
    element: HTMLElement,
    padding: number = 10
): void {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const computedStyle = getComputedStyle(element);

    const currentTop = parseFloat(computedStyle.top || '0');
    const currentLeft = parseFloat(computedStyle.left || '0');

    let adjustedTop = currentTop;
    let adjustedLeft = currentLeft;

    if (rect.top < padding) {
        adjustedTop += padding - rect.top;
    } else if (rect.bottom > window.innerHeight - padding) {
        adjustedTop -= rect.bottom - (window.innerHeight - padding);
    }

    if (rect.left < padding) {
        adjustedLeft += padding - rect.left;
    } else if (rect.right > window.innerWidth - padding) {
        adjustedLeft -= rect.right - (window.innerWidth - padding);
    }

    element.style.position = computedStyle.position === 'absolute' ? 'absolute' : 'fixed';
    element.style.top = `${adjustedTop}px`;
    element.style.left = `${adjustedLeft}px`;

    console.log('Adjusted Position:', { top: adjustedTop, left: adjustedLeft });
}