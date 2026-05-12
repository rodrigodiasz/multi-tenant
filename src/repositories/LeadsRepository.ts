import { db } from "../lib/db";

type CreateParams = {
  name: string;
  email: string;
  phone: string;
}

export class LeadsRepository {
  constructor(private readonly organizationId: string){}
  findAll(){
    return db.lead.findMany({
      where: { organizationId: this.organizationId},
    });
  }
  async create({ name, email, phone }: CreateParams){
    return db.lead.create({
      data: {
        name,
        email,    
        phone,
        organizationId: this.organizationId,
      },
    });
  }
}