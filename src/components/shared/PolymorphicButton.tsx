import React from "react";

// 다형성 컴포넌트 타입 정의
type PolymorphicProps<C extends React.ElementType> = {
  as?: C;
  className?: string;
} & React.ComponentPropsWithoutRef<C>;

export default function PolymorphicButton<C extends React.ElementType = "button">({
  as,
  children,
  className = "",
  ...props
}: PolymorphicProps<C>) {
  const Component = as || "button";

  return (
    <Component className={`${className}`} {...props}>
      {children}
    </Component>
  );
}
