import { Hono } from "hono";
import { tenantMiddleware } from "../../middleware/tenant.middleware";
import { container } from "./contacts.module";
import type { ContactsController } from "./contacts.controller";
import { TYPES } from "../../common/types";


const router = new Hono();
const controller = container.get<ContactsController>(TYPES.ContactsController);

router.use("*", tenantMiddleware);

router.get("/", async (c) =>  controller.getAll(c));

export { router };