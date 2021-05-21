const graqhql=require('graphql');
const axios = require('axios');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
}=graqhql

const CompanyType=new GraphQLObjectType({
    name:'Company',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        user:{
            type:new GraphQLList(UserType),
            id:{type:GraphQLString},
            resolve(parentValue,args){
                return axios.get(`http:localhost:3000/companies/${parentValue.id}/users`).then(result=>result.data);
            }
        }
    })
});

const UserType=new GraphQLObjectType({
    name:'User',
    fields:()=>({
        id:{type:GraphQLString},
        firstName:{type:GraphQLString},
        age:{type:GraphQLInt},
        company:{
            type:CompanyType,  
            resolve(parentValue,args){
                return axios.get(`http:localhost:3000/users/${args.id}`).then(result=>result.data);
            }
        }
    })
});

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            resolve(parentValue,args){
                console.log(parentValue,args);
               return axios.get(`http://localhost:3000/users/${args.id}`).then(result=>result.data);
            }
        },
        company:{
            type:CompanyType,
            args:{id:{type:GraphQLString}},
            resolve(parentValue,args){
                console.log(parentValue,args);
                return axios.get(`http://localhost:3000/companies/${args.id}`).then(result=>result.data);
            }
        }
    }
});

const mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser:{
            type:UserType,
            args:{
                firstName:{type:new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(GraphQLInt)},
                CompanyId:{type:GraphQLString}
            },
            resolve(parentValue,{firstName,age}){
                axios.post(`http://localhost:3000/user/${args.id}`,{firstName,age})
                .then(result=>result.data);
            }
        }
    }
})

module.exports=new GraphQLSchema({query:RootQuery,mutation});