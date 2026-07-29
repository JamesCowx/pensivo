import React, { useMemo } from 'react';
import { marked } from 'marked';

function MarkdownPreview({ content }) {
  const html = useMemo(() => {
    try {
      return marked(content, { breaks: true, gfm: true });
    } catch {
      return '<p>Error rendering markdown</p>';
    }
  }, [content]);

  return (
    <div className="markdown-preview">
      <div className="preview-header">Preview</div>
      <div
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export default MarkdownPreview;
