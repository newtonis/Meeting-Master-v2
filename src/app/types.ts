import { Observable } from 'rxjs';
import { format, parse, eachDayOfInterval } from 'date-fns';
import { User } from 'firebase';

/** Person type, for now on only has name and available hours */

export interface UserData{
    id: string;
    name: string;
    email: string;
    image_url: string;
}
export interface Person{
    id : string;
    name : string;
    image_url : string;
    email : string;
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
    id: string;
    weekdays: number[];
    owner: string;
}

export function createUserData(
    id: string,
    name: string,
    email: string,
    image_url: string
){
    return {
        id: id,
        name: name,
        email: email,
        image_url: image_url
    }
}

export function generateUserData(user: firebase.User) : UserData{
    return {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        image_url: user.photoURL
    }
}

export function createPerson(
    userData: UserData,
    timetable : {[timeCode:string] : boolean}
) : Person{
    return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        image_url: userData.image_url,
        timetable: timetable
    }
}

export function createCollectionSettingsDateMode(
    id,
    owner,
    startDate,
    endDate,
    startHour,
    endHour
) : CollectionSettings{

    return {
        startDate: startDate,
        endDate: endDate,
        startHour: startHour,
        endHour: endHour,
        mode: "date",
        id: id,
        weekdays:[],
        owner: owner
    }
}

export function createCollectionSettingsWeekMode(
    id,
    owner,
    startHour,
    endHour,
    weekdays: number[]
) : CollectionSettings{

    return {
        startDate:"void",
        endDate:"void",
        startHour:startHour,
        endHour:endHour,
        mode:"week",
        id: id,
        weekdays: weekdays,
        owner: owner
    }
}
export function createVoidCollectionSettings(){
    return {
        startDate:"void",
        endDate:"void",
        startHour:0,
        endHour:0,
        mode:"not found",
        id: "void",
        weekdays: [],
        owner:null
    }
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

export function convertToTinyFormat(startTime: string, mode: string) : [string, string]{
    if (mode == "date"){
        return convertToTinyFormatDateMode(startTime);
    }else if(mode == "week"){
        return convertToTinyFormatWeekMode(startTime);
    }
}
export function convertToTinyFormatDateMode(startTime: string) : [string, string]{
    var date: Date = parse(startTime, "yyyy-MM-dd", new Date());
    var day: string = format(date, "ccc");
    var number: string = format(date,"dd");

    return [day,number];
}
export function convertToTinyFormatWeekMode(startTime: string) : [string, string]{
    var day: string = "Mon";
    if (startTime == "00"){
        day = "Mon";
    }else if(startTime == "01"){
        day = "Tue";
    }else if(startTime == "02"){
        day = "Wed";
    }else if(startTime == "03"){
        day = "Thu";
    }else if(startTime == "04"){
        day = "Fri";
    }else if(startTime == "05"){
        day = "Sat";
    }else if(startTime == "06"){
        day = "Sun";
    }
    var number: string = startTime;

    return [day,number];
}

export function getMonthCode(startTime: string){
    var date: Date = parse(startTime, "yyyy-MM-dd", new Date());

    var month: string = format(date, "MMM");

    return month;
}

export function convertToTinyHours(time: string) : string{
    var date: Date = parse(time, "HH", new Date());
    var simpleDate: string = format(date, "HH");

    return simpleDate;
}

/* 

    mergeTimetables(people: Person[])

    merge all timetables, they show times user can't go meeting

*/
export function mergeTimetables(people: Person[], selected_people: {[id: string] : boolean}) : {[value: string] : boolean}{
    var answer : {[value: string] : boolean} = {};

    for (let person of people){
        if (person.id in selected_people){
            if (selected_people[person.id] == true){
                answer = Object.assign({}, person.timetable, answer);
            }
        }
    }
    return answer;
    // no
}