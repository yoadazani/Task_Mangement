import {Kanban, List, Table} from "lucide-react";

export const ViewStyleFilters = () => {
    return <div className="flex items-center gap-4 md:gap-6">
            <div
                className="flex items-center space-x-1 cursor-pointer hover:text-black hover:border-b-2 hover:border-blue-600 hover:duration-75">
                <List className="w-5 h-5"/>
                <h2 className="text-md font-semibold font-sans text-zinc-500">List</h2>
            </div>
            <div
                className="flex items-center space-x-1 cursor-pointer hover:text-black hover:border-b-2 hover:border-blue-600 hover:duration-75">
                <Kanban className="w-5 h-5"/>
                <h2 className="text-md font-semibold font-sans text-zinc-500">Board</h2>
            </div>
            <div
                className="flex items-center space-x-1 cursor-pointer hover:text-black hover:border-b-2 hover:border-blue-600 hover:duration-75">
                <Table className="w-5 h-5"/>
                <h2 className="text-md font-semibold font-sans text-zinc-500">Table</h2>
            </div>
        </div>
}