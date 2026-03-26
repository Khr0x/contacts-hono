import { inject, injectable } from "inversify";
import type { IContactsService } from "./interfaces/contact.service.interface";
import type { ContactDto } from "./dtos/contact.dto";
import type { CreateContactDto } from "./dtos/create-contact.dto";
import { TYPES } from "../../common/types";
import type { IContactsRepository } from "./interfaces/contac.repository.port";
import { ContactMapper } from "./mappers/contact.mapper";

@injectable()
export class ContactsService implements IContactsService {

    constructor(
        @inject(TYPES.ContactsRepository) private contactsRepository: IContactsRepository
    ) {
    }

    async getContacts(tx: any): Promise<ContactDto[]> {
        const contacts = await this.contactsRepository.findAll(tx);
        return contacts.map(contact => ContactMapper.toDto(contact));
    }
    async createContact(contactData: CreateContactDto, tx: any): Promise<ContactDto> {
        throw new Error("Method not implemented.");
    }
    async updateContact(contactId: string, contactData: Partial<CreateContactDto>, tx: any): Promise<ContactDto> {
        throw new Error("Method not implemented.");
    }
    async deleteContact(contactId: string, tx: any): Promise<void> {
        throw new Error("Method not implemented.");
    }




}