type CitationHtmlProps = {
  html: string;
};

export const CitationHtml = ({ html }: CitationHtmlProps) => {
  return (
    <span
      className="[&_a]:text-blue-600 [&_a]:hover:underline"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
