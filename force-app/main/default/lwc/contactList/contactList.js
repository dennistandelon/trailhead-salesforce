import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';
import { reduceErrors } from 'c/ldsUtils';

const COLUMNS = [
    { label: FirstName.fieldApiName, fieldName: FirstName.fieldApiName, type: 'text' },
    { label: LastName.fieldApiName, fieldName: LastName.fieldApiName, type: 'text' },
    { label: Email.fieldApiName, fieldName: Email.fieldApiName, type: 'email' }
];

export default class ContactList extends LightningElement {
    columns = COLUMNS;
    errors;
    @wire(getContacts) contacts;

    get errors() {
        return (this.contacts.error) ?
            reduceErrors(this.contacts.error) : [];
    }
}