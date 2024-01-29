"use client"

import React, {useEffect, useState} from 'react';
import {useBoards} from "@/stores/boards";
import {useParams} from "next/navigation";
import {BoardCard} from "@/components/pages/boards/BoardCard";
import {ScrollArea} from "@/components/ui/scroll-area";
import {DesktopBoardCard} from "@/components/pages/boards/DesktopBoardCard";
import {MobileCreateBoard} from "@/components/pages/boards/MobileCreateBoard";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {SortableContext, sortableKeyboardCoordinates} from "@dnd-kit/sortable";


export const Boards = () => {
    const params = useParams()
    const boardStore = useBoards()
    const [currentBoardId, setCurrentBoardId] = useState<string | null>(null)
    const [isOutOfRect, setIsOutOfRect] = useState(false)
    const activeBoard = currentBoardId && boardStore.boards.find((board: any) => board.id === currentBoardId)
    useEffect(() => {
        (async () => {
            await boardStore.fetchBoards(params.workspaceId as string)
        })()
    }, [boardStore.isLoading])


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
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

        const contextRect = document.getElementById('boardsArea')

        if (!contextRect) return

        const contextArea = contextRect.getBoundingClientRect()


        const {
            left: activeLeft,
            top: activeTop,
            right: activeRight,
            bottom: activeBottom
        } = active.rect.current.translated!

        const {
            left: contextLeft,
            top: contextTop,
            right: contextRight,
            bottom: contextBottom
        } = contextArea


        if (
            !(
                activeLeft >= contextLeft && activeRight <= contextRight &&
                activeTop >= contextTop && activeBottom <= contextBottom
            )
        ) {
            return
        }

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

        setCurrentBoardId(null)
        return await boardStore.swapBoards(
            id as string,
            activeIndex,
            overIndex,
        )

    }

    const handleDragMove = async (event: DragMoveEvent) => {
        const {active, over} = event

        const contextRect = document.getElementById('boardsArea')

        if (!contextRect) return

        const contextArea = contextRect.getBoundingClientRect()


        const {
            left: activeLeft,
            top: activeTop,
            right: activeRight,
            bottom: activeBottom
        } = active.rect.current.translated!

        const {
            left: contextLeft,
            top: contextTop,
            right: contextRight,
            bottom: contextBottom
        } = contextArea

        if (
            !(
                activeLeft >= contextLeft && activeRight <= contextRight &&
                activeTop >= contextTop && activeBottom <= contextBottom
            )
        ) {
            setIsOutOfRect(true)
        } else {
            setIsOutOfRect(false)
        }
    }

    return (
        <div id="boardsArea" className="h-full">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
            >
                <ScrollArea
                    className="h-[calc(100vh-13rem)] md:h-[calc(100vh-10rem)] p-2 md:py-0 md:px-8 xl:px-16">
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 py-2 overflow-hidden">

                        <DesktopBoardCard/>

                        <MobileCreateBoard/>

                        <SortableContext
                            id="boardsArea"
                            items={boardStore.boards.map((board: any) => board.id)}
                        >
                            {boardStore.boards.map((board: any) => (
                                <BoardCard key={board.id} board={board} isOutOfRect={isOutOfRect}/>
                            ))}
                        </SortableContext>
                    </div>
                </ScrollArea>
                <DragOverlay>
                    {activeBoard && <BoardCard board={activeBoard} className="transform rotate-6 h-full"/>}
                </DragOverlay>
            </DndContext>
        </div>
    )
}