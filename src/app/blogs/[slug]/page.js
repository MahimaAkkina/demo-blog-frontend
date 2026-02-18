import RichTextBlock from "@/app/components/RichTextBlock";
import MediaBlock from "@/app/components/MediaBlock"

// Next.js automatically passes dynamic route values through `params`
// We use it to access values like id, slug etc from the URL

export default async function BlogPage({params}) {
  const {slug} = await params;

  const response = await fetch(
    `https://tidy-attraction-06e886b553.strapiapp.com/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[blocks][populate]=*`, //filtering blog posts - encodeURIComponent() converts special characters into a URL-safe format.
    {cache:"no-store"} //Always fetch fresh data from the server.
  );
  const result=await response.json(); // changing data into readable format
  const blog=result.data[0]; //extracting blog posts
  if (!blog) return <div>Blog not found</div>; 
  return (
    <div className="mx-auto px-6 py-10">
      <h1 className="text-4xl text-center m-5 font-bold">{blog.title}</h1>

      {blog.blocks?.map((block, index) => { //blocks is array of components.
        switch (block.__component){
          case "shared.rich-text":
            return <RichTextBlock key={index} data={block} />;

            case "shared.media":
              return <MediaBlock key={index} data={block} />;
                  

              case "shared.quote":
                return(
                  <blockquote key={index} className="border-l-4 pl-4 italic text-gray-600 mb-5">
                    {block.quote}
                  </blockquote>
                );
                default:
                  return null;
        }
      })}
    </div>
  );
}
