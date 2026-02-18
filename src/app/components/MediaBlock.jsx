export default function MediaBlock({data}){
    const imgUrl=data.image?.url;
    return(
        <div className="prose mb-5"> {/* prose adds default typography styles for long-form content like blogs or articles.*/}
            {imgUrl && (
                <img
                    src={imgUrl}
                    alt={data.image?.alternativeText || "Blog Image"}
                    className="w-full rounded-xl"
                />
            )}
        </div>
    );
}