import { Hono } from "hono";
import { tenantMiddleware } from "../../middleware/tenant.middleware";
import { container } from "./contacts.module";
import type { ContactsController } from "./contacts.controller";
import { TYPES } from "../../common/types";


const router = new Hono();
const controller = container.get<ContactsController>(TYPES.ContactsController);

router.use("*", tenantMiddleware);

router.get("/", async (c) =>  controller.getAll(c));

router.post("/", async (c) => controller.create(c));

// router.put("/:id", async (c) => controller.update(c));

export { router };