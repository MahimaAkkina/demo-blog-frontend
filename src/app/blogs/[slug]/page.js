import RichTextBlock from "@/app/components/RichTextBlock";
import MediaBlock from "@/app/components/MediaBlock"
import QuoteBlock from "@/app/components/QuoteBlock";
import SliderBlock from "@/app/components/SliderBlock";

// Next.js automatically passes dynamic route values through `params`
// We use it to access values like id, slug etc from the URL

export default async function BlogPage({params}) {
  const {slug} = await params;

  const response = await fetch( //// Fetching article data from Strapi using slug filter
    `https://tidy-attraction-06e886b553.strapiapp.com/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[cover]=true&populate[author]=true&populate[blocks][populate]=*`, //filtering blog posts - encodeURIComponent() converts special characters into a URL-safe format.
    {cache:"no-store"} //Always fetch fresh data from the server.
  );
  const result=await response.json(); // changing data into readable format (API response to JSON format)

  if (!result.data || !result.data.length) {
  return <div>Blog not found</div>;
}
  const blog=result.data?.[0]; //extracting blog posts ,Getting first matched article (slug is unique)
  
   // Extract cover image URL (medium size preferred, fallback to original)
  const coverUrl=blog.cover?.formats?.medium?.url || blog.cover?.url || null;

  // Loop through dynamic zone blocks and render based on component type
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl text-center mb-6 font-bold">{blog.title}</h1>
      <p className="text-base sm:text-lg text-center mb-6 text-gray-500">{blog.description}</p>
      
      {coverUrl && (
        <img
          src={coverUrl}
          alt={blog.cover?.alternativeText || blog.title}
          className="w-full max-h-[500px] object-cover rounded-2xl mb-8"
        />
      )}
      <hr></hr>
      {blog.blocks?.map((block, index) => { //blocks is array of components.
        switch (block.__component){
          case "shared.rich-text":
            return <RichTextBlock key={index} data={block} />;

          case "shared.media":
            return <MediaBlock key={index} data={block} />;

          case "shared.quote":
            return <QuoteBlock key={index} data={block} />;
             
          case "shared.slider":
            return <SliderBlock key={index} data={block} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
