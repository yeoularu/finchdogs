import { Spinner } from 'flowbite-react';
import Text from './Typography/Text';

export default function SpinnerText({ text }: Readonly<{ text: string }>) {
    return (
        <div className="flex h-96 flex-col justify-center gap-5 text-center">
            <Spinner aria-label="data loading" />
            <Text>{text}</Text>
        </div>
    );
}
