interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
}

export default function Image({ src, alt, width, height, className, style }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy" // 懒加载
      style={{
        objectFit: 'cover',
        ...style,
      }}
    />
  )
}
