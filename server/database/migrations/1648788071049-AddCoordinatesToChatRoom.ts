import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCoordinatesToChatRoom1648788071049 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("chat_room", new TableColumn({
            name: "latitude",
            type: "float",
        }));

        await queryRunner.addColumn("chat_room", new TableColumn({
            name: "longitude",
            type: "float",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
