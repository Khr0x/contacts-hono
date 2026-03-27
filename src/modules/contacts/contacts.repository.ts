import { injectable } from "inversify";
import { eq } from "drizzle-orm";
import { contact, type Contact } from "./schema/contact.schema";
import type { IContactsRepository } from "./interfaces/contac.repository.port";

@injectable()
export class ContactsRepository implements IContactsRepository {
    
  async findById(tx: any, id: string): Promise<Contact | null> {
    return tx.select().from(contact).where(eq(contact.id, id)).get();
  }
  
  async update(id: string, data: Partial<Contact>, tx: any): Promise<Contact> {
    return tx.update(contact).set(data).where(eq(contact.id, id)).returning();
  }
  async findAll(tx: any): Promise<Contact[]> {
    return await tx.select().from(contact);
  }

  async create(data: Partial<Contact>, tx: any): Promise<Contact> {
    console.log('Creating contact with data:', data);
    return await tx.insert(contact).values(data).returning();
  }

  async delete(id: string, tx: any): Promise<void> {
    await tx.delete(contact).where(eq(contact.id, id));
  }
}