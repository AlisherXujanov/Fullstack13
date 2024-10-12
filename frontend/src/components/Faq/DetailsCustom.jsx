
// eslint-disable-next-line react/prop-types
export default function DetailsCustom({ title, description, elementStyle }) {
    return (
        <details className={elementStyle} >
            <summary>{title}</summary>
            <p>{description}</p>
        </details>
    )
}
