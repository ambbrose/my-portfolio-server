"use client";

import { useState, useEffect } from "react";

import { ImagePlus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";

interface UploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
};

const ImageUpload: React.FC<UploadProps> = ({ value, disabled, onChange, onRemove }) => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    if (!mounted) {
        return null;
    };

    return (
        <main className="mb-4 py-3 gap-y-8 flex gap-4">
            {value.map((url) => (
                <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <div className="z-10 absolute top-2 right-2">
                        <Button
                            type="button"
                            onClick={() => onRemove(url)}
                            variant={'destructive'}
                            size={'icon'}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>

                    <Image
                        fill
                        className='object-cover'
                        alt='Image'
                        src={url}
                    />
                </div>
            ))}

            <CldUploadWidget onUpload={onUpload} uploadPreset='mhq3pb84'>
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }

                    return (
                        <Button
                            type='button'
                            disabled={disabled}
                            variant={'secondary'}
                            onClick={onClick}
                        >
                            <ImagePlus className='h-4 w-4 mr-2' />
                            Upload an image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </main>
    );
};

export default ImageUpload;