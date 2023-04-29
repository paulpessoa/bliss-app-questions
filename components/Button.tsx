interface Props{
    title: string;
    className?: string;
    functionButton?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    href?: string;
}

export default function Button({title, className, functionButton, disabled, href} : Props) {
    return (
        <a href={href} >
            <button className={className} disabled={disabled} onClick={functionButton}>{title}</button>
        </a>
    )
}
