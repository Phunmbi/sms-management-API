import {Contact, Message} from '../../database/models';
import ErrorHandler from '../../Helpers/ErrorHandler';

/**
 * Contact Controller
 *
 * @function ContactController
 * @type {{retrieveAllContacts: retrieveAllContacts, addContact: addContact, retrieveSingleContact: retrieveSingleContact, deleteSingleContact: deleteSingleContact}}
 */
const ContactController = (() => {
  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf ContactController
   * @function addContact
   * @returns {Promise<void>}
   */
  const addContact = async (req, res) => {
    try {
      const {reqBody} = req;
      const newContact = await Contact.create({
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        phoneNumber: reqBody.phoneNumber,
      });

      res.status(201).json({
        success: true,
        contact: {
          id: newContact.id,
          firstName: newContact.firstName,
          lastName: newContact.lastName,
          phoneNumber: newContact.phoneNumber,
          createdAt: newContact.createdAt,
          updatedAt: newContact.updatedAt
        },
        message: 'Successfully created new contact',
      });
    } catch (e) {
      /* istanbul ignore next */
      ErrorHandler.handleError("Server Error",500,res);
    }
  };

  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf ContactController
   * @function retrieveAllContacts
   * @returns {Promise<void>}
   */
  const retrieveAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.findAll();

      if (contacts.length === 0) {
        return ErrorHandler.handleError("No Contacts exist",204,res);
      }
      res.status(200).json({
        success: true,
        contact: contacts,
        message: 'Successfully retrieved all contacts',
      });
    } catch (e) {
      /* istanbul ignore next */
      ErrorHandler.handleError("Server Error",500,res);
    }
  };

  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf ContactController
   * @function retrieveSingleContact
   * @returns {Promise<void>}
   */
  const retrieveSingleContact = async (req, res) => {
    try {
      const {contactId} = req.params;
      const singleContact = await Contact.findByPk(contactId);

      if (!singleContact) {
        return ErrorHandler.handleError("Contact does not exist",404,res);
      }

      res.status(200).json({
        success: true,
        contact: singleContact,
        message: 'Successfully retrieved contact',
      });
    } catch (e) {
      /* istanbul ignore next */
      ErrorHandler.handleError("Server Error",500,res);
    }
  };

  /**
   *
   * @param req - expressJS request Object
   * @param res - expressJS response Object
   * @memberOf ContactController
   * @function deleteSingleContact
   * @returns {Promise<void>}
   */
  const deleteSingleContact = async (req, res) => {
    try {
      const {contactId} = req.params;
      const singleContact = await Contact.findByPk(contactId);

      if (!singleContact) {
        return ErrorHandler.handleError("Contact does not exist",404,res);
      }

      // Find all messages by that contact and soft delete them first
      const contactsMessages = await Message.findAll({where:{senderId: singleContact.phoneNumber}});
      if(contactsMessages) {
        contactsMessages.map(each => {
          each.destroy();
        })
      }

      //Then delete the contact
      singleContact.destroy();

      res.status(200).json({
        success: true,
        contact: singleContact,
        message: 'Successfully deleted contact and associated messages',
      });
    } catch (e) {
      /* istanbul ignore next */
      ErrorHandler.handleError("Server Error",500,res);
    }
  };

  return {
    addContact,
    retrieveAllContacts,
    retrieveSingleContact,
    deleteSingleContact
  }
})();

export default ContactController;
