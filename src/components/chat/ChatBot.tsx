import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from '../ui/Card'
import Image from 'next/image'

const ChatBot = () => {
    return (
        <Card className="overflow-hidden" x-chunk="Page-07-chunk-4">
            <CardHeader>
                <CardTitle>AI Helper</CardTitle>
                <CardDescription>
                    We{"'"}re here to help you deal with customers
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <Image
                        alt="Ad Or Company Logo"
                        className="w-full rounded-md object-fit"
                        height="100"
                        src="/banner.png"
                        width="300"
                    />
                    <div className="grid grid-cols-3 gap-2">
                        <button>BUTTON</button>
                        <button>BUTTON</button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ChatBot