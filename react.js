/* React way
const element = <h1 title="foo">Hello</h1>
const container = document.getElementById("root")
ReactDOM.render(element, container)
 */

// React.createElement() -> takes arguments, validates them and builds an element by the variables given in an object -> elements are objects
//rebuild without using react
const element = {
    type: "h1",
    props: {
        title: 'Test',
        children: 'Hello Test'
    }
}

const node = document.createElement(element.type)
console.log(node);
node["title"] = element.props.title



const text = document.createTextNode("")
text["nodeValue"] = element.props.children

const container = document.getElementById("root")

node.appendChild(text)
container.appendChild(node)

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

function createTextElement(text){
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue:text,
            children:[],
        }
    }
}