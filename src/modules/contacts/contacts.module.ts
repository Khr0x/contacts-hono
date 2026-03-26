import { Container } from "inversify";
import { TYPES } from "../../common/types";
import { ContactsController } from "./contacts.controller";
import { ContactsRepository } from "./contacts.repository";
import { ContactsService } from "./contacts.service";
import type { IContactsRepository } from "./interfaces/contac.repository.port";
import type { IContactsService } from "./interfaces/contact.service.interface";

const container = new Container();

container.bind<IContactsRepository>(TYPES.ContactsRepository).to(ContactsRepository);
container.bind<IContactsService>(TYPES.ContactsService).to(ContactsService);
container.bind<ContactsController>(TYPES.ContactsController).to(ContactsController);

export { container };