import { injectable, inject } from "inversify";
import { type Context } from "hono";
import { ContactsService } from "./contacts.service";
import { TYPES } from "../../common/types";
import type { IContactsService } from "./interfaces/contact.service.interface";
@injectable()
export class ContactsController {
  constructor(
    @inject(TYPES.ContactsService) private readonly service: IContactsService
  ) {}

  async getAll(c: Context) {
    const tx = c.get("tx");
    if(!tx) {
      return c.json({ error: 'Database transaction not found' }, 500);
    }
    const data = await this.service.getContacts(tx);
    return c.json(data);
  }

  async create(c: Context) {
    const tx = c.get("tx");
    const body = await c.req.json();

    if(!tx) {
      return c.json({ error: 'Database transaction not found' }, 500);
    }
    
    const result = await this.service.createContact(body, tx);
    return c.json(result, 201);
  }

  async update(c: Context) {
    const tx = c.get("tx");
    const { id } = c.req.param();
    const body = await c.req.json();

    if(!tx) {
      return c.json({ error: 'Database transaction not found' }, 500);
    }

    if(!id) {
      return c.json({ error: 'Contact ID is required' }, 400);
    }
    
    const result = await this.service.updateContact(id, body, tx);
    return c.json(result);
  }

  async delete(c: Context) {
    const tx = c.get("tx");
    const { id } = c.req.param();

    if(!tx) {
      return c.json({ error: 'Database transaction not found' }, 500);
    }

    if(!id) {
      return c.json({ error: 'Contact ID is required' }, 400);
    }
    
    await this.service.deleteContact(id, tx);
    return c.json({ message: 'Contact deleted successfully' });

  }
}