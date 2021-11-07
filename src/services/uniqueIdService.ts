import { v4 as uuidv4 } from 'uuid';
import { UniqueIdType } from '../entities/uniqueId';

class UniqueIdService {
  generate(): UniqueIdType {
    return uuidv4();
  }
}

export default new UniqueIdService();
