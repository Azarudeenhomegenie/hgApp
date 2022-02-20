import { SLOTS } from '../constants/jobdetails';
import moment from 'moment';
import { getJobDetailsOption } from '../helpers/jobDetails';


export const JobDetailConverter = {
    fromApi: (data) =>  {
        let jobDetail = data;

        const { slot } = data;
        console.log('slott', slot)
        const slotTime = slot[0];
        jobDetail['slot'] = SLOTS[slotTime];

        const { scheduleDate } = jobDetail;
        
        const date = moment(scheduleDate);
        jobDetail['scheduleDate'] = `${date.format('ddd DD MMM YYYY')} | ${SLOTS[slotTime]}`;
        jobDetail['dateScheduled'] = `${SLOTS[slotTime]}, ${date.format('MMM DD')}`;

        const { utc_timing: { requestedTime } } = jobDetail;
        const requstedMoment = moment(requestedTime);
        console.log(requstedMoment)
        jobDetail["utc_timing"]["requestedTime"] = [requstedMoment.format('DD/MM/YYYY'), requstedMoment.format('hh:mm:ss')]

        jobDetail['favouriteGenie'] = !(jobDetail['favouriteGenie'] === 'FALSE')
        
        const { charges: { totalCharges, unitCharges, estimateCharges, cancellationCharges } } = jobDetail;
        const { status, payment } = jobDetail;

        if (!totalCharges && status !== 'CANCELLED') {
            jobDetail['charges']['totalCharges'] = 'To be decided';
        }

        if (unitCharges) {
            jobDetail['services'] = 'Fixed price';
            jobDetail['charges']['totalCharges'] = unitCharges;
        } else {
            bookingOngoing[k]['services'] = 'Inspection based';
        }

        if (estimateCharges) {
            jobDetail['charges']['totalCharges'] = estimateCharges;
        }
        if (totalCharges == cancellationCharges) {
            jobDetail['charges']['totalCharges'] = totalCharges;
        }
        if (payment && payment['payment_type'] === null && !jobDetail.advancePayment) {
            jobDetail['payment']['payment_type'] = 'On Completion';
        }
        jobDetail = {
            ...jobDetail,
            ...getJobDetailsOption(status, data),
        }
        return jobDetail;
    }
}