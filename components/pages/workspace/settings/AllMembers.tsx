"use client"

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {MoreVertical} from "lucide-react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {MembersPagination} from "@/components/pages/workspace/settings/MembersPagination";
import {useQueryString} from "@/hooks/useQueryString";
import {useWorkspaceParticipants} from "@/stores/workspace_participants";
import {useSession} from "next-auth/react";

export const AllMembers = () => {
    const router = useRouter()
    const params = useParams()
    const workspaceParticipantsStore = useWorkspaceParticipants()
    const {getQueryString} = useQueryString()
    const {data: session} = useSession()
    const currentPage = Number(getQueryString("page"))
    const membersPerPage = 10
    const startIndex: number = currentPage * membersPerPage - membersPerPage
    const endIndex: number = currentPage * membersPerPage

    useEffect(() => {
        (async () => {
            await workspaceParticipantsStore.fetchParticipants(
                params.workspaceId as string,
                startIndex,
                endIndex
            )
        })()
    }, [workspaceParticipantsStore.participantsIsLoading, startIndex, endIndex]);

    const [memberIsDeleted, setMemberIsDeleted] = useState<string>("")

    const handleChangeRole = async (userId: string, role: string) => {
        try {
            const response = await workspaceParticipantsStore.changeParticipantRole(params.workspaceId as string, userId, role)
            toast.success(`Participant ${response.id} role changed successfully`)
        } catch (error: any) {
            return toast.error(error.message)
        }
    }

    const handleDeleteMember = async (userId: string) => {
        try {
            const response = await workspaceParticipantsStore.deleteParticipant(params.workspaceId as string, userId)
            toast.success(`Participant ${userId} removed successfully`)

            setMemberIsDeleted(userId)

            if (response.userId === session?.user.id) {
                toast.success(`You leave ${params.workspaceId} successfully`)
                return router.push('/home')
            }

            if (!workspaceParticipantsStore.participants) {
                toast.success(`Workspace ${params.workspaceId} deleted because it has no more participants`)
                return router.push('/home')
            }

        } catch (error: any) {
            return toast.error(error.message)
        }
    }

    return <>
        <Table className="w-full bg-zinc-100 dark:bg-zinc-800 z-50 rounded-lg shadow overflow-hidden">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[120px] md:w-[200px]">User</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="w-10">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {workspaceParticipantsStore.participants.map((participant: any, index: number) => {
                    return <TableRow key={index}
                                     className={cn("", {"slide-out-right": memberIsDeleted === participant.user.id})}>
                        <TableCell>{participant.user.name}</TableCell>
                        <TableCell>{new Date(participant.createdAt).toDateString()}</TableCell>
                        <TableCell>{participant.role}</TableCell>
                        <TableCell className="px-5">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="focus:bg-none data-[state=close]:bg-none">
                                    <MoreVertical className="h-4 w-4"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => handleChangeRole(participant.user.id, participant.role === "admin" ? "user" : "admin")}
                                    >
                                        {
                                            participant.role === "admin"
                                                ? "Change to member"
                                                : "Change to admin"
                                        }
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleDeleteMember(participant.user.id)}
                                        className="cursor-pointer text-red-500"
                                    >
                                        Remove
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                })}
            </TableBody>
            <TableCaption> list of workspace members </TableCaption>
        </Table>

        <MembersPagination members={workspaceParticipantsStore.participants}/>
    </>
}