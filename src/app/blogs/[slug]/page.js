export default async function BlogPage({ params }) {
  const { slug } = params;

  const response = await fetch(
    `https://tidy-attraction-06e886b553.strapiapp.com/api/articles?filters[slug][$eq]=${slug}&populate[blocks][populate]=*`
  );
  const result=await response.json(); // changing data into readable format
  const blogs=result.data[0]; //extracting blog posts
  if (!blog) return <div>Blog not found</div>; 
  return (
    <div>
      <h1 className="text-4xl font-bold">{blog.title}</h1>

      {blog.blocks?.map((block, index) => {
        if (block.__component === "shared.rich-text") {
          return (
            <div key={index}>
              <p>{block.body}</p>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
