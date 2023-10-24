// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(arrOfArrays) {
    const arrayOfObjects = [];
    arrOfArrays.forEach(subarray => {
        arrayOfObjects.push(createEmployeeRecord(subarray))
    });
    return arrayOfObjects
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const dateArray = dateStamp.split(" ")
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: Number(dateArray[1]),
        date: dateArray[0]
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const dateArray = dateStamp.split(" ")
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(dateArray[1]),
        date: dateArray[0]
    })
    return employeeRecord
}

function hoursWorkedOnDate(hoursWorkedOnDateEmployeeRecord, hoursWorkedOnDateDateStamp) {
    const timeIn = hoursWorkedOnDateEmployeeRecord.timeInEvents.find((timeIn) => timeIn.date === hoursWorkedOnDateDateStamp)
    const timeOut = hoursWorkedOnDateEmployeeRecord.timeOutEvents.find((timeOut) => timeOut.date === hoursWorkedOnDateDateStamp)
    return ((timeOut.hour - timeIn.hour) / 100)
}

function wagesEarnedOnDate(wagesEarnedOnDateEmployeeRecord, wagesEarnedOnDatedateStamp) {
    let returnNumber = hoursWorkedOnDate(wagesEarnedOnDateEmployeeRecord, wagesEarnedOnDatedateStamp) * wagesEarnedOnDateEmployeeRecord.payPerHour
    return returnNumber
}

function allWagesFor(employeeRecord) {
    let wageReturnAll = 0;
    employeeRecord.timeInEvents.forEach(obj => {
        wageReturnAll = wageReturnAll + wagesEarnedOnDate(employeeRecord, obj.date)
    })
    return wageReturnAll
}

function calculatePayroll(arrOfEmployeeRecords) {
    let sumToPay = 0;
    arrOfEmployeeRecords.forEach(employee => {
        sumToPay = sumToPay + allWagesFor(employee)
    })
    return sumToPay
}