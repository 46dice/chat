/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import { dataFromApi } from './interfaces-from-api';

class Storage {
    static getData: any;
    
    constructor(key: string, data: string) {
        localStorage.setItem(key, data);
    }

    getData = (data: string): dataFromApi | undefined => {
        const localData = localStorage.getItem(data);
        if (!localData) return;
        return JSON.parse(localData);
    };
}

export default Storage;
