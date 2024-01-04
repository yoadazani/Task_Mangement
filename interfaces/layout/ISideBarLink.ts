export interface ISideBarLink {
    label: string
    value: string
    path: string | null
    icon: any
    subLinks: ISideBarLink[] | null
}