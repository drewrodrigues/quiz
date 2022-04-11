export function createElement(
  elementType: string,
  attributes: object = {},
  children: any[] = []
) {
  const element = document.createElement(elementType);

  Object.entries(attributes).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (key.startsWith("data")) {
      element.dataset[key.slice(4).toLowerCase()] = value;
    } else {
      // @ts-ignore
      element[key] = value;
    }
  });

  children.forEach((child) => {
    if (child) {
      element.appendChild(child);
    }
  });

  return element;
}

export function render(rootQueryString: string, element: HTMLElement) {
  const root = document.querySelector(rootQueryString);
  // ! add error handling here
  root!.replaceChildren(element);
}
