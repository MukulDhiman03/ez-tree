import React, { useState } from 'react';
import {
    ChevronRight,
    ChevronDown,
    Plus,
    Trash2,
    Edit2,
    GripVertical
} from 'lucide-react';

const TreeNode = ({ node, onAdd, onDelete, onEdit, onMove }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const [isDragging, setIsDragging] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const hasChildren = node.children && node.children.length > 0;

    const toggleExpand = (e) => {
        e.stopPropagation();
        setIsExpanded(prev => !prev);
    };


    const handleDragStart = (e) => {
        e.stopPropagation();
        e.dataTransfer.setData('nodeId', node.id);
        e.dataTransfer.effectAllowed = 'move';
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setIsDragOver(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const draggedId = e.dataTransfer.getData('nodeId');

        if (draggedId && draggedId !== node.id) {
            onMove(draggedId, node.id);
            setIsExpanded(true);
        }
    };

    return (
        <div className={`relative transition-all duration-200 ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
            <div
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}

                className={`
                    group flex items-center justify-between p-2 rounded-md transition-colors duration-200 cursor-pointer border mb-1
                    ${isDragOver
                        ? 'bg-blue-100 border-blue-400 shadow-inner'
                        : 'border-transparent hover:bg-white hover:shadow-sm'
                    }
                `}
            >
                <div className="flex items-center gap-2 flex-1">

                    <span className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing">
                        <GripVertical size={14} />
                    </span>

                    <span
                        onClick={toggleExpand}
                        className={`p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-transform ${hasChildren ? '' : 'opacity-0 pointer-events-none'}`}
                    >
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>

                    <span className="text-gray-700 font-medium text-sm select-none">
                        {node.label}
                    </span>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => onAdd(node.id)}
                        className="p-1.5 text-green-600 hover:bg-green-100 rounded-md"
                        title="Add Child"
                    >
                        <Plus size={14} />
                    </button>
                    <button
                        onClick={() => onEdit(node.id)}
                        className="p-1.5 text-amber-600 hover:bg-amber-100 rounded-md"
                        title="Edit Name"
                    >
                        <Edit2 size={14} />
                    </button>
                    <button
                        onClick={() => onDelete(node.id)}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-md"
                        title="Delete"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {isExpanded && hasChildren && (
                <div className="relative ml-6 pl-4 border-l border-gray-400">
                    {node.children.map(child => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            onAdd={onAdd}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onMove={onMove}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;