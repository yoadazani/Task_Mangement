export interface ISideBarLink {
    label: string
    value: string
    path: string | null
    icon: any
    color: string
    subLinks: ISideBarLink[] | null
}