import { createText, createDom } from './h'

let currentFiber = null
let workInProgressRoot = null;
let nextUnitOfWork = null

export function render(vnode, container) {
    let rootFiber = {
        dom: container,
        props: { children: [vnode] },
        done: () => {}
    }

    nextUnitOfWork = rootFiber
    requestIdleCallback(workloop)
}

const workloop = (deadline) => {
    // 有任务且没超时
    while(nextUnitOfWork && deadline.timeRemaining() > 1) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    // 有任务, 但超时了
    if(nextUnitOfWork) {
        requestIdleCallback(workloop)
    }

    // 无任务, 最后执行commit
    if(!nextUnitOfWork && workInProgressRoot) {
        commitRoot()
    }
}

// 处理当前fiber, 并返回下一个fiber
const performUnitOfWork = (fiber) => {
    if(isFn(fiber.type)) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }
    // 深度优先遍历, 有child返回child, 无child返回sibling, 也无sibling, 继续找其父节点的sibling
    if(fiber.child) {
        return fiber.child
    }
    if(fiber.sibling) {
        return fiber.sibling
    }
    while(fiber = fiber.return) {
        if(fiber.sibling) {
            return fiber.sibling
        }
    }
}

const updateFunctionComponent = (fiber) => {
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
}

const updateHostComponent = (fiber) => {
    if(!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    const children = fiber.props && fiber.props.children
    reconcileChildren(fiber, children)
}

// 标记处理children这一层
const reconcileChildren = () => {
    
}


const isFn = (fn) => (typeof fn === 'function')