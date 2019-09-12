import {Connection} from "typeorm";
import {MealPlan} from "../../app/models/MealPlan";
import {Bed} from "../../app/models/Bed";
import {Organization} from "../../app/models/Organization";
import {Role} from "../../app/models/Role";
import {User} from "../../app/models/User";

export async function seeder(connection: Connection) {
    await connection.createQueryBuilder()
        .insert()
        .into(MealPlan)
        .values([
            {name: 'All Inclusive', description: 'Covers all meals and beverages', code: 'AI'},
            {name: 'A la carte', description: 'Covers all meals and beverages from menu', code: 'AC'},
            {
                name: 'American Plan',
                description: 'Includes  three meals per day, breakfast, lunch and dinner.',
                code: 'AP'
            },
            {name: 'Bed And Breakfast', description: 'Includes breakfast', code: 'BB'},
            {name: 'Continental Plan', description: 'Includes continental breakfast', code: 'CP'},
            {name: 'European Plan', description: 'Does not include any meals.', code: 'EP'},
            {name: 'Half Board', description: 'Includes two meals per day.', code: 'HB'},
        ]).execute();
    await connection.createQueryBuilder()
        .insert()
        .into(Bed)
        .values([
            {id: 1, name: 'Single', code: 'SB'},
            {id: 2, name: 'Double', code: 'DB'},
            {id: 3, name: 'Queen Size', code: 'QB'},
            {id: 4, name: 'King Size', code: 'KB'},
        ]).execute();

    await connection.createQueryBuilder()
        .insert()
        .into(Organization)
        .values([
            {
                id: 1,
                billingAddress: 'Rua das Figueiras, 501 - Jardim - Santo André',
                country: 'BRA',
                billingIdentifier: '111111111',
                name: 'CVC'
            },
            {
                id: 2,
                billingAddress: 'GENERAL RIERA, 154',
                country: 'ESP',
                billingIdentifier: '22222222',
                name: 'Iberostar'
            }
        ]).execute();

    await connection.createQueryBuilder()
        .insert()
        .into(Role)
        .values([
            {id: 1, roleName: 'ADMIN'},
            {id: 2, roleName: 'USER'}
        ]).execute();

    await connection.createQueryBuilder()
        .insert()
        .into(User)
        .values([
            {
                id: 1,
                username: 'edhernandez',
                password: '$2y$12$S8Qdgk2//.TuObluwUNEdeTpL1N6V8WH.umzzaxzsEeJSBI1f8maS',
                email: 'hernandezed.1991@cvc.com.br'
            },
            {
                id: 2,
                username: 'jhondoe',
                password: '$2y$12$S8Qdgk2//.TuObluwUNEdeTpL1N6V8WH.umzzaxzsEeJSBI1f8maS',
                email: 'jhon.doe@gmail.com'
            }
        ]).execute();

    await connection.createQueryBuilder()
        .relation(User, "roles")
        .of(1)
        .add(1);

    await connection.createQueryBuilder()
        .relation(User, "organization")
        .of(1)
        .set(1)
}