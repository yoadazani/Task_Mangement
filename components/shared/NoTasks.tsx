import Image from "next/image";
import no_tasks from "@/assets/no-tasks.png";

export const NoTasks = () => {
    return <div className="w-full h-full flex flex-col justify-center items-center text-center">
        <Image
            src={no_tasks}
            alt="No tasks"
            height={350}
            width={350}
            className="xl:w-full xl:max-w-xl"
        />
        <h1 className="text-2xl font-semibold font-sans text-zinc-500">No tasks!</h1>
        <p className="text-md font-sans text-zinc-500 tracking-wider">Add tasks to get started.</p>
</div>
}