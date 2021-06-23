//https://stackoverflow.com/questions/26370688/convert-a-julian-date-to-regular-date-in-javascript

function dateToJulianNumber(d) {
    // convert a Gregorian Date to a Julian number.
    //    S.Boisseau / BubblingApp.com / 2014
    var x = Math.floor((14 - d.getMonth()) / 12);
    var y = d.getFullYear() + 4800 - x;
    var z = d.getMonth() - 3 + 12 * x;

    var n = d.getDate() + Math.floor(((153 * z) + 2) / 5) + (365 * y) + Math.floor(y / 4) + Math.floor(y / 400) - Math.floor(y / 100) - 32045;

    return n;
}

// assert September 30 2014 -> 2456931
//console.log(dateToJulianNumber(new Date(2014, 9, 30)).toString());

function julianIntToDate(n) {
    // convert a Julian number to a Gregorian Date.
    //    S.Boisseau / BubblingApp.com / 2014
    var a = n + 32044;
    var b = Math.floor(((4 * a) + 3) / 146097);
    var c = a - Math.floor((146097 * b) / 4);
    var d = Math.floor(((4 * c) + 3) / 1461);
    var e = c - Math.floor((1461 * d) / 4);
    var f = Math.floor(((5 * e) + 2) / 153);

    var D = e + 1 - Math.floor(((153 * f) + 2) / 5);
    var M = f + 3 - 12 - Math.round(f / 10);
    var Y = (100 * b) + d - 4800 + Math.floor(f / 10);

    return new Date(Y, M, D);
}

function getMonthFromJulianDay(d) {
    //para ano bisexto
    switch (d) {
        case d <= 31:
            return '0';
        case d > 31 && d <= 59:
            return '1';
        case d > 59 && d <= 90:
            return '2';
        case d > 90 && d <= 120:
            return '3';
        case d > 120 && d <= 151:
            return '4';
        case d > 151 && d <= 181:
            return '5';
        case d > 181 && d <= 212:
            return '6';
        case d > 212 && d <= 243:
            return '7';
        case d > 243 && d <= 273:
            return '8';
        case d > 273 && d <= 304:
            return '9';
        case d > 304 && d <= 334:
            return '10';
        case d > 334 && d <= 365:
            return '11';
    }
}

export function transformJulianDaytoDate2021(d) {
    var um_jan_2021 = dateToJulianNumber(new Date(2021, getMonthFromJulianDay(d), 1));
    var Julian_day_to_monthDay = um_jan_202x + d;
    return julianIntToDate(Julian_day_to_monthDay);
}


// assert 2456931 -> September 30 2014
//console.log(julianIntToDate(2456931).toString());