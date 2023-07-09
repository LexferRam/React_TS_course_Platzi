/*
 * simepre que se importen tipos en react siempre usar la palabra clave "type"  
 * para que el compilador de TS los ignore al momento de hacer build
 */
// import type { FunctionComponent, FC } from 'react'

import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
}

const LazyImage = ({ src, ...imgProps }: Props): JSX.Element => {

  const node = useRef<HTMLImageElement>(null)
  const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")

  useEffect(() => {
    //?? Nuevo observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // onIntersection
            if (entry.isIntersecting){
                setCurrentSrc(src)
            }
        })
    })

    //?? observe node
    if(node.current) {
        observer.observe(node.current)
    }

    //?? desconectar
    return () => {
        observer.disconnect()
    }
  },[src])

  return( 
    <img 
        ref={node} 
        src={currentSrc} 
        {...imgProps}
    />
  )
}

// const RandomFox2: FunctionComponent = () => {
//   return <img />
// }

// const RandomFox3: FC = () => {
//   return <img />
// }

export default LazyImage
