const graqhql=require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
}=graqhql
const user=[
    {id:1, firstname:"Samantha" ,age:26},
    {id:2, firstname:"John" ,age:28}
]

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
            return _.find(users,{id:args.id});
            }
        }
    }
});

module.exports=new GraphQLSchema({query:RootQuery});