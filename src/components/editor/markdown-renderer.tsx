import { ComponentProps } from "react"
import { useRenderCount } from "@uidotdev/usehooks"
import ReactMarkdown from "react-markdown"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"

import styles from "@/styles/react-markdown.module.css"

const remarkPlugins = [remarkGfm]
const rehypePlugins = [rehypeSanitize]

interface MarkdownRendererProps extends ComponentProps<"div"> {
  markdown: string
}

export const MarkdownRenderer = ({
  markdown,
  className,
  ...props
}: MarkdownRendererProps) => {
  const renderCount = useRenderCount()

  return (
    // TODO: add html tags support to the markdown renderer
    <div className={className} {...props}>
      <div>
        <p>{renderCount}</p>
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          rehypePlugins={rehypePlugins}
          className={styles.container}
          linkTarget="_blank"
          components={{
            li: ({ index, ordered, checked, className, children, ...props }) =>
              className === "task-list-item" ? (
                <li
                  className={className}
                  style={{ listStyleType: "none" }}
                  {...props}
                >
                  {children}
                </li>
              ) : (
                <li className={className} {...props}>
                  {children}
                </li>
              ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}
