import { MDXRemote } from "next-mdx-remote/rsc";
import { readFile } from "fs/promises";
import path from "path";

interface MDXContentProps {
  file: string;
  locale: string;
}

export default async function MDXContent({ file, locale }: MDXContentProps) {
  const filePath = path.join(process.cwd(), "content", locale, `${file}.mdx`);

  let source: string;
  try {
    source = await readFile(filePath, "utf-8");
  } catch {
    // Fallback: si no existe en el idioma actual, cargar el español
    const fallbackPath = path.join(
      process.cwd(),
      "content",
      "es",
      `${file}.mdx`
    );
    source = await readFile(fallbackPath, "utf-8");
  }

  return (
    <div
      className="
        prose prose-lg max-w-none
        prose-headings:text-riiba-green-dark prose-headings:font-bold
        prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:mb-6
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-riiba-green-dark/80 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-riiba-orange prose-a:font-medium hover:prose-a:text-riiba-orange-light prose-a:no-underline hover:prose-a:underline
        prose-strong:text-riiba-green-dark prose-strong:font-semibold
        prose-ul:text-riiba-green-dark/80 prose-ul:my-4
        prose-ol:text-riiba-green-dark/80 prose-ol:my-4
        prose-li:my-1
        prose-blockquote:border-l-4 prose-blockquote:border-riiba-orange
        prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:font-normal
        prose-blockquote:text-riiba-green-dark/70
        prose-code:text-riiba-orange prose-code:bg-riiba-green-bg prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
      "
    >
      <MDXRemote source={source} options={{ parseFrontmatter: true }} />
    </div>
  );
}