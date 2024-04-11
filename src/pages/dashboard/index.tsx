import { useEffect, useState } from "react";
import Navbar from "../ui/Navbar";
import ThemeButton from "../ui/ThemeButton";
import { inter } from '~/fonts';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Badge } from "~/components/ui/badge";

export default function Dashboard() {
    const [events, setEvents] = useState<event[]>([]);

    type event = {
        name: string,
        type: 'seminar' | 'workshop' | 'hackathon',
        date: string
    }

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`)
            .then(data => data.json())
            .then(jsonData => setEvents(jsonData.events));
    }, []);    

    return (
        <div className={`flex flex-col items-center w-screen h-screen bg-background text-primary ${inter}`}>
            <ThemeButton />
            <Navbar />
            <div className="w-full flex flex-col items-center mt-5">
                <h1 className="text-3xl font-semibold text-primary my-5">Your Events</h1>
                <div className="p-7 grid grid-cols-3 w-3/4 gap-3">
                    {
                        events.map((e: event) => {
                            return (
                                <Card key={e.name} className="hover:scale-105 transition duration-200">
                                    <CardHeader>
                                        <CardTitle>{e.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-row items-center justify-between">
                                        <span className="text-primary text-lg">
                                            {e.date}
                                        </span>
                                        <Badge>{e.type}</Badge>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}