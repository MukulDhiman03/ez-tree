import React from 'react'
import { TreeData } from '../utils/mockData'
import TreeNode from './TreeNode'

const Tree = () => {


    return (
        <div>
            {TreeData.map((node) => <TreeNode key={node.id} node={node} />)}
        </div>
    )
}

export default Tree