import * as SQLite from 'expo-sqlite';
import { BaseModel,types } from 'expo-sqlite-orm';

export default class connection extends BaseModel{
    constructor(obj){
        super(obj)
    }
    static get database(){
        return async()=> SQLite.openDatabase('taskDb.db');
    }
    static get tableName(){
        return 'tasks';
    }
    static get columnMapping() {
        return {
          id: { type: types.INTEGER, primary_key: true } ,// For while only supports id as primary key
          taskName : { type: types.TEXT, not_null:true},
          taskDate :{type : types.DATETIME, not_null:true}
        }
    }  
}


