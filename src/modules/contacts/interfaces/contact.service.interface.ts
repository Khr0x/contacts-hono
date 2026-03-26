import type { ContactDto } from "../dtos/contact.dto";
import type { CreateContactDto } from "../dtos/create-contact.dto";

export interface IContactsService {
  getContacts(tx: any): Promise<ContactDto[]>;
  createContact(contactData: CreateContactDto, tx: any): Promise<ContactDto>;
  updateContact(contactId: string, contactData: Partial<CreateContactDto>, tx: any): Promise<ContactDto>;
  deleteContact(contactId: string, tx: any): Promise<void>;
}