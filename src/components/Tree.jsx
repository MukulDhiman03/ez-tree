import React, { useState } from 'react'
import { TreeData } from '../utils/mockData'
import TreeNode from './TreeNode'

const Tree = () => {

    const [treeData, setTreeData] = useState(TreeData)

    const addNode = (parentId) => {
        const name = prompt("Enter node name");
        console.log(parentId)
        if (!name) return;

        const newNode = {
            id: crypto.randomUUID(),
            label: name,
            children: []
        };

        updateTree(treeData, parentId, newNode);
        setTreeData([...treeData]);
    };


    const updateTree = (nodes, parentId, newNode) => {
        for (let node of nodes) {

            if (node.id === parentId) {
                node.children.push(newNode);
                return;
            }

            if (node.children.length > 0) {
                updateTree(node.children, parentId, newNode);
            }
        }
    };


    return (
        <div>
            {treeData.map((node) => <TreeNode key={node.id} node={node} onAdd={addNode} />)}
        </div>
    )
}



export default Tree