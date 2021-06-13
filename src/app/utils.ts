export function stopEventPropagation(event: MouseEvent) {
  event.stopPropagation();
  event.preventDefault();
}
