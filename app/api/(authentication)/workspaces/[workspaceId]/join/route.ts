import {NextRequest, NextResponse} from "next/server";
import {addWorkspaceParticipant} from "@/services/actions/workspaceActions";
import {acceptInvitation} from "@/services/actions/invitationActions";


export async function GET(req: NextRequest) {
    try {
        const token_data = req.nextUrl.searchParams.get("token");

        if (!token_data) {
            return NextResponse.json({error: "No token provided"}, {status: 400});
        }

        const decoded_token_data = atob(token_data);

        const parsed_token_data = JSON.parse(decoded_token_data);

        if (!parsed_token_data.userId) {
            return NextResponse.redirect(process.env.NEXTAUTH_URL as string + "/register");
        }

        await acceptInvitation(parsed_token_data.email, token_data);

        return NextResponse.redirect(process.env.NEXTAUTH_URL as string + "/home");
    } catch (error: any) {
        console.log("[JOIN_WORKSPACE_ERROR]", error.message);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}