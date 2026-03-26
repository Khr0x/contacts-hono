import { injectable } from "inversify";
import { eq } from "drizzle-orm";
import { contact, type Contact } from "./schema/contact.schema";
import type { IContactsRepository } from "./interfaces/contac.repository.port";

@injectable()
export class ContactsRepository implements IContactsRepository {
    
  async findById(tx: any, id: string): Promise<Contact | null> {
    return tx.select().from(contact).where(eq(contact.id, id)).get();
  }
  async update(tx: any, id: string, data: Partial<Contact>): Promise<Contact> {
    return tx.update(contact).set(data).where(eq(contact.id, id)).returning();
  }
  async findAll(tx: any): Promise<Contact[]> {
    return await tx.select().from(contact);
  }

  async create(tx: any, data: Partial<Contact>): Promise<Contact> {
    return await tx.insert(contact).values(data).returning();
  }

  async delete(tx: any, id: string): Promise<void> {
    await tx.delete(contact).where(eq(contact.id, id));
  }
}