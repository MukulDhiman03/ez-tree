import React, { useState } from 'react'

const TreeNode = ({ node }) => {
    const [isExpaned, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((expand) => !expand);
    }
    return (
        <div className='ml-[20px]'>
            <div onClick={toggleExpand} style={{ cursor: "pointer" }}>
                {node.label}
                {node.children?.length > 0 && (
                    <span>{
                        isExpaned ? "🔽" : "🔼"
                    }</span>
                )}
            </div>
            {isExpaned && node.children?.map(child => (
                <TreeNode key={child.id} node={child} />
            ))}
        </div>

    )
}

export default TreeNode