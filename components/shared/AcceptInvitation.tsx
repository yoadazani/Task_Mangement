"use client"

import React, {Dispatch, SetStateAction} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {IHaveInvitation} from "@/app/(dashboard)/layout";
import {acceptInvitation} from "@/services/actions/invitationActions";
import toast from "react-hot-toast";
import {useWorkspaces} from "@/stores/workspaces";
import {useRouter} from "next/navigation";

const AcceptInvitation = (
    {
        invitation,
        setInvitation
    }: {
        invitation: IHaveInvitation,
        setInvitation: Dispatch<SetStateAction<IHaveInvitation>>
    }) => {

    const router = useRouter()
    const {data: session} = useSession()
    const workspaceStore = useWorkspaces()

    const AcceptInvitation = async () => {
        const userEmail = session?.user?.email;

        if (!userEmail) return

        try {
            const result = await acceptInvitation(userEmail, invitation.invitationData.token)

            if (result) {
                const {managerId, workspaceId, role, userId} = result
                console.log(workspaceStore.isLoading)

                await workspaceStore.addParticipant(
                    workspaceId,
                    userId,
                    role,
                    managerId
                )

                toast.success("Invitation Accepted")

                setInvitation(prev => (
                    {...prev, hasInvitation: false}
                ))

                console.log(workspaceStore.isLoading)
            }
        } catch (error: any) {
            console.log(error.message)
        } finally {
            router.refresh()
        }
    }

    return <Dialog
        open={invitation.hasInvitation}
        onOpenChange={(open) => setInvitation(prev => (
            {...prev, hasInvitation: open}
        ))}
    >
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Accept Invitation</DialogTitle>
                <DialogDescription>
                    You have been invited to join workspace
                </DialogDescription>
            </DialogHeader>

            <DialogBody>
                <div className="text-center font-semibold text-zinc-500 dark:text-zinc-400">
                    <p>
                        You have been invited to join workspace
                    </p>
                    <p className="mt-2 text-lg text-zinc-700 dark:text-zinc-300 font-bold leading-6">
                        "Workspace Name"
                    </p>
                </div>
            </DialogBody>

            <DialogFooter>
                <Button
                    variant="premium"
                    className="w-full"
                    onClick={AcceptInvitation}
                >
                    Accept Invitation
                </Button>
            </DialogFooter>
        </DialogContent>

    </Dialog>
};

export default AcceptInvitation;