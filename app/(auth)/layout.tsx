import {ReactNode} from 'react';
import {Logo} from "@/components/shared/Logo";
import logo from '@/assets/logo.png'

const AuthLayout = ({children}: { children: ReactNode }) => {
    return <div>
        <div className="flex items-center justify-between p-4">
            <Logo logoImage={logo}/>
        </div>
        <div className="flex items-center justify-center py-4 px-4 md:px-8 lg:px-12">
            {children}
        </div>
    </div>
}

export default AuthLayout;