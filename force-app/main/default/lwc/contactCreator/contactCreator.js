import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class ContactCreator extends LightningElement {
    objectApiName = CONTACT_OBJECT;
    fields = [FIRSTNAME_FIELD, LASTNAME_FIELD, EMAIL_FIELD];
    handleSuccess(event) {

        createRecord({
            apiName: 'Contact',
            fields: {
                FirstName: event.detail.fields.FirstName.value,
                LastName: event.detail.fields.LastName.value,
                Email: event.detail.fields.Email.value
            }
        }).then((record) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: record.id,
                    variant: 'success'
                })
            );
            this.dispatchEvent(new CustomEvent('contactcreated'));
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

}