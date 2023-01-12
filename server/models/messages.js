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
      throw new HttpError(403,"You do not belong to this group, cannot post here!");
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
}

module.exports = Message;