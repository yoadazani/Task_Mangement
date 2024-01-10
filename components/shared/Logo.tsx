import React, {FC} from 'react';
import {logoProps} from "@/types/shared/logoProps";
import Image from "next/image";
import Link from "next/link";

export const Logo: FC<logoProps> = ({logoImage}) => {
    return <Link href={"/"} className="flex items-center text-xl font-semibold font-mono">
        <Image src={logoImage} alt="logo image" height={50} width={50} className="rounded-full mix-blend-multiply"/>
        <span className="text-md">TaskOrganizer</span>
    </Link>
}