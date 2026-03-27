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

//   async delete(c: Context) {
//     const tx = c.get("tx") as DbTransaction;
//     const { id } = c.req.param();
    
//     await this.service.deleteContact(tx, id);
//     return c.json({ success: true }, 200);
//   }
}