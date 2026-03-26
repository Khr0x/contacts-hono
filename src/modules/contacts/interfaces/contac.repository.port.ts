import type { Contact } from "../schema/contact.schema";

export interface IContactsRepository {
  findAll(tx: any): Promise<Contact[]>;
  findById(tx: any, id: string): Promise<Contact | null>;
  update(tx: any, id: string, data: Partial<Contact>): Promise<Contact>;
  create(tx: any, data: Partial<Contact>): Promise<Contact>;
  delete(tx: any, id: string): Promise<void>;
}