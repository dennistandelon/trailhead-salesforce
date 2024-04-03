public with sharing class ContactController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        List<Contact> contacts = [SELECT FirstName, LastName, Email FROM Contact];
        
        // Test Error Handling
        //throw new AuraHandledException('Forced error');

        return contacts;
    }
}