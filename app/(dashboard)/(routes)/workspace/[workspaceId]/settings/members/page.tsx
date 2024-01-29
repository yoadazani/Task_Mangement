import {Heading} from "@/components/shared/Heading";
import Description from "@/components/shared/Description";
import {AllMembers} from "@/components/pages/workspace/settings/AllMembers";
import {ScrollArea} from "@/components/ui/scroll-area";
import Invite from "@/components/pages/workspace/settings/Invite";

const Members = () => {

    return <ScrollArea className="h-[calc(100vh-14rem)] md:h-[calc(100vh-4.8rem)] w-full m-auto pb-4">
        <div className="p-4 md:px-8 space-y-8">
            <div className="mb-2 bg-white dark:bg-zinc-800 sticky top-0 w-12/12">
                <Heading> Members </Heading>
                <Description> View and manage workspace members. </Description>
            </div>

            <div className="flex flex-col space-y-4">
                <Invite />
                <AllMembers/>
            </div>
        </div>
    </ScrollArea>
}

export default Members;