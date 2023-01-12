const {HttpError} = require('../utils/errors');
const prisma = require('../db');
class Message {
 constructor(userId,groupId,message=""){
    this.userId = userId;
    this.message = message;
    this.groupId = groupId;

 }
 async isGroupUser(){
   const {userId , groupId} = this;
   const record = await prisma.$queryRaw`SELECT  user_id FROM "GroupMembership" WHERE "group_id"= ${groupId} AND "user_id" = ${userId}`;
   
   if(!record.length){
      throw new HttpError(403,"You do not belong to this group");
   }
}

 async add(){
   const {userId,groupId,message} = this;
   await this.isGroupUser();

   await prisma.groupMessages.create({
      data:{
         group_id:groupId,
         user_id: userId,
         message: message
      }
   });
 }
 async view(){
   const {groupId} = this;

   await this.isGroupUser();

   const records = await prisma.$queryRaw`SELECT "user_id","message","createdAt" FROM "GroupMessages" WHERE "group_id" = ${groupId} ORDER BY "id" ASC`;
   if(!records){
      throw new HttpError(404,'Could not find group messages');
   }
   return records;
 }
}

module.exports = Message;