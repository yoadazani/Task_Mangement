import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {useQueryString} from "@/hooks/useQueryString";

export const MembersPagination = ({members}: { members: any[] }) => {
    const {createQueryString, getQueryString} = useQueryString()
    const amount_of_pages: number = members.length > 10 ? Math.floor(members.length / 10) + 1 : 1

    const pages: number[] = Array.from({length: amount_of_pages}, (_, index) => index + 1)

    const handleSelectPage = (pageNumber: number) => {
        createQueryString("page", pageNumber.toString())
    }

    const Next = () => {
        const currentPage = getQueryString("page")
        const nextPage = Number(currentPage) + 1

        if (nextPage <= amount_of_pages) {
            return createQueryString("page", nextPage.toString())
        } else {
            return null
        }
    }

    const Prev = () => {
        const currentPage = getQueryString("page")
        const nextPage = Number(currentPage) - 1

        if (nextPage >= 1) {
            return createQueryString("page", nextPage.toString())
        } else {
            return null
        }
    }

    if (amount_of_pages <= 1) return null

    return <Pagination className="mt-4">
        <PaginationContent>
            <PaginationPrevious onClick={Prev} className="cursor-pointer"/>
            {pages.map((pageNumber: number) => {
                return <PaginationLink
                    key={pageNumber}
                    className="cursor-pointer"
                    onClick={() => handleSelectPage(pageNumber)}
                    isActive
                >
                    {pageNumber}
                </PaginationLink>
            })}
            <PaginationItem>
                <PaginationEllipsis/>
            </PaginationItem>
            <PaginationNext onClick={Next} className="cursor-pointer"/>
        </PaginationContent>
    </Pagination>
}