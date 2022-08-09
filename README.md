# solid-query
Tanstack Query Adapter For SolidJS


See the [StackBlitz Examples](https://stackblitz.com/@ardeora/collections/solid-query-examples) folder to learn how to use solid-query.

### Project Roadmap

#### Legend
- 🟡: Currently in progress
- 🟢: Completed
- 🔴: Not started

#### Planned Features
- 🟢 `createQuery` - The most important function of the library. It is used to create a query that can be used to fetch data from the solid-query library.
- 🟡 `Suspense Support` -  SolidJS only supports Suspense through [resources](https://www.solidjs.com/docs/latest/api#createresource). Need to explore options for wrapping the QueryObserver result in a resource. Any help here would be immensely appreciated 😅. 
- 🔴 `createMutation` - Function to create a mutation that can be used to create/update/delete server state data.
- 🔴 `createQueries` - Function to batch multiple queries.
- 🔴 `createInfiniteQuery` - Functions to create paginated queries.
- 🔴 `SSR Support` -  Need to explore options on how solid-query can integrate nicely with SolidJS frameworks like SolidStart.
- 🔴 `Dev Tools` - Developer mode only Component that will help inspecting queries, mutations, query cache, and query cache keys.


