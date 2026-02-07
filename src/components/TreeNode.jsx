import React, { useState } from 'react';

const TreeNode = ({ node, onAdd }) => {
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
                <button >
                    Edit
                </button>
            </div>

            {isExpanded &&
                node.children?.map(child => (
                    <TreeNode
                        key={child.id}
                        node={child}
                        onAdd={onAdd}
                    />
                ))
            }

        </div>
    );
};


export default TreeNode;
