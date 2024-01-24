"use client"

import React, {useEffect} from 'react';
import {useBoards} from "@/stores/boards";
import {useParams} from "next/navigation";
import {BoardCard} from "@/components/pages/boards/BoardCard";
import {ScrollArea} from "@/components/ui/scroll-area";
import {CreateBoardCard} from "@/components/pages/boards/CreateBoardCard";
import {MobileCreateBoard} from "@/components/pages/boards/MobileCreateBoard";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable} from "@dnd-kit/sortable";
import {cn} from "@/lib/utils";


const SortableItem = ({id, children}: { id: UniqueIdentifier, children: React.ReactNode }) => {
    const {
        setNodeRef,
        listeners,
        attributes,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        data: {
            type: "board"
        }
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(isDragging && "opacity-50 border-2 border-dashed border-zinc-400 dark:border-zinc-600")}
        >
            {children}
        </div>
    )
}

export const Boards = () => {
    const params = useParams()
    const boardStore = useBoards()
    const [currentBoardId, setCurrentBoardId] = React.useState<string | null>(null)

    const activeBoard = currentBoardId && boardStore.boards.find((board: any) => board.id === currentBoardId)

    useEffect(() => {
        (async () => {
            await boardStore.fetchBoards(params.workspaceId as string)
        })()
    }, [boardStore.isLoading])

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    )

    const handleDragStart = (event: DragStartEvent) => {
        const {active} = event
        const {id} = active

        setCurrentBoardId(id as string)
        console.log(`Drag started on ${id}`)
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        console.log("Handle drag end")
        const {active, over} = event
        const {id} = active
        const {id: overId} = over!
        if (
            active.data.current?.type !== "board" ||
            over?.data.current?.type !== "board" ||
            !active || !over || active.id === overId
        ) {
            setCurrentBoardId(null)
            return
        }

        const activeIndex = boardStore.boards.findIndex((board: any) => board.id === id)
        const overIndex = boardStore.boards.findIndex((board: any) => board.id === overId)

        console.log("Handle drag end: ", {
            activeIndex,
            overIndex
        })

        setCurrentBoardId(null)
        return await boardStore.swapBoards(
            id as string,
            activeIndex,
            overIndex,
        )

    }

    const handleDragOver = async (event: DragOverEvent) => {
        const {active, over} = event
        const {id} = active
        const {id: overId} = over!

        if (
            active.data.current?.type !== "board" ||
            over?.data.current?.type !== "board" ||
            !active || !over || active.id === overId
        ) return

        const activeIndex = boardStore.boards.findIndex((board: any) => board.id === id)
        const overIndex = boardStore.boards.findIndex((board: any) => board.id === overId)

        console.log("Handle drag over ",{
            activeIndex,
            overIndex
        })
        //
        // await boardStore.swapBoards(id as string, overId as string, activeIndex, overIndex, false)

        console.log(`Dragged ${id} over ${overId}`)
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <ScrollArea className="h-[calc(100vh-13rem)] md:h-[calc(100vh-10rem)] p-2 md:py-0 md:px-8 xl:px-16 border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-2">
                    <SortableContext
                        items={boardStore.boards.map((board: any) => board.id)}
                        id="boardsArea"
                    >
                        {boardStore.boards.map((board: any, index: number) => (
                            <SortableItem
                                key={board.id}
                                id={board.id}
                            >
                                <BoardCard board={board}/>
                            </SortableItem>
                        ))}
                    </SortableContext>
                    <CreateBoardCard/>

                    <MobileCreateBoard/>
                </div>
            </ScrollArea>
            <DragOverlay>
                {activeBoard && <BoardCard board={activeBoard} className="transform rotate-6 "/>}
            </DragOverlay>
        </DndContext>
    )
}