/**
 * Created by sumit on 19/10/16.
 */


var udata, bookingData,
    subcategory = [],
    monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var COMPLETED_JOB_TEXT = "The job has now been completed, for any complaints or feedback, please call HomeGenie Support Team on +97144489595 or support@homegenie.me",
    GENIE_REQUESTED = "Sit back and We are currently searching a Genie for you.",
    GENIE_NOT_ASSIGNED = "Apologies, we were not able to assign a Genie to your booking. We look forward to serving you again !",
    GENIE_ASSIGNED = "In case you wish to reach your Genie and are not able to get through, you can contact his supervisor SUPERVISIOR on +971PHONENO. For any complaints or feedback, please call HomeGenie Support Team on +97144489595 or support@homegenie.me",
    ADVANCE_PAY_NOTE = "There is an advance payment of <span style='font-weight:600;'>AED AMOUNT</span> applicable to this service which will be charged following the acceptance of estimate.";

$(document).ready(function () {
    getmybookings();
    if (localStorage.notification == 'true') {
        setTimeout(function () {
            if (!$(".body").hasClass('modal-open')) {
                $('.body').addClass('modal-open');
            }
        }, 600);
        getBookingDetails(localStorage.id, 'ongoing');
        localStorage.setItem('notification', 'false');
    }
    if (localStorage.showGenieProfile == 'true') {
        var getDriverId = localStorage.genieDriverId;
        showGenieProfile(getDriverId);
        localStorage.showGenieProfile = 'false';
    } else {

    }
    getPendingRatingJobs()
});



function autocompleteSearch() {
    $('#search-ongoing, #search-completed').devbridgeAutocomplete({
        lookup: subcategory,
        minChars: 1,
        appendTo: ".bookingSearch",
        onSelect: function (suggestion) {
            var bookingsearchinput = suggestion.value;
            $('.ongoingbookingsearch').each(function () {
                var service = $(this).attr("data");
                var re = new RegExp(bookingsearchinput, 'gi');

                if (service.substring(0, bookingsearchinput.length).toLowerCase().trim() !== bookingsearchinput.toLowerCase().trim()) {
                    $(this).addClass('hidden');
                } else {
                    $(this).removeClass('hidden');
                }
                if ((service.trim()).match(re)) {
                    $(this).removeClass('hidden');
                }
            });
            $('.completedbookingsearch').each(function () {
                var service = $(this).attr("data");
                var re = new RegExp(bookingsearchinput, 'gi');
                if (service.substring(0, bookingsearchinput.length).toLowerCase().trim() !== bookingsearchinput.toLowerCase().trim()) {
                    $(this).addClass('hidden');
                } else {
                    $(this).removeClass('hidden');
                }
                if ((service.trim()).match(re)) {
                    $(this).removeClass('hidden');
                }
            });
        },
        showNoSuggestionNotice: true,
        noSuggestionNotice: 'Sorry, no matching results'
    });
}

function updateOngoingAndCompletedBooking(results) {
    var data = {},
        htmlongoing, htmlcompleted, bookingOngoing, bookingPast;
    bookingOngoing = results.data.upcomingAppointment;
    bookingPast = results.data.pastBooking;
    for (var k in bookingOngoing) {
        var slot, date, month, day, year, bookingdate;
        slot = {
            "1": "1AM - 3AM",
            "2": "2AM - 4AM",
            "3": "3AM - 5AM",
            "4": "4AM - 6AM",
            "5": "5AM - 7AM",
            "6": "6AM - 8AM",
            "7": "7AM - 9AM",
            "8": "8AM - 10AM",
            "9": "9AM - 11AM",
            "10": "10AM - 12AM",
            "11": "11AM - 1PM",
            "12": "12PM - 2PM",
            "13": "1PM - 3PM",
            "14": "2PM - 4PM",
            "15": "3PM - 5PM",
            "16": "4PM - 6PM",
            "17": "5PM - 7PM",
            "18": "6PM - 8PM",
            "19": "7PM - 9PM",
            "20": "8PM - 10PM",
            "21": "9PM - 11PM",
            "22": "10PM - 12PM",
            "23": "11PM - 1AM",
            "0": "12AM - 2AM"
        };
        bookingOngoing[k]["slotBooked"]["slot"] = slot[bookingOngoing[k]["slotBooked"]["slot"]];
        date = new Date(bookingOngoing[k]["scheduleDate"]);
        month = monthArray[date.getMonth()];
        day = dayArray[date.getDay()];
        year = date.getFullYear();
        date = date.getDate();
        bookingOngoing[k]["scheduleDate"] = day + " " + date + " " + month + " " + year + " | " + bookingOngoing[k]["slotBooked"]["slot"];
        bookingOngoing[k]["dateScheduled"] = bookingOngoing[k]["slotBooked"]["slot"] + ", " + month + " " + date;
        bookingdate = bookingOngoing[k]["utc_timing"]["requestedTime"];
        bookingdate = new Date(bookingdate).toLocaleString();
        bookingdate = bookingdate.split(",");

        bookingOngoing[k]["utc_timing"]["requestedTime"] = bookingdate;
        if (bookingOngoing[k]["favouriteGenie"] === "FALSE") {
            bookingOngoing[k]["favouriteGenie"] = false;
        }
        //for total charges
        var totalCharge = bookingOngoing[k]["charges"]["totalCharges"];
        if (!totalCharge && bookingOngoing[k]["status"] !== "CANCELLED") {
            bookingOngoing[k]["charges"]["totalCharges"] = "To be decided";
        }
        if (bookingOngoing[k]["charges"]["unitCharges"]) {
            bookingOngoing[k]["services"] = "Fixed price";
            bookingOngoing[k]["charges"]["totalCharges"] = bookingOngoing[k]["charges"]["unitCharges"];
        } else {
            bookingOngoing[k]["services"] = "Inspection based";
        }
        if (bookingOngoing[k]["charges"]["estimateCharges"]) {
            bookingOngoing[k]["charges"]["totalCharges"] = bookingOngoing[k]["charges"]["estimateCharges"];
        }
        if (totalCharge == bookingOngoing[k]["charges"]["cancellationCharges"]) {
            bookingOngoing[k]["charges"]["totalCharges"] = totalCharge;
        }
        if (bookingOngoing[k]["payment"] && bookingOngoing[k]["payment"]["payment_type"] === "null" && !bookingOngoing[k].advancePayment) {
            bookingOngoing[k]["payment"]["payment_type"] = "On Completion";
        }


        bookingOngoing[k]["Payment"] = true;
        var status = bookingOngoing[k]["status"];
        switch (status) {
            case "REQUESTED":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = true;
                bookingOngoing[k]["showAction"] = "";
                break;
            case "ASSIGNED":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                if (bookingOngoing[k].advancePayment && bookingOngoing[k]["charges"]["advanceCharges"] && bookingOngoing[k]["advance_payment"]["payment_type"] == "null" && bookingOngoing[k]["payment"]["payment_type"] == "null") {
                    bookingOngoing[k]["Cancel"] = false;
                    bookingOngoing[k]["Accept"] = true;
                    bookingOngoing[k]["showAction"] = "Pay Advance";
                    bookingOngoing[k]["reditems"] = "action-substatus";
                } else if (bookingOngoing[k].advancePayment && bookingOngoing[k]["charges"]["advanceCharges"] && bookingOngoing[k]["advance_payment"]["payment_type"] == "null" && bookingOngoing[k]["payment"]["payment_type"] == "CASH") {
                    bookingOngoing[k]["Cancel"] = true;
                    bookingOngoing[k]["Accept"] = false;
                    bookingOngoing[k]["showAction"] = "Await Collection";
                    bookingOngoing[k]["reditems"] = "";
                } else {
                    bookingOngoing[k]["Cancel"] = true;
                }
                break;
            case "CANCELLED":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = true;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                bookingOngoing[k]["showAction"] = "Pay Charges";
                bookingOngoing[k]["reditems"] = "action-substatus";
                if ((bookingOngoing[k]["charges"]["totalCharges"] == 0 || !bookingOngoing[k]["driverData"]) && (bookingOngoing[k]["serviceType"] == "EMERGENCY" || bookingOngoing[k]["serviceType"] == "SAMEDAY")) {
                    bookingOngoing[k]["Payment"] = false;
                    bookingOngoing[k]["showAction"] = "Pay charges";
                    bookingOngoing[k]["reditems"] = "action-substatus";
                } else if (bookingOngoing[k]["charges"]["totalCharges"] == 0 || !bookingOngoing[k]["driverData"]) {
                    bookingOngoing[k]["Payment"] = false;
                    bookingOngoing[k]["showAction"] = "";
                    bookingOngoing[k]["reditems"] = "";
                }
                if (bookingOngoing[k]["payment"] && bookingOngoing[k]["payment"]["payment_type"] == "CASH") {
                    bookingOngoing[k]["Payment"] = false;
                    bookingOngoing[k]["showAction"] = "Await Collection";
                    bookingOngoing[k]["reditems"] = "";
                }
                break;
            case "PAYMENT_PENDING":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = true;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                bookingOngoing[k]["showAction"] = "Pay Final Payment";
                bookingOngoing[k]["reditems"] = "action-substatus";
                if (bookingOngoing[k]["payment"] && bookingOngoing[k]["payment"]["payment_type"] == "CASH") {
                    bookingOngoing[k]["Payment"] = false;
                    bookingOngoing[k]["showAction"] = "Await collection";
                    bookingOngoing[k]["reditems"] = "";

                }
                break;
            case "IN_SERVICE":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                bookingOngoing[k]["SingleButton"] = true;
                bookingOngoing[k]["showAction"] = "Await Completion";
                break;
            case "RATING":
                bookingOngoing[k]["RateGenie"] = true;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                bookingOngoing[k]["showAction"] = "Rate Genie";
                bookingOngoing[k]["reditems"] = "action-substatus";
                break;
            case "COMPLAINT_REGISTERED":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                break;
            case "INSPECTION":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = true;
                if (bookingOngoing[k].advancePayment && !bookingOngoing[k]["charges"]["unitCharges"]) {
                    bookingOngoing[k]["Accept"] = true;
                    bookingOngoing[k]["Cancel"] = false;
                    bookingOngoing[k]["showAction"] = "Pay Advance";
                    bookingOngoing[k]["reditems"] = "action-substatus";
                    if (bookingOngoing[k].charges.estimateCharges == bookingOngoing[k].charges.advanceCharges) {
                        bookingOngoing[k]["advancePayment"] = bookingOngoing[k].charges.vatFinalCharges;
                    }
                }
                if (!bookingOngoing[k]["isInspectionCompleted"]) {
                    bookingOngoing[k]["Cancel"] = false;
                    bookingOngoing[k]["showAction"] = "Await Estimate";
                } else if (bookingOngoing[k]["isInspectionCompleted"] && !bookingOngoing[k].advancePayment) {
                    bookingOngoing[k]["showAction"] = "Accept Estimate";
                    bookingOngoing[k]["reditems"] = "action-substatus";
                    bookingOngoing[k]["Accept"] = true;
                    bookingOngoing[k]["Cancel"] = false;
                    bookingOngoing[k]["advancePayment"] = 0;
                }
                if (bookingOngoing[k].advancePayment && bookingOngoing[k]["charges"]["advanceCharges"] && bookingOngoing[k]["advance_payment"]["payment_type"] == "null" && bookingOngoing[k]["payment"]["payment_type"] == "null") {
                    bookingOngoing[k]["Cancel"] = false;
                    bookingOngoing[k]["Accept"] = true;
                    bookingOngoing[k]["showAction"] = "Accept and Pay Advance";
                    bookingOngoing[k]["reditems"] = "action-substatus";
                    bookingOngoing[k]["advancePayment"] = bookingOngoing[k].advancePayment;
                } else if (bookingOngoing[k]["payment"]["payment_type"] == "CASH") {
                    bookingOngoing[k]["Cancel"] = false;
                    bookingOngoing[k]["Accept"] = false;
                    bookingOngoing[k]["showAction"] = "Await Collection";
                    bookingOngoing[k]["reditems"] = "";
                    bookingOngoing[k]["advancePayment"] = bookingOngoing[k].advancePayment;
                }

                break;
            case "RESCHEDULED":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                bookingOngoing[k]["Accept"] = true;
                if (bookingOngoing[k]["payment"] && bookingOngoing[k]["payment"]["payment_type"] == "CASH") {
                    bookingOngoing[k]["Accept"] = false;
                }
                break;
            case "REJECTED":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = true;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                bookingOngoing[k]["charges"]["totalCharges"] = bookingOngoing[k]["charges"]["callOutCharges"];
                bookingOngoing[k]["showAction"] = "Pay Call-out charges";
                bookingOngoing[k]["reditems"] = "action-substatus";
                if (bookingOngoing[k]["payment"] && bookingOngoing[k]["payment"]["payment_type"] == "CASH") {
                    bookingOngoing[k]["Payment"] = false;
                    bookingOngoing[k]["showAction"] = "Await Collection";
                    bookingOngoing[k]["reditems"] = "";
                }
                break;
            case "ENROUTE":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                bookingOngoing[k]["showAction"] = "Await Arrival";
                break;
            case "UNFINISHED":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                break;
            case "REESTIMATE":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                bookingOngoing[k]["SingleButton"] = true;
                bookingOngoing[k]["showAction"] = "Await Estimate";
                break;
            case "UNASSIGNED":
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
            case "EXPIRED":
                bookingOngoing[k]["RateGenie"] = false;
                if (bookingOngoing[k] && bookingOngoing[k].charges && bookingOngoing[k].charges.totalCharges == 0) {
                    console.log("into if");
                    bookingOngoing[k]["Payment"] = false;
                } else {
                    console.log("into else");
                    bookingOngoing[k]["Payment"] = true;
                }
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                if (bookingOngoing[k]["payment"] && bookingOngoing[k]["payment"]["payment_type"] == "CASH") {
                    bookingOngoing[k]["Payment"] = false;
                }
                break;
            default:
                bookingOngoing[k]["RateGenie"] = false;
                bookingOngoing[k]["Payment"] = false;
                bookingOngoing[k]["View"] = true;
                bookingOngoing[k]["Cancel"] = false;
                break;
        }
    }
    for (var k in bookingPast) {
        var slot = {
            "1": "1AM - 3AM",
            "2": "2AM - 4AM",
            "3": "3AM - 5AM",
            "4": "4AM - 6AM",
            "5": "5AM - 7AM",
            "6": "6AM - 8AM",
            "7": "7AM - 9AM",
            "8": "8AM - 10AM",
            "9": "9AM - 11AM",
            "10": "10AM - 12AM",
            "11": "11AM - 1PM",
            "12": "12AM - 2PM",
            "13": "1PM - 3PM",
            "14": "2PM - 4PM",
            "15": "3PM - 5PM",
            "16": "4PM - 6PM",
            "17": "5PM - 7PM",
            "18": "6PM - 8PM",
            "19": "7PM - 9PM",
            "20": "8PM - 10PM",
            "21": "9PM - 11PM",
            "22": "10PM - 12PM",
            "23": "11PM - 1AM",
            "0": "12PM - 2AM"
        };
        if (bookingPast[k]["payment_status"] == "PENDING") {
            bookingPast[k]["payment_status"] = "SETTLED";
        }
        bookingPast[k]["slotBooked"]["slot"] = slot[bookingPast[k]["slotBooked"]["slot"]];
        var date = bookingPast[k]["scheduleDate"];
        date = new Date(date);
        month = monthArray[date.getMonth()];
        day = dayArray[date.getDay()];
        year = date.getFullYear();
        date = date.getDate();
        bookingPast[k]["scheduleDate"] = day + " " + date + " " + month + " " + year + " | " + bookingPast[k]["slotBooked"]["slot"];
        bookingPast[k]["dateScheduled"] = bookingPast[k]["slotBooked"]["slot"] + ", " + month + " " + date;
        var bookingdate = bookingPast[k]["utc_timing"]["requestedTime"];
        bookingdate = new Date(bookingdate).toLocaleString();
        bookingdate = bookingdate.split(",");

        if (subcategory.indexOf(bookingPast[k]["dateScheduled"]) === -1) {
            subcategory.push(bookingPast[k]["dateScheduled"]);
        }
        bookingPast[k]["utc_timing"]["requestedTime"] = bookingdate;
        if (bookingPast[k]["favouriteGenie"] === "FALSE") {
            bookingPast[k]["favouriteGenie"] = false;
        }
        if (bookingPast[k]["charges"]["unitCharges"]) {
            bookingPast[k]["services"] = "Fixed price";
        } else {
            bookingPast[k]["services"] = "Inspection based";
        }
        if (bookingPast[k]["payment"] && bookingPast[k]["payment"]["payment_type"] === "null") {
            bookingPast[k]["payment"]["payment_type"] = "";
        }

        var status = bookingPast[k]["status"];
        switch (status) {
            case "CANCELLED":
                if (bookingPast[k]["payment"]["payment_type"]) {
                    bookingPast[k]["showAction"] = "Cancelled and paid";
                }
                break;
            case "SETTLED":
                bookingPast[k]["showAction"] = "";
                break;
            case "REJECTED":
                bookingPast[k]["showAction"] = "Rejected and paid";
                break;
            default:
                break;
        }
    }
    data.ongoing = bookingOngoing;
    data.completed = bookingPast;

    if ((data.ongoing).length > 0) {
        htmlongoing = Mustache.render(ongoingBooking_template, data);
        $("#ongoing").html(htmlongoing);
    } else {
        $("#ongoing").html("<p class='booking-msg text-center'>You have not booked any services as yet.</p>");
    }

    if ((data.completed).length > 0) {
        htmlcompleted = Mustache.render(completedBooking_template, data);
        $("#completed").html(htmlcompleted);
    } else {
        $("#completed").html("<p class='booking-msg text-center'>You don't have any services fully delivered yet.</p>");
    }


    var params = {};
    callApi.getUrl(apiUrl + "/api/subcategory/getAllSubCategories", params, function (err, response) {
        if (!err && response) {
            var subcategoryArray = response.data;
            for (var k in subcategoryArray) {
                subcategory.push(subcategoryArray[k].subCategoryName);
            }
            autocompleteSearch();
        } else {
            callApi.error(err);
        }
    });

    initOngoingBookingSearch();
    $.LoadingOverlay("hide", true);
}

var getBookingsCount = 0;

function getmybookings() {
    var params = {};
    var userData = localStorage.getItem("h_user");
    if (userData && userData !== 'null' && userData !== 'undefined') {
        udata = JSON.parse(userData);
        updateUserInfo(udata);
    } else {
        window.location.href = "/";
    }
    if (udata && udata.data) {
        params.Auth = udata.data.accessToken;
        $.LoadingOverlay("show");
        callApi.getUrl(apiUrl + "/api/customer/getmybookings", params, function (err, result) {
            if (!err && result) {
                bookingData = result;
                var searchField = bookingData.data.upcomingAppointment;
                var searchField1 = bookingData.data.pastBooking;
                if (searchField.length > 0) {
                    for (var k in searchField) {
                        if (searchField[k]["status"]) {
                            if (subcategory.indexOf(searchField[k]["status"]) === -1) {
                                subcategory.push(searchField[k]["status"]);
                            }
                        }
                        if (searchField[k]["uniqueCode"]) {
                            subcategory.push(searchField[k]["uniqueCode"]);
                        }
                        if (searchField[k] && searchField[k]["driverData"] && searchField[k]["driverData"]["name"]) {
                            if (subcategory.indexOf(searchField[k]["driverData"]["name"]) === -1) {
                                subcategory.push(searchField[k]["driverData"]["name"]);
                            }
                        }
                    }
                }

                if (searchField1.length > 0) {
                    for (var k in searchField1) {
                        if (searchField1[k]["status"]) {
                            if (subcategory.indexOf(searchField1[k]["status"]) === -1) {
                                subcategory.push(searchField1[k]["status"]);
                            }
                        }
                        if (searchField1[k]["uniqueCode"]) {
                            subcategory.push(searchField1[k]["uniqueCode"]);
                        }
                        if (searchField1[k] && searchField1[k]["driverData"] && searchField1[k]["driverData"]["name"]) {
                            if (subcategory.indexOf(searchField1[k]["driverData"]["name"]) === -1) {
                                subcategory.push(searchField1[k]["driverData"]["name"]);
                            }
                        }
                    }
                }
                updateOngoingAndCompletedBooking(result);
            } else if (!err) {
                getBookingsCount++;
                if (getBookingsCount < 3) {
                    getmybookings();
                } else {
                    setTimeout(function () {
                        getmybookings();
                    }, 10000);
                }
            } else {
                $.LoadingOverlay("hide", true);
                callApi.error(err);
            }
        });
    }
}

