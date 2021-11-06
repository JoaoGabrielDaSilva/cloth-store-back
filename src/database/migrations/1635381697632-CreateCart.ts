import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCart1635381697632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'shopping_cart',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },  
                {
                    name: 'user_id',
                    type: 'varchar',
                },             
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
            ],
            // foreignKeys: [
            //     {
            //         name: 'FKCartCartProduct',
            //         referencedTableName: 'shopping_cart_product',
            //         referencedColumnNames: ['shopping_cart_id'],
            //         columnNames: ['id'],
            //         onDelete: "SET NULL",
            //         onUpdate: "SET NULL"
            //     }
            // ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('shopping_cart')
    }

}
