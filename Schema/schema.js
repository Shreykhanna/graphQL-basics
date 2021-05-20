const graqhql=require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
}=graqhql

const UserType=new GraphQLObjectType({
    name:'User',
    fields:{
        id:{type:GraphQLInt},
        firstName:{type:GraphQLString},
        age:{type:GraphQLInt}
    }
});

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            resolve(parentValue,args){
                
            }
        }
    }
})