/* get Expiry date based on schedule date for Membership category */
let getExpiryDateForJob = (date, subCategoryName) => {
    let duration;
    let subcatName = subCategoryName;
    if (subcatName && subcatName.indexOf('3') !== -1) {
        duration = 3;
    } else if (subcatName && subcatName.indexOf('6') !== -1) {
        duration = 6;
    } else if (subcatName && subcatName.indexOf('12') !== -1) {
        duration = 12;
    }
    let expiryDate = new Date(date);
    expiryDate.setMonth(expiryDate.getMonth() + duration);
    expiryDate.setDate(expiryDate.getDate() - 1);
    return expiryDate.toDateString();
}

let checkCategoryIsMembershipOrNot = (id, data) => {
    let isMembership = false;
    data.map(appointmentList => {
        if ((appointmentList._id === id) && (appointmentList.category && appointmentList.category.name === 'Membership')) {
            isMembership = true;
        }
    });
    return isMembership;
}

let checkMembershipOrNot = (id) => {
    return (bookingData && bookingData.data && bookingData.data.upcomingAppointment && bookingData.data.upcomingAppointment.length > 0) ? checkCategoryIsMembershipOrNot(id, bookingData.data.upcomingAppointment) : false;
}

function getBookingDetails(id, bookingstatus) {
    var appntmntId = id;
    var params = new FormData();
    params.append("appointmentId", appntmntId);
    params.Auth = udata.data.accessToken;
    params._method = "POST";
    $.LoadingOverlay("show");
    callApi.queryUrl(apiUrl + "/api/customer/getJobDetails", params, function (err, response) {
        if (!err && response) {

            var data = {},
                notes, acceptRejectTemplate, addressInfo;
            acceptRejectTemplate = '{{#id}}<div class="col-xs-6 col-sm-6 col-md-6 mp-0 column text-center cancel-req pointer" data-id="{{id}}" onclick="acceptOrRejectJob(\'{{id}}\', \'APPROVE\'{{#advancePayment}}, {{advancePayment}} {{/advancePayment}});" >\
       <button class="accept width-98 ">Accept</button>\
           </div>\
           <div class="col-xs-6 col-sm-6 col-md-6 mp-0 column text-center cancel-req pointer" data-id="{{id}}" onclick="acceptOrRejectJob(\'{{id}}\', \'REJECTED\')" data-toggle="modal" data-dismiss="modal" data-target="#reestimateOrCloseModal">\
           <button class="cancel width-98 right">Reject</button>\
           </div>{{/id}}';
            var results = JSON.parse(response);
            var newResult = JSON.parse(response);
            data.id = results.data[0]["_id"];
            data.pricedetails = results.data;
            data.servicedetails = results.data;
            if (results && results.data[0] && results.data[0].subCategory && results.data[0].subCategory.Notes) {
                data.Notes = ((results.data[0].subCategory.Notes).replace(/\n/g, '<br/>')).split("Note");
                notes = data.Notes;
                if (notes[0]) {
                    data.Notes1 = notes[0];
                }
                if (notes[1]) {
                    data.Notes2 = notes[1];
                }
            }
            if (results.data[0].serviceType == "SCHEDULED") {
                results.data[0].serviceType = "Scheduled";
            } else if (results.data[0].serviceType == "EMERGENCY") {
                results.data[0].serviceType = "Emergency";
            } else if (results.data[0].serviceType == "SAMEDAY") {
                results.data[0].serviceType = "Sameday";
            }
            if (results.data[0].charges.unitCharges) {
                data.serviceBasedType = "Fixed price service";
                var serviceBasedPrice = results.data[0].subCategory.unitCharges.firstUnitCharges;
                var restUnitCharges = results.data[0].subCategory.unitCharges.restUnitCharges;
                data.serviceCharge = "";
                if (results.data[0].subCategory.pricingUnitNote) {
                    var priceNote = results.data[0].subCategory.pricingUnitNote;
                    if (priceNote.mainUnitNote && (priceNote.mainUnitNote).match(/PRICE/g)) {
                        data.serviceCharge += priceNote.mainUnitNote.replace("PRICE", serviceBasedPrice);
                    } else {
                        data.serviceCharge += "";
                    }
                    if (priceNote.additionalUnitNote && priceNote.additionalUnitNote !== "null") {
                        if (priceNote.additionalUnitNote.match(/PRICE/g)) {
                            data.serviceCharge += (priceNote.additionalUnitNote).replace(/PRICE/, restUnitCharges);
                        } else {
                            data.serviceCharge += "<br/>" + priceNote.additionalUnitNote;
                        }
                    }
                    if (priceNote.asteriskNote && priceNote.asteriskNote !== "null") {
                        data.serviceCharge += "<br/><br/>" + priceNote.asteriskNote;
                    }
                }
            } else if (results.data[0].charges.callOutCharges) {
                data.serviceBasedType = "Inspection based service";
                data.seviceBasedPrice = results.data[0].charges.callOutCharges;
                data.hourlyCharges = results.data[0].charges.hourlyCharges;
                data.serviceCharge = "Call Out Charges* : ";
                data.totalCharges = "To be decided";
                results.data[0].charges.labourSubText = "including callout";
                var serviceBasedPrice = results.data[0].subCategory.callOutCharges;
                data.serviceCharge = "";
                if (results.data[0].subCategory.pricingUnitNote) {
                    var priceNote = results.data[0].subCategory.pricingUnitNote;
                    if (priceNote.mainUnitNote && (priceNote.mainUnitNote).match(/PRICE/g)) {
                        data.serviceCharge += priceNote.mainUnitNote.replace("PRICE", serviceBasedPrice);
                    } else {
                        data.serviceCharge += "";
                    }
                    if (priceNote.additionalUnitNote && priceNote.additionalUnitNote !== "null") {
                        data.serviceCharge += "<br/>" + priceNote.additionalUnitNote;
                    }
                    if (priceNote.asteriskNote && priceNote.asteriskNote !== "null") {
                        data.serviceCharge += "<br/><br/>" + priceNote.asteriskNote;
                    }
                }
            } else if (results.data[0].charges.callOutCharges == 0) {
                data.serviceBasedType = "Survey based service";
                data.seviceBasedPrice = results.data[0].charges.callOutCharges;
                data.hourlyCharges = results.data[0].charges.hourlyCharges;
                data.serviceCharge = "Call Out Charges* : ";
                data.totalCharges = "To be decided";
                results.data[0].charges.labourCharges = (results.data[0].charges.labourCharges).toString();
                results.data[0].charges.labourSubText = "Survey charges";
                var serviceBasedPrice = results.data[0].subCategory.callOutCharges;
                data.serviceCharge = "";
                if (results.data[0].subCategory.pricingUnitNote) {
                    var priceNote = results.data[0].subCategory.pricingUnitNote;
                    if (priceNote.mainUnitNote && (priceNote.mainUnitNote).match(/PRICE/g)) {
                        data.serviceCharge += priceNote.mainUnitNote.replace("PRICE", serviceBasedPrice);
                    } else {
                        data.serviceCharge += "";
                    }
                    if (priceNote.additionalUnitNote && priceNote.additionalUnitNote !== "null") {
                        data.serviceCharge += "<br/>" + priceNote.additionalUnitNote;
                    }
                    if (priceNote.asteriskNote && priceNote.asteriskNote !== "null") {
                        data.serviceCharge += "<br/><br/>" + priceNote.asteriskNote;
                    }
                }
            }
            data.genie = results.data[0].driverData;
            if (data.genie && data.genie.profilePicURL && !data.genie.profilePicURL.original) {
                data.genie.profilePicURL.original = "../img/genieicon.png";
                data.genie.appointmentID = appntmntId;
            }
            data.address = results.data[0].address;
            addressInfo = results.data[0].address;
            var addressAuth = {};
            addressAuth.Auth = udata.data.accessToken;

            if (bookingstatus === "past") {
                var detailData = {},
                    resultdata;
                resultdata = results.data[0];
                var slot, date, month, day, year;
                slot = {
                    "1": "1AM - 3AM",
                    "2": "2AM - 4AM",
                    "3": "3AM - 5AM",
                    "4": "4AM - 6AM",
                    "5": "5AM - 7AM",
                    "6": "6AM - 8AM",
                    "7": "7AM - 9AM",
                    "8": "8AM - 10AM",
                    "9": "9AM - 11AM",
                    "10": "10AM - 12AM",
                    "11": "11AM - 1PM",
                    "12": "12AM - 2PM",
                    "13": "1PM - 3PM",
                    "14": "2PM - 4PM",
                    "15": "3PM - 5PM",
                    "16": "4PM - 6PM",
                    "17": "5PM - 7PM",
                    "18": "6PM - 8PM",
                    "19": "7PM - 9PM",
                    "20": "8PM - 10PM",
                    "21": "9PM - 11PM",
                    "22": "10PM - 12PM",
                    "23": "11PM - 1AM",
                    "24": "12PM - 2AM"
                };
                resultdata["slot"] = slot[resultdata["slot"]];
                resultdata.services = data.serviceBasedType;

                if (resultdata["payment"]["payment_type"] == "null") {
                    resultdata["payment"]["payment_type"] = null;
                }

                if (resultdata["materials"] && resultdata["materials"].length > 0) {
                    resultdata.AdditionalCharge = [];
                    for (var k in resultdata["materials"]) {
                        var charge = {};
                        if (resultdata["materials"][k]["status"] === "IN_SERVICE") {
                            resultdata.AdditionalCharges = true;
                            charge.name = resultdata["materials"][k]["materialName"];
                            charge.price = resultdata["materials"][k]["materialPrice"];
                            (resultdata.AdditionalCharge).push(charge);
                        }
                    }
                }

                if (!resultdata.paymentPlan) {
                    resultdata.paymentPlan = "On completion";
                }
                if (resultdata && resultdata.subCategory && (resultdata.subCategory.questions).length > 0) {
                    var quesAnsTemplate = "", quesTemp1, quesTemp2, quesTemp3, newQues, newQData = {};
                    newQues = results.data[0].subCategory.questions;
                    quesTemp1 = '{{#data}}{{#DESCRIPTIVE}}<p><span class="active-color list-data-title">{{question}}</span><span class="pull-right">{{answer.answer}}</span></p>{{/DESCRIPTIVE}}{{/data}}';
                    quesTemp2 = '{{#data}}{{#WHOLE}}<p><span class="active-color list-data-title">{{question}}</span><span class="pull-right">{{answer.answer}}</span></p>{{/WHOLE}}{{/data}}';
                    quesTemp3 = '{{#data}}{{#BOOLEAN}}<p><span class="active-color list-data-title">{{question}}</span><span class="pull-right">{{answer.answer}}</span></p>{{/BOOLEAN}}{{/data}}';
                    for (var k in newQues) {
                        newQues[k][newQues[k]["type"]] = true;
                    }
                    newQData.data = newQues;
                    quesAnsTemplate += Mustache.render(quesTemp1, newQData);
                    quesAnsTemplate += Mustache.render(quesTemp2, newQData);
                    quesAnsTemplate += Mustache.render(quesTemp3, newQData);
                    results.data[0].subCategory.questions = quesAnsTemplate;
                }
                var date = results.data[0]["scheduleDate"];
                date = new Date(date);
                month = monthArray[date.getMonth()];
                day = dayArray[date.getDay()];
                year = date.getFullYear();
                date = date.getDate();
                resultdata.scheduleDate = day + " " + date + " " + month + " " + year + " | " + resultdata.slot;
                resultdata["dateScheduled"] = resultdata["slot"] + ", " + month + " " + date;

                var bookingdate = resultdata["utc_timing"]["requestedTime"];
                bookingdate = new Date(bookingdate).toLocaleString();
                bookingdate = bookingdate.split(",");
                resultdata["utc_timing"]["requestedTime"] = bookingdate;
                var jobStatus = results.data[0].status;
                if (jobStatus == "CANCELLED") {
                    resultdata["payment_status"] = "PAID";
                }
                console.log("middle", data.genie);
                if (data.genie) {

                    data.genie["GenieStatus"] = COMPLETED_JOB_TEXT;
                    data.genie.phoneNo = false;
                    data.genie.GenieNotes = results.data[0].genieNotes;
                    data.genie["additionalGenieNote"] = results.data[0].additionalGenieNote;
                    data.genie["phoneNo"] = resultdata.companyPhoneNo;
                    if (results.data[0].genieNotes || results.data[0].additionalGenieNote) {
                        data.genie["showGenieNote"] = true;
                    }
                    if (results.data[0].driverData.rating && results.data[0].driverData.ratingPersonNo) {
                        genieStar = Number(parseFloat(results.data[0].driverData.rating / results.data[0].driverData.ratingPersonNo).toFixed(1));
                        starRating = genieStar;
                        checkForDecimal = (parseFloat(genieStar).toFixed(1)).toString();
                        checkForDecimal = checkForDecimal.split('.');
                        if (checkForDecimal && checkForDecimal[1] && (checkForDecimal[1] == '4' || checkForDecimal[1] == '5' || checkForDecimal[1] == '6')) {
                            genieStar = genieStar;
                        } else {
                            genieStar = Math.round(genieStar);
                        }
                    } else {
                        genieStar = 0;
                        starRating = 0;
                    }
                    if (!genieStar) {
                        genieStar = 0;
                        starRating = 0;
                    }
                    var genieStarObj = {};
                    for (var count = 0; count < 5; count++) {
                        if (count < parseInt(genieStar)) {
                            genieStarObj[count] = 'star-filled';
                        } else if (count < parseFloat(genieStar)) {
                            genieStarObj[count] = 'star-half-fill';
                        } else {
                            genieStarObj[count] = 'star-blank';
                        }
                    }
                    data.genie["genieStar"] = genieStarObj;
                    data.genie["noOfStar"] = starRating;
                    results.data[0].driverData["noOfStar"] = starRating;
                    console.log("3")
                    if (jobStatus == "PAYMENT_PENDING" || jobStatus == "RATING") {
                        data.genie["GenieNotes"] = null;
                    }
                }
                // If bookings are made through apps or webapp then show discount note
                resultdata.showDiscountNote = false;
                if (resultdata.devicePlatform && resultdata.devicePlatform !== 'Panel') {
                    resultdata.showDiscountNote = true;
                } else {
                    resultdata.showDiscountNote = false;
                }
                resultdata.downloadInvoices = true;
                if (resultdata.billAndInvoices && !resultdata.billAndInvoices.advanceInvoice && !resultdata.billAndInvoices.finalInvoice) {
                    resultdata.downloadInvoices = false;
                } else {
                    resultdata.downloadInvoices = true;
                }
                // to fix precision issue of charges
                if (resultdata && resultdata.charges && Number(resultdata.charges.discountCharges)) {
                    resultdata.charges.discountCharges = Number(Number((resultdata.charges.discountCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.emergencyCharges)) {
                    resultdata.charges.emergencyCharges = Number(Number((resultdata.charges.emergencyCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.fridayCharges)) {
                    resultdata.charges.fridayCharges = Number(Number((resultdata.charges.fridayCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.totalCharges)) {
                    resultdata.charges.totalCharges = Number(Number((resultdata.charges.totalCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.callOutCharges)) {
                    resultdata.charges.callOutCharges = Number(Number((resultdata.charges.callOutCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.advanceCharges)) {
                    resultdata.charges.advanceCharges = Number(Number((resultdata.charges.advanceCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.cancellationCharges)) {
                    resultdata.charges.cancellationCharges = Number(Number((resultdata.charges.cancellationCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.estimateCharges)) {
                    resultdata.charges.estimateCharges = Number(Number((resultdata.charges.estimateCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.finalCharges)) {
                    resultdata.charges.finalCharges = Number(Number((resultdata.charges.finalCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.labourCharges)) {
                    resultdata.charges.labourCharges = Number(Number((resultdata.charges.labourCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.materialCharges)) {
                    resultdata.charges.materialCharges = Number(Number((resultdata.charges.materialCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.otherCharges)) {
                    resultdata.charges.otherCharges = Number(Number((resultdata.charges.otherCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.unitCharges)) {
                    resultdata.charges.unitCharges = Number(Number((resultdata.charges.unitCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.vatCharges)) {
                    resultdata.charges.vatCharges = Number(Number((resultdata.charges.vatCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.vatFinalCharges)) {
                    resultdata.charges.vatFinalCharges = Number(Number((resultdata.charges.vatFinalCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.dueCharges)) {
                    resultdata.charges.dueCharges = Number(Number((resultdata.charges.dueCharges)).toFixed(2));
                }
                if (resultdata && Number(resultdata.AdvanceAmount)) {
                    resultdata.AdvanceAmount = Number(Number((resultdata.AdvanceAmount)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.additionalCharges)) {
                    resultdata.charges.additionalCharges = Number(Number((resultdata.charges.additionalCharges)).toFixed(2));
                }
                /* show labour charge only in the following cases
                   1.Jobs Where inspection is not completed
                   2.Rejected Jobs
                   3.cancelled Jobs
                   4.Expired Jobs
               */
                if (resultdata && (!resultdata.isInspectionCompleted || resultdata.isRejected || resultdata.status === 'CANCELLED' || resultdata.status === 'EXPIRED')) {
                    resultdata.hideLabourCharges = true;
                } else {
                    resultdata.hideLabourCharges = false;
                }
                if (resultdata && (resultdata.isInspectionCompleted && !resultdata.isRejected)) {
                    resultdata.showEstimateItems = true;
                } else {
                    resultdata.showEstimateItems = false;
                }
                if (resultdata && (resultdata.isInspectionCompleted && (!resultdata.estimateItems || (resultdata.estimateItems && resultdata.estimateItems.length === 0)) && !resultdata.isRejected)) {
                    resultdata.showLabourChargeold = true;
                    resultdata.showMaterialOld = true;
                } else {
                    resultdata.showLabourChargeold = false;
                    resultdata.showMaterialOld = false;
                }
                if ((resultdata.categoryName) == "Membership") {
                    resultdata.isCategoryMembership = true;
                } else {
                    resultdata.isCategoryMembership = false;
                }



                detailData.viewDetails = resultdata;
                var detailHtml = Mustache.render(viewDetailsTemplate, detailData);
                $("#popupmodal").html(detailHtml);
                if ((resultdata.categoryName) == "Membership") {
                    $(".datetime-left").hide();
                }

                if (jobStatus == "REJECTED") {
                    $("#" + id + "-total").html(resultdata.charges.callOutCharges);
                    $("." + id + "-settledjobsubstatus").html("( - Rejected and paid )");
                } else if (jobStatus == "CANCELLED") {
                    if (results.data[0].charges.totalCharges) {
                        $("." + id + "-settledjobsubstatus").html("( - Cancelled and paid )");
                    }
                }

                var jobStatus = results.data[0].status;
                var problemImage = results.data[0].problemImages;
                var materialImages = results.data[0].materialImages;
                var problemData = {}, problemImageArray = [], problemImageTemplate;

                if (problemImage && problemImage.length > 0) {
                    for (var k in problemImage) {
                        var Imagedata = {};
                        Imagedata.thumbnail = problemImage[k].thumbnail;
                        Imagedata.original = problemImage[k].original;
                        problemImageArray.push(Imagedata);
                    }
                    problemData.problemImage = problemImageArray;
                }
                if (materialImages && materialImages.length > 0) {
                    for (var k in materialImages) {
                        var Imagedata = {};
                        Imagedata.thumbnail = materialImages[k].thumbnail;
                        Imagedata.original = materialImages[k].original;
                        problemImageArray.push(Imagedata);
                    }
                    problemData.problemImage = problemImageArray;
                }
                if ((problemImage && problemImage.length > 0) || (materialImages && materialImages.length > 0)) {
                    problemImageTemplate = '<p class="active-color">Uploaded Photo</p>\
                     {{#problemImage}}<div class="genie-box">\
                         <span class="jq_Impreview" data-loadimgjpreview="{{original}}" onclick="zoomImages(\'{{original}}\');">\
                             <img src="{{original}}" class="img-responsive" alt="{{genieName}}" style="width:100%;">\
                         </span>\
                     </div>{{/problemImage}}';
                    $(".problemImage-" + id).html(Mustache.render(problemImageTemplate, problemData));
                }

                $("#pricing-modal").html(Mustache.render(pricingtemplate, data));
                $("#address-" + id).html(Mustache.render(addressTemplate, data));
                //$(".payprice-" + id).html(Mustache.render(pricingtemplate, data));
                $("#service-modal").html(Mustache.render(serviceTemplate, data));
                if (notes && notes[0]) {
                    $("#service-included").html(notes[0]);
                    // $("#serviceDetails-note").html(notes[1]);
                }
                if (data.serviceBasedType == "Fixed price service") {
                    $("#pricingnote").html("<p style='margin-top:10px;'>Note: </p><p>Additional charges apply for Emergency and Friday bookings, based on availability and permissions from community/ building, as confirmed by the customer. VAT charges are not included and are based on the total invoice amount.</p><p style='margin-top:10px;'>For more information, check our <a href='http://www.homegenie.me/pricing-policies/' class='active-color'>pricing policy</a></p>");
                }
                $(".payservice-" + id).html(Mustache.render(serviceTemplate, data));
                $(".genie-" + id).html(Mustache.render(genieTemplate, data));
                $(".genie-" + id).removeClass("hidden");
                //$("." + id + "-req").html(jobStatus);
                // $("#popup").click();
                $(".crossImg").click(function () {
                    $(".modal-backdrop").removeClass("modal-backdrop");
                });
            } else if (bookingstatus === "ongoing") {
                var detailData = {}, resultdata;
                resultdata = results.data[0];
                resultdata.showCall = true;
                var slot, date, month, day, year;
                slot = {
                    "1": "1AM - 3AM", "2": "2AM - 4AM", "3": "3AM - 5AM",
                    "4": "4AM - 6AM", "5": "5AM - 7AM", "6": "6AM - 8AM",
                    "7": "7AM - 9AM", "8": "8AM - 10AM", "9": "9AM - 11AM",
                    "10": "10AM - 12AM", "11": "11AM - 1PM", "12": "12PM - 2PM",
                    "13": "1PM - 3PM", "14": "2PM - 4PM", "15": "3PM - 5PM",
                    "16": "4PM - 6PM", "17": "5PM - 7PM", "18": "6PM - 8PM",
                    "19": "7PM - 9PM", "20": "8PM - 10PM", "21": "9PM - 11PM",
                    "22": "10PM - 12PM", "23": "11PM - 1AM", "0": "12AM - 2AM"
                };
                var checkSlot = newResult.data[0];
                checkSlot = checkSlot.slot[0];
                checkSlot = checkSlot.toString();
                resultdata["slot"] = slot[checkSlot];
                resultdata.services = data.serviceBasedType;

                if (resultdata["payment"]["payment_type"] == "null") {
                    resultdata["payment"]["payment_type"] = null;
                }

                // for showing additional charges
                if (resultdata["materials"] && resultdata["materials"].length > 0) {
                    resultdata.AdditionalCharge = [];
                    resultdata.charges["materialCharges"] = 0;
                    resultdata.charges["additionalCharges"] = 0;
                    for (var k in resultdata["materials"]) {
                        var charge = {};
                        if (resultdata["materials"][k]["status"] === "IN_SERVICE") {
                            resultdata.AdditionalCharges = true;
                            charge.name = resultdata["materials"][k]["materialName"];
                            charge.price = resultdata["materials"][k]["materialPrice"];
                            resultdata.charges["additionalCharges"] += resultdata["materials"][k]["materialPrice"];
                            (resultdata.AdditionalCharge).push(charge);
                        }
                        if (resultdata["materials"][k]["status"] === "INSPECTION") {
                            resultdata.charges["materialCharges"] += resultdata["materials"][k]["materialPrice"];
                        }
                    }
                }

                // show due amount
                resultdata.showDueAmount = false;
                if (resultdata && (resultdata.status == 'IN_SERVICE' || resultdata.charges && resultdata.charges.finalCharges)) {
                    resultdata.showDueAmount = true;
                    if (resultdata.status == 'IN_SERVICE') {
                        if (resultdata.charges.advanceCharges == resultdata.charges.estimateCharges) {
                            resultdata.charges.dueCharges = resultdata.charges.finalCharges - resultdata.charges.vatFinalCharges;
                        } else {
                            resultdata.charges.dueCharges = resultdata.charges.finalCharges - resultdata.advancePayment;
                        }
                    } else {
                        if (resultdata.status != 'RATING') {

                            resultdata.charges.finalCharges = resultdata.charges.finalCharges;
                            resultdata.charges.dueCharges = resultdata.charges.finalCharges;
                        } else {
                            resultdata.showDueAmount = false;
                            resultdata.charges.dueCharges = 0;
                        }
                    }
                }
                if (resultdata.status == 'SETTLED') {
                    resultdata.showDueAmount = false;
                    resultdata.charges.dueCharges = 0;
                    resultdata.showCall = false;
                }
                // for displayling advance amount
                if (resultdata.advancePayment) {
                    detailData.paymentPlan = "ADVANCE";
                    if (resultdata.status == "ASSIGNED" || resultdata.status == "ENROUTE" || resultdata.status == "IN_SERVICE" || resultdata.status == "PAYMENT_PENDING") {
                        resultdata["advanceAvail"] = true;
                    }
                    if (resultdata.status == "ASSIGNED" && resultdata.charges.unitCharges && resultdata.advance_payment.payment_type == "null") {
                        resultdata["advanceAvail"] = false;
                    }
                    if (resultdata.isRejected) {
                        resultdata["advanceAvail"] = false;
                    }
                    // if advance charge and estimate charge are equal then show vatFinalCharges in advance amount
                    if (resultdata.charges.advanceCharges == resultdata.charges.estimateCharges) {
                        resultdata.AdvanceAmount = resultdata.charges.vatFinalCharges;
                    } else {
                        resultdata.AdvanceAmount = resultdata.advancePayment;
                    }
                } else {
                    detailData.paymentPlan = "Upon completion";
                }

                if ((resultdata.status == "INSPECTION" && resultdata.charges.estimateCharges) || resultdata.status == "REESTIMATE" || resultdata.status == "PAYMENT_PENDING") {
                    resultdata["breakdownNote"] = true;
                }

                var date = results.data[0]["scheduleDate"];
                date = new Date(date);
                month = monthArray[date.getMonth()];
                day = dayArray[date.getDay()];
                year = date.getFullYear();
                date = date.getDate();
                resultdata.scheduleDate = day + " " + date + " " + month + " " + year + " | " + resultdata.slot;
                resultdata["dateScheduled"] = resultdata["slot"] + ", " + month + " " + date;

                var bookingdate = resultdata["utc_timing"]["requestedTime"];
                bookingdate = new Date(bookingdate).toLocaleString();
                bookingdate = bookingdate.split(",");
                resultdata["utc_timing"]["requestedTime"] = bookingdate;
                var pricingResults = results.data[0].charges;
                if (pricingResults && results.data[0].subCategory.isInspectionRequired && (resultdata.status == "REQUESTED" || resultdata.status == "ASSIGNED" || resultdata.status == "ENROUTE" || resultdata.status == "UNASSIGNED" || (resultdata.status == "INSPECTION" && !resultdata.isInspectionCompleted))) {
                    results.data[0].charges.totalCharges = "To be decided";
                } else if (results.data[0].subCategory.isInspectionRequired && resultdata.status == "INSPECTION" && resultdata.isInspectionCompleted || resultdata.status == "RESCHEDULED" || resultdata.status == "IN_SERVICE") {
                    results.data[0].charges.totalCharges = results.data[0].charges.estimateCharges;
                    if (resultdata.status == "IN_SERVICE" && results.data[0].charges.advanceCharges) {
                        results.data[0].charges.totalCharges = results.data[0].charges.estimateCharges;
                        results.data[0].charges.finalCharges = results.data[0].charges.estimateCharges - results.data[0].charges.advanceCharges;
                    } else if (resultdata.status == "IN_SERVICE") {
                        results.data[0].charges.totalCharges = results.data[0].charges.estimateCharges;
                    }
                    //warranty
                    if (resultdata.warranty && resultdata.warranty.warrantyId) {
                        const WARRANTY = resultdata.warranty;
                        // resultdata.warrantyAvail = WARRANTY.warranty ? WARRANTY_START.replace("WARRANTY", WARRANTY.warrantyText) : NO_WARRANTY;
                    } else {
                        resultdata.warrantyAvail = NO_WARRANTY;
                    }
                } else if (pricingResults && !results.data[0].subCategory.isInspectionRequired && (resultdata.status != "PAYMENT_PENDING" && resultdata.status != "RATING")) {
                    results.data[0].charges.totalCharges = results.data[0].charges.estimateCharges;
                    if (results.data[0].advance_payment.payment_type == "CASH" || results.data[0].advance_payment.payment_type == "CARD" || results.data[0].advance_payment.payment_type == "BANK_TRANSFER") {
                        results.data[0].charges.totalCharges = results.data[0].charges.estimateCharges - results.data[0].charges.advanceCharges;
                    }
                } else if (resultdata.status == "PAYMENT_PENDING" || resultdata.status == "RATING" || resultdata.status == "REJECTED" || resultdata.status == "CANCELLED") {
                    results.data[0].charges.totalCharges = results.data[0].charges.totalCharges;
                    results.data[0].charges.finalCharges = results.data[0].charges.finalCharges;
                    if (resultdata.status == "RATING") {
                        results.data[0].charges.finalCharges = "0";
                    }


                    if (results.data[0].charges.advanceCharges) {
                        resultdata["advanceAvail"] = true;
                    }
                    if (results.data[0].isRejected) {
                        resultdata["advanceAvail"] = false;
                    }
                    if (resultdata.status == "REJECTED" || resultdata.status == "CANCELLED") {
                        results.data[0].charges.estimateCharges = Number((results.data[0].charges.callOutCharges).toFixed(2));
                        results.data[0].charges.materialCharges = 0;
                        resultdata["advanceAvail"] = false;
                        resultdata.showCall = false;
                    }
                    if (resultdata.status === "PAYMENT_PENDING" || resultdata.status === "RATING") {
                        //warranty
                        if (results.data[0].warranty && results.data[0].warranty.warrantyId) {
                            const WARRANTY = results.data[0].warranty;
                            // resultdata.warrantyAvail = WARRANTY.warranty ? WARRANTY_END.replace("WARRANTY", WARRANTY.warrantyText).replace("DATE", moment(WARRANTY.warrantyEndDate).format('DD/MM/YYYY')) : NO_WARRANTY;
                        } else {
                            resultdata.warrantyAvail = NO_WARRANTY;
                        }
                    }
                } else if (results.data[0].subCategory.isInspectionRequired && resultdata.status == "REESTIMATE" || resultdata.status == "UNFINISHED" || resultdata.status == "COMPLAINT_REGISTERED") {
                    results.data[0].charges.totalCharges = "To be decided";
                    if (results.data[0].charges.advanceCharges) {
                        resultdata["advanceAvail"] = true;
                    }
                    if (resultdata.status == "REESTIMATE") {
                        results.data[0].charges.totalCharges = results.data[0].charges.estimateCharges;
                    }
                }

                results.data[0].charges.discountCharges = Number((results.data[0].charges.discountCharges).toFixed(2));
                // for questions and answers;
                var quesAnsTemplate = "", quesTemp1, quesTemp2, quesTemp3, newQues, newQData = {};
                newQues = results.data[0].subCategory.questions;
                quesTemp1 = '{{#data}}{{#DESCRIPTIVE}}<p><span class="active-color list-data-title">{{question}}</span><span class="pull-right">{{answer.answer}}</span></p>{{/DESCRIPTIVE}}{{/data}}';
                quesTemp2 = '{{#data}}{{#WHOLE}}<p><span class="active-color list-data-title">{{question}}</span><span class="pull-right">{{answer.answer}}</span></p>{{/WHOLE}}{{/data}}';
                quesTemp3 = '{{#data}}{{#BOOLEAN}}<p><span class="active-color list-data-title">{{question}}</span><span class="pull-right">{{answer.answer}}</span></p>{{/BOOLEAN}}{{/data}}';
                for (var k in newQues) {
                    newQues[k][newQues[k]["type"]] = true;
                }
                newQData.data = newQues;
                quesAnsTemplate += Mustache.render(quesTemp1, newQData);
                quesAnsTemplate += Mustache.render(quesTemp2, newQData);
                quesAnsTemplate += Mustache.render(quesTemp3, newQData);
                results.data[0].subCategory.questions = quesAnsTemplate;
                if (results.data[0].devicePlatform !== "Panel") {
                    resultdata.webAppBased = true;
                } else {
                    resultdata.webAppBased = false;
                }
                // to fix precision issue of charges
                if (resultdata && resultdata.charges && Number(resultdata.charges.discountCharges)) {
                    resultdata.charges.discountCharges = Number(Number((resultdata.charges.discountCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.emergencyCharges)) {
                    resultdata.charges.emergencyCharges = Number(Number((resultdata.charges.emergencyCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.fridayCharges)) {
                    resultdata.charges.fridayCharges = Number(Number((resultdata.charges.fridayCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.totalCharges)) {
                    resultdata.charges.totalCharges = Number(Number((resultdata.charges.totalCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.callOutCharges)) {
                    resultdata.charges.callOutCharges = Number(Number((resultdata.charges.callOutCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.advanceCharges)) {
                    resultdata.charges.advanceCharges = Number(Number((resultdata.charges.advanceCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.cancellationCharges)) {
                    resultdata.charges.cancellationCharges = Number(Number((resultdata.charges.cancellationCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.estimateCharges)) {
                    resultdata.charges.estimateCharges = Number(Number((resultdata.charges.estimateCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.finalCharges)) {
                    resultdata.charges.finalCharges = Number(Number((resultdata.charges.finalCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.labourCharges)) {
                    resultdata.charges.labourCharges = Number(Number((resultdata.charges.labourCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.materialCharges)) {
                    resultdata.charges.materialCharges = Number(Number((resultdata.charges.materialCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.otherCharges)) {
                    resultdata.charges.otherCharges = Number(Number((resultdata.charges.otherCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.unitCharges)) {
                    resultdata.charges.unitCharges = Number(Number((resultdata.charges.unitCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.vatCharges)) {
                    resultdata.charges.vatCharges = Number(Number((resultdata.charges.vatCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.vatFinalCharges)) {
                    resultdata.charges.vatFinalCharges = Number(Number((resultdata.charges.vatFinalCharges)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.dueCharges)) {
                    resultdata.charges.dueCharges = Number(Number((resultdata.charges.dueCharges)).toFixed(2));
                }
                if (resultdata && Number(resultdata.AdvanceAmount)) {
                    resultdata.AdvanceAmount = Number(Number((resultdata.AdvanceAmount)).toFixed(2));
                }
                if (resultdata && resultdata.charges && Number(resultdata.charges.additionalCharges)) {
                    resultdata.charges.additionalCharges = Number(Number((resultdata.charges.additionalCharges)).toFixed(2));
                }
                if ((results.data[0].advancePayment && results.data[0].status == "INSPECTION") || (results.data[0].advancePayment && results.data[0].status == "ASSIGNED" && results.data[0].charges.advanceCharges)) {
                    if (results.data[0].charges.estimateCharges == results.data[0].charges.advanceCharges) {
                        resultdata.advanceNote = ADVANCE_PAY_NOTE.replace("AMOUNT", resultdata.charges.vatFinalCharges);
                    } else {
                        resultdata.advanceNote = ADVANCE_PAY_NOTE.replace("AMOUNT", resultdata.advancePayment);
                    }

                    // data.genie["showGenieNote"] = true;
                }
                if (resultdata.genieNotes || resultdata.additionalGenieNote) {
                    resultdata.showGenieNote = true;
                }
                if (jobStatus == "PAYMENT_PENDING" || jobStatus == "RATING") {
                    if (results.data[0].additionalGenieNote) {
                        resultdata.showGenieNote = true;
                    } else {
                        resultdata.showGenieNote = false;
                    }
                }

                if (resultdata && (!resultdata.isInspectionCompleted || resultdata.isRejected || resultdata.status === 'CANCELLED' || resultdata.status === 'EXPIRED')) {
                    resultdata.hideLabourCharges = true;
                } else {
                    resultdata.hideLabourCharges = false;
                }
                if (resultdata && (resultdata.isInspectionCompleted && !resultdata.isRejected)) {
                    resultdata.showEstimateItems = true;
                } else {
                    resultdata.showEstimateItems = false;
                }
                if (resultdata && (resultdata.isInspectionCompleted && (!resultdata.estimateItems || (resultdata.estimateItems && resultdata.estimateItems.length === 0)) && !resultdata.isRejected)) {
                    resultdata.showLabourChargeold = true;
                    resultdata.showMaterialOld = true;
                } else {
                    resultdata.showLabourChargeold = false;
                    resultdata.showMaterialOld = false;
                }
                if ((resultdata.categoryName) == "Membership") {
                    resultdata.isCategoryMembership = true;
                } else {
                    resultdata.isCategoryMembership = false;
                }


                if (resultdata.driverData) {
                    resultdata.driverData["noOfStar"] = resultdata.driverData.averageRating.toFixed(1);
                }
                if (resultdata.warranty && resultdata.warranty.warranty) {
                    resultdata["isWarrantyFalse"] = false;
                }
                else {
                    resultdata["isWarrantyFalse"] = true;
                }
                var walletData = 0;
                if (resultdata.advance_payment.walletTransactionId) {
                    walletData = walletData + resultdata.advance_payment.walletTransactionId.amount
                }
                if (resultdata.payment.walletTransactionId) {
                    walletData = walletData + resultdata.payment.walletTransactionId.amount
                }
                if (walletData) {
                    resultdata["walletData"] = walletData;
                }
                detailData.viewDetails = resultdata;
                var detailHtml = Mustache.render(viewDetailsTemplate, detailData);
                $("#popupmodal").html(detailHtml);
                if (resultdata.driverData) {

                    $("#finalstatus-rating").html(' <a class="genie-call-button" href="tel: +971' + resultdata.companyPhoneNo + '"><button class="genie-button"><div class="button-data"><div class="button-img"><img class="img-responsive" src="/img/call-white.svg"></div>Call Now</button></a>');
                    $(".genie-information").html("Genie has been assigned to you.");
                }
                if ((resultdata.categoryName) == "Membership") {
                    $(".datetime-left").hide();
                }
                var jobStatus = results.data[0].status;
                var problemImage = results.data[0].problemImages;
                var materialImages = results.data[0].materialImages;
                var problemData = {}, problemImageArray = [], problemImageTemplate;

                if (problemImage && problemImage.length > 0) {
                    for (var k in problemImage) {
                        var Imagedata = {};
                        Imagedata.thumbnail = problemImage[k].thumbnail;
                        Imagedata.original = problemImage[k].original;
                        problemImageArray.push(Imagedata);
                    }
                    problemData.problemImage = problemImageArray;
                }
                if (materialImages && materialImages.length > 0) {
                    for (var k in materialImages) {
                        var Imagedata = {};
                        Imagedata.thumbnail = materialImages[k].thumbnail;
                        Imagedata.original = materialImages[k].original;
                        problemImageArray.push(Imagedata);
                    }
                    problemData.problemImage = problemImageArray;
                }
                if ((problemImage && problemImage.length > 0) || (materialImages && materialImages.length > 0)) {
                    problemImageTemplate = '<p class="active-color">Uploaded Photo</p>\
                     {{#problemImage}}<div class="genie-box genie-problem-image">\
                         <span class="jq_Impreview" data-loadimgjpreview="{{original}}" onclick="zoomImages(\'{{original}}\');">\
                             <img src="{{thumbnail}}" class="img-responsive" alt="{{genieName}}" style="width:100%;">\
                         </span>\
                     </div>{{/problemImage}}';
                    $(".problemImage-" + id).html(Mustache.render(problemImageTemplate, problemData));
                }
                $("#pricing-modal").html(Mustache.render(pricingtemplate, data));
                $("#address-" + id).html(Mustache.render(addressTemplate, data));
                //$(".payprice-" + id).html(Mustache.render(pricingtemplate, data));
                $("#service-modal").html(Mustache.render(serviceTemplate, data));
                if (notes && notes[0]) {
                    $("#service-included").html(notes[0]);
                    // $("#serviceDetails-note").html(notes[1]);
                }
                if (data.serviceBasedType == "Fixed price service") {
                    $("#pricingnote").html("<p style='margin-top:10px;'>Note: </p><p>Additional charges apply for Emergency and Friday bookings, based on availability and permissions from community/ building, as confirmed by the customer. VAT charges are not included and are based on the total invoice amount.</p><p style='margin-top:10px;'>For more information, check our <a href='http://www.homegenie.me/pricing-policies/' class='active-color'>pricing policy</a></p>");
                }

                $(".payservice-" + id).html(Mustache.render(serviceTemplate, data));
                // data.genie = result
                if (data.genie) {

                    var genieStar, checkForDecimal, starRating;
                    var assignedGenieText = GENIE_ASSIGNED.replace("SUPERVISIOR", resultdata.supervisorName);
                    assignedGenieText = assignedGenieText.replace("PHONENO", resultdata.companyPhoneNo);
                    data.genie["GenieStatus"] = assignedGenieText;
                    data.genie["GenieNotes"] = results.data[0].genieNotes;
                    data.genie["additionalGenieNote"] = results.data[0].additionalGenieNote;
                    data.genie["phoneNo"] = resultdata.companyPhoneNo;
                    if (results.data[0].driverData.rating && results.data[0].driverData.ratingPersonNo) {
                        genieStar = Number(parseFloat(results.data[0].driverData.rating / results.data[0].driverData.ratingPersonNo).toFixed(1));
                        starRating = genieStar;
                        checkForDecimal = (parseFloat(genieStar).toFixed(1)).toString();
                        checkForDecimal = checkForDecimal.split('.');
                        if (checkForDecimal && checkForDecimal[1] && (checkForDecimal[1] == '4' || checkForDecimal[1] == '5' || checkForDecimal[1] == '6')) {
                            genieStar = genieStar;
                        } else {
                            genieStar = Math.round(genieStar);
                        }
                    } else {
                        genieStar = 0;
                        starRating = 0;
                    }
                    if (!genieStar) {
                        genieStar = 0;
                        starRating = 0;
                    }
                    var genieStarObj = {};
                    for (var count = 0; count < 5; count++) {
                        if (count < parseInt(genieStar)) {
                            genieStarObj[count] = 'star-filled';
                        } else if (count < parseFloat(genieStar)) {
                            genieStarObj[count] = 'star-half-fill';
                        } else {
                            genieStarObj[count] = 'star-blank';
                        }
                    }
                    data.genie["genieStar"] = genieStarObj;
                    data.genie["noOfStar"] = starRating;
                    /*if ((results.data[0].advancePayment && results.data[0].status == "INSPECTION") || (results.data[0].advancePayment && results.data[0].status == "ASSIGNED" && results.data[0].charges.advanceCharges)) {
                        if (results.data[0].charges.estimateCharges == results.data[0].charges.advanceCharges) {
                            data.advanceNote = ADVANCE_PAY_NOTE.replace("AMOUNT", resultdata.charges.vatFinalCharges);
                        } else {
                            data.advanceNote = ADVANCE_PAY_NOTE.replace("AMOUNT", resultdata.advancePayment);
                        }
   
                        data.genie["showGenieNote"] = true;
                    }*/

                }

                if (!data.genie) {
                    var genie = {};
                    genie.name = "Genie to be assigned";
                    genie.profilePicURL = {};
                    genie.profilePicURL.original = "/img/geniefade.png";
                    if (results.data[0].status == "REQUESTED") {
                        genie.GenieStatus = GENIE_REQUESTED;
                    } else {
                        genie.GenieStatus = GENIE_NOT_ASSIGNED;
                    }
                    data.genie = genie;
                }
                $(".genie-" + id).html(Mustache.render(genieTemplate, data));
                $(".genie-" + id).removeClass("hidden");
                $("." + id + "-jobstatus").html(jobStatus);
                switch (jobStatus) {
                    case "REQUESTED":
                        $("." + id + "-jobsubstatus").html("");
                        $("." + id + "-jobsubstatus").removeClass("action-substatus");

                        break;
                    case "ASSIGNED":
                        if (results.data[0].advancePayment && results.data[0]["charges"]["advanceCharges"] && results.data[0]["advance_payment"]["payment_type"] == "null" && !results.data[0]["payment"]["payment_type"]) {
                            $("." + id + "-jobsubstatus").html(" - pay advance ");
                            $("." + id + "-jobsubstatus").addClass("action-substatus");
                        } else if (results.data[0].advancePayment && results.data[0]["charges"]["advanceCharges"] && results.data[0]["advance_payment"]["payment_type"] == "null" && results.data[0]["payment"]["payment_type"] == "CASH") {
                            $("." + id + "-jobsubstatus").html(" - await collection ");
                        }
                        break;
                    case "ENROUTE":
                        $("." + id + "-jobsubstatus").html(" - Await arrival ");
                        $("." + id + "-jobsubstatus").removeClass("action-substatus");
                        $("#" + id + "-cancel").hide();
                        break;
                    case "INSPECTION":
                        if (results.data[0].advancePayment && !results.data[0]["charges"]["unitCharges"]) {
                            $("." + id + "-jobsubstatus").html(" - pay advance ");
                            $("." + id + "-jobsubstatus").addClass("action-substatus");
                        }
                        if (!results.data[0]["isInspectionCompleted"]) {
                            $("." + id + "-jobsubstatus").html(" - Await Estimate ");
                            $("." + id + "-jobsubstatus").removeClass("action-substatus");
                        } else if (results.data[0]["isInspectionCompleted"] && !results.data[0].advancePayment) {
                            $("." + id + "-jobsubstatus").html(" - Accept Estimate ");
                            $("." + id + "-jobsubstatus").addClass("action-substatus");
                            var targetExists = $("#" + id + "-accept > button").length;
                            if (!targetExists) {
                                $("#" + id + "-show").html('<span class="{{payment_status}} status-pos hidden"></span><button class="pay-now" data-id="' + id + '" onclick="acceptOrRejectJob(\'' + id + '\', \'APPROVE\',' + 0 + ')"><span class="booking-btn-align">ACCEPT</span></button>');
                            }
                            $("#" + id + "-cancel").hide();

                        }
                        if (results.data[0]["isInspectionCompleted"] && results.data[0].advancePayment && results.data[0]["charges"]["advanceCharges"] && results.data[0]["advance_payment"]["payment_type"] == "null" && results.data[0].payment.payment_type == "null") {
                            $("." + id + "-jobsubstatus").html(" - Accept and Pay Advance ");
                            $("." + id + "-jobsubstatus").addClass("action-substatus");
                            if (results.data[0].charges.advanceCharges == results.data[0].charges.estimateCharges) {
                                $("#" + id + "-cancel").html('<span class="{{payment_status}} status-pos hidden"></span><button class="pay-now" data-id="' + id + '" onclick="acceptOrRejectJob(\'' + id + '\', \'APPROVE\',' + results.data[0].charges.vatFinalCharges + ')"><span class="booking-btn-align">ACCEPT</span></button>');
                            } else {
                                $("#" + id + "-cancel").html('<span class="{{payment_status}} status-pos hidden"></span><button class="pay-now" data-id="' + id + '" onclick="acceptOrRejectJob(\'' + id + '\', \'APPROVE\',' + results.data[0].advancePayment + ')"><span class="booking-btn-align">ACCEPT</span></button>');
                            }
                            $("#" + id + "-cancel").show();
                        } else if (results.data[0]["isInspectionCompleted"] && results.data[0].advancePayment && results.data[0]["charges"]["advanceCharges"] && results.data[0]["payment"]["payment_type"] == "CASH") {
                            $("." + id + "-jobsubstatus").html(" - Await Collection ");
                            $("." + id + "-jobsubstatus").removeClass("action-substatus");
                            $("#" + id + "-cancel").hide();
                        }
                        break;
                    case "IN_SERVICE":
                        $("." + id + "-jobsubstatus").html(" - Await Completion ");
                        $("." + id + "-jobsubstatus").removeClass("action-substatus");
                        $("#" + id + "-accept").html("");
                        $("#" + id + "-show").html("");
                        break;
                    case "REESTIMATE":
                        $("." + id + "-jobsubstatus").html(" - Await Estimate ");
                        $("." + id + "-jobsubstatus").removeClass("action-substatus");
                        $("#" + id + "-show").html("");
                        break;
                    case "CANCELLED":
                        if ((results.data[0]["charges"]["totalCharges"] == 0 && !results.data[0]["driverData"])) {
                            $("." + id + "-jobsubstatus").html("");
                            $("." + id + "-jobsubstatus").removeClass("action-substatus");
                        } else if ((results.data[0]["charges"]["totalCharges"] > 0)) {
                            $("." + id + "-jobsubstatus").html(" - Pay Charges ");
                            $("." + id + "-jobsubstatus").addClass("action-substatus");
                        }
                        if (results.data[0] && results.data[0]["payment"] && results.data[0]["payment"]["payment_type"]) {
                            $("." + id + "-jobsubstatus").html(" - Await collection ");
                            $("." + id + "-jobsubstatus").removeClass("action-substatus");
                        }

                        break;
                    case "REJECTED":

                        if (results.data[0] && results.data[0]["payment"] && results.data[0]["payment"]["payment_type"]) {
                            $("." + id + "-jobsubstatus").html(" - Await collection ");
                        } else {
                            $("." + id + "-jobsubstatus").html(" - Pay call-out charges ");
                            $("." + id + "-jobsubstatus").addClass("action-substatus");
                            var targetExists = $("#" + id + "-view > button").length;
                            if (!targetExists) {
                                $("#" + id + "-show").html('<span class="{{payment_status}} status-pos hidden"></span><button class="pay-now" data-id="5a0ae173528f63aa583ffe22" data-toggle="modal" data-target="#5a0ae173528f63aa583ffe22-pay" onclick="location.href=\'/app/html/jobDetails.html?id={{_id}}&status=ongoing\'"><span class="booking-btn-align">PAY NOW</span></button>');
                            }
                        }

                        break;
                    case "PAYMENT_PENDING":
                        $("#" + id + "-cancel").hide();
                        if (results.data[0] && results.data[0]["payment"] && results.data[0]["payment"]["payment_type"]) {
                            $("." + id + "-jobsubstatus").html(" - Await collection ");
                        } else {
                            $("." + id + "-jobsubstatus").html(" - pay final payment ");
                            $("." + id + "-jobsubstatus").addClass("action-substatus");
                            var targetExists = $("#" + id + "-view button").data("target");
                            if (!targetExists) {
                                $("#" + id + "-show").html('<span class="PENDING status-pos hidden"></span><button class="pay-now" data-id="' + id + '" data-toggle="modal" data-target="#' + id + '-pay" onclick="location.href=\'/app/html/jobDetails.html?id={{_id}}&status=ongoing\'"><span class="booking-btn-align">PAY NOW</span></button>');
                            }
                        }
                        break;
                    case "RATING":
                        $("." + id + "-jobsubstatus").html(" - rate genie ");
                        $("." + id + "-jobsubstatus").addClass("action-substatus");
                        if ($("#" + id + '-view').hasClass('newstatusview')) {
                        } else {
                            $("#" + id + '-view').html('<button class="pay-now" onclick="location.href=\'/app/html/mybookings.html\'">RATE</button>');
                        }
                        $("#finalstatus").text('<div class="column text-center cancel-req pointer"><button class="genie-button" onclick="location.href=\'/app/html/mybookings.html\'"><div class="button-data"><div class="button-img"><img class="img-responsive" src="/img/star-icon-white.svg"></div>Rate ME</button></div>');
                        break;
                    case "UNFINISHED":
                        $("." + id + "-jobsubstatus").html("");
                        $("." + id + "-jobsubstatus").removeClass("action-substatus");
                        break;
                    case "COMPLAINT_REGISTERED":
                        $("." + id + "-jobsubstatus").html("");
                        $("." + id + "-jobsubstatus").removeClass("action-substatus");
                        break;
                    case "RESCHEDULED":
                        $("." + id + "-jobsubstatus").html("");
                        $("." + id + "-jobsubstatus").removeClass("action-substatus");
                        break;
                    case "UNASSIGNED":
                        $("." + id + "-jobsubstatus").html("");
                        $("." + id + "-jobsubstatus").removeClass("action-substatus");
                        break;
                    case "EXPIRED":
                        $("#" + id + "-cancel").hide();
                        if (results.data[0] && results.data[0]["payment"] && results.data[0]["payment"]["payment_type"]) {
                        } else {
                            var targetExists = $("#" + id + "-view button").data("target");

                            if (!targetExists && results.data[0] && results.data[0].charges && results.data[0].charges.totalCharges != 0) {
                                $("." + id + "-jobsubstatus").html("");
                                $("." + id + "-jobsubstatus").removeClass("action-substatus");
                                $("#" + id + "-accept").html('');
                                $("#" + id + "-show").html('<span class="PENDING status-pos hidden"></span><button class="accept" data-id="' + id + '" data-toggle="modal" data-target="#' + id + '-pay" onclick="location.href=\'/app/html/jobDetails.html?id={{_id}}&status=ongoing\'"><span class="booking-btn-align">PAY NOW</span></button>');
                            } else if (!targetExists && results.data[0] && results.data[0].charges && results.data[0].charges.totalCharges == 0) {
                                $("." + id + "-jobsubstatus").html("");
                                $("." + id + "-jobsubstatus").removeClass("action-substatus");
                                $("#" + id + "-show").html('');
                            }
                        }
                        break;
                    default:
                        break;

                }

                var cancelTemplate = '{{#id}}<div class=" column text-center cancel-req pointer" onclick="cancelAppointment(\'{{id}}\',\'{{id}}-d\')">\
                                     <button class="cancel width-100">Cancel Request</button>\
                     </div>{{/id}}';
                var paymentTemplate = '{{#id}}<div class="column text-center cancel-req pointer" data-id="{{_id}}" onclick="makePayment(\'{{id}}\', {{finalCharges}})" ">\
                 <button class="accept width-100">Pay Now</button>\
             </div>{{/id}}';
                var advanceFixedTemplate = '{{#id}}<div class="column text-center cancel-req pointer" data-id="{{_id}}" onclick="acceptOrRejectJob(\'{{id}}\', \'FIXED\',{{advancePayment}})" ">\
                 <button class="accept width-49 mr-1">Accept</button>\
             </div><div class="column text-center cancel-req pointer" data-id="{{_id}}" onclick="cancelAppointment(\'{{id}}\',\'{{id}}-d\')">\
             <button class="cancel width-49 ml-1">Reject</button>\</div>{{/id}}';
                if (jobStatus == "PAYMENT_PENDING" || jobStatus == "CANCELLED") {
                    if (jobStatus == "PAYMENT_PENDING") {
                        data.finalCharges = results.data[0].charges.finalCharges;
                        data.totalCharges = results.data[0].charges.finalCharges;
                        $("#finalstatus-rating").html(' <a class="genie-call-button" href="tel: +971' + resultdata.companyPhoneNo + '"><button class="detail-contact genie-button"><div class="button-data"><div class="button-img"><img class="img-responsive" src="/img/call-white.svg"></div>Call Now</button></a>');
                    } else if (jobStatus == "CANCELLED") {
                        data.finalCharges = results.data[0].charges.finalCharges;
                        data.totalCharges = results.data[0].charges.totalCharges;

                    }
                    if (data.finalCharges && results.data[0].driverData && results.data[0].payment && (results.data[0].payment.payment_type == "CASH" || results.data[0].payment.payment_type == "BANK_TRANSFER")) {
                        $("#finalstatus").html("");
                    } else if (data.finalCharges && results.data[0].driverData) {
                        $("#finalstatus").html(Mustache.render(paymentTemplate, data));
                    }
                } else if (jobStatus == "COMPLAINT_REGISTERED" || jobStatus == "IN_SERVICE" || jobStatus == "RATING" || jobStatus == "UNFINISHED") {
                    $("#finalstatus").html("");
                    if (jobStatus == "RATING") {
                        $("#finalstatus-rating").html('<a href="/app/html/mybookings.html"><div class="col-md-12 col-sm-12 col-xs-12 column" style="background:#67e9b4;height:43px;font-size:21px;"><p class="text-center" style="color:#fff;margin-top:8px;">RATE GENIE</p></div></a>');
                    }
                    if (jobStatus == "IN_SERVICE") {
                        $("#" + id + "-cancel").html("");
                    }
                } else if (jobStatus == "REJECTED" || (jobStatus == "EXPIRED" && results.data[0] && results.data[0].charges && results.data[0].charges.totalCharges != 0)) {
                    data.finalCharges = results.data[0].charges.finalCharges;
                    $("#finalstatus").html(Mustache.render(paymentTemplate, data));
                    if (results.data[0].payment && results.data[0].payment.payment_type == "CASH") {
                        $("#finalstatus").html("");
                    }
                } else if (jobStatus == "INSPECTION" || jobStatus == "RESCHEDULED") {
                    if (results.data[0].isInspectionCompleted && !results.data[0].payment.payment_type) {
                        var data = {};
                        data.id = id;
                        data.advancePayment = results.data[0].advancePayment;
                        if (results.data[0].charges.advanceCharges == results.data[0].charges.estimateCharges) {
                            data.advancePayment = results.data[0].charges.vatFinalCharges;
                        }
                        var html = Mustache.render(acceptRejectTemplate, data);
                        $("#finalstatus").html(html);
                    } else {
                        $("#" + id + "-finalstatus").html("");
                        $("#" + id + "-cancel").html("");
                    }
                } else if (jobStatus == "REQUESTED" || jobStatus == "ASSIGNED" || jobStatus == "ENROUTE" || jobStatus == "REESTIMATE") {
                    data.advancePayment = results.data[0].advancePayment;
                    $("#finalstatus").html(Mustache.render(cancelTemplate, data));
                    if (jobStatus == "ENROUTE" || jobStatus == "REESTIMATE") {
                        $("#finalstatus").html("");
                    }
                    if (jobStatus == "ASSIGNED" && results.data[0].charges.unitCharges && results.data[0].advancePayment && results.data[0].advance_payment.payment_type == "null" && !results.data[0].payment.payment_type) {
                        $("#finalstatus").html(Mustache.render(advanceFixedTemplate, data));
                    }
                    if (jobStatus == "ASSIGNED" && results.data[0].charges.unitCharges && results.data[0].advancePayment && (results.data[0]["payment"]["payment_type"] == "CASH" || results.data[0]["payment"]["payment_type"] == "CARD" || results.data[0]["payment"]["payment_type"] == "BANK_TRANSFER")) {
                        $("#finalstatus").html('');
                    }
                }
                // $("#popup").click();
                $(".crossImg").click(function () {
                    $(".modal-backdrop").removeClass("modal-backdrop");
                });
                // image plugin
            }
            callApi.getUrl(apiUrl + "/api/customer/getAllAddress", addressAuth, function (err, result) {
                if (!err && result) {
                    var address = result.data;
                    for (var k in address) {
                        if (address[k]["_id"] == addressInfo["_id"]) {
                            data.address = address[k];
                            $("#address-" + id).html(Mustache.render(addressTemplate, data));
                            $.LoadingOverlay("hide", true);
                        }
                    }
                } else {
                    $.LoadingOverlay("hide", true);
                    callApi.error(err);
                }
            });
            $.LoadingOverlay("hide", true);
        } else {
            $.LoadingOverlay("hide", true);
            callApi.error(err);
        }
    });
}

function toggleServiceType() {
    $("#service-type-modal").modal("show");
}

function showSummery() {
    $("#summery").toggle();
    if ($("#summery").css("display") === "none") {
        $("#summery-button").css("transform", "rotate(90deg)");
    } else {
        $("#summery-button").css("transform", "rotate(-90deg)");
    }
}
function showPayment() {
    $("#payment").toggle();
    if ($("#payment").css("display") === "none") {
        $("#payment-button").css("transform", "rotate(90deg)");
    } else {
        $("#payment-button").css("transform", "rotate(-90deg)");
    }
}

function contactGenie(id) {
    var contact = $("#contactGenie").attr("data-contact");
    $("#contactGenie").html("CONTACT GENIE ( <span class='hidden-sm hidden-md hidden-lg'><a href='tel:" + contact + "'>" + 0 + contact + "</a></span><span class='hidden-xs'>" + contact + "</span> )");
    /*var data = new FormData();
     data.Auth = udata.data.accessToken;
     data.append("appointmentID",id);
     data._method = "POST";
     $.growl.notice({message : "Genie will contact you soon."});
     $.LoadingOverlay("show");
     callApi.queryUrl(apiUrl + "/api/customer/calltoDriver", data, function(err, response){
     if (!err) {
     $.LoadingOverlay("hide", true);
     } else {
     $.LoadingOverlay("hide", true);
     callApi.error(err);
     }
     });*/
}

function zoomImages(img) {
    var e, d;
    e = 200;
    d = 200;
    var b, f, a, c;
    c = "<span class='closeWin'><img src='/img/closewindow.png' alt='img'></span>";
    a = c + "<img src='' alt='img' class='jQimagPreview_img_i'>";
    b = "<div id='jQimagPreview_cont' class='loading'><div class='con_in'>" + a + "</div></div>";
    f = "<div id='jQimagPreview'>" + b + "</div>";
    $("body").append(f);
    /*$(".jq_Impreview").click(function() {
     alert("hello");
   
     });*/
    var g;
    g = img;
    $("#jQimagPreview").fadeIn(e);
    $(".jQimagPreview_img_i").attr("src", "" + g);
    $(".jQimagPreview_img_i").hide();
    $(".jQimagPreview_img_i").fadeIn(1000).delay(2000);
    $("#jQimagPreview_cont").addClass();
    $("#jQimagPreview_cont .closeWin").click(function () {
        $("#jQimagPreview").fadeOut(d);
    });
}
var cancelData = "Professional not assigned";
function cancelReasonData(value) {
    cancelData = value;
    console.log(cancelData);
}
function cancelAppointment(id, modalid) {
    $(".isMembership").html(checkMembershipOrNot(id) ? 'request' : 'booking');
    $(".isMembershipJob").html(checkMembershipOrNot(id) ? 'request' : 'job');
    $.LoadingOverlay("show");
    if (modalid) {
        $("#closemodal").attr("onclick", "cancelPopup(true)");
    } else {
        $("#closemodal").attr("onclick", "cancelPopup()");
    }
    var data = {};
    data.Auth = udata.data.accessToken;
    callApi.getUrl(apiUrl + "/api/customer/JobCancelChargeCalculation?jobId=" + id, data, function (err, results) {
        if (!err && results) {
            $(".cancelCharge").html(results.data.cancelCharge);
            $("#cancel-booking").modal("show");
            $.LoadingOverlay("hide", true);
        } else {
            $.LoadingOverlay("hide", true);
            callApi.error(err);
        }
    });
    $("#cancel-confirm").unbind().click(function () {
        $("#cancel-booking").modal("hide");
        $.LoadingOverlay("show");
        var params = new FormData();
        params._method = "PUT";
        params.Auth = udata.data.accessToken;
        params.append("jobId", id);
        params.append("cancelReason", cancelData);
        console.log(cancelData);
        callApi.queryUrl(apiUrl + "/api/customer/JobCancelCharge", params, function (err, results) {
            if (!err && results) {
                $("#cancel-reason").modal("hide");
                $("body").removeClass("modalOpen");
                // $("#popupmodal").modal("hide");
                // var message = {
                //   "msg": "You have successfully cancel the appointment"
                // };
                // $('.msg-display').html(Mustache.render(MsgDisplayTemp, message));
                // $('.msg-modal').modal('show');
                window.location.href = "/app/mybookings.html";
                getmybookings();
            } else {
                $.LoadingOverlay("hide", true);
                callApi.error(err);
            }
        });
    });
}

function cancelPopup(check) {
    $("#cancelConfirm").modal("hide");
    if (check) {
        setTimeout(function () {
            $(".body").addClass("modal-open");
        }, 500);
    }
    $("#cancel-confirm").unbind('click');
}
$("#can").click(function () {
    setTimeout(function () {
        if (!$('.body').hasClass('modal-open')) {
            $(".body").addClass('modal-open');
        }
    }, 600);
})


function hideCurrentModal(elem) {
    var id = ((((elem.parentNode).parentNode).parentNode).parentNode);
    id = $(id).attr("id");
    console.log('id', id);
    $("#" + id).modal("hide");
    setTimeout(function () {
        console.log('into ste timeout');
        $("body").addClass("modal-open");
    }, 500);
}

function hidePdfDownloadCurrentModal(elem) {
    var id = (((elem.parentNode).parentNode).parentNode);
    id = $(id).attr("id");
    $("#" + id).modal("hide");
    setTimeout(function () {
        console.log('into ste timeout');
        $("body").addClass("modal-open");
    }, 500);
}

function acceptOrRejectJob(id, status, amount, elem) {
    var data = new FormData();
    data.Auth = udata.data.accessToken;
    data._method = "PUT";
    data.append("jobId", id);
    if (status == "APPROVE") {
        data.append("status", status);
        $.LoadingOverlay("show");
        if ($("#popupmodal").hasClass("in")) {
            // $("#popupmodal").modal('toggle');
        }

        if (amount) {
            $("#advancePrice").html(amount);
            $("#advancePayment").click();
            $.LoadingOverlay("hide", true);
            $("#doadvancePay").click(function () {
                makePayment(id, amount);
            });
        } else {
            callApi.putUrl(apiUrl + "/api/customer/acceptOrRejectedJobOnce/", data, function (err, results) {
                if (!err && results) {
                    //  var message = {
                    //    "msg": "Your job has been updated successfully."
                    //  };
                    //  $('.msg-display').html(Mustache.render(MsgDisplayTemp, message));
                    //  $('.msg-modal').modal('show');
                    // $("#popupmodal").modal("hide");
                    $("body").removeClass("modalOpen");
                    $.LoadingOverlay("hide", true);
                    window.location.href = "/app/mybookings.html";
                    getmybookings();
                } else {
                    $.LoadingOverlay("hide", true);
                    callApi.error(err);
                }
            });
        }

    } else if (status == "FIXED" && amount) {
        data.append("status", status);
        $.LoadingOverlay("show");
        // $("#popupmodal").modal('toggle');
        $("#advancePrice").html(amount);
        $("#advancePayment").click();
        $.LoadingOverlay("hide", true);
        $("#doadvancePay").click(function () {
            makePayment(id, amount);
        });
    } else if (status == "REJECTED" || status == "CLOSED") {
        var rejectedCount = 0;
        $(".reestimateorclose").click(function () {
            rejectedCount++;
            if (rejectedCount > 1) {
                return;
            }
            var selectedStatus = $(this).attr("data-status");
            if (selectedStatus == "REESTIMATE") {
                status = "REJECTED";
            } else if (selectedStatus == "CLOSED") {
                status = "CLOSED";
            }
            data.append("status", status);
            callApi.putUrl(apiUrl + "/api/customer/acceptOrRejectedJobOnce/", data, function (err, results) {
                if (!err && results) {
                    var message = {
                        "msg": "Your job has been updated successfully."
                    };
                    $('.msg-display').html(Mustache.render(MsgDisplayTemp, message));
                    $('.msg-modal').modal('show');
                    // $("#popupmodal").modal("hide");
                    $("body").removeClass("modalOpen");
                    $.LoadingOverlay("hide", true);
                    window.location.href = "/app/mybookings.html";
                    getmybookings();
                } else {
                    $.LoadingOverlay("hide", true);
                    callApi.error(err);
                }
            });
        });
    }
}

function initOngoingBookingSearch() {
    $("#search-ongoing").keyup(function () {
        var bookingsearchinput = this.value;
        $('.ongoingbookingsearch').each(function () {
            var service = $(this).attr("data");
            var re = new RegExp(bookingsearchinput, 'gi');
            if (service.substring(0, bookingsearchinput.length).toLowerCase().trim() !== bookingsearchinput.toLowerCase().trim()) {
                $(this).addClass('hidden');
            } else {
                $(this).removeClass('hidden');
            }
            if ((service.trim()).match(re)) {
                $(this).removeClass('hidden');
            }
        });
    });

    $("#search-completed").keyup(function () {
        var bookingsearchinput = this.value;
        $('.completedbookingsearch').each(function () {
            var service = $(this).attr("data");
            var re = new RegExp(bookingsearchinput, 'gi');
            if (service.substring(0, bookingsearchinput.length).toLowerCase().trim() !== bookingsearchinput.toLowerCase().trim()) {
                $(this).addClass('hidden');
            } else {
                $(this).removeClass('hidden');
            }
            if ((service.trim()).match(re)) {
                $(this).removeClass('hidden');
            }
        });
    });

    $("#search-ongoing-clear").click(function () {
        $("#brandsearchinput").val('');
        $('.branditem').each(function () {
            $(this).removeClass('hidden');
        });
    });

}

function makePayment(id, amount) {
    var paymentdata = {};
    paymentdata.id = id;
    paymentdata.a = amount;
    paymentdata = JSON.stringify(paymentdata);
    createCookie("hg_p", paymentdata, 1);
    localStorage.setItem("hg_p", paymentdata);
    window.location.href = "/app/html/paymentmethod.html";
}

// show genie rating and review profile
function showGenieProfile(id) {
    $(".skills").html('');
    $('.reviews').html('');
    var params = new FormData();
    params.Auth = udata.data.accessToken;
    // api to get particular details
    callApi.getUrl(apiUrl + '/api/customer/getDriverDetails?id=' + id, params, function (err, response) {
        // if api response is success and no error occurs then execute if loop
        if (!err && response) {
            if (response.data) {
                // intialization of variables
                var response = response.data;
                var visa;
                var license;
                var insurance;
                // show driver name
                $('.genie-name').text(response.name);
                if (response.profilePicURL && response.profilePicURL.original) {
                    $('.genie-pic img').attr('src', response.profilePicURL.original);
                } else {
                    $('.genie-pic img').attr('src', '../img/genieicon.png');
                }
                // genie details
                if (response.validInsurance) {
                    insurance = "VALID";
                } else {
                    insurance = "NOT VALID";
                }
                if (response.validVisa) {
                    visa = "VALID";
                } else {
                    visa = "NOT VALID";
                }
                if (response.validTradeLicence) {
                    license = "VALID";
                } else {
                    license = "NOT VALID";
                }
                if (response.supplierID && response.supplierID.tradelicenseNo) {
                    $("#licenseNumber").html(" (" + response.supplierID.tradelicenseNo + ")");
                } else {
                    $("#licenseNumber").html();
                }
                $('.r-visa').text(visa);
                $('.t-licence').text(license);
                $('.insurance').text(insurance);
                // show genie skills
                $(".skills").html(Mustache.render(SKILL_TEMPLATE, response));
                // if (response.categories) {
                //   var skills = response.categories;
                //   for (var i = 0; i < skills.length; i++) {
                //     $(".skills").append('<button class="btn btn-default cat-btn mrb-5-3">' + skills[i] + '</button>');
                //   }
                // }
                // calculating averageRating of particular genie and shows rating grid accordingly
                var checkDecimal;
                if (response.feedback) {
                    var totalRating = ((5 * response.feedback.fiveStar) + (4 * response.feedback.fourStar) + (3 * response.feedback.threeStar) + (2 * response.feedback.twoStar) + (1 * response.feedback.oneStar));
                    var numberOfRates = ((response.feedback.fiveStar) + (response.feedback.fourStar) + (response.feedback.threeStar) + (response.feedback.twoStar) + (response.feedback.oneStar));
                    if (totalRating && numberOfRates) {
                        var averageRating = Number(parseFloat(totalRating / numberOfRates).toFixed(1));
                        checkDecimal = (parseFloat(averageRating).toFixed(1)).toString();
                        checkDecimal = checkDecimal.split('.');
                        averageRating = averageRating;
                    } else {
                        var averageRating = 0;
                    }
                    for (var i = 0; i < 5; i++) {
                        if (checkDecimal && checkDecimal[1] && (checkDecimal[1] == '4' || checkDecimal[1] == '5' || checkDecimal[1] == '6')) {
                            if (i < parseInt(averageRating)) {
                                $("#starsrc" + i).attr('src', '/img/star-filled.png');
                            } else if (i < parseFloat(averageRating)) {
                                $("#starsrc" + i).attr('src', '/img/star-half-fill.png');
                            } else {
                                $("#starsrc" + i).attr('src', '/img/star-blank.png');
                            }
                        } else {
                            if (i < Math.round(averageRating)) {
                                $("#starsrc" + i).attr('src', '/img/star-filled.png');
                            } else {
                                $("#starsrc" + i).attr('src', '/img/star-blank.png');
                            }
                        }
                    }
                    $(".genie-modal-rating").html("<div class='modal-rating-star'></div> " + averageRating + "/ 5");
                    var myStarRating = showStarRating(averageRating);
                    var starRating = {
                        "starRating": myStarRating
                    }
                    $(".modal-rating-star").html(Mustache.render(STAR_RATING_TEMPLATE, starRating));
                    // $('.showRating').html('(' + averageRating + '/' + 5 + ')')
                    if (response.feedback.fiveStar) {
                        var fiveStarGrid = ((response.feedback.fiveStar) / (numberOfRates));
                        fiveStarGrid = (fiveStarGrid) * 100;
                        // $('.fiveStar div').attr('aria-valuenow', fiveStarGrid);
                        // $('.fiveStar div').css('width', fiveStarGrid + '%');
                        // $('.fiveStarCount').html('(' + response.feedback.fiveStar + ')');
                        $(".driver-modal .five").html("(" + response.feedback.fiveStar + ")");
                        $("#five_review").css("width", fiveStarGrid + "%");
                    } else {
                        // $('.fiveStar div').attr('aria-valuenow', 0);
                        // $('.fiveStar div').css('width', 0 + '%');
                        // $('.fiveStarCount').html('(' + 0 + ')');
                        $(".driver-modal .five").html("(" + 0 + ")");
                        $("#five_review").css("width", 0 + "%");

                    }
                    if (response.feedback.fourStar) {
                        var fourStarGrid = ((response.feedback.fourStar) / (numberOfRates));
                        fourStarGrid = (fourStarGrid) * 100;
                        // $('.fourStar div').attr('aria-valuenow', fourStarGrid);
                        // $('.fourStar div').css('width', fourStarGrid + '%');
                        // $('.fourStarCount').html('(' + response.feedback.fourStar + ')');
                        $(".driver-modal .four").html("(" + response.feedback.fourStar + ")");
                        $("#four_review").css("width", fourStarGrid + "%");
                    } else {
                        // $('.fourStar div').attr('aria-valuenow', 0);
                        // $('.fourStar div').css('width', 0 + '%');
                        // $('.fourStarCount').html('(' + 0 + ')');
                        $(".driver-modal .four").html("(" + 0 + ")");
                        $("#four_review").css("width", 0 + "%");
                    }
                    if (response.feedback.threeStar) {
                        var threeStarGrid = ((response.feedback.threeStar) / (numberOfRates));
                        threeStarGrid = (threeStarGrid) * 100;
                        // $('.threeStar div').attr('aria-valuenow', threeStarGrid);
                        // $('.threeStar div').css('width', threeStarGrid + '%');
                        // $('.threeStarCount').html('(' + response.feedback.threeStar + ')');
                        $(".driver-modal .three").html("(" + response.feedback.threeStar + ")");
                        $("#three_review").css("width", threeStarGrid + "%");
                    } else {
                        // $('.threeStar div').attr('aria-valuenow', 0);
                        // $('.threeStar div').css('width', 0 + '%');
                        // $('.threeStarCount').html('(' + 0 + ')');
                        $(".driver-modal .three").html("(" + 0 + ")");
                        $("#three_review").css("width", 0 + "%");
                    }
                    if (response.feedback.twoStar) {
                        var twoStarGrid = ((response.feedback.twoStar) / (numberOfRates));
                        twoStarGrid = (twoStarGrid) * 100;
                        // $('.twoStar div').attr('aria-valuenow', twoStarGrid);
                        // $('.twoStar div').css('width', twoStarGrid + '%');
                        // $('.twoStarCount').html('(' + response.feedback.twoStar + ')');
                        $(".driver-modal .two").html("(" + response.feedback.twoStar + ")");
                        $("#two_review").css("width", twoStarGrid + "%");
                    } else {
                        // $('.twoStar div').attr('aria-valuenow', 0);
                        // $('.twoStar div').css('width', 0 + '%');
                        // $('.twoStarCount').html('(' + 0 + ')');
                        $(".driver-modal .two").html("(" + 0 + ")");
                        $("#two_review").css("width", 0 + "%");
                    }
                    if (response.feedback.oneStar) {
                        var oneStarGrid = ((response.feedback.oneStar) / (numberOfRates));
                        oneStarGrid = (oneStarGrid) * 100;
                        // $('.oneStar div').attr('aria-valuenow', oneStarGrid);
                        // $('.oneStar div').css('width', oneStarGrid + '%');
                        // $('.oneStarCount').html('(' + response.feedback.oneStar + ')');
                        $(".driver-modal .one").html("(" + response.feedback.oneStar + ")");
                        $("#one_review").css("width", oneStarGrid + "%");
                    } else {
                        // $('.oneStar div').attr('aria-valuenow', 0);
                        // $('.oneStar div').css('width', 0 + '%');
                        // $('.oneStarCount').html('(' + 0 + ')');
                        $(".driver-modal .one").html("(" + 0 + ")");
                        $("#one_review").css("width", 0 + "%");
                    }
                    // $('.ratingGrid').append('<div class="col-md-12 col-xs-12 col-sm-12 rm-col"><div class="col-md-1 col-xs-1 col-sm-1 rm-col"><span class="grid-text">4*</span></div><div class="progress fourStar col-xs-10 col-md-10 col-sm-10 rm-col"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div></div><div class="col-md-1 col-xs-1 col-sm-1 rm-col"><span class="grid-text">54</span></div></div>')
                    // shows genie reviews
                    $('.review-slider').html("");
                    if (response.feedback.latestComments && response.feedback.latestComments.length > 0) {
                        var comments = response.feedback.latestComments;
                        for (var i = 0; i < comments.length; i++) {
                            $('.review-slider').append('<p class="p">' + comments[i] + '</p>');
                        }
                        $('.revieww-note').removeClass('hidden');
                    } else {
                        var comments = 'None recieved yet';
                        $('.review-slider').append('<p class="p">' + comments + '</p>');
                        $('.revieww-note').addClass('hidden');
                    }
                }
                // // hide details modal
                // $('#popupmodal').modal('hide');
                // // shows genie review modal
                // $("#genieRatingAndReview").modal('show');

            }
        } else if (!err) {
            genieProfileCount++;
            if (genieProfileCount < 3) {
                showGenieProfile();
            } else {
                setTimeout(function () {
                    showGenieProfile();
                }, 100000);
            }
        } else {
            // if any error occurs in api call show the error
            var err = JSON.parse(err);
            var message = {
                "msg": err.message
            };
            $('.msg-display').html(Mustache.render(MsgDisplayTemp, message));
            $('.msg-modal').modal('show');
        }
    });
}

var SKILL_TEMPLATE = '{{#categories}}<span class="skill text-center">{{.}}</span>{{/categories}}'

/*
 1. Download
   estimate bill,
   advance invoice and
   final invoice
 from the source url to the specified target url i.e.. Download folder in the device file manager
 2. Fetching external storage root directory path using file plugin
 3. Requesting user permission to fetch external storage root directory information using permission plugin
*/
const DOWNLOAD_DOCUMENTS = (url, fileName, uniqueCode) => {
    const FILE_TRANSFER = new FileTransfer();
    var uri = encodeURI(url);
    var Permission = window.plugins.Permission;
    // request grant for a permission
    var permissions = [
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.READ_EXTERNAL_STORAGE'
    ];
    Permission.request(permissions, function (results) {
        if (results['android.permission.WRITE_EXTERNAL_STORAGE'] && results['android.permission.READ_EXTERNAL_STORAGE']) {
            // permission is granted
            $.LoadingOverlay("show");
            $('.loadingoverlay').css('z-index', '1000');
            FILE_TRANSFER.download(
                uri,
                `${cordova.file.externalRootDirectory}/Download/${uniqueCode}-${fileName}.pdf`,
                function (entry) {
                    $.LoadingOverlay("hide", true);
                    var message = {
                        'msg': 'File successfully downloaded'
                    }
                    $('#pdf-download').html(Mustache.render(pdfDownloadMessageTemplate, message));
                    $('.msg-modal').modal('show');
                },
                function (error) {
                    $.LoadingOverlay("hide", true);
                    var message = {
                        'msg': 'There is some issue while downloading the file, Please try again'
                    }
                    $('#pdf-download').html(Mustache.render(pdfDownloadMessageTemplate, message));
                    $('.msg-modal').modal('show');
                }, false
            );
        } else {
            alert('permission denied');
        }
    }, alert)

    permissions.requestPermission(list, success, error);

    function error() {
        console.warn('permission is not turned on');
    }

    // function success( status ) {
    //   if( !status.hasPermission ) {
    //     console.log('permission not there');
    //   } else {
    //     $.LoadingOverlay("show");
    //     $('.loadingoverlay').css('z-index', '1000');
    //     FILE_TRANSFER.download(
    //       uri,
    //       `${cordova.file.externalRootDirectory}/Download/${uniqueCode}-${fileName}.pdf`,
    //       function(entry) {
    //         $.LoadingOverlay("hide", true);
    //         alert('File successfully downloaded');
    //       },
    //       function(error) {
    //         $.LoadingOverlay("hide", true);
    //         alert('There is some issue while downloading the file, Please try again');
    //       }, false
    //     );
    //   }
    // }
}


var ongoingBooking_template =
    '<div class="col-xs-12 col-sm-12 col-md-12 column search-tab-div padding0 mp-0">\
   <div class="form-group">\
       <div class="icon-addon addon-md">\
           <input type="text" placeholder="Search" class="form-control mybooking-search" id="search-ongoing">\
           <label for="search-ongoing" class="search-placeholder" rel="tooltip" title="search-ongoing">\
           <div class="booking-search-icon"><img class="img-responsive" src="/img/search-icon.svg"></div>\
           </label>\
       </div>\
   </div>\
</div>\
{{#ongoing}}<div class="col-xs-12 col-sm-12 col-md-12 column padding0 booking-list ongoingbookingsearch" data="{{subcategory.subCategoryName}} {{uniqueCode}} {{status}} {{dateScheduled}}">\
   <div class="col-xs-12 col-sm-12 col-md-12 column padding0 list-header vertical-align">\
       <div class="xs-catimage flex-box">\
           <div class="service-img-div vertical-align">\
               <img src="{{category.imageURL.original}}" class="img-responsive">\
           </div>\
           <p class="list-title">{{category.name}}<span class="hidden-xs hidden-sm ">/{{subcategory.subCategoryName}}</span></p>\
       </div>\
       <div class="pull-right uniue-code hidden-sm hidden-xs">\
           <span class="list-que f-20">Job ID</span><span class="list-ans f-20 bold">{{uniqueCode}}</span>\
       </div>\
       {{#Cancel}}<div class="flex-box right-cancel-box hidden">\
           <div class="cancel-icon vertical-align">\
               <img src="/img/unhappy-black-emoji.svg" class="img-responsive">\
           </div>\
           <p class="cancel-button" onclick="cancelAppointment(\'{{_id}}\')">Cancel<p>\
       </div>{{/Cancel}}\
   </div>\
   <div class="col-xs-12 col-sm-12 col-md-12 column padding0 vertical-align list-data">\
       <div class="col-xs-12 col-sm-12 col-md-5  mp-0 grid-15-85 hidden-lg hidden-md">\
           <span class="list-que f-20">Job ID</span><span class="list-ans f-20 bold">{{uniqueCode}}</span>\
       </div>\
       <div class="col-xs-12 col-sm-12 col-md-7  mp-0 grid-15-85 hidden-lg hidden-md">\
           <span class="list-que">Service</span><span class="list-ans">{{subcategory.subCategoryName}}</span>\
       </div>\
       <div class="col-xs-12 col-sm-12 col-md-7 mp-0  grid-28 hidden-sm hidden-xs">\
               <span class="list-que f-16">Status</span>\
               {{#View}}\
               <span class="substatus-span flex-box f-16">\
                   <div class="newstatus-div {{_id}}-jobstatus">{{status}}</div>\
                   <div class="smalltxt {{reditems}} {{_id}}-jobsubstatus blue ml-10">{{#showAction}} {{showAction}} {{/showAction}}</div>\
               </span>\{{/View}}\
       </div>\
       <div class="col-xs-12 col-sm-12 col-md-7 mp-0  grid-28">\
           <span class="list-que">Location</span><span class="list-ans">{{nickName}}</span>\
       </div>\
       <div class="col-xs-12 col-sm-12 col-md-7  mp-0 grid-15-85 hidden-lg hidden-md">\
           <span class="list-que">Status</span>\
           {{#View}}\
           <span class="substatus-span flex-box">\
               <div class="newstatus-div {{_id}}-jobstatus">{{status}}</div>\
               <div class="smalltxt {{reditems}} {{_id}}-jobsubstatus ml-10 blue">{{#showAction}} {{showAction}} {{/showAction}}</div>\
           </span>\{{/View}}\
       </div>\
   </div>\
   <div class="col-xs-12 col-sm-12 col-md-12 column padding0 list-btn-grp">\
       <div class="btn-grp-pay pull-right flex-box">\
           <span id="{{_id}}-show"></span>\
           {{#Accept}}<span class="" id="{{_id}}-accept"><span class="{{payment_status}} status-pos hidden"></span><button class="pay-now" data-id="{{_id}}" onclick="acceptOrRejectJob(\'{{_id}}\', \'APPROVE\', {{advancePayment}})"><span class="pay-now-button">ACCEPT</span></button></span><span class="hidden-xs"><br/></span>{{/Accept}}\
           {{#Payment}}<span class="" id="{{_id}}-view"><span class="{{payment_status}} status-pos hidden"></span><button class="pay-now" data-id="{{_id}}" data-toggle="modal" data-target="#{{_id}}-pay" onclick="location.href=\'/app/html/jobDetails.html?id={{_id}}&status=ongoing\'"><span class="pay-now-button">Pay Now</span></button></span><span class="hidden-xs"><br/></span>{{/Payment}}\
           {{#Cancel}}<span class="hidden" id="{{_id}}-cancel"><span class="active-color status-pos"></span><button class="pay-now" onclick="cancelAppointment(\'{{_id}}\')" style="margin-top:0px;"><span class="booking-btn-align">CANCEL</span></button></span><span class="hidden-xs"><br/></span>{{/Cancel}}\
           {{#RateGenie}}<span class=""><span class="status-pos hidden-xs" "></span><button class="pay-now" onclick="location.href=\'/app/html/mybookings.html\'">RATE</button></span><span class="hidden-xs"><br/></span>{{/RateGenie}}\
           {{#View}}<span class="newstatusview" id="{{_id}}-view"><span class="{{_id}}-req newstatus-pos"><span class="substatus-span "></span><button class="view-detail view-detail-ongoing new-viewdetail view-booking-button" onclick="location.href=\'/app/html/jobDetails.html?id={{_id}}&status=ongoing\'">View Details</button></span>{{/View}}\
           <span class="{{_id}}"></span>\
           <span class="{{_id}}-pay"></span>\
       </div>\
   </div>\
</div>{{/ongoing}}';

var completedBooking_template =
    '<div class="col-xs-12 col-sm-12 col-md-12 column search-tab-div padding0 mp-0">\
   <div class="form-group">\
       <div class="icon-addon addon-md">\
           <input type="text" placeholder="Search" class="form-control mybooking-search" id="search-completed">\
           <label for="search-completed" class="search-placeholder" rel="tooltip" title="search-completed">\
           <div class="booking-search-icon"><img class="img-responsive" src="/img/search-icon.svg"></div>\
           </label>\
       </div>\
   </div>\
</div>\
{{#completed}}<div class="col-xs-12 col-sm-12 col-md-12 column padding0 booking-list ongoing-list ongoing-list-border completedbookingsearch" data="{{subcategory.subCategoryName}} {{uniqueCode}} {{status}} {{dateScheduled}}">\
               <div class="col-xs-12 col-sm-12 col-md-12 column padding0 list-header vertical-align">\
                   <div class="xs-catimage flex-box">\
                       <div class="service-img-div vertical-align">\
                           <img src="{{category.imageURL.original}}" class="img-responsive">\
                       </div>\
                       <p class="list-title">{{category.name}}<span class="hidden-xs hidden-sm ">/{{subcategory.subCategoryName}}</span></p>\
                   </div>\
                   <div class="pull-right uniue-code hidden-sm hidden-xs">\
                       <span class="list-que f-20">Job ID</span><span class="list-ans f-20 bold">{{uniqueCode}}</span>\
                   </div>\
                   {{#Cancel}}<div class="flex-box right-cancel-box hidden">\
                       <div class="cancel-icon vertical-align">\
                           <img src="/img/unhappy-black-emoji.svg" class="img-responsive">\
                       </div>\
                       <p class="cancel-button" onclick="cancelAppointment(\'{{_id}}\')">Cancel<p>\
                   </div>{{/Cancel}}\
               </div>\
               <div class="col-xs-12 col-sm-12 col-md-12 column padding0 vertical-align list-data">\
                   <div class="col-xs-12 col-sm-12 col-md-5  mp-0 grid-15-85 hidden-md hidden-lg">\
                       <span class="list-que f-20">Job ID</span><span class="list-ans f-20 bold">{{uniqueCode}}</span>\
                   </div>\
                   <div class="col-xs-12 col-sm-12 col-md-7  mp-0 grid-15-85 hidden-lg hidden-md">\
                       <span class="list-que">Service</span><span class="list-ans">{{subcategory.subCategoryName}}</span>\
                   </div>\
                   <div class="col-xs-12 col-sm-12 col-md-7 mp-0  grid-28 hidden-sm hidden-xs">\
                       <span class="list-que">Status</span><span class="list-ans flex-box">{{status}} {{#View}}<span class="newstatusview" id="{{_id}}-view"><span class="{{_id}}-req newstatus-pos"><span class="substatus-span"><div class="newstatus-div {{_id}}-jobstatus ml-10 blue"></div><div class="smalltxt {{reditems}} {{_id}}-jobsubstatus">{{#showAction}}( {{showAction}} ){{/showAction}}</div></span></span>{{/View}}</span>\
                   </div>\
                   <div class="col-xs-12 col-sm-12 col-md-7 mp-0  grid-28">\
                       <span class="list-que">Location</span><span class="list-ans">{{nickName}}</span>\
                   </div>\
                   <div class="col-xs-12 col-sm-12 col-md-7 mp-0  grid-28 hidden-md hidden-lg">\
                       <span class="list-que">Status</span><span class="list-ans flex-box">{{status}} {{#View}}<span class="newstatusview" id="{{_id}}-view"><span class="{{_id}}-req newstatus-pos"><span class="substatus-span"><div class="newstatus-div {{_id}}-jobstatus ml-10 blue"></div><div class="smalltxt {{reditems}} {{_id}}-jobsubstatus">{{#showAction}}( {{showAction}} ){{/showAction}}</div></span></span>{{/View}}</span>\
                   </div>\
               </div>\
               <div class="col-xs-12 col-sm-12 col-md-12 column padding0 list-btn-grp past-booking">\
                   <div class="btn-grp-pay pull-right flex-box">\
                       <span class="newstatusview" id="{{_id}}-view"><span class="{{_id}}-req newstatus-pos"><span class="substatus-span "></span><button class="view-detail view-detail-ongoing new-viewdetail view-booking-button" onclick="location.href=\'/app/html/jobDetails.html?id={{_id}}&status=past\'">View Details</button></span>\
                       <button class="book-again hidden">Book Again</button>\
                   </div>\
               </div>\
   </div>{{/completed}}';

var pricingtemplate = '{{#pricedetails}}<div class="modal-dialog service-dialog"">\
                           <div class="modal-content containerSize col-lg-offset-8 col-lg-4 col-xs-12 col-md-offset-7 col-md-5 col-sm-offset-6 col-sm-6 modal-data service-details">\
                               <div class="row clearfix">\
                                   <div class="back-button back-btn-abs-text" onclick="hideCurrentModal(this)">\
                                       <div class="back-arrow"><img src="/img/modal-back-icon.svg" class="img-responsive"></div>\
                                       <p > Back</p>\
                                   </div>\
                                   <div class="col-xs-12 col-sm-12 col-md-12 border-service-detail" >\
                                       <div class="scope-icons-flex ">\
                                           <span class="service-genie-icon">\
                                               <img class="img-responsive" src="/img/great-prices.svg">\
                                           </span>\
                                           <p class="title">\
                                               Price Details\
                                           </p>\
                                       </div>\
                                   </div>\
                                   <div class="col-md-12 col-xs-12 ">\
                                       <div class="scope-icons-flex-subtitle">\
                                           <p class="scope-section-subheader hidden-sm hidden-xs">\
                                               {{services}}\
                                           </p>\
                                           <div id="i-more-info" class="pointer" onClick="toggleServiceType()">\
                                               <p class="scope-section-subheader">i</p>\
                                           </div>\
                                           <p class="scope-section-subheader hidden-md hidden-lg blue">\
                                               {{services}}\
                                           </p>\
                                       </div>\
                                   </div>\
                                   {{#subCategory}}<div class=" col-md-12  col-xs-12 price-first-section">\
                                       <p class="service-details-list">\
                                           {{{pricingUnitNote.mainUnitNote}}}.\
                                           {{{pricingUnitNote.additionalUnitNote}}}.\
                                       </p>\
                                       <p class="service-details-list">\
                                           {{{pricingUnitNote.asteriskNote}}}</p>\
                                   </div>{{/subCategory}}\
                                   <div class="col-md-12 col-xs-12">\
                                       <p class="scope-section-subheader">\
                                           NOTES :\
                                       </p>\
                                   </div>\
                                   <div class="col-md-12 col-xs-12">\
                                       <p class="service-details-list ">\
                                           Additional charges apply for Emergency and Friday bookings, based on\
                                           availability and\
                                           permissions from community/ building, as confirmed by the customer. VAT\
                                           charges are not included\
                                           and are based on the total invoice amount.\
                                       </p>\
                                   </div>\
                                   <div class="col-xs-12 warranty">\
                                       <p class="scope-section-subheader">\
                                           warranty\
                                       </p>\
                                   </div>\
                                   <div class="col-md-12 col-xs-12 mp-0">\
                                       <div class="scope-icons-flex mp-0">\
                                           <div class="warranty-icon" onclick="window.location.href = \'https://www.homegenie.com/en/warranty/\'">\
                                               <img src="/img/warranty.svg" class="img-responsive">\
                                           </div>\
                                           <div class="warranty-data-lists text-left">\
                                               <p class="service-details-list ">\
                                                   As provided in the bill estimate.\
                                               </p>\
                                               <p class="service-details-list text-left">\
                                                   For more details, visit\
                                                   <span>\
                                                       <a href="https://www.homegenie.com/en/warranty/" class="blue">HomeGenie Warranty</a>\
                                                   </span>\
                                               </p>\
                                           </div>\
                                       </div>\
                                   </div>\
                               </div>\
                           </div>\
                       </div>{{/pricedetails}}';

var serviceTemplate = '{{#servicedetails}}<div class="modal-dialog service-dialog">\
                           <div class="modal-content containerSize col-lg-offset-8 col-lg-4 col-xs-12 col-md-offset-7 col-md-5 col-sm-offset-6 col-sm-6 modal-data service-details">\
                               <div class="row clearfix">\
                                   <div class="back-button back-btn-abs-text" onclick="hideCurrentModal(this)">\
                                       <div class="back-arrow"><img src="/img/modal-back-icon.svg" class="img-responsive"></div>\
                                       <p > Back</p>\
                                   </div>\
                                   <div class="col-xs-12 col-sm-12 col-md-12 border-service-detail">\
                                       <div class="scope-icons-flex ">\
                                           <span class="service-genie-icon">\
                                               <img class="img-responsive" src="/img/expert-professionals.svg">\
                                           </span>\
                                           <p class="title">\
                                               service details\
                                           </p>\
                                       </div>\
                                   </div>\
                                   <div class="col-sm-12 col-md-12 col-xs-12 service-notes">\
                                       <p class="scope-section-subheader">\
                                       what\'s included\
                                       </p>\
                                       <p class="whats-included service-details-list mp-0" id="service-included">{{{Notes1}}}</p>\
                                   </div>\
                                   {{#subCategory}}<div class="col-md-12 col-xs-12">\
                                       <p class="scope-section-subheader availability mp-0">\
                                           availability\
                                       </p>\
                                       <div class="col-md-12 col-xs-12 mp-0">\
                                       <div class="scope-icons-flex service-icon-flex">\
                                           <div class="scope-icons">\
                                               {{#emergencyBookingAllowed}}\
                                               <div class="tick-box"><img class="img-responsive"\
                                                       src="/img/right-icon.svg"></div>\
                                               {{/emergencyBookingAllowed}}\
                                               {{^emergencyBookingAllowed}}\
                                               <div class="tick-box"><img class="img-responsive"\
                                                       src="/img/cross-icon.svg"></div>\
                                               {{/emergencyBookingAllowed}}\
                                               <div class="availibilty-box"><img src="/img/emergency.png" class="img-responsive"></div>\
                                               <span class="scope-section-subheader font-12">emergency</span>\
                                           </div>\
                                           <div class="scope-icons">\
                                               <div class="tick-box"><img class="img-responsive"\
                                                       src="/img/right-icon.svg"></div>\
                                               <div class="availibilty-box"><img src="/img/sameDay.png" class="img-responsive"></div>\
                                               <span class="scope-section-subheader font-12">same day</span>\
                                           </div>\
                                           <div class="scope-icons">\
                                               {{#fridayBookingAllowed}}\
                                               <div class="tick-box"><img class="img-responsive"\
                                                       src="/img/right-icon.svg"></div>\
                                               {{/fridayBookingAllowed}}\
                                               {{^fridayBookingAllowed}}\
                                               <div class="tick-box"><img class="img-responsive"\
                                                       src="/img/cross-icon.svg"></div>\
                                               {{/fridayBookingAllowed}}\
                                               <div class="availibilty-box"><img src="/img/friday.png" class="img-responsive"></div>\
                                               <span class="scope-section-subheader font-12">friday</span>\
                                           </div>\
                                           <div class="scope-icons">\
                                               <div class="tick-box"><img class="img-responsive"\
                                                       src="/img/right-icon.svg"></div>\
                                               <div class="availibilty-box"><img src="/img/scheluded.png" class="img-responsive"></div>\
                                               <span class="scope-section-subheader font-12">scheduled</span>\
                                           </div>\
                                       </div>\
                                   </div>\
                                   </div>\
                                   <div class="col-sm-12 col-md-12 col-xs-12 note note-font-servicedetails customer-notes">\
                                       <p class="note-margin scope-section-subheader">NOTES :</p>\
                                       <p class="note-margin service-details-list" id="serviceDetails-note">{{{customerNotes}}}</p>\
                                   </div>{{/subCategory}}\
                               </div>\
                           </div>\
                       </div>{{/servicedetails}}';

var genieTemplate = '{{#genie}}<div class="genie-name-box detail-genie-name-box">\
                       <div class="col-xs-12 col-sm-2 col-md-2 column details-genie-img">\
                           <img src="{{profilePicURL.original}}" class="img-responsive genie-img" onerror="this.src=\'../img/genieicon.png\'">\
                       </div>\
                   <div class="hidden-xs col-sm-10 col-md-10 column">\
                       <p class="details-genie-name" style="margin-bottom:0px;">{{name}} {{#favouriteGenie}}(favourite genie){{/favouriteGenie}}{{#_id}}<img  class="gprofile-img" src="/img/gprofile.png" onclick="getDriverDetails(\'{{_id}}\')">{{/_id}}</p>\
                       {{#genieStar}}<img src="/img/{{genieStar.0}}.png" style="margin-bottom:10px;max-width:15px;">\
                       <img src="/img/{{genieStar.1}}.png" style="margin-bottom:10px;max-width:15px;">\
                       <img src="/img/{{genieStar.2}}.png" style="margin-bottom:10px;max-width:15px;">\
                       <img src="/img/{{genieStar.3}}.png" style="margin-bottom:10px;max-width:15px;">\
                       <img src="/img/{{genieStar.4}}.png" style="margin-bottom:10px;max-width:15px;">\
                       <span style="position:relative;top:-3px;left:5px;">({{noOfStar}}/5)<span>{{/genieStar}}\
                       <br/>\
                   </div>\
                   <div class="col-xs-12 hidden-sm hidden-md hidden-lg">\
                       <div class="row clearfix text-center">\
                           <div class="col-xs-12 column">\
                               <p class="details-genie-name" style="margin-bottom:0px;">{{name}}{{#_id}}<img class="gprofile-img" src="/img/gprofile.png" onclick="getDriverDetails(\'{{_id}}\')">{{/_id}}</p>\
                           </div>\
                           {{#genieStar}}<img src="/img/{{genieStar.0}}.png" style="margin-bottom:10px;max-width:15px;">\
                           <img src="/img/{{genieStar.1}}.png" style="margin-bottom:10px;max-width:15px;">\
                           <img src="/img/{{genieStar.2}}.png" style="margin-bottom:10px;max-width:15px;">\
                           <img src="/img/{{genieStar.3}}.png" style="margin-bottom:10px;max-width:15px;">\
                           <img src="/img/{{genieStar.4}}.png" style="margin-bottom:10px;max-width:15px;">\
                           <span style="position:relative;top:-3px;left:5px;">({{noOfStar}}/5)</span>{{/genieStar}}\
                       </div>\
                   </div>\
               </div>\
               {{#phoneNo}}<button class="detail-contact" id="contactGenie" data-contact="{{phoneNo}}" onclick="contactGenie(\'{{id}}\')">CONTACT GENIE</button>{{/phoneNo}}\
               {{#GenieStatus}}<p style="font-size:10px;margin-top:5px;display:none;">{{GenieStatus}}</p>{{/GenieStatus}}\
               {{#showGenieNote}}<p style="font-size:12px;font-weight:600;word-wrap:break-word;">Note: {{#advanceNote}}<span>{{advanceNote}}</span><br/>{{/advanceNote}}{{#GenieNotes}}<span>{{GenieNotes}}</span></br>{{/GenieNotes}}{{#additionalGenieNote}}<span>{{additionalGenieNote}}</span>{{/additionalGenieNote}}</p>{{/showGenieNote}}\
               {{/genie}}';

var addressTemplate = '{{#address}}<span>{{addressType}} {{apartmentNo}}, {{streetAddress}}, {{community}}, {{city}}, UAE</span>\
               {{/address}}';

var viewDetailsTemplate =
    '{{#viewDetails}}<!--<div id="popupmodal{{#Accept}}{{_id}}-d{{/Accept}}{{#Details}}{{_id}}-d{{/Details}}{{#cancelRequest}}{{_id}}-d{{/cancelRequest}}{{#completeSettled}}{{_id}}-d{{/completeSettled}}{{#payNow}}{{_id}}-pay{{/payNow}}{{#paynow}}{{_id}}-d{{/paynow}}{{#Inspected}}{{_id}}-d{{/Inspected}}" class="modal fade" role="dialog" >-->\
<!--<div class="modal-dialog job-details-dialog">-->\
<!--<div class="modal-content job-details-modal">-->\
<div class="back-button back-btn-abs-text hidden-lg hidden-sm hidden-md" onclick="window.history.back()">\
               <div class="back-arrow"><img src="/img/modal-back-icon.svg" class="img-responsive"></div>\
           </div>\
           <div class="container-fluid booking-header">\
               <div class="container">\
                   <div class="col-md-12 col-xs-12  xs-padding0">\
                       <div class="col-md-4 col-sm-4  col-xs-12 ">\
                           <div class="title-flex-box">\
                               <div class="title-icon-box">\
                                   <img class="img-responsive" src="{{categoryImage.original}}">\
                               </div>\
                               <p class="title">{{categoryName}}</p>\
                           </div>\
                       </div>\
                       <div class="col-md-4  col-sm-4  col-xs-12 text-center xs-padding0">\
                           <p class="mt-15 left-text xs-mp0"><span class="title mp-0"> Job Id</span><span class="title blue bold jobID">{{uniqueCode}}</span</p>\
                           <p class="newstatus hidden-xs"><span class="bookingdate">{{^isCategoryMembership}}Booking{{/isCategoryMembership}}{{#isCategoryMembership}}Request{{/isCategoryMembership}} date and time : {{utc_timing.requestedTime}}</span></span></p>\
                           <div class="newstatus hidden-lg hidden-md hidden-sm text-left mt-5">\
                               <span class="bookingdate">{{^isCategoryMembership}}Booking{{/isCategoryMembership}}{{#isCategoryMembership}}Request{{/isCategoryMembership}} For: {{utc_timing.requestedTime}}</span></span>\
                               <span class=""><span class="title-subtext flex-box">Status  <span>\
                               <span class="title-subtext text-center display-block"> : {{status}} <span class="{{_id}}-jobsubstatus {{_id}}-settledjobsubstatus bookingdate text-uppercase"></span></span>\</span</div>\
                           </div>\
                       </div>\
                       <div class="col-md-4 col-sm-4  col-xs-12 hidden-xs">\
                           <div class="title-flex-box">\
                               <p class="title-subtext">Status</p>\
                               <p class="title-subtext-data ">{{status}} <br><span class="{{_id}}-jobsubstatus {{_id}}-settledjobsubstatus"></span></p>\
                               <div class="title-cross-icon" onclick="window.history.back()">\
                                   <img class="img-responsive" src="/img/cancel-modal-icon.svg">\
                               </div>\
                           </div>\
                       </div>\
                   </div>\
               </div>\
           </div>\
           <div class="container-fluid info-section">\
               <div class="container">\
                   <div class="col-md-12 col-xs-12 xs-padding0">\
                       <div class="col-md-4 col-sm-4 col-xs-12 col-sm-push-4 column xs-padding0">\
                           <div class="col-md-12 col-xs-12 xs-padding0 xs-padding01">\
                           {{#subCategory.image}}<div class="img-holder subCategoryImage">\
                               <img class="img-responsive" src="{{subCategory.image}}">\
                           </div>{{/subCategory.image}}\
                           <p class="img-title">{{subCategory.subCategoryName}}</p>\
                           <p class="genie-information"></p>\
                           <div id="service-professional" class="service-professional">\
                               <p class="summary-title">Your HomeGenie</p>\
                               {{#driverData}}\
                               <div id="genie-{{_id}}" class="booking-list-box genie-{{_id}}">\
                                   <div class="flex-box p-15">\
                                       <div>\
                                       {{#profilePicURL}}\
                                       <div class="genie-pic">\
                                           <img src="{{original}}" class="img-responsive .genie-img">\
                                       </div>{{/profilePicURL}}\
                                       <p class="view-profile blue pointer" data-toggle="modal" data-target="#driver-modal" onClick="showGenieProfile(\'{{_id}}\')">View Profile</p>\
                                       </div>\
                                       <div class="genie-info">\
                                           <p class="genie-name">{{name}}</p>\
                                           {{#showCall}}<p class="genie-number">+971 {{phoneNo}}</p>{{/showCall}}\
                                           <div class="genie-rating"><div class="rating-star"><img class="img-responsive" src="/img/star-filled.png"></div> {{noOfStar}}/5 rated</div>\
                                           <!-- <p >Arrival TIme <span class="genie-time"><span class="bold">50 : 24 : 00</span>Mins</span></p> -->\
                                       </div>\
                                   </div>\
                                   {{#rating}}{{#showCall}}<span id="finalstatus-rating"><span>\
                                   <span id="{{_id}}-finalstatus"></span>{{/showCall}}{{/rating}}\
                               </div>\
                           {{/driverData}}\
                           {{^driverData}}\
                           <div id="genie-wait" class="genie-wait">\
                               <div class="genie-gif"><img class="img-responsive" src="/img/homegenie-logo.ico"></div>\
                               <div>\
                                   <p class="wait-header">Your HomeGenie</p>\
                                   <p class="wait-text">To be assigned</p>\
                               </div>\
                           </div>\
                           <p class="genie-wait-text">We will intimate you via email and sms the professional coming over for the service.</p>\
                           {{/driverData}}\
                           </div>\
                           </div>\
                       </div>\
                       <div id="booking-summery" class="col-md-4 col-sm-4 col-xs-12 col-sm-pull-4 column booking-summery xs-padding0">\
                       <div class="col-md-12 col-xs-12 xs-padding0">\
                           <p class="summary-title" onClick="showSummery()">Booking Summary</p>\
                           <div id ="summery-button" class="hidden-lg hidden-md hidden-sm down-arrow top-10px"><img class="img-responsive pointer" onClick="showSummery()" src="../img/app-right-fill-white-arrow.png"></div>\
                           <div id="summery" class="display-none">\
                               <div class="list-flex-box border-bottom-1 mt-25">\
                                   <p class="list-head">Service</p>\
                                   <div class="list-title flex-box r-15-ab pointer" data-toggle="modal" data-target="#service-modal{{#Accept}}service-{{_id}}{{/Accept}}{{#Details}}service-{{_id}}{{/Details}}{{#completeSettled}}service-{{_id}}{{/completeSettled}}{{#cancelRequest}}service-{{_id}}{{/cancelRequest}}{{#paynow}}service-{{_id}}{{/paynow}}{{#payNow}}payservice-{{_id}}{{/payNow}}"><div class="icon-box"><img src="/img/blue-i-icon.png" class="img-responsive"></div><p class="blue mt-5">Service Details</p></div>\
                               </div>\
                               <div id="service-modal{{#Accept}}service-{{_id}}{{/Accept}}{{#Details}}service-{{_id}}{{/Details}}{{#completeSettled}}service-{{_id}}{{/completeSettled}}{{#cancelRequest}}service-{{_id}}{{/cancelRequest}}{{#paynow}}service-{{_id}}{{/paynow}}{{#payNow}}payservice-{{_id}}{{/payNow}}" class="modal right fade {{#Accept}}service-{{_id}}{{/Accept}}{{#Details}}service-{{_id}}{{/Details}}{{#completeSettled}}service-{{_id}}{{/completeSettled}}{{#cancelRequest}}service-{{_id}}{{/cancelRequest}}{{#paynow}}service-{{_id}}{{/paynow}}{{#payNow}}payservice-{{_id}}{{/payNow}}" role="dialog" >\
                               </div>\
                               <!--<div class="list-flex-box">\
                                   <p>Type</p>\
                                   <p class="list-title ">{{services}}</p>\
                               </div>\
                               <div class="list-flex-box">\
                                   <p> Priority</p>\
                                   <p class="list-title ">{{serviceType}}</p>\
                               </div>\
                               <div class="list-flex-box">\
                                   <p>Frequency</p>\
                                   <p class="list-title">One time</p>\
                               </div>\
                               <div class="list-flex-box">\
                                   <p> Issue</p>\
                                   <p class="list-title issue">{{subCategory.subCategoryName}}</p>\
                               </div>\
                               <div class="list-flex-box">\
                                   <p>No. of Units</p>\
                                   <p class="list-title">{{estimatedWorkHours}}</p>\
                               </div>\
                               <div class="list-flex-box border-bottom-1 mt-25">\
                                   <p class="list-head">Date and Location</p>\
                               </div>-->\
                               <p "><span class="active-color  list-data-title">Type</span> <span class="pull-right flex-box"><span class="icon-box pointer" onClick="toggleServiceType()"><img src="/img/blue-i-icon.png" class="img-responsive"></span>{{services}}</span></p>\
                               <p><span class="active-color list-data-title">Priority</span> <span class="pull-right {{serviceType}}">{{serviceType}}</span></p>\
                               {{^isCategoryMembership}}<p><span class="active-color list-data-title">Frequency</span><span class="pull-right frequency">One time</span></p>{{/isCategoryMembership}}\
                               {{#subCategory.questions}}{{{subCategory.questions}}}{{/subCategory.questions}}\
                               <div class="list-flex-box border-bottom-1 mt-25">\
                                   <p class="list-head">Date and Location</p>\
                               </div>\
                               <div class="list-flex-box ">\
                                   <p>Date and time</p>\
                                   <p class="list-title">{{scheduleDate}}</p>\
                               </div>\
                               {{#address}}<div class="list-flex-box">\
                                   <p>Address</p>\
                                   <div class="list-title">\
                                       <p class="bold ">{{addressType}}</p>\
                                       <p><span class="">{{apartmentNo}}</span>,<span class="">{{streetAddress}}</span></p>\
                                       <p><span class="">{{community}}</span>, <span class="">{{city}}</span>, UAE</p>\
                                   </div>\
                               </div>{{/address}}\
                               {{#problemImages}}<div class="list-flex-box border-box mt-25 ">\
                                   <div class="flex-box">\
                                       <p class="list-head">Image Shared</p>\
                                       <p class="list-title shared-date"></p>\
                                   </div>\
                                   <div class="img-box">\
                                       <img src="{{original}}" class="img-responsive">\
                                   </div>\
                               </div>{{/problemImages}}\
                               {{#materialImages}}<div class="list-flex-box border-box mt-25 ">\
                                   <div class="flex-box">\
                                       <p class="list-head">Material Image Shared</p>\
                                       <p class="list-title shared-date"></p>\
                                   </div>\
                                   <div class="img-box">\
                                       <img src="{{original}}" class="img-responsive">\
                                   </div>\
                               </div>{{/materialImages}}\
                               {{#problemDetails}}<div class="border-box mt-25 border-box">\
                                       <p class="list-head">Your Note:</p>\
                                       <p class="list-title note-title hidden"></p>\
                                       <p class="note">{{problemDetails}}</p>\
                               </div>{{/problemDetails}}\
                           </div>\
                           </div>\
                       </div>\
                       <div id="payment-summary" class="col-md-4 col-sm-4 col-xs-12 payment-summary xs-padding0">\
                       <div class="col-md-12 col-xs-12 xs-padding0">\
                           <div >\
                               <p class="summary-title" onClick="showPayment()"><span>Payment Summary</span> <span class="pull-right flex-box hidden"><span class="icon-box-title"><a href="{{finalInvoice}}" download="Final Bill"><img src="/img/share.png" class="img-responsive"></a></span></span></p>\
                               <div id ="payment-button" class="hidden-lg hidden-md hidden-sm down-arrow" ><img class="img-responsive pointer" onClick="showPayment()" src="../img/app-right-fill-white-arrow.png"></div>\
                               <div id ="payment" class="display-none">\
                                   <div class="list-flex-box border-bottom-1 mt-25">\
                                       <p class="list-head">Pricing</p>\
                                       <div class="list-title flex-box r-15-ab pointer" data-toggle="modal" data-target="#pricing-modal{{#Accept}}price-{{_id}}{{/Accept}}{{#Details}}price-{{_id}}{{/Details}}{{#cancelRequest}}price-{{_id}}{{/cancelRequest}}{{#paynow}}price-{{_id}}{{/paynow}}{{#completeSettled}}price-{{_id}}{{/completeSettled}}{{#payNow}}payprice-{{_id}}{{/payNow}}">\
                                           <div class="icon-box">\
                                               <img src="/img/tag.png" class="img-responsive">\
                                           </div>\
                                           <p class="blue mt-5">Pricing Details</p>\
                                       </div>\
                                   </div>\
                                   <div id="pricing-modal{{#Accept}}price-{{_id}}{{/Accept}}{{#Details}}price-{{_id}}{{/Details}}{{#cancelRequest}}price-{{_id}}{{/cancelRequest}}{{#paynow}}price-{{_id}}{{/paynow}}{{#completeSettled}}price-{{_id}}{{/completeSettled}}{{#payNow}}payprice-{{_id}}{{/payNow}}" class="modal right fade {{#Accept}}price-{{_id}}{{/Accept}}{{#Details}}price-{{_id}}{{/Details}}{{#cancelRequest}}price-{{_id}}{{/cancelRequest}}{{#paynow}}price-{{_id}}{{/paynow}}{{#completeSettled}}price-{{_id}}{{/completeSettled}}{{#payNow}}payprice-{{_id}}{{/payNow}}" role="dialog" ></div>\
                                   <div class="list-flex-box">\
                                       <p class="bold">Item</p>\
                                       <p class="list-title bold">AED</p>\
                                   </div>\
                                   <!--<div class="list-flex-box">\
                                       <p class="">test</p>\
                                       <p class="list-title">{{estimateCharges}}</p>\
                                   </div>\
                                   <div class="list-flex-box">\
                                       <p class="">Other Charges</p>\
                                       <p class="list-title">{{#otherChargess}}{{otherChargess}}{{/otherChargess}}{{^otherChargess}}NA{{/otherChargess}}</p>\
                                   </div>\
                                   <div class="list-flex-box">\
                                       <p class="">Discount(Online)</p>\
                                       <p class="list-title">{{discountCharges}}</p>\
                                   </div>\
                                   <div class="list-flex-box">\
                                       <p class=" bold">Total Charges</p>\
                                       <p class="list-title bold ">{{totalCharges}}</p>\
                                   </div>\
                                   <div class="list-flex-box">\
                                       <p class="">Vat Charges</p>\
                                       <p class="list-title">{{vatCharges}}</p>\
                                   </div>\
                                   <div class="list-flex-box">\
                                       <p class=" bold">Total Charges(inclusive of VAT)</p>\
                                       <p class="list-title bold ">{{#vatFinalCharges}}{{vatFinalCharges}}{{/vatFinalCharges}}{{^vatFinalCharges}}NA{{/vatFinalCharges}}</p>\
                                   </div>\
                                   <div class="list-flex-box blue  border-bottom-1">\
                                       <p class="bold">Total Service Amount</p>\
                                       <p class="list-title bold">{{finalCharges}}</p>\
                                   </div>-->\
                                   {{#showLabourChargeold}}{{#charges.labourCharges}}<p><span class="list-data-title">Labor ({{charges.labourSubText}})</span><span class="pull-right">{{charges.labourCharges}}</span></p>{{/charges.labourCharges}}{{/showLabourChargeold}}\
                                   {{#hideLabourCharges}}{{#charges.labourCharges}}<p><span class="list-data-title">Labor ({{charges.labourSubText}})</span><span class="pull-right">{{charges.labourCharges}}</span></p>{{/charges.labourCharges}}{{/hideLabourCharges}}\
                                   {{#charges.unitCharges}}<p><span class="list-data-title">Service Charges</span><span class="pull-right">{{charges.unitCharges}}</span></p>{{/charges.unitCharges}}\
                                   {{#showEstimateItems}}{{#estimateItems}}<p><span class="list-data-title">{{name}}</span><span class="pull-right">{{charge}}</span></p>{{/estimateItems}}{{/showEstimateItems}}\
                                   {{#charges.emergencyCharges}}<p><span class="list-data-title">Emergency Charges</span><span class="pull-right">{{charges.emergencyCharges}}</span></p>{{/charges.emergencyCharges}}\
                                   {{#charges.fridayCharges}}<p><span class="list-data-title">Friday Charges</span><span class="pull-right">{{charges.fridayCharges}}</span></p>{{/charges.fridayCharges}}\
                                   {{#showMaterialOld}}{{#charges.materialCharges}}<p><span class="list-data-title">Material</span><span class="pull-right">{{charges.materialCharges}}</span></p>{{/charges.materialCharges}}{{/showMaterialOld}}\
                                   {{#charges.additionalCharges}}<p><span class="list-data-title">Other Charges</span><span class="pull-right">{{charges.additionalCharges}}</span></p>{{/charges.additionalCharges}}\
                                   {{#charges.discountCharges}}<p><span class="list-data-title">{{^promoID}}Discount (online*){{/promoID}} {{#promoID}}Discount (online* + {{promoID.name}}){{/promoID}}</span><span class="pull-right">{{charges.discountCharges}}</span></p>{{/charges.discountCharges}}\
                                   {{#charges.totalCharges}}<b><p class="bold"><span class="list-data-title">Total Charges</span><span class="pull-right">{{charges.totalCharges}}</span></p></b>{{/charges.totalCharges}}\
                                   {{^charges.totalCharges}}<b><p class="bold"><span class="list-data-title">Total Charges</span><span class="pull-right">0</span></p></b>{{/charges.totalCharges}}\
                                   {{#charges.vatCharges}}<p><span class="list-data-title">Vat Charges</span><span class="pull-right">{{charges.vatCharges}}</span></p>{{/charges.vatCharges}}\
                                   {{#charges.vatFinalCharges}}<b><p class="bold"><span class="list-data-title">Total Charges (incl VAT)</span><span class="pull-right">{{charges.vatFinalCharges}}</span></p></b>{{/charges.vatFinalCharges}}\
                                   {{#advanceAvail}}<p><span class="list-data-title">(less) Advance</span><span class="pull-right">{{AdvanceAmount}}</span>{{/advanceAvail}}\
                                   {{#showDueAmount}}<b><p class="bold"><span class="list-data-title">Due Amount</span><span class="pull-right">{{charges.dueCharges}}</span></p></b>{{/showDueAmount}}\
                                   <div class="list-flex-box border-bottom-1 pt-5">\
                                       <p class="list-head">Payment</p>\
                                   </div>\
                                   <div class="list-flex-box">\
                                       <p class="">Plan</p>\
                                       <p class="list-title test blue">{{#paymentPlan}}{{paymentPlan}}{{/paymentPlan}}{{^paymentPlan}}NA{{/paymentPlan}}</p>\
                                   </div>\
                                   {{#payment.payment_type}}<div class="list-flex-box">\
                                        <p class="">Method</p>\
                                        {{#walletData}}<p class="list-title test blue">WALLET({{walletData}}) + CARD</p>{{/walletData}}\
                                        {{^walletData}}<p class="list-title test blue">{{payment.payment_type}}</p>{{/walletData}}\
                                    </div>{{/payment.payment_type}}\
                                   <div class="list-flex-box">\
                                       <p class="">Status</p>\
                                       <p class="list-title test blue">{{payment_status}}</p>\
                                   </div>\
                                   <div class="list-flex-box border-bottom-1 pt-5">\
                                       <p class="list-head">Document</p>\
                                   </div>\
                                   <div class="list-flex-box">\
                                       <p class="flex-box">Bill Esitimate{{#billAndInvoices.estimatedBill}}<span class="icon-box icon-box-bill"><a href="{{billAndInvoices.estimatedBill}}"><img src="/img/download.png" class="img-responsive"></a></span>{{/billAndInvoices.estimatedBill}}</p>\
                                       {{^billAndInvoices.estimatedBill}}<p class="list-title">NA</p>{{/billAndInvoices.estimatedBill}}\
                                   </div>\
                                   <div class="list-flex-box">\
                                      <p class="flex-box">Vat invoice(s){{#billAndInvoices.finalInvoice}}<span class="icon-box icon-box-bill" ><a href="{{billAndInvoices.finalInvoice}}" ><img src="/img/download.png" class="img-responsive"></a></span>{{/billAndInvoices.finalInvoice}}</p>\
                                      {{^billAndInvoices.finalInvoice}}<p class="list-title">NA</p>{{/billAndInvoices.finalInvoice}}\
                                   </div>\
                                   {{#showGenieNote}}<div class="list-flex-box border-top-1">\
                                       <p class="list-head">NOTES:</p>\
                                   </div>{{/showGenieNote}}\
                                   <div class="color-light-grey">\
                                   {{#showGenieNote}}<p ><span>{{genieNotes}},</span>{{#additionalGenieNote}}<span>{{additionalGenieNote}}.</span>{{/additionalGenieNote}}</p>{{/showGenieNote}}\
                                   {{#advanceNote}}<p >{{#advanceNote}}<span>{{&advanceNote}}</span><br/>{{/advanceNote}}</p>{{/advanceNote}}\
                                   {{#breakdownNote}}<p >See detailed breakdown on email sent to registered email address.</p>{{/breakdownNote}}\
                                   <div class="scope-icons-flex border-top-1">\
                                            <div class="warranty-icon" onclick="window.location.href = \'https://www.homegenie.com/en/warranty/\'">\
                                                <img src="/img/warranty.svg" class="img-responsive">\
                                            </div>\
                                            <div class="warranty-data-lists text-left">\
                                                <p class="service-details-list bold">Warranty</p>\
                                                <p class="service-details-list ">\
                                                {{#isWarrantyFalse}}<span class="no-warranty">No warranty applicable to this service</span>{{/isWarrantyFalse}}\
                                                {{^isWarrantyFalse}}{{{warranty.warrantyText}}}{{/isWarrantyFalse}}\
                                                </p>\
                                                <p class="service-details-list text-left color-light-grey">\
                                                    Visit\
                                                    <span>\
                                                        <a href="https://www.homegenie.com/en/warranty/" class="blue">HomeGenie Warranty Policy</a>\
                                                    </span>\
                                                </p>\
                                            </div>\
                                        </div>\
                                   </div>\
                               </div>\
                               <div class="stick-bottom-button"><span id="finalstatus"><span>\
                                   {{#cancelRequest}}<span id="{{_id}}-finalstatus"><div class="col-xs-12 col-sm-12 col-md-12 column text-center cancel-req pointer" onclick="cancelAppointment(\'{{_id}}\',\'{{#cancelRequest}}{{_id}}-d{{/cancelRequest}}\')">\
                                       <button class="cancel">Cancel</button>\
                                   </div></span>{{/cancelRequest}}\
                                   {{#paynow}}<span id="{{_id}}-finalstatus"><div class="col-xs-12 col-sm-12 col-md-12 column text-center cancel-req pointer" data-id="{{_id}}" onclick="makePayment(\'{{_id}}\', {{charges.finalCharges}})" >\
                                       <button class="accept">Pay Now</button>\
                                   </div></span>{{/paynow}}\
                                   {{#Accept}}<span id="{{_id}}-finalstatus"><div class="col-xs-6 col-sm-6 col-md-6 column text-center cancel-req pointer" data-id="{{_id}}" onclick="acceptOrRejectJob(\'{{_id}}\', \'APPROVE\', {{advancePayment}})" >\
                                       <button class="accept">Accept Estimate</button>\
                                       </div>\
                                       <div class="col-xs-6 col-sm-6 col-md-6 column text-center cancel-req pointer" data-id="{{_id}}" onclick="acceptOrRejectJob(\'{{_id}}\', \'REJECTED\', "", this)">\
                                           <button class="cancel">Reject Estimate</button>\
                                       </div></span>{{/Accept}}\
                                   {{#AdvanceFixed}}<span id="{{_id}}-finalstatus"><div class="col-xs-6 col-sm-6 col-md-6 column text-center cancel-req pointer" data-id="{{_id}}" onclick="acceptOrRejectJob(\'{{_id}}\', \'APPROVE\', {{advancePayment}})" >\
                                       <button class="accept">Pay Now</button>\
                                   </div>\
                                   <div class="col-xs-6 col-sm-6 col-md-6 column text-center cancel-req pointer" data-id="{{_id}}" onclick="acceptOrRejectJob(\'{{_id}}\', \'REJECTED\')">\
                                       <button class="cancel">Cancel</button>\
                                   </div></span>{{/AdvanceFixed}}\
                                   {{#payNow}}<span id="{{_id}}-finalstatus"><div class="col-xs-12 col-sm-12 col-md-12 column text-center cancel-req pointer" data-id="{{_id}}" onclick="makePayment(\'{{_id}}\', {{charges.finalCharges}})" >\
                                       <button class="accept">Pay Now</button>\
                                   </div></span>{{/payNow}}\
                                   <span class="{{_id}}-pay"></span></div>\
                           </div>\
                       </div>\
                       </div>\
                   </div>\
                   <div class="col-md-12 col-xs-12 xs-padding0 hidden">\
                       <div class="col-md-12 col-xs-12 xs-padding0">\
                           <div class="col-md-12 col-xs-12 booking-action-bar">\
                               <div class="col-md-offset-8 col-md-4 col-xs-12">\
                                   <div class="flex-box options-button right">\
                                       <!-- <div class="booking-action-icon reschedule-booking-action">\
                                           <img class="img-responsive" src="/img/booking-reschedule-icon.svg">\
                                       </div>\
                                       <p class="action-text reschedule-booking-action">Reschedule</p> -->\
                                       <div class="booking-action-icon cancel-booking-action">\
                                           <img class="img-responsive" src="/img/cancel-sad-emoji.svg">\
                                       </div>\
                                       <p class="action-text cancel-booking-action">Cancel</p>\
                                       <div class="booking-action-icon help-action">\
                                           <img class="img-responsive" src="/img/booking-help-icon.svg">\
                                       </div>\
                                       <p class="action-text help-action">Help</p>\
                                   </div>\
                               </div>\
                           </div>\
                       </div>\
                   </div>\
                   <div class="modal fade" id="service-type-modal" role="dialog">\
                           <div class="modal-dialog ">\
                               <div class=" modal-content col-md-12 col-xs-11 modal-data service-type">\
                                   <div class="col-md-12 col-xs-12 service-description">\
                                       <p class="title text-center">{{services}}</p>\
                                       {{#subCategory}}\
                                       {{#isInspectionRequired}}\
                                       {{#callOutCharges}}\
                                       <div class="service-details-list ip-based">\
                                           <p class="mp-0">If the service is an inspection based service e.g.an AC\
                                           repair then it requires\
                                           an inspection visit for a diagnosis and thereby an\
                                           inspection charge is\
                                           applicable to this service. The inspection will result\
                                           in an estimate for the\
                                           customer which needs to be approved or rejected. If\
                                           approved the service is\
                                           delivered at the agreed estimate. If rejected, the\
                                           inspection charge should be\
                                           paid by the customer.\</p>\
                                       </div>\
                                       {{/callOutCharges}}\
                                       {{^callOutCharges}}\
                                       <div class="service-details-list ">\
                                           <p class="mp-0">The selected issue or service requires us to visit your location to survey and ascertail your requirements before we could provide you with an estimate.</p>\
                                       </div>\
                                       {{/callOutCharges}}\
                                       {{/isInspectionRequired}}\
                                       {{^isInspectionRequired}}\
                                       <div class="service-details-list">\
                                           <p class="mp-0">The selected service is a fixed price service with the price estimate calculated based on the details you select while booking the service.</p>\
                                       </div>\
                                       {{/isInspectionRequired}}{{/subCategory}}\
                                   </div>\
                                   <div class="col-md-12 col-xs-12">\
                                       <button class="modal-button" onclick="hideCurrentModal(this)">Okay, got it!</button>\
                                   </div>\
                                   <div class="col-md-12 col-xs-12">\
                                       <div class="modal-disclaimer hidden-xs"> An additional Emergency and Friday charges are applicable to the booking.</div>\
                                       <div class="modal-disclaimer hidden-md hidden-lg">\
                                           <p class="mp-0">An additional Emergency</p>\
                                           <p class="mp-0"> and Friday charges are</p>\
                                           <p class="mp-0"> applicable to the booking.</p?\
                                       </div>\
                                   </div>\
                               </div>\
                           <div>\
                       </div>\
                   </div>\
               </div>\
           </div>\
       </div>\
   <!--</div>\
</div>-->\
{{/viewDetails}}';

var genieProfile = '<div class="row clearfix">\
<div class="col-md-4 col-sm-3 hidden-xs column"></div>\
<div class="col-md-4 col-sm-6 col-xs-12 column" style="background:#fff;opacity:0.6;height:100vh;">\
   <div class="row clearfix">\
       <div class="col-md-12 col-sm-12 col-xs-12 column text-center gprofile vertical-align">\
           <p><img src="/img/gprofile.png" style="height:25px;margin-top:-1px;">\
           <span class="active-color">GENIE PROFILE</span> <span class="fa fa-times-circle-o pull-right close-hiw"></span></p>\
       </div>\
       <div class="col-md-12 col-sm-12 col-xs-12 column" style="width:98%;display:none;margin-left:1%;margin-top:0px;border-bottom:solid 1px #e1e1e1;"></div>\
       <div class="col-md-12 col-sm-12 col-xs-12 column gdriverrate">\
           <div class="genie-name-box detail-genie-name-box">\
               <div class="col-xs-2 col-sm-2 col-md-2 column details-genie-img"> <img src="{{profilePicURL.original}}" class="img-responsive genie-img" onerror="this.src=\'../img/genieicon.png\'"> </div>\
               <div class="col-xs-10 col-sm-10 col-md-10 column">\
                   <p class="details-genie-name" style="margin-bottom:0px;">{{name}} </p> <img src="/img/{{genieStar.0}}.png" style="margin-bottom:10px;max-width:15px;"> <img src="/img/{{genieStar.1}}.png" style="margin-bottom:10px;max-width:15px;"> <img src="/img/{{genieStar.2}}.png" style="margin-bottom:10px;max-width:15px;"> <img src="/img/{{genieStar.3}}.png" style="margin-bottom:10px;max-width:15px;"> <img src="/img/{{genieStar.4}}.png" style="margin-bottom:10px;max-width:15px;"> <span style="position:relative;top:-3px;left:5px;">({{noOfStar}}/5)<span>                            <br>                        </span></span>\
               </div>\
               <div class="hidden-xs hidden-sm hidden-md hidden-lg">\
                   <div class="row clearfix text-center">\
                       <div class="col-xs-12 column">\
                           <p class="details-genie-name" style="margin-bottom:0px;">{{name}}</p>\
                       </div>\
                       {{#genieStar}}<img src="/img/{{genieStar.0}}.png" style="margin-bottom:10px;max-width:15px;">\
                       <img src="/img/{{genieStar.1}}.png" style="margin-bottom:10px;max-width:15px;">\
                       <img src="/img/{{genieStar.2}}.png" style="margin-bottom:10px;max-width:15px;">\
                       <img src="/img/{{genieStar.3}}.png" style="margin-bottom:10px;max-width:15px;">\
                       <img src="/img/{{genieStar.4}}.png" style="margin-bottom:10px;max-width:15px;">\
                       <span style="position:relative;top:-3px;left:5px;">({{noOfStar}}/5)<span>{{/genieStar}}\
                       </div>\
               </div>\
           </div>\
       </div>\
       <div class="col-md-12 col-sm-12 col-xs-12 column gcertificate">\
           <p>RESIDENCE VISA <span class="pull-right">{{residenceVISA}}</span></p>\
           <p>TRADE LICENSE {{#supplierID.tradelicenseNo}}( {{supplierID.tradelicenseNo}} ){{/supplierID.tradelicenseNo}}<span class="pull-right">{{tradeLicence}}</span></p>\
           <p>INSURANCE <span class="pull-right">{{insurance}}</span></p>\
           <div class="col-md-12 col-sm-12 col-xs-12 column" style="width:98%;margin-left:1%;border-bottom:solid 1px #e1e1e1;margin-top:5px;"></div>\
       </div>\
       <div class="col-md-12 col-sm-12 col-xs-12 column gskills">\
           <p>SKILLS</p>\
           <p style="padding-left:10px;padding-right:10px;">{{#categories}}<button>{{.}}</button>{{/categories}}</p>\
           <div class="col-md-12 col-sm-12 col-xs-12 column" style="width:98%;margin-left:1%;border-bottom:solid 1px #e1e1e1;margin-top:5px;"></div>\
       </div>\
       <div class="col-md-12 col-sm-12 col-xs-12 column gdetailerating">\
           <p>RATINGS</p>\
           <div class="col-md-12 col-sm-12 col-xs-12 column padding0 div-pro">\
               <div>5*</div>\
               <div class="progress gprogress">\
                   <div class="progress-bar" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style="width:{{percent_five}}%">\
                   </div>\
               </div>\
               <div>({{feedback.fiveStar}})</div>\
           </div>\
           <div class="col-md-12 col-sm-12 col-xs-12 column padding0 div-pro">\
               <div>4*</div>\
               <div class="progress gprogress">\
                   <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width:{{percent_four}}%">\
                   </div>\
               </div>\
               <div>({{feedback.fourStar}})</div>\
           </div>\
           <div class="col-md-12 col-sm-12 col-xs-12 column padding0 div-pro">\
               <div>3*</div>\
               <div class="progress gprogress">\
                   <div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:{{percent_three}}%">\
                   </div>\
               </div>\
               <div>({{feedback.threeStar}})</div>\
           </div>\
           <div class="col-md-12 col-sm-12 col-xs-12 column padding0 div-pro">\
               <div>2*</div>\
               <div class="progress gprogress">\
                   <div class="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:{{percent_two}}%">\
                   </div>\
               </div>\
               <div>({{feedback.twoStar}})</div>\
           </div>\
           <div class="col-md-12 col-sm-12 col-xs-12 column padding0 div-pro">\
               <div>1*</div>\
               <div class="progress gprogress">\
                   <div class="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width:{{percent_one}}%">\
                   </div>\
               </div>\
               <div>({{feedback.oneStar}})</div>\
           </div>\
           <div class="col-md-12 col-sm-12 col-xs-12 column" style="width:98%;margin-left:1%;border-bottom:solid 1px #e1e1e1;margin-top:5px;"></div>\
       </div>\
       <div class="col-md-12 col-sm-12 col-xs-12 column ddetailreview">\
           <p>REVIEWS</p>\
           {{#feedback.latestComments}}<p class="genie-review-section">{{.}}</p>{{/feedback.latestComments}}\
           <p class="feedback-note"><span style="color:#3dc0e9;font-weight:600;">Note :</span> The above reviews are the last three customer reviews.</p>\
       </div>\
   </div>\
</div>\
</div>';



// var pdfDownloadMessageTemplate =
//  '<div class="modal fade msg-modal" role="dialog" data-backdrop="static"  id="close_pending_rating" style="z-index: 100000;">\
//    <div class="modal-dialog">\
//    <!-- Modal content-->\
//      <div class="modal-content cancel-booking p-10">\
//            <div class="modal-body">\
//                 <p class="p hw-md txt-gray title">{{&msg}}</p>\
//            </div>\
//            <button class="modal-footer md-hw-foot msg-modal-continue social paymentgateway registerHG address-con promo forgot-pwd advnc re-direct-home address center-align msg-continue pendingRateFooter modal-button"onclick="hidePdfDownloadCurrentModal(this);"> CONTINUE</button>\
//      </div>\
//   </div>\
//  </div>';

