import React from 'react'

const TreeNode = ({ node }) => {
    return (
        <div className='ml-[20px]'>
            <div>{node.label}</div>
            {node.children?.length > 0 && node.children.map(child => (
                <TreeNode key={child.id} node={child} />
            ))}
        </div>
    )
}

export default TreeNode