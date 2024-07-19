import { IUserBasicData } from "@/app/types/database";
import knex, { Knex } from "knex";

export default class Database {
  private config: any;
  private knex: Knex;

  constructor(config?: Knex.Config) {
    if (config) {
      this.knex = knex(config);
    } else {
      this.knex = knex({
        client: "pg",
        connection: {
          database: process.env.NEXT_SERVER_POSTGRES_DB!,
          user: process.env.NEXT_SERVER_DB_USER!,
          password: process.env.NEXT_SERVER_DB_PASS!,
          port: Number(process.env.NEXT_SERVER_DB_PORT!),
          host: process.env.NEXT_SERVER_DB_HOST!,
        },
      });
    }
  }

  UserBasicData() {
    return this.knex<IUserBasicData>("user_basic_data");
  }
}
