import type { Contact } from "../schema/contact.schema";

export interface IContactsRepository {
  findAll(tx: any): Promise<Contact[]>;
  findById(id: string, tx: any): Promise<Contact | null>;
  update(id: string, data: Partial<Contact>, tx: any): Promise<Contact>;
  create(data: Partial<Contact>, tx: any): Promise<Contact>;
  delete(id: string, tx: any): Promise<void>;
}