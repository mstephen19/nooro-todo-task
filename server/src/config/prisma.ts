import { PrismaClient } from '@prisma/client';

BigInt.prototype.toJSON = function () {
    return this.toString();
};

export default new PrismaClient();
