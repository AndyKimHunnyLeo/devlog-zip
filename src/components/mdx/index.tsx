import type { MDXComponents } from "mdx/types";
import CodeBlock from "./CodeBlock";
import Callout from "./Callout";

export function getMDXComponents(): MDXComponents {
  return {
    pre: ({ children, ...props }) => {
      return (
        <CodeBlock {...props}>
          {children}
        </CodeBlock>
      );
    },
    Callout,
  };
}
