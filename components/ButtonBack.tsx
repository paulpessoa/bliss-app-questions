import { useRouter } from 'next/router';
import Button from '../components/Button'

interface Props{
    title: string;
    className: string;
}

export default function ButtonBack({title, className} : Props) {
    const router = useRouter();
    const backRouter = () => {
        router.back();
    }

    return (
        <Button title={title} className={className} functionButton={backRouter} />
    )
}
