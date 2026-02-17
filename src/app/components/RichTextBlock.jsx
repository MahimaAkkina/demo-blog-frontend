import {marked} from "marked";
export default function RichTextBlock({data}){
    return(
        <div className="prose mb-5"> {/* prose adds default typography styles for long-form content like blogs or articles.*/}
            <div
                dangerouslySetInnerHTML={{ //It allows you to insert HTML content directly into a component.
                    __html: marked(data.body || ""), //converts markdown to HTML
                }}
            />
        </div>
    );
}

