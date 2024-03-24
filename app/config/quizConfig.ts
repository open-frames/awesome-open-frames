type QuestionConfig = {
    title: string; // question printed in image
    options: {
        buttonText: string;
        value: string;
    }[];
}

export const QUIZ_CONFIG: QuestionConfig[] = [
    {
        title: 'Who is your ideal captain this gameweek?',
        options: [
            { buttonText: 'Erling Haaland', value: '1' },
            { buttonText: 'Bukayo Saka', value: '2' },
            { buttonText: 'Darwin Nunez', value: '3' },
            { buttonText: 'Marcus Rashford', value: '4' },
        ]
    },
    {
        title: 'Which budget midfielder has been performing exceptionally well in recent fixtures?',
        options: [
            { buttonText: 'Wataru Endo', value: '1' },
            { buttonText: 'Kobbie Mainoo', value: '2' },
            { buttonText: 'Declan Rice', value: '3' },
            { buttonText: 'Bryan Mbuemo ', value: '4' },
        ]
    },
    {
        title: 'Which teams have the easiest run of fixtures in the next few Gameweeks, making their players attractive options?',
        options: [
            { buttonText: 'Manchester City', value: '1' },
            { buttonText: 'Tottenham', value: '2' },
            { buttonText: 'Manchester United', value: '3' },
            { buttonText: 'Arsenal FC', value: '4' },
        ]
    },
]