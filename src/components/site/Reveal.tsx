import { useReveal } from "@/hooks/use-reveal";
import { ReactNode, ElementType, HTMLAttributes } from "react";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  children: ReactNode;
};

export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  const delayClass = delay ? `reveal-d-${delay}` : "";
  return (
    <Tag ref={ref as never} className={`reveal ${delayClass} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
