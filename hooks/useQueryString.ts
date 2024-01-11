"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect} from "react";

export const useQueryString = () => {
    const searchParams = useSearchParams()!
    const pathname = usePathname()!
    const router = useRouter()
    const params = new URLSearchParams(searchParams)

    const createQueryString = useCallback((name: string, value: string) => {
        params.set(name, value)
        const queryString = params.toString()

        return router.push(pathname + `?${queryString}`)
    }, [searchParams])


    const getQueryString = useCallback((name: string) => {
        if (params.get(name) === "") {
            deleteQueryString(name)
            const queryString = params.toString()

            return router.push(pathname + `?${queryString}`)
        }
        return params.get(name)
    }, [searchParams])


    const checkIfQueryStringExists = useCallback((name: string) => {
        return params.has(name)
    }, [searchParams])


    const deleteQueryString = useCallback((name: string) => {
        params.delete(name)

        const queryString = params.toString()

        return router.push(pathname + `?${queryString}`)
    }, [searchParams])



    return {
        searchParams,
        createQueryString,
        getQueryString,
        deleteQueryString,
        checkIfQueryStringExists
    }
}