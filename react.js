/* React way
const element = <h1 title="foo">Hello</h1>
const container = document.getElementById("root")
ReactDOM.render(element, container)
 */

// React.createElement() -> takes arguments, validates them and builds an element by the variables given in an object -> elements are objects
//rebuild without using react

/** @jsx Didact.createElement */
const element = {
    type: "h1",
    props: {
        title: 'Test',
        children: [
            createTextElement('Hello Test') 
        ]
    }
}
const container = document.getElementById("root")

const Didact = {
    createElement,
    render,
}


function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === "object"
                    ? child
                    : createTextElement(child)
            ),
        },
    }
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        }
    }
}

function render(element, container) {
    const dom = element.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type)

    const isProperty = key => key !== "children"
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        })


    container.appendChild(dom)
    element.props.children.forEach(child =>
        render(child, dom),


    );

}

Didact.render(element, container)
