# microservices-guide
This repo contains the must-to-know concepts for backend engineer about microservices. 

# Table of Contents
1. [Introduction]()
2. [Communication between services]()
3. [Service deployment using pods]()
4. [Load balancing]()
5. [Service Discovery]()
6. [API Gateway]()
7. [Message queues]()
8. [Distributed tracing](#tracing)
9. [Health checking]()
10. [Secrets management]()

# Tracing
Tracing is an important concept to know in microservices world.
It allows monitoring requests going into and from microservices.
Jaeger is a well known tool for distributed tracing, it is written in Go, and it has 4 components
as illustrated in the figure bellow
- Instrumentation (collecting metrics)
- Data pipeline
- Backend storage
- UI dashboard for trace visualization
