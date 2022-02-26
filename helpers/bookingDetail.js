import { SLOTS, CHARGE_KEYS } from '../constants/jobdetails';
// import { defaultOptions } from './jobDetails';
import moment from 'moment';


const COMPLETED_JOB_TEXT = "The job has now been completed, for any complaints or feedback, please call HomeGenie Support Team on +97144489595 or support@homegenie.me",
    GENIE_REQUESTED = "Sit back and We are currently searching a Genie for you.",
    GENIE_NOT_ASSIGNED = "Apologies, we were not able to assign a Genie to your booking. We look forward to serving you again !",
    GENIE_ASSIGNED = "In case you wish to reach your Genie and are not able to get through, you can contact his supervisor SUPERVISIOR on +971PHONENO. For any complaints or feedback, please call HomeGenie Support Team on +97144489595 or support@homegenie.me",
    ADVANCE_PAY_NOTE = "There is an advance payment of <span style='font-weight:600;'>AED AMOUNT</span> applicable to this service which will be charged following the acceptance of estimate.";



export const getPastDetail = (data) => {
    let detail = { };
    const {
        payment,
        materials
    } = data;

    const { slot } = data;
    const slotTime = slot[0];
    detail['slot'] = SLOTS[slotTime];

    const { scheduleDate } = data;

    const date = moment(scheduleDate);
    detail['scheduleDate'] = `${date.format('ddd DD MMM YYYY')} | ${SLOTS[slotTime]}`;
    detail['dateScheduled'] = `${SLOTS[slotTime]}, ${date.format('MMM DD')}`;

    const { utc_timing: { requestedTime } } = data;
    const requstedMoment = moment(requestedTime);
    detail["utc_timing"]["requestedTime"] = [requstedMoment.format('DD/MM/YYYY'), requstedMoment.format('hh:mm:ss')];



    if (payment['payment_type'] == null) {
        detail['payment']['payment_type'] = null;
    }

    if (materials && materials.length > 0) {
        detail['AdditionalCharge'] = [];
        materials.filter(m => m.status === 'IN_SERVICE')
        .forEach((material) => {
            detail['AdditionalCharges'] = true;
            detail.additionalCharge.push({name: material.materialName, price: material.materialPrice })
        });
    }

    if (!data.paymentPlan) {
        detail['paymentPlan'] = 'On completion';
    }

    var jobStatus = data.status;
    if (jobStatus == 'CANCELLED') {
        detail['payment_status'] = 'PAID';
    }

    detail['genie'] = getGenieData(data);


    // If bookings are made through apps or webapp then show discount note
    detail.showDiscountNote = false;
    if (detail.devicePlatform && detail.devicePlatform !== 'Panel') {
        detail.showDiscountNote = true;
    } else {
        detail.showDiscountNote = false;
    }
    detail.downloadInvoices = true;
    if (detail.billAndInvoices && !detail.billAndInvoices.advanceInvoice && !detail.billAndInvoices.finalInvoice) {
        detail.downloadInvoices = false;
    } else {
        detail.downloadInvoices = true;
    }

    const { charges, AdvanceAmount } = data;
    if (charges) {
        CHARGE_KEYS.forEach((key) => {
            const c = charges[key]
            if (data.charges && Number(c)) {
                detail['charges'][key] = Number(Number(c).toFixed(2));
            }
        });
    }

    if (Number(AdvanceAmount)) {
        detail.AdvanceAmount = Number(Number(AdvanceAmount).toFixed(2));
    }
    
    // to fix precision issue of charges

    const {
        isInspectionCompleted,
        isRejected,
        status,
        estimateItems,
        categoryName
    } = data;

    detail.hideLabourCharges = !isInspectionCompleted || isRejected || status === 'CANCELLED' || status === 'EXPIRED'
    detail.showEstimateItems = isInspectionCompleted && !isRejected;

    const showLabourMatrial = (isInspectionCompleted 
        && (
            !estimateItems 
            || (
                estimateItems 
                && estimateItems.length === 0
            )
        )
        && !isRejected
    );

    detail.showLabourChargeold = showLabourMatrial
    detail.showMaterialOld = showLabourMatrial
    detail.isCategoryMembership = categoryName == 'Membership';

    if (status == 'REJECTED') {
        detail.showAction = '- Rejected and paid';
        detail.charges.totalCharges = callOutCharges;
        // $("#" + id + "-total").html(resultdata.charges.callOutCharges);
        // $("." + id + "-settledjobsubstatus").html("( - Rejected and paid )");
    } else if (status == 'CANCELLED') {
        detail.showAction = '- Cancelled and paid';
        if (totalCharges) {
            detail.showAction = '- Cancelled and paid';
        }
    }
    return detail;
}


