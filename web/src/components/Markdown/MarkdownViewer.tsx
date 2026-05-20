import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import remarkGfm from "remark-gfm";
import styles from "./Markdown.module.scss";

interface MarkdownViewerProps {
    markdown: string
}

const MarkdownViewer = ({ markdown }: MarkdownViewerProps) => {
    return (
        <div className={styles['markdown-viewer']}>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        
                        if (match) {
                            return (
                                <SyntaxHighlighter
                                    language={match[1]}
                                    PreTag="div"
                                    showLineNumbers={true}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            )
                        }

                        return (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
            >
                {markdown}
            </Markdown>
        </div>
    )
}

export default MarkdownViewer;