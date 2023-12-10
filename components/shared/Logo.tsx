import React, {FC} from 'react';
import {logoProps} from "@/types/shared/logoProps";
import Image from "next/image";
import Link from "next/link";

export const Logo: FC<logoProps> = ({logoImage}) => {
    return <Link href={"/"} className="flex items-center gap-2 text-2xl font-semibold font-mono">
        <Image src={logoImage} alt="logo image" height={40} width={40}/>
        <span>Taskify</span>
    </Link>
}