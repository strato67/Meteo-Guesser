export class Question {

    private location: string;
    private weather: string;
    private temperature: number;
    private questionType: string | null;


    public constructor(location: string, weather: string, temperature: number) {
        this.location = location;
        this.weather = weather;
        this.temperature = temperature;
        this.questionType = null;

    }

    public getLocation(): string {
        return this.location;
    };

    public getWeather(): string {
        return this.weather;
    }

    public getTemperature(): number {
        return this.temperature;
    }

    public setQuestionType(questionType: string): void {
        this.questionType = questionType;
    };

    public getQuestionType(): string | null {
        return this.questionType;
    };

    public generateQuestion(): string {

        const indexToExclude = Math.floor(Math.random() * 3);

        const questionMap: Record<number, {value:string|number, questionType: string}> = {
            0: {value: this.getLocation(), questionType: "location"},
            1: {value: this.getWeather(), questionType: "weather"},
            2: {value: this.getTemperature(), questionType: "temperature"}
        };

        questionMap[indexToExclude].value = "__";
        
        this.setQuestionType(questionMap[indexToExclude].questionType);

        const question = `The weather in ${questionMap[0].value} is ${questionMap[1].value} and ${questionMap[2].value}`;

        return question;

    };


};