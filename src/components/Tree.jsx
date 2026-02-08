import React, { useState } from 'react'
import { TreeData } from '../utils/mockData'
import TreeNode from './TreeNode'

const Tree = () => {

    const [treeData, setTreeData] = useState(TreeData)

    const addNode = (parentId) => {
        const name = prompt("Enter node name");
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

    const handleNodeMove = (draggedId, targetId) => {
        if (draggedId === targetId) return;

        let newTree = JSON.parse(JSON.stringify(treeData));
        let movedNode = null;

        const removeNode = (nodes) => {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === draggedId) {
                    movedNode = nodes[i];
                    nodes.splice(i, 1);
                    return true;
                }
                if (nodes[i].children && nodes[i].children.length > 0) {
                    if (removeNode(nodes[i].children)) return true;
                }
            }
            return false;
        };

        const addNodeToTarget = (nodes) => {
            for (let node of nodes) {
                if (node.id === targetId) {
                    node.children.push(movedNode);
                    return true;
                }
                if (node.children && node.children.length > 0) {
                    if (addNodeToTarget(node.children)) return true;
                }
            }
            return false;
        };

        removeNode(newTree);

        if (movedNode) {
            addNodeToTarget(newTree);
            setTreeData(newTree);
        }
    };

    return (
        <div className='m-5 p-6 rounded-xl bg-gray-200'>
            <h2 className="text-xl font-bold text-gray-700 mb-4">EZ TREE VIEW</h2>

            {treeData.map((node) => <TreeNode
                key={node.id}
                node={node}
                onAdd={addNode}
                onDelete={deleteNode}
                onEdit={editNode}
                onMove={handleNodeMove}
            />
            )}

            {treeData.length === 0 && (
                <div className="text-center text-red-400 font-bold py-10">
                    No items left. Refresh to reset.
                </div>
            )}
        </div>
    )
}

export default Tree