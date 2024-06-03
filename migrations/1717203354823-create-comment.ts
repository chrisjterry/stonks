import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateComment1717203354823 implements MigrationInterface {
    name = 'CreateComment1717203354823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follow" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "followedId" integer, "followerId" integer, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profileId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "channel" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d80b94dc62f7467403009d88062" UNIQUE ("username"), CONSTRAINT "UQ_3825121222d5c17741373d8ad13" UNIQUE ("email"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followedId"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followerId"`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "followedId" integer`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "followerId" integer`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "text" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "profileId" integer`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "channelId" integer`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_f4a9d59861c87ba252ead40d84d" FOREIGN KEY ("followedId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_550dce89df9570f251b6af2665a" FOREIGN KEY ("followerId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_4dd039be3d37179110ff3e14901" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_94fa65178133628102fc2314abb" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_ba8facb69d32a7d1456dc560654" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_ba8facb69d32a7d1456dc560654"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_94fa65178133628102fc2314abb"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_4dd039be3d37179110ff3e14901"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_550dce89df9570f251b6af2665a"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_f4a9d59861c87ba252ead40d84d"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "channelId"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followerId"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followedId"`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "followerId" integer`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "followedId" integer`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "channel"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "follow"`);
    }

}
