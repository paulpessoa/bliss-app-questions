interface Props{
    title: string;
    className?: string;
    functionButton?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

export default function Button({title, className, functionButton, disabled} : Props) {
    return (
        <button className={className} disabled={disabled} onClick={functionButton}>{title}</button>
    )
}
