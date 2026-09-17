import { HTMLAttributes } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
}

const sizes: Record<ContainerSize, string> = {
  sm: "max-w-3xl",   // 768px  → textos largos, artículos
  md: "max-w-5xl",   // 1024px → contenido general
  lg: "max-w-7xl",   // 1280px → ancho por defecto (Header/Footer)
  xl: "max-w-screen-2xl", // 1536px → galerías, grids amplios
  full: "max-w-full", // sin límite → casos especiales
};

export default function Container({
  size = "lg",
  as: Tag = "div",
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={`container mx-auto px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}