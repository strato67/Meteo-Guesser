export class Question {

    private location: string;
    private weather: string;
    private temperature: number;


    public constructor(location: string, weather: string, temperature: number) {
        this.location = location;
        this.weather = weather;
        this.temperature = temperature;

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

    public generateQuestion(): string {

        const indexToExclude = Math.floor(Math.random() * 3);

        const questionMap: Record<number, string|number> = {
            0: this.getLocation(),
            1: this.getWeather(),
            2: this.getTemperature()
        };

        questionMap[indexToExclude] = "__";
         
        const question = `The weather in ${questionMap[0]} is ${questionMap[1]} and ${questionMap[2]}`;

        return question;

    };


};



// The weather in __ is $weather and $temperature

// The weather in $location is __ and $temperature

// The weather in $location is $weather and __