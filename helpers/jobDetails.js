export const defaultOptions = {
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


export const getJobDetailsOption = (type, data) => {
    switch (type) {
        case "REQUESTED":
            return getRequestOption(data);
        case "ASSIGNED":
            return getAssignedOption(data);
        case "CANCELLED":
            return getCancelledOption(data);
        case "PAYMENT_PENDING":
            return getPaymentPendingOptions(data);
        case "IN_SERVICE":
            return getInserviceOption(data);
        case "RATING":
            return getRatingOption(data);
        case "COMPLAINT_REGISTERED":
            return getComplaintRegisteredOption(data);
        case "INSPECTION":
            return getInspectionOption(data);
        case "RESCHEDULED":
            return getRescheduledOption(data);
        case "REJECTED":
            return getRejectedOption(data);
        case "ENROUTE":
            return getEnrouteOption(data);
        case "UNFINISHED":
            return getUnfinishedOption(data);
        case "REESTIMATE":
            return getReEstimateOption(data);
        case "UNASSIGNED":
            return getUnAssignedOption(data);
        case "EXPIRED":
            return getExpiredOption(data);
        default:
            return {
                ...defaultOptions,
                view: true
            }
    }
}

const getRequestOption = (data) => {
    return {
        ...defaultOptions,
        cancel: true,
        view: true,
    };
};

const getAssignedOption = (data) => {

    defaultOptions.view = true;
    const {
        advancePayment,
        charges: {
            advanceCharges,
        },
        advance_payment,
        payment
    } = data;
    if (
        advancePayment
        && advanceCharges
        && advance_payment['payment_type'] === null
        && payment['payment_type'] === null
    ) {
        defaultOptions.accept = true;
        defaultOptions.showAction = 'Pay Advance';
        defaultOptions.reditems = true
    } else if (
        advancePayment
        && advanceCharges
        && advance_payment['payment_type'] === 'null'
        && payment['payment_type'] === 'CASH'
    ) {
        defaultOptions.cancel = true;
        defaultOptions.accept = false;
        defaultOptions.showAction = 'Await Collection';
        defaultOptions.reditems = '';
    } else {
        defaultOptions.cancel = true;
    }

    return {
        ...defaultOptions,
    };
};

const getCancelledOption = (data) => {


    defaultOptions.Payment = true;
    defaultOptions.view = true;
    defaultOptions.showAction = 'Pay Charges';
    defaultOptions.reditems = true;

    const {
        charges: { totalCharges },
        driverData,
        serviceType,
        payment
    } = data;

    if (
        (totalCharges == 0 || !driverData)
        && (
            serviceType == 'EMERGENCY'
            || serviceType == 'SAMEDAY'
        )
    ) {
        defaultOptions.Payment = false;
        defaultOptions.showAction = 'Pay Charges';
        defaultOptions.reditems = true;
    } else if (
        totalCharges == 0
        || !driverData
    ) {
        defaultOptions.Payment = false;
        defaultOptions.showAction = '';
        defaultOptions.reditems = '';
    }

    if (
        payment
        && payment['payment_type'] == 'CASH'
    ) {
        defaultOptions.Payment = false;
        defaultOptions.showAction = 'Await Collection';
        defaultOptions.reditems = '';
    }

    return {
        ...defaultOptions
    };
};

const getPaymentPendingOptions = (data) => {
    // PAYMENT_PENDING

    let Payment = true;
    let view = true;
    let showAction = 'Pay Final Payment';
    let reditems = true;

    const { payment_type } = data['payment'] || {};
    if (payment_type === 'CASH') {
        Payment = false;
        showAction = 'Await collection';
        reditems = '';
    }

    return {
        ...defaultOptions,
        Payment,
        view,
        showAction,
        reditems
    };
};

const getInserviceOption = (data) => {

    defaultOptions.view = true;
    defaultOptions.singleButton = true;
    defaultOptions.showAction = 'Await Completion';

    return {
        ...defaultOptions,
    };
};

const getRatingOption = (data) => {
    defaultOptions.rateGenie = true;
    defaultOptions.view = true;
    defaultOptions.showAction = 'Rate Genie';
    defaultOptions.reditems = true;

    return {
        ...defaultOptions,
    };
};

const getComplaintRegisteredOption = (data) => {
    defaultOptions.view = false;

    return {
        ...defaultOptions,
    };
};

const getInspectionOption = (data) => {
    defaultOptions.view = true;
    defaultOptions.cancel = true;

    const {
        advancePayment,
        isInspectionCompleted,
        charges: {
            unitCharges,
            estimateCharges,
            advanceCharges,
            vatFinalCharges
        },
        advance_payment,
        payment
    } = data;

    if (advancePayment && !unitCharges) {
        defaultOptions.accept = true;
        defaultOptions.cancel = false;
        defaultOptions.showAction = 'Pay Advance';
        defaultOptions.reditems = true;

        if (estimateCharges == advanceCharges) {
            defaultOptions['advancePayment'] = vatFinalCharges;
        }
    }

    if (!isInspectionCompleted) {
        defaultOptions.cancel = false;
        defaultOptions.showAction = 'Await Estimate';
    } else if (isInspectionCompleted && !advancePayment) {
        defaultOptions.showAction = 'Accept Estimate';
        defaultOptions.reditems = true;
        defaultOptions.accept = true;
        defaultOptions.cancel = false;
        defaultOptions['advancePayment'] = 0;
    }
    if (
        advancePayment
        && advanceCharges
        && advance_payment['payment_type'] == null
        && payment['payment_type'] == null
    ) {
        defaultOptions.cancel = false;
        defaultOptions.accept = true;
        defaultOptions.showAction = 'Accept and Pay Advance';
        defaultOptions.reditems = true;
        defaultOptions['advancePayment'] = data.advancePayment;
    } else if (payment['payment_type'] == 'CASH') {
        defaultOptions.cancel = false;
        defaultOptions.accept = false;
        defaultOptions.showAction = 'Await Collection';
        defaultOptions['advancePayment'] = data.advancePayment;
    }

    return {
        ...defaultOptions,
    };
};

const getRescheduledOption = (data) => {
    defaultOptions.view = true;
    defaultOptions.Accept = true;

    const { payment } = data;

    if (payment && payment['payment_type'] == 'CASH') {
        defaultOptions.accept = false;
    }

    return {
        ...defaultOptions,
    };
};

const getRejectedOption = (data) => {

    defaultOptions.Payment = true;
    defaultOptions.view = true;

    const {
        charges: {
            totalCharges,
            callOutCharges
        },
        payment,
    } = data;

    defaultOptions['charges'] = {
        totalCharges: callOutCharges
    };

    defaultOptions.showAction = 'Pay Call-out charges';
    defaultOptions.reditems = true;

    if (payment && payment['payment_type'] == 'CASH') {
        defaultOptions.Payment = false;
        defaultOptions.showAction = 'Await Collection';
        defaultOptions.reditems = '';
    }

    return {
        ...defaultOptions,
    };
};

const getEnrouteOption = (data) => {
    defaultOptions.view = true;
    defaultOptions.showAction = 'Await Arrival';

    return {
        ...defaultOptions,
    };
};

const getUnfinishedOption = (data) => {
    defaultOptions.view = true;

    return {
        ...defaultOptions,
    };
};

const getReEstimateOption = (data) => {
    defaultOptions.view = true;
    defaultOptions.SingleButton = true;
    defaultOptions.showAction = 'Await Estimate';

    return {
        ...defaultOptions,
    };
};

const getUnAssignedOption = (data) => {
    defaultOptions.view = true;
    return {
        ...defaultOptions,
    };
};

const getExpiredOption = (data) => {
    const { charges, payment } = data;
    if (charges && charges.totalCharges == 0) {
        defaultOptions.Payment = false;
    } else {
        defaultOptions.Payment = true;
    }

    defaultOptions.view = true;
    defaultOptions.cancel = false;

    if (payment && payment['payment_type'] == 'CASH') {
        defaultOptions.Payment = false;
    }

    return {
        ...defaultOptions,
    };
};