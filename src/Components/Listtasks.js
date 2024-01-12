
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'


const Listtasks = ({ tasks, settasks }) => {

    const [todos, settodos] = useState([])
    const [inprogress, setinprogress] = useState([])
    const [completed, setcompleted] = useState([])

    useEffect(() => {
        const todolists = tasks?.filter((res) => res.status === 'todo')
        settodos(todolists)

        const progresslists = tasks?.filter(res => res.status === 'progress')
        setinprogress(progresslists)

        const completeddata = tasks?.filter(res => res.status === 'completed')
        setcompleted(completeddata)
    }, [tasks])


    const handleremove = (e) => {
        const del = tasks.filter(res => res.id !== e)
        localStorage.setItem('tasks', JSON.stringify(del))
        settasks(del)
    }

    const statuses = ['TODO', 'INPROGRESS', 'COMPLETED']


    return (
        <div className='flex justify-around mt-6 text-center'>
            <Sections statuses={statuses} todos={todos} inprogress={inprogress} completed={completed} handleremove={handleremove} />
        </div>
    )
}

export default Listtasks


const Sections = ({ statuses, todos, inprogress, completed, handleremove }) => {
    return (
        <div className='flex justify-around'>
            {statuses.map(res => (
                <div className='w-80 p-1'>
                    <h1 >{res}</h1>
                    <Tlist status={res} tasks={res === 'TODO' ? todos : res === 'INPROGRESS' ? inprogress : completed} handleremove={handleremove} />
                </div>
            ))}
        </div>
    )
}



const Tlist = ({ tasks, handleremove }) => {

    const [data, setdata] = useState()

    useEffect(() => {
        if (tasks) {
            setdata(tasks);
        }
    }, [tasks]);


    const handleDrag = (e) => {
        const { source, destination, type } = e;

        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index)
            return;

        if (type === 'group') {
            const reorderindex = [...data];
            const sindex = source.index;
            const dindex = destination.index;
            const [removeddata] = reorderindex.splice(sindex, 1);
            reorderindex.splice(dindex, 0, removeddata);
            setdata(reorderindex);
        }
    };
    return (
        <div>
            <DragDropContext onDragEnd={handleDrag}>
                <Droppable droppableId='root' type='group'>
                    {
                        (provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {data?.map((data, index) => (
                                    <div key={index}>
                                        <Draggable draggableId={data.id} key={data.id} index={index}>
                                            {
                                                (provided, snapshot) => (
                                                    <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className={`flex justify-between w-80 p-1  border-2  shadow-slate-900 mt-6 h-12 ${snapshot.isDragging ? 'h-16' : 'h-12'}`}>
                                                        <p>{data.name}</p>
                                                        <span className='w-5 cursor-pointer' onClick={() => handleremove(data.id)}>X</span>
                                                    </div>
                                                )
                                            }
                                        </Draggable>
                                    </div>
                                ))}
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>
        </div>
    )
}