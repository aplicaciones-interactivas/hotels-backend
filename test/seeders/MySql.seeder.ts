import {Connection, getConnection} from "typeorm";
import {MealPlan} from "../../app/entities/MealPlan";
import {Bed} from "../../app/entities/Bed";
import {Organization} from "../../app/entities/Organization";
import {Role} from "../../app/entities/Role";
import {User} from "../../app/entities/User";

export async function seeder() {

    await getConnection().createQueryBuilder()
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
    await getConnection().createQueryBuilder()
        .insert()
        .into(Bed)
        .values([
            {id: 1, name: 'Single', code: 'SB'},
            {id: 2, name: 'Double', code: 'DB'},
            {id: 3, name: 'Queen Size', code: 'QB'},
            {id: 4, name: 'King Size', code: 'KB'},
        ]).execute();

    await getConnection().createQueryBuilder()
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

    await getConnection().createQueryBuilder()
        .insert()
        .into(Role)
        .values([
            {id: 1, roleName: 'ADMIN'},
            {id: 2, roleName: 'USER'}
        ]).execute();

    await getConnection().createQueryBuilder()
        .insert()
        .into(User)
        .values([
            {
                id: 1,
                username: 'edhernandez',
                password: '$2a$08$0752lTehMhXdqqqLgU/pPOneQXNih8NvLU3gfXDH9Hd/WCVXts5Ka',
                email: 'hernandezed.1991@cvc.com.br'
            },
            {
                id: 2,
                username: 'jhondoe',
                password: '$2a$08$0752lTehMhXdqqqLgU/pPOneQXNih8NvLU3gfXDH9Hd/WCVXts5Ka',
                email: 'jhon.doe@gmail.com'
            }
        ]).execute();

    await getConnection().createQueryBuilder()
        .relation(User, "roles")
        .of(1)
        .add(1);

    await getConnection().createQueryBuilder()
        .relation(User, "organization")
        .of(1)
        .set(1)
}