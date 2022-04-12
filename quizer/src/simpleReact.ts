// ? think about not running the function body until we first check props and attributes
// ? because technically, if these things don't change, then we don't have to re-run the body
// ? of the function. Because the body shouldn't be different unless the function is unpure.
// ? But, what about 'subscribing' to global state or state that's not passed as props?

// ? 🤔 It seems like although functional components are kinda 'stateless', they definitely have a stateful
// ? lifecycle with hooks

// ? if we call a function in another function body, can we append ourselves to the current context?
// ? for instance, in the body of a function call, useSideEffect(() => {}), and behind the scenes,
// ? when this function is called, it calls this.callbacks.push(callbackFn) or something of the sort
// ? this seems like it could create the escape hatch

// ? 3 considerations: function body (outside of escape hatches), escape hatches, returned element

// * in React, if a parent re-renders, then all children do unless it's a pure component. So, the body
// * of the function is called other than the escape hatches. Think about this for my implementation

// checkout my repl: https://replit.com/@rodandrew95/Escape-hatch#index.js
// it uses the context of the parent object calling it to tap into functions

class SimpleReactElement {
  simpleDomElement: HTMLElement;
  simpleAttributes: Record<any, any>; // * we keep track of this because otherwise we have to loop over all attributes each re-render
  simpleChildren: SimpleReactElement[];
  simpleParent: SimpleReactElement | undefined; // * this is populated once render is called -- but is not populated on the shadow dom
  simpleNodeName: string;

  constructor({
    simpleDomElement,
    simpleAttributes,
    simpleChildren,
    simpleParent,
  }: {
    simpleDomElement: HTMLElement;
    simpleAttributes: Record<any, any>;
    simpleChildren: SimpleReactElement[];
    simpleParent: SimpleReactElement | undefined;
  }) {
    this.simpleDomElement = simpleDomElement;
    this.simpleAttributes = simpleAttributes;
    this.simpleChildren = simpleChildren;
    this.simpleParent = simpleParent;
    this.simpleNodeName = this.simpleDomElement.nodeName;
  }

  // TODO: add function to do equality checks across simple react elements: element === element

  public updateAttributes(newAttributes: Record<any, any>) {
    const allKeys = Array.from(
      new Set([
        ...Object.keys(this.simpleAttributes),
        ...Object.keys(newAttributes),
      ])
    );

    for (const key of allKeys) {
      const oldValue = this.simpleAttributes[key];
      const newValue = newAttributes[key];
      const noChange = oldValue === newValue;
      const isEventHandler = key.startsWith("on");

      if (noChange || isEventHandler) {
        continue;
      } else if (key.startsWith("data")) {
        this.simpleDomElement.dataset[key.slice(4).toLowerCase()] = newValue;
      } else {
        // * will either be undefined or set it to a value
        this.simpleDomElement.setAttribute(key, newValue);
      }
    }

    this.simpleAttributes = newAttributes;
  }
}

export function createElement(
  elementType: string,
  attributes: Record<any, any> = {},
  children: SimpleReactElement[] = []
): SimpleReactElement {
  const domElement = document.createElement(elementType);

  Object.entries(attributes).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (key.startsWith("data")) {
      domElement.dataset[key.slice(4).toLowerCase()] = value;
    } else {
      // @ts-ignore
      domElement[key] = value;
    }
  });

  children.forEach((child) => {
    if (child) {
      domElement.appendChild(child.simpleDomElement);
    }
  });

  return new SimpleReactElement({
    simpleDomElement: domElement,
    simpleAttributes: attributes,
    simpleChildren: children,
    simpleParent: undefined,
  });
}

export class SimpleReact {
  static currentDom: SimpleReactElement;
  static root: Element;
  static rootElementFunction: () => SimpleReactElement;
  // * seems like a cool idea
  // static history: SimpleReactElement[];

  // * intially place nodes on the dom
  static render(rootQueryString: string, element: () => SimpleReactElement) {
    this.currentDom = this.addParentsOfElements(element());
    this.rootElementFunction = element;

    const root = document.querySelector(rootQueryString);
    this.root = root!;
    this.root.replaceChildren(this.currentDom.simpleDomElement);
  }

  static reRender() {
    const oldShadowRoot = this.currentDom;
    console.log({ oldShadowRoot });
    const newShadowRoot = this.rootElementFunction();
    console.log({ newShadowRoot });

    this._reRender(oldShadowRoot, newShadowRoot);
  }

  // BSF to set parents of all elements
  private static addParentsOfElements(rootElement: SimpleReactElement) {
    let root: SimpleReactElement | null = null;
    let elements: SimpleReactElement[] = [rootElement];

    while (elements.length) {
      root = elements.pop();

      // * set parents
      for (const element of root.simpleChildren) {
        element.simpleParent = root;
      }

      if (root.simpleChildren.length) {
        elements.push(...root.simpleChildren);
      }
    }

    return rootElement;
  }

  // * BFS: if a node is not there on oldShadow but is on the newShadow dom,
  // * we'll then update it
  private static _reRender(
    oldShadowDom: SimpleReactElement,
    newShadowDom: SimpleReactElement
  ) {
    let root: SimpleReactElement | null = null;
    let elements: SimpleReactElement[] = [oldShadowDom];

    let shadowRoot: SimpleReactElement | null = null;
    let shadowElements: SimpleReactElement[] = [newShadowDom];

    while (elements.length || shadowElements.length) {
      root = elements.pop(); // O(1) | unshift would be O(n)
      shadowRoot = shadowElements.pop();

      // TODO: implement this on the simple node class itself
      // ! element has changed if it's children are different or attributes/type are different
      // ? hmm think about this one. We shouldn't have to check the child...
      // ? maybe implement this on the simple node class, where we check the node & the children shallowly
      // ? against the attributes
      const hasElementChanged =
        root.simpleNodeName !== shadowRoot.simpleNodeName;
      if (hasElementChanged) {
        console.log("Element has changed. Replace it");
      } else {
        // ! this is incorrect, they might be different nodes (check for this first)
        root.updateAttributes(shadowRoot.simpleAttributes);
      }

      if (root.simpleChildren.length) {
        elements.push(...root.simpleChildren); // O(1) amortized
        shadowElements.push(...shadowRoot.simpleChildren);
      }
    }
  }
}
