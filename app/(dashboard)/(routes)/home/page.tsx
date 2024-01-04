import {NoTasks} from "@/components/shared/NoTasks";
import {AddTask} from "@/components/shared/AddTask";
import {ViewStyleFilters} from "@/components/shared/ViewStyleFilters";
import {Heading} from "@/components/shared/Heading";

const Home = () => {

    return <>
        <div className="relative py-8 px-4 md:px-8 lg:px-12">
            <div className="h-[calc(100vh-12.5rem)]">
                <Heading>Daily Tasks</Heading>
                <div
                    className="flex items-center justify-between mt-4 pb-2 px-2 border-b border-zinc-200 dark:border-zinc-700">
                    <ViewStyleFilters/>
                    <AddTask/>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg my-2 p-4 h-full">
                    <div className="w-full h-full">
                        <NoTasks/>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Home