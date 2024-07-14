import {type ImagePropsType} from './Image.type';


const Image = ({src, altText}: ImagePropsType) => {
  return (
    <img src={src} alt={altText} />
  )
}

export default Image