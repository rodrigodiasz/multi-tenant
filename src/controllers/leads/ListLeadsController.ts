import { LeadsRepository } from "../../repositories/LeadsRepository";
import { IController } from "../../interfaces/IController";

export class ListLeadsController implements IController {
  constructor(private readonly leadsRepo: LeadsRepository) {}

  async handler() {
    const leads = await this.leadsRepo.findAll();

    return {
      leads,
    };
  }
}
