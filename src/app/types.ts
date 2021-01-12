import { Observable } from 'rxjs';
import { format, parse, eachDayOfInterval } from 'date-fns';

/** Person type, for now on only has name and available hours */

export interface Person{
    id : string;
    name : string;
    timetable : {[timeCode : string]: boolean};
}

export interface YearDay{
    hour: number;
    day: number;
    month: number;
    year: number;
}

export interface CollectionSettings{
    startDate: string;
    endDate: string;
    startHour: number;
    endHour: number;
    mode: string;
}

export function timeToString(hour: number, day: number, month: number, year: number) : string{
    var date: Date = new Date();
    date.setFullYear(year, month);
    date.setHours(hour);
    date.setDate(day);

    return format(date, "yyyy-MM-dd'T'HH");
}

export function stringToTime(time : string) : YearDay{
    var date: Date = parse(time, "yyyy-MM-dd'T'HH", new Date());
    var hour : number = date.getHours();
    var day : number = date.getDate();
    var month : number = date.getMonth();
    var year : number = date.getMonth();

    var ans: YearDay = {
        hour: hour,
        day: day,
        month: month,
        year: year    
    };

    return ans;
}

export function getDaysBetween(startTime: string, endTime: string){
    var startDate: Date = parse(startTime, "yyyy-MM-dd'T'HH", new Date());
    var endDate: Date = parse(endTime, "yyyy-MM-dd'T'HH", new Date());

    var interval = eachDayOfInterval(
        {start: startDate, end: endDate}
    );

    var ans: string[] = [];

    for (let day_id in interval){
        var dateString: string = format(interval[day_id], "yyyy-MM-dd");
        ans.push(dateString);
    }

    return ans;
}

export function convertToTinyFormat(startTime: string) : [string, string]{
    var date: Date = parse(startTime, "yyyy-MM-dd", new Date());
    var day: string = format(date, "ccc")[0];
    var number: string = format(date,"dd");

    return [day,number];
}

export function convertToTinyHours(time: string) : string{
    var date: Date = parse(time, "HH", new Date());
    var simpleDate: string = format(date, "HH");

    return simpleDate;
}