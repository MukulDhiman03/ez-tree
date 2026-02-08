import React, { useState } from 'react';

const TreeNode = ({ node, onAdd, onDelete, onEdit }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <div style={{ marginLeft: "20px" }}>

            <div style={{ display: "flex", gap: "8px" }}>
                <span onClick={toggleExpand} style={{ cursor: "pointer" }}>
                    {node.children?.length > 0 && (
                        isExpanded ? "▼" : "▶"
                    )}
                </span>
                <span>{node.label}</span>
                <button onClick={() => onAdd(node.id)}>
                    Add
                </button>
                <button onClick={() => onDelete(node.id)}>
                    Delete
                </button>
                <button onClick={() => onEdit(node.id)}>Edit</button>

            </div>

            {isExpanded &&
                node.children?.map(child => (
                    <TreeNode
                        key={child.id}
                        node={child}
                        onAdd={onAdd}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))
            }

        </div>
    );
};


export default TreeNode;
