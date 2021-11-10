import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProductImage1635381799811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_image',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },   
                {
                    name: 'product_id',
                    type: 'varchar',
                }, 
                {
                    name: 'image_uri',
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
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_image')
    }

}
