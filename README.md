# microservices-guide
This repo contains the must-to-know concepts for backend engineer about microservices. 

# Table of Contents
1. [Introduction]()
2. [API Design](#API design)
3. [Service deployment using pods]()
4. [Load balancing]()
5. [Service Discovery]()
6. [API Gateway]()
7. [Message queues]()
8. [Distributed tracing](#tracing)
9. [Health checking]()
10. [Secrets management]()

# API design
Microservices can be built using different api design techniques, we mention
SAOP, REST, GraphQL, RPC and others. Each one of these has its pros and cons, and it's up to backend engineers to choose the appropriate design for the business.
## REST API
The most widely used technologies in the web it makes use of the http verbs (GET, POST, PUT, DELETE ...)
to define endpoints inorder to access various resources in the backend.
In the sample apps provided with this small guide, the `customer`, `fraud` and `notification` services
are built using REST API. \
When a client request is made via a RESTful API, it transfers a representation of the state of the resource to the requester or endpoint. \
This information, or representation, is delivered in one of several formats via HTTP: JSON (Javascript Object Notation), HTML ... \
Inorder for an API to be considered RESTful, it has to meet some criteria:
* A client-server communication made up of clients, servers and resources with requests managed through HTTP.
* Stateless communication. meaning that requests are independent of each other, so no client information is stored between get requests.

## GraphQL
GraphQL is a specification for new type of API design developed by facebook to solve some problems encountered for their mobile clients. \
The amazing thing that graphql should be proud of x) is that it solves the problem of overfetching (reduce network bandwidth consumption) that REST or any other api encounters. \
It allows clients to request only what they need via an interface called a query language. \
It also allows access to multiple resources in a single request, reducing the number of network calls. \
Additionally, it has an amazing feature for real-time data access using `graphql subscriptions`. 
### GraphQL Core Concepts
GraphQL is based on 4 main concepts:
#### Schema
We can think of it as the data layout and set of resources that the backend exposes. \
In the schema we define the data that we provide and its shape so clients know how to request it.

#### Query


#### Mutations
Mutations are just functions definitions in the schema and have resolver functions, they intend to mutate the data 
in the backend

To achieve querying the data or mutating it we rely on graphql resolvers

##### Resolvers
GraphQL resolvers are just functions to be executed by the graphql engine to make data available for clients.

On last operation is subscription
#### Subscriptions
Like queries, subscriptions enable you to fetch data. But they are long-lasting operations 
that can change their result over time. \
They can maintain an active connection to your GraphQL server 
(most commonly via WebSocket), enabling the server to push updates to 
the subscription's result.



An example of a graphql query is the following which fetches github user's info
```graphql
    query ($user:String) {
        user(login: $user){
            login
            name
            bio
            avatarUrl
            followers {
                totalCount
            }
            following{
                totalCount
            }
            repositories{
                totalCount
            }
            location
            twitterUsername
            company
            websiteUrl
        }
}
```
We easily that we request just what we want instead of parsing that long json data.

[comment]: <> (Build content microservice operations using graphql)

Let's see how we can build our own graphql server using our tiny node service which has
two entities, user and post. \
First thing first is our schema



For more details about it, checkout:
* The [official documentation](https://graphql.org/learn/)
* The amazing [book](https://www.roadtographql.com/) about graphql, a beginner-friendly one.




# Tracing
Tracing is an important concept to know in microservices world.
It allows monitoring requests going into and from microservices.
Jaeger is a well known tool for distributed tracing, it is written in Go, and it has 4 components
as illustrated in the figure bellow
- Instrumentation (collecting metrics)
- Data pipeline
- Backend storage
- UI dashboard for trace visualization
