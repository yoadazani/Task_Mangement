import {ReactNode} from 'react';

const Description = ({children}: {children: ReactNode}) => {
    return (
        <p className="text-sm text-gray-500">
            {children}
        </p>
    )
}

export default Description;