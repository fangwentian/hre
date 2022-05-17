export const isArr = Array.isArray
export const isStr = s => typeof s === 'string' || typeof s === 'number'

export function createText(text) {
    return {
        type: 'TEXT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

export function createDom(vDom) {
    let dom;
    // 检查当前节点是文本还是对象
    if(vDom.type === 'TEXT') {
        dom = document.createTextNode(vDom.props.nodeValue);
    } else {
        dom = document.createElement(vDom.type);

        // 将vDom上除了children外的属性都挂载到真正的DOM上去
        if(vDom.props) {
            Object.keys(vDom.props)
            .filter(key => key !== 'children')
            .forEach(item => {
                if(item.indexOf('on') === 0) {
                    dom.addEventListener(item.substr(2).toLowerCase(), vDom.props[item], false);
                } else {
                    dom[item] = vDom.props[item];
                }
            })
        }
    }
    return dom;
}

export function createElement(type, props, ...children) {
    console.log('type:', type)
    console.log('props:', props)
    console.log('children: ', children)

    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                return typeof child === 'object' ? child: createText(child)
            })
        }
    }
}