import { name } from 'shared-ui'

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', name],);

    return element;
}

document.body.appendChild(component());