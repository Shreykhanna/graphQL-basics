const graqhql=require('graphql');
const axios = require('axios');
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
        id:{type:GraphQLString},
        firstName:{type:GraphQLString},
        age:{type:GraphQLInt},
        company:{
            type:CompanyType,
            resolve(parentValue,args){
                return axios.get(`http:localhost:3000/companies/${parentValue.args.id}`).then(result=>result.data);
            }
        }
    }
});
const CompanyType=new GraphQLObjectType({
    name:'Company',
    fields:{
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        user:{
            type:UserType,
            resolve(parentValue,args){

            }
        }
    }
});

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            resolve(parentValue,args){
               return axios.get(`http://localhost:3000/${args.id}`).then(result=>result.data);
            }
        }
    }
});

module.exports=new GraphQLSchema({query:RootQuery});