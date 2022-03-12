import { getPastDetail, getCurrentDetails } from '../helpers/jobDetail';

export const JobDetailConverter = {
    fromApi: (data) => {
        let detail = data;

        const {
            _id,
            subCategory,
            serviceType,
            charges,
            driverData,
            address,
            status,
        } = data;

        detail.id = _id;

        // data.pricedetails = results.data; // Not conrt 
        // data.servicedetails = results.data; // No cont

        const { Notes } = subCategory;
        if (Notes) {
            let notes = Notes.split("Note");
            if (notes[0]) {
                detail['Notes1'] = notes[0];
            }

            if (notes[1]) {
                detail['Notes2'] = (notes[1]).replace(':\n', '');
            }
        }


        if (serviceType === 'SCHEDULED') {
            detail.serviceType = 'Scheduled';
        } else if (serviceType === 'EMERGENCY') {
            detail.serviceType = 'Emergency';
        } else if (serviceType === 'SAMEDAY') {
            detail.serviceType = 'Sameday';
        }

        const {
            unitCharges,
            callOutCharges,
            hourlyCharges,
            labourCharges,
        } = charges;

        if (unitCharges) {
            detail.serviceBasedType = 'Fixed price service';
            let serviceBasedPrice = unitCharges.firstUnitCharges;
            let restUnitCharges = unitCharges.restUnitCharges;
            detail.serviceCharge = '';

            if (subCategory.pricingUnitNote) {
                let priceNote = subCategory.pricingUnitNote;
                if (priceNote.mainUnitNote && (priceNote.mainUnitNote).match(/PRICE/g)) {
                    detail.serviceCharge += priceNote.mainUnitNote.replace("PRICE", serviceBasedPrice);
                } else {
                    detail.serviceCharge += '';
                }

                if (priceNote.additionalUnitNote && priceNote.additionalUnitNote !== null) {
                    if (priceNote.additionalUnitNote.match(/PRICE/g)) {
                        detail.serviceCharge += (priceNote.additionalUnitNote).replace(/PRICE/, restUnitCharges);
                    } else {
                        detail.serviceCharge += '\n' + priceNote.additionalUnitNote;
                    }
                }
                if (priceNote.asteriskNote && priceNote.asteriskNote !== null) {
                    detail.serviceCharge += "\n\n" + priceNote.asteriskNote;
                }
            }
        } else if (callOutCharges) {

            detail.serviceBasedType = 'Inspection based service';
            detail.seviceBasedPrice = callOutCharges;
            detail.hourlyCharges = hourlyCharges;
            detail.serviceCharge = 'Call Out Charges* : ';
            detail.totalCharges = 'To be decided';

            detail.charges.labourSubText = 'including callout';
            let serviceBasedPrice = subCategory.callOutCharges;
            detail.serviceCharge = '';

            if (subCategory.pricingUnitNote) {
                var priceNote = subCategory.pricingUnitNote;
                if (priceNote.mainUnitNote && (priceNote.mainUnitNote).match(/PRICE/g)) {
                    detail.serviceCharge += priceNote.mainUnitNote.replace("PRICE", serviceBasedPrice);
                } else {
                    detail.serviceCharge += '';
                }
                if (priceNote.additionalUnitNote && priceNote.additionalUnitNote !== null) {
                    detail.serviceCharge += '\n' + priceNote.additionalUnitNote;
                }
                if (priceNote.asteriskNote && priceNote.asteriskNote !== null) {
                    detail.serviceCharge += '\n\n' + priceNote.asteriskNote;
                }
            }
        } else if (callOutCharges == 0) {
            detail.serviceBasedType = 'Survey based service';
            detail.seviceBasedPrice = callOutCharges;
            detail.hourlyCharges = hourlyCharges;
            detail.serviceCharge = 'Call Out Charges* : ';
            detail.totalCharges = 'To be decided';
            detail.charges.labourCharges = `${labourCharges}`;
            detail.charges.labourSubText = 'Survey charges';

            let serviceBasedPrice = subCategory.callOutCharges;
            detail.serviceCharge = '';
            if (subCategory.pricingUnitNote) {
                var priceNote = subCategory.pricingUnitNote;

                if (priceNote.mainUnitNote && (priceNote.mainUnitNote).match(/PRICE/g)) {
                    detail.serviceCharge += priceNote.mainUnitNote.replace("PRICE", serviceBasedPrice);
                } else {
                    data.serviceCharge += '';
                }

                if (priceNote.additionalUnitNote && priceNote.additionalUnitNote !== null) {
                    data.serviceCharge += '\n' + priceNote.additionalUnitNote;
                }

                if (priceNote.asteriskNote && priceNote.asteriskNote !== null) {
                    data.serviceCharge += '\n' + priceNote.asteriskNote;
                }
            }
        }

        detail.genie = driverData;
        if (detail.genie) {
            detail.genie.appointmentID = _id;
            if (detail.genie.profilePicURL && !detail.genie.profilePicURL.original) {
                data.genie.profilePicURL.original = '../img/genieicon.png';
            }
        }

        // detail.address = address;
        // let addressInfo = address;
        // let addressAuth = {};
        // addressAuth.Auth = udata.data.accessToken; redoo
        const { questions } = subCategory;
        //console.log('questions', questions);
        questions.sort((a, b) => (a.question < b.question ? 1 : -1))
        // Error here
        if (questions) {
            detail.questions = questions;
        }

        const result = {
            ...detail,
            //...(true === true ? getCurrentDetails(detail) : getPastDetail(detail))
            //...(['SETTLED', 'CANCELED'].indexOf(status) === -1 ? getCurrentDetails(detail) : getPastDetail(detail))
            ...(['SETTLED', 'CANCELLED'].indexOf(status) === -1 ? getCurrentDetails(detail) : getPastDetail(detail))
        }
        // console.log('charges_charges', result.charges);
        // console.log('charges_hideLabourCharges', result.hideLabourCharges);
        return result;
    }
};
