import type { ContactDto } from "../dtos/contact.dto";
import type { Contact } from "../schema/contact.schema";

export class ContactMapper {
    static toDto(contact: Contact): ContactDto {
        return {
            id: contact.id,
            name: contact.name,
            email: contact.email || '',
            phone: contact.phone || '',
            createdAt: contact.createdAt,
            updatedAt: contact.createdAt
        };
    }
}