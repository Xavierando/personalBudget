import pg from 'pg'
const { Client } = pg
require('dotenv').config()

class DbManipulation {
    constructor() {
        this.client = new Client({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: 5432,
            database: 'activity_database_kplg',
        })
    }
    async connect() {
        await this.client.connect();
    }
    async disconnect() {
        await this.client.end();
    }
    async getEnvelope(name) {
        this.connect();
        const result = await this.client.query(`SELECT * FROM envelope WHERE name = $1::text`, [name]);
        this.disconnect();
        return result.rows[0];
    }
    async createNewEnvelope(name, amount) {
        this.connect();
        const result = await this.client.query(`INSERT INTO envelope (name, amount) VALUES ($1::text, $2::numeric)`, [name, amount]);
        this.disconnect();
        return true;
    }
    async changeEnvelopeName(oldName, newName) {
        this.connect();
        const result = await this.client.query(`UPDATE envelope SET name = $2::text WHERE name = $1::text`, [oldName, newName]);
        this.disconnect();
        return true;
    }
    async addAmount(name, amount) {
        this.connect();
        const result = await this.client.query(`UPDATE envelope SET amount = amount + $2::numeric WHERE name = $1::text`, [name, amount]);
        this.disconnect();
        return true;
    }
    async removeAmount(name, amount) {
        this.connect();
        const result = await this.client.query(`UPDATE envelope SET amount = amount - $2::numeric WHERE name = $1::text`, [name, amount]);
        this.disconnect();
        return true;
    }
    async transferAmount(from, to, amount) {
        this.connect();
        const result1 = await this.client.query(`UPDATE envelope SET amount = amount - $2::numeric WHERE name = $1::text`, [from, amount]);
        const result2 = await this.client.query(`UPDATE envelope SET amount = amount + $2::numeric WHERE name = $1::text`, [to, amount]);
        this.disconnect();
        return true;
    }
    async removeEnvelope(name) {
        this.connect();
        const result = await this.client.query(`DELETE FROM envelope WHERE name = $1:name`,[name])
        this.disconnect();
        return true;
    }
    async getEnvelopes() {
        this.connect();
        const result = await this.client.query(`SELECT * FROM envelope`);
        this.disconnect();
        return result.rows;
    }
}

module.export = DbManipulation;