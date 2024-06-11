const convertTemp = (temperatureString: string, fahrenheit:boolean) => {
    const tempValueMatch = temperatureString.match(/[\d.]+/g);
    if (tempValueMatch) {
        const tempValue = parseFloat(tempValueMatch.at(-1)!);
        let numValue = tempValue - 273;

        if (fahrenheit) {
            numValue = (numValue * 9) / 5 + 32;
        }

        const tempString = fahrenheit
            ? `${numValue.toFixed()}°F`
            : `${numValue.toFixed()}°C`;

        temperatureString = temperatureString.replace(
            tempValue.toString(),
            tempString
        );
    }
    return temperatureString;
};


export {convertTemp}