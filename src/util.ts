// import fetch from 'isomorphic-fetch';

export function getJSON(url: string): Promise<any> {
    return fetch(url, {
        headers: {
            'Content-type': 'application/json',
        },
    }).then((rawResponse: Response) => rawResponse.json());
}

export function postJSON(url: string, postParams: any): Promise<any> {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(postParams),
    }).then((rawResponse: Response) => rawResponse.json());
}

export function secondsToHMS(seconds: number): string {
    const secondPart: number = seconds % 60;
    const ss: string = secondPart < 10 ? '0' + secondPart.toFixed(2) : secondPart.toFixed(2);
    if (seconds < 60) {
        return `${ss}`;
    }
    const minutes: number = Math.floor(seconds / 60);
    const minutePart: number = minutes % 60;
    const mm: string = minutes >= 60 && minutePart < 10 ? '0' + minutePart : minutePart.toString();
    if (minutes < 60) {
        return `${mm}:${ss}`;
    }
    const hh: string = Math.floor(minutes / 60).toString();
    return `${hh}:${mm}:${ss}`;
}

export function msToHMS(milliseconds: number): string {
    const HMS: string = secondsToHMS(Math.floor(milliseconds / 1000));
    const hundredths: number = Math.round((milliseconds % 1000) / 10);
    return `${HMS}.${hundredths}`;
}
