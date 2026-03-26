import { injectable, inject } from "inversify";
import { type Context } from "hono";
import { ContactsService } from "./contacts.service";
import { TYPES } from "../../common/types";
@injectable()
export class ContactsController {
  constructor(
    @inject(TYPES.ContactsService) private readonly service: ContactsService
  ) {}

  async getAll(c: Context) {
    const tx = c.get("tx");
    const data = await this.service.getContacts(tx);
    return c.json(data);
  }

//   async create(c: Context) {
//     const tx = c.get("tx") as DbTransaction;
//     const body = c.req.valid("json" as any); // Validado por Zod 
    
//     const result = await this.service.createContact(tx, body);
//     return c.json(result, 201);
//   }

//   async delete(c: Context) {
//     const tx = c.get("tx") as DbTransaction;
//     const { id } = c.req.param();
    
//     await this.service.deleteContact(tx, id);
//     return c.json({ success: true }, 200);
//   }
}