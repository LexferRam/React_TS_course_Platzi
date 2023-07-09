/*
 * simepre que se importen tipos en react siempre usar la palabra clave "type"  
 * para que el compilador de TS los ignore al momento de hacer build
 */
// import type { FunctionComponent, FC } from 'react'

interface Props {
    image: string;
}

const RandomFox = ({image}:Props): JSX.Element => {
  return <img width={320} height='auto' src={image} className="rounded"/>
}

// const RandomFox2: FunctionComponent = () => {
//   return <img />
// }

// const RandomFox3: FC = () => {
//   return <img />
// }

export default RandomFox
