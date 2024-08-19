import { Module } from "@nestjs/common";
import { ChartService } from "./chart.service";
import { PrismaModule } from "prisma/prisma.module";

@Module({
    imports: [],
    controllers: [],
    providers: [ChartService]
  })

  export class ChartModule {}