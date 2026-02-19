export default function MediaBlock({data}){
    const imgUrl=data.file?.url;
    return(
        <div className="mb-5"> {/* prose adds default typography styles for long-form content like blogs or articles.*/}
            {imgUrl && (
                <div className="flex justify-center">
                    <img
                        src={imgUrl}
                        alt={data.filr?.alternativeText || "Blog Image"}
                        className="w-full max-w-3xl h-auto rounded-xl object-cover"
                    />
                </div>
            )}
        </div>
    );
}