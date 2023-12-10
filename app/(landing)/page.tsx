import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center space-y-4 p-24">
            <h1 className="text-3xl font-bold">Task Manager</h1>
            <div className="flex space-x-2">
                <Link href={"/login"}>
                    <Button variant="premium">Sign in</Button>
                </Link>
                <Link href={"/register"}>
                    <Button variant="outline" className="border-black dark:border-white">Sign up</Button>
                </Link>
            </div>
        </main>
    )
}
