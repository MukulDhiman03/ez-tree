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

    const deleteFromRoot = (list, id) => {
        return list.filter(node => node.id !== id);
    };

    const deleteFromChildren = (list, id) => {
        for (let node of list) {

            if (node.children.some(child => child.id === id)) {
                node.children = node.children.filter(child => child.id !== id);
                return;
            }

            if (node.children.length > 0) {
                deleteFromChildren(node.children, id);
            }
        }
    };

    const deleteNode = (id) => {
        let updated = deleteFromRoot(treeData, id);
        deleteFromChildren(updated, id);
        setTreeData([...updated]);
    };

    const editNode = (id) => {
        console.log("id ", id);
        const newName = prompt("Enter new name:");
        if (!newName) return;

        updateLabel(treeData, newName, id);
        setTreeData([...treeData]);
    }
    const updateLabel = (nodes, newName, id) => {
        for (let node of nodes) {
            if (node.id === id) {
                node.label = newName;
                return;
            }

            if (node.children && node.children.length > 0) {
                updateLabel(node.children, newName, id)
            }
        }
    }


    return (
        <div>
            {treeData.map((node) => <TreeNode
                key={node.id}
                node={node}
                onAdd={addNode}
                onDelete={deleteNode}
                onEdit={editNode}
            />
            )}
        </div>
    )
}



export default Tree