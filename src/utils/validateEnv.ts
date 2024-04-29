import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['Development', 'Production']
        }),
        MONGO_PASSWORD: str(),
        MONGO_URI: str(),
        MONGO_USER: str(),
        PORT: port({ default: 3000 })
    })
}

export default validateEnv