export const getGenieData = (data) => {

    let genie = {};

    if (data.genie) {

        const { 
            genieNotes,
            additionalGenieNote,
            driverData,
            status
        } = data;
        genie['GenieStatus'] = COMPLETED_JOB_TEXT;
        genie['phoneNo'] = false;
        genie['GenieNotes'] = data.genieNotes;
        genie['additionalGenieNote'] = data.additionalGenieNote;
        genie['phoneNo'] = data.companyPhoneNo;
        
        if (genieNotes || additionalGenieNote) {
            genie['showGenieNote'] = true;
        }
        let genieStar;
        let starRating;
        if (driverData.rating && driverData.ratingPersonNo) {
            genieStar = Number(parseFloat(driverData.rating / driverData.ratingPersonNo).toFixed(1));
            starRating = genieStar;
            let checkForDecimal = (parseFloat(genieStar).toFixed(1)).toString();
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
        genie["genieStar"] = genieStarObj;
        genie["noOfStar"] = starRating;
        // results.data[0].driverData["noOfStar"] = starRating;
        if (status == 'PAYMENT_PENDING' || status == "RATING") {
            genie["GenieNotes"] = null;
        }
    }

    return genie;
}


export const getCurrentDetails = (data) => {
    let detail = data;
    detail['showCall'] = true;
    detail['services'] = data.serviceBasedType;

    const { 
        materials,
        status,
        charges,
        advancePayment,
        advance_payment,
        isRejected,
        payment,
        subCategory
    } = data;

    const { slot } = data;
    const slotTime = slot[0];
    detail['slot'] = SLOTS[slotTime];

    const { scheduleDate } = data;

    const date = moment(scheduleDate);
    detail['scheduleDate'] = `${date.format('ddd DD MMM YYYY')} | ${SLOTS[slotTime]}`;
    detail['dateScheduled'] = `${SLOTS[slotTime]}, ${date.format('MMM DD')}`;

    const { utc_timing: { requestedTime } } = data;
    const requstedMoment = moment(requestedTime);
    detail["utc_timing"]["requestedTime"] = [requstedMoment.format('DD/MM/YYYY'), requstedMoment.format('hh:mm:ss')];
        
    detail.services = data.serviceBasedType;

    if (payment['payment_type'] == null) {
        detail['payment']['payment_type'] = null;
    }

    // for showing additional charges
    if (materials && materials.length > 0) {
        detail['AdditionalCharge'] = [];
        detail.charges['materialCharges'] = 0;
        detail.charges['additionalCharges'] = 0;

        materials.filter(m => ['IN_SERVICE', 'INSPECTION'].indexOf(m.status) !== -1)
        .forEach(m => {
            if (m.status == 'IN_SERVICE') {
                detail['AdditionalCharges'] = true;
                detail.charges['additionalCharges'] += m.materialPrice;
                detail.AdditionalCharge.puhs({name: m.materialName, price: m.materialPrice });
            } else {
                detail.charges['materialCharges'] += m.materialPrice;
            }
        });

    }

    const { 
        finalCharges,
        advanceCharges,
        estimateCharges,
        vatFinalCharges,
        unitCharges,
        discountCharges,
        additionalCharges,
    } = charges || {};

    // show due amount
    detail.showDueAmount = false;
    if (status == 'IN_SERVICE' || finalCharges) {
        detail.showDueAmount = true;
        
        if (status == 'IN_SERVICE') {
            if (advanceCharges == estimateCharges) {
                detail.charges.dueCharges = finalCharges - vatFinalCharges;
            } else {
                detail.charges.dueCharges = finalCharges - advancePayment;
            }
        } else {
            if (status != 'RATING') {
                charges.finalCharges = finalCharges;
                charges.dueCharges = finalCharges;
            } else {
                detail.showDueAmount = false;
                detail.charges.dueCharges = 0;
            }
        }
    }

    if (status == 'SETTLED') {
        detail.showDueAmount = false;
        detail.charges.dueCharges = 0;
        detail.showCall = false;
    }

    // for displayling advance amount
    if (advancePayment) {
        detail.paymentPlan = 'ADVANCE';
        if (status == 'ASSIGNED' || status == 'ENROUTE' || status == 'IN_SERVICE' || status == 'PAYMENT_PENDING') {
            detail["advanceAvail"] = true;
        }
        if (status == 'ASSIGNED' && unitCharges && advance_payment.payment_type == null) {
            detail["advanceAvail"] = false;
        }
        if (isRejected) {
            detail["advanceAvail"] = false;
        }
        // if advance charge and estimate charge are equal then show vatFinalCharges in advance amount
        if (advanceCharges == estimateCharges) {
            detail.AdvanceAmount = vatFinalCharges;
        } else {
            detail.AdvanceAmount = detail.advancePayment;
        }
    } else {
        detail.paymentPlan = 'Upon completion';
    }

    if ((status == 'INSPECTION' && estimateCharges) || status == 'REESTIMATE' || status == 'PAYMENT_PENDING') {
        detail['breakdownNote'] = true;
    }

    const {
        isInspectionCompleted,
        // isRejected,
        // status,
        estimateItems,
        categoryName,
        warranty
    } = data;

    if (charges && subCategory.isInspectionRequired && (status == "REQUESTED" || status == "ASSIGNED" || status == "ENROUTE" || status == "UNASSIGNED" || (status == "INSPECTION" && !isInspectionCompleted))) {
        detail.charges.totalCharges = 'To be decided';
    } else if (subCategory.isInspectionRequired && status == "INSPECTION" && isInspectionCompleted || status == "RESCHEDULED" || status == "IN_SERVICE") {
        detail.charges.totalCharges = estimateCharges;
        if (status == "IN_SERVICE" && advanceCharges) {
            detail.charges.totalCharges = estimateCharges;
            detail.charges.finalCharges = estimateCharges - advanceCharges;
        } else if (status == "IN_SERVICE") {
            detail.charges.totalCharges = estimateCharges;
        }
        //warranty
        if (warranty && warranty.warrantyId) {
            const WARRANTY = warranty;
            // resultdata.warrantyAvail = WARRANTY.warranty ? WARRANTY_START.replace("WARRANTY", WARRANTY.warrantyText) : NO_WARRANTY;
        } else {
            detail.warrantyAvail = NO_WARRANTY;
        }
    } else if (charges && !subCategory.isInspectionRequired && (status != "PAYMENT_PENDING" && status != "RATING")) {
        detail.charges.totalCharges = estimateCharges;
        if (advance_payment.payment_type == "CASH" || advance_payment.payment_type == "CARD" || advance_payment.payment_type == "BANK_TRANSFER") {
            detail.charges.totalCharges = estimateCharges - advanceCharges;
        }
    } else if (status == 'PAYMENT_PENDING' || status == "RATING" || status == "REJECTED" || status == "CANCELLED") {
        detail.charges.totalCharges = totalCharges;
        detail.charges.finalCharges = finalCharges;
        if (status == "RATING") {
            detail.charges.finalCharges = '0';
        }


        if (advanceCharges) {
            detail["advanceAvail"] = true;
        }
        if (isRejected) {
            detail["advanceAvail"] = false;
        }
        if (status == "REJECTED" || status == "CANCELLED") {
            detail.charges.estimateCharges = Number((callOutCharges).toFixed(2));
            detail.charges.materialCharges = 0;
            detail["advanceAvail"] = false;
            detail.showCall = false;
        }
        if (status === "PAYMENT_PENDING" || status === "RATING") {
            //warranty
            if (warranty && warranty.warrantyId) {
                const WARRANTY = warranty;
                // resultdata.warrantyAvail = WARRANTY.warranty ? WARRANTY_END.replace("WARRANTY", WARRANTY.warrantyText).replace("DATE", moment(WARRANTY.warrantyEndDate).format('DD/MM/YYYY')) : NO_WARRANTY;
            } else {
                detail.warrantyAvail = NO_WARRANTY;
            }
        }
    } else if (subCategory.isInspectionRequired && status == "REESTIMATE" || status == "UNFINISHED" || status == "COMPLAINT_REGISTERED") {
        detail.charges.totalCharges = "To be decided";
        if (detail.charges.advanceCharges) {
            detail["advanceAvail"] = true;
        }
        if (detail.status == "REESTIMATE") {
            detail.charges.totalCharges = estimateCharges;
        }
    }

    detail.charges.discountCharges = Number((discountCharges).toFixed(2));

    const {  AdvanceAmount, driverData } = data;
    if (charges) {
        CHARGE_KEYS.forEach((key) => {
            const c = charges[key]
            if (data.charges && Number(c)) {
                detail['charges'][key] = Number(Number(c).toFixed(2));
            }
        });
    }

    if (Number(AdvanceAmount)) {
        detail.AdvanceAmount = Number(Number(AdvanceAmount).toFixed(2));
    }

    // to fix precision issue of charges
   
    if (charges && Number(additionalCharges)) {
        detail.charges.additionalCharges = Number(Number(additionalCharges).toFixed(2));
    }
    
    if ((advancePayment && status == "INSPECTION") || (advancePayment && status == "ASSIGNED" && advanceCharges)) {
        if (estimateCharges == advanceCharges) {
            detail.advanceNote = ADVANCE_PAY_NOTE.replace("AMOUNT", vatFinalCharges);
        } else {
            detail.advanceNote = ADVANCE_PAY_NOTE.replace("AMOUNT", advancePayment);
        }
    }

    if (data.genieNotes || data.additionalGenieNote) {
        detail.showGenieNote = true;
    }

    if (status == "PAYMENT_PENDING" || status == "RATING") {
        if (data.additionalGenieNote) {
            detail.showGenieNote = true;
        } else {
            detail.showGenieNote = false;
        }
    }

    detail.hideLabourCharges = !isInspectionCompleted || isRejected || status === 'CANCELLED' || status === 'EXPIRED';
    detail.showEstimateItems = isInspectionCompleted && !isRejected
     
    let c = isInspectionCompleted && (!estimateItems || (estimateItems && estimateItems.length === 0)) && !isRejected;
    detail.showLabourChargeold = c;
    detail.showMaterialOld = c;
    
    detail.isCategoryMembership = categoryName == 'Membership';

    if (driverData) {
        detail.driverData['noOfStar'] = driverData.averageRating.toFixed(1);
    }
    if (warranty && warranty.warranty) {
        detail['isWarrantyFalse'] = false;
    } else {
        detail['isWarrantyFalse'] = true;
    }

    var walletData = 0;
    if (advance_payment.walletTransactionId) {
        walletData = walletData + advance_payment.walletTransactionId.amount
    }
    if (payment.walletTransactionId) {
        walletData = walletData + payment.walletTransactionId.amount
    }
    if (walletData) {
        detail["walletData"] = walletData;
    }

    detail.genie = getGenieData(detail);

    if (!detail.genie) {
        var genie = {};
        genie.name = "Genie to be assigned";
        genie.profilePicURL = {};
        genie.profilePicURL.original = "/img/geniefade.png";
        if (detail.status == "REQUESTED") {
            genie.GenieStatus = GENIE_REQUESTED;
        } else {
            genie.GenieStatus = GENIE_NOT_ASSIGNED;
        }
        data.genie = genie;
    }

    const defaultOptions = {
        rateGenie: false, // no no comp
        Payment: false, // no no comp
        view: false,
        cancel: false,
        showAction: false,
        accept: false, // no no comp
        reditems: false,
        singleButton: false,
        advancePayment: false,
    }

    switch (status) {
        case "REQUESTED":
            break;
        case "ASSIGNED":
            if (advancePayment && advanceCharges && advance_payment["payment_type"] == null && payment["payment_type"]) {
                defaultOptions.showAction = ' - pay advance';
                defaultOptions.reditems = true;
            } else if (advancePayment && advanceCharges && advance_payment["payment_type"] == null && payment["payment_type"] == "CASH") {
                defaultOptions.showAction = '- await collection';
            }
            break;
        case "ENROUTE":
            defaultOptions.showAction = '- Await arrival'
            defaultOptions.reditems = false;
            defaultOptions.cancel =  false;
            break;
        case "INSPECTION":
            if (advancePayment && unitCharges) {
                defaultOptions.showAction = " - pay advance";
                defaultOptions.reditems = true;
            }
            if (isInspectionCompleted) {
                defaultOptions.showAction = " - Await Estimate ";
                defaultOptions.reditems = false;
            } else if (isInspectionCompleted && advancePayment) {
                defaultOptions.showAction = " - Accept Estimate ";
                defaultOptions.reditems = true;
                defaultOptions.cancel = false;
                defaultOptions.accept =  true;
            }

            if (isInspectionCompleted && advancePayment && advanceCharges && advance_payment["payment_type"] == null && payment.payment_type == null) {
                defaultOptions.showAction = " - Accept and Pay Advance";
                defaultOptions.reditems = true;
                if (advanceCharges == estimateCharges) {
                    // $("#" + id + "-cancel").html('<span class="{{payment_status}} status-pos hidden"></span><button class="pay-now" data-id="' + id + '" onclick="acceptOrRejectJob(\'' + id + '\', \'APPROVE\',' + results.data[0].charges.vatFinalCharges + ')"><span class="booking-btn-align">ACCEPT</span></button>');
                } else {
                    // $("#" + id + "-cancel").html('<span class="{{payment_status}} status-pos hidden"></span><button class="pay-now" data-id="' + id + '" onclick="acceptOrRejectJob(\'' + id + '\', \'APPROVE\',' + results.data[0].advancePayment + ')"><span class="booking-btn-align">ACCEPT</span></button>');
                }
                defaultOptions.cancel = true;
            } else if (isInspectionCompleted && advancePayment && advanceCharges && payment["payment_type"] == "CASH") {
                defaultOptions.showAction = " - Await Collection ";
                defaultOptions.cancel = false;
                defaultOptions.reditems = false;
            }
            break;
        case "IN_SERVICE":
            defaultOptions.showAction = ' - Await Completion ';
            defaultOptions.reditems = false;
            defaultOptions.accept = false;
            break;
        case "REESTIMATE":
            defaultOptions.showAction = ' - Await Estimate ';
            defaultOptions.reditems = false;
            break;
        case "CANCELLED":
            if ((totalCharges == 0 && !driverData)) {
                defaultOptions.showAction = false;
                defaultOptions.reditems = false;
            } else if ((totalCharges > 0)) {
                defaultOptions.showAction = ' - Pay Charges ';
                defaultOptions.reditems = true;
            }
            if (payment && payment["payment_type"]) {
                defaultOptions.showAction = " - Await collection ";
                defaultOptions.reditems = false;
            }

            break;
        case "REJECTED":

            if (payment && payment["payment_type"]) {
                defaultOptions.showAction = " - Await collection ";
            } else {
                defaultOptions.showAction = " - Pay call-out charges";
                defaultOptions.reditems = true;
                defaultOptions.Payment = true;
            }

            break;
        case "PAYMENT_PENDING":
            defaultOptions.cancel = true;
            if (payment && payment["payment_type"]) {
                defaultOptions.showAction = " - Await collection ";
            } else {
                defaultOptions.showAction = " - pay final payment ";
                defaultOptions.reditems = true;
                defaultOptions.Payment = true;
            }
            break;
        case "RATING":
            defaultOptions.showAction = " - rate genie ";
            defaultOptions.reditems = true;
            defaultOptions.rateGenie = true;
            // if ($("#" + id + '-view').hasClass('newstatusview')) {
            // } else {
            //     $("#" + id + '-view').html('<button class="pay-now" onclick="location.href=\'/app/html/mybookings.html\'">RATE</button>');
            // }
            // $("#finalstatus").text('<div class="column text-center cancel-req pointer"><button class="genie-button" onclick="location.href=\'/app/html/mybookings.html\'"><div class="button-data"><div class="button-img"><img class="img-responsive" src="/img/star-icon-white.svg"></div>Rate ME</button></div>');
            break;
        case "UNFINISHED":
            defaultOptions.showAction = "";
            defaultOptions.reditems = false;
            break;
        case "COMPLAINT_REGISTERED":
            defaultOptions.showAction = "";
            defaultOptions.reditems = false;
            break;
        case "RESCHEDULED":
            defaultOptions.showAction = "";
            defaultOptions.reditems = false;
            break;
        case "UNASSIGNED":
            defaultOptions.showAction = "";
            defaultOptions.reditems = false;
            break;
        case "EXPIRED":
            defaultOptions.cancel = false;
            defaultOptions.showAction = "";
            defaultOptions.reditems = false;
            if (payment && payment["payment_type"]) {

            } else {
                if (charges && totalCharges != 0) {
                    defaultOptions.cancel = false;
                    defaultOptions.showAction = "";
                    defaultOptions.reditems = false;
                    defaultOptions.accept = false;
                    defaultOptions.Payment = true;
                } else if (!targetExists && results.data[0] && results.data[0].charges && results.data[0].charges.totalCharges == 0) {
                    defaultOptions.view = false;
                    defaultOptions.showAction = "";
                    defaultOptions.reditems = false;
                }
            }
            break;
        default:
            break;
    }

    if (status == "PAYMENT_PENDING" || status == "CANCELLED") {
        if (status == "PAYMENT_PENDING") {
            detail.finalCharges = finalCharges;
            detail.totalCharges = finalCharges;
            defaultOptions.singleButton = true; // REcheck
        } else if (status == "CANCELLED") {
            detail.finalCharges = finalCharges;
            detail.totalCharges = totalCharges;

        }
        if (finalCharges && driverData && payment && (payment.payment_type == "CASH" || payment.payment_type == "BANK_TRANSFER")) {
            // $("#finalstatus").html("");
            defaultOptions.view = false;
        } else if (data.finalCharges && results.data[0].driverData) {
            defaultOptions.Payment = true;
            //$("#finalstatus").html(Mustache.render(paymentTemplate, data));
        }
    } else if (status == "COMPLAINT_REGISTERED" || status == "IN_SERVICE" || status == "RATING" || status == "UNFINISHED") {
        // $("#finalstatus").html("");
        defaultOptions.view = false;
        if (status == "RATING") {
            defaultOptions.rateGenie = false;
            //$("#finalstatus-rating").html('<a href="/app/html/mybookings.html"><div class="col-md-12 col-sm-12 col-xs-12 column" style="background:#67e9b4;height:43px;font-size:21px;"><p class="text-center" style="color:#fff;margin-top:8px;">RATE GENIE</p></div></a>');
        }
        if (status == "IN_SERVICE") {
            defaultOptions.cancel = false;
        }
    } else if (status == "REJECTED" || (status == "EXPIRED" && charges && totalCharges != 0)) {
        detail.finalCharges = finalCharges;
        defaultOptions.Payment = true;
        if (payment && payment.payment_type == "CASH") {
            defaultOptions.Payment = false;
        }
    } else if (status == "INSPECTION" || status == "RESCHEDULED") {
        if (isInspectionCompleted && payment.payment_type) {
            
            if (advanceCharges == estimateCharges) {
                detail.advancePayment = vatFinalCharges;
            }
            defaultOptions.advancePayment = true;
            defaultOptions.accept = true; // doubt
        } else {
            defaultOptions.advancePayment = false;
            defaultOptions.view = false;
            defaultOptions.accept = false;
            // $("#" + id + "-finalstatus").html("");
            // $("#" + id + "-cancel").html("");
        }
    } else if (status == "REQUESTED" || status == "ASSIGNED" || status == "ENROUTE" || status == "REESTIMATE") {
        defaultOptions.advancePayment = true;
        defaultOptions.accept = true;
        if (status == "ENROUTE" || status == "REESTIMATE") {
            defaultOptions.view = false;
        }
        if (status == "ASSIGNED" && unitCharges && advancePayment && advance_payment.payment_type == null && !payment.payment_type) {
            defaultOptions.advancePayment = true;
            defaultOptions.accept = true;
        }
        if (jobStatus == "ASSIGNED" && results.data[0].charges.unitCharges && results.data[0].advancePayment && (results.data[0]["payment"]["payment_type"] == "CASH" || results.data[0]["payment"]["payment_type"] == "CARD" || results.data[0]["payment"]["payment_type"] == "BANK_TRANSFER")) {
            defaultOptions.advancePayment = false; 
            defaultOptions.accept = false;
        }
    }

    detail = {
        ...detail,
        ...defaultOptions
    } 

    return 
};
