import Link from 'next/link';
import React from 'react';

export  default function LinkCustom({content,href}){
    return(
        <Link href={href} passHref>
            <a>
                {content}
            </a>
        </Link>
    );